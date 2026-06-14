"use client";

import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { marked } from 'marked';

interface Message {
  role: 'user' | 'model';
  content: string;
}

function ChatInterface() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<{ title: string; message: string } | null>(null);
  
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const hasAutoSent = useRef(false);

  // Suggestions for users to click
  const suggestions = [
    { text: 'Cum obțin un BSN rapid în Olanda?', query: 'Cum obțin un BSN rapid în Olanda?' },
    { text: 'De ce am nevoie pentru asigurarea de sănătate?', query: 'De ce am nevoie pentru asigurarea de sănătate (zorgverzekering)?' },
    { text: 'Cum mă înregistrez ca ZZP la KVK?', query: 'Care sunt pașii pentru a mă înregistra ca ZZP la KVK (Kamer van Koophandel)?' },
  ];

  // Auto-scroll to bottom of chat
  const scrollToBottom = useCallback(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback(async (promptToSend: string) => {
    if (!promptToSend.trim()) return;

    const userMsg: Message = { role: 'user', content: promptToSend };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputVal('');
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'API_KEY_MISSING') {
          setErrorMsg({
            title: 'Configurație Incompletă',
            message: data.message || 'Cheia API Gemini nu este setată.'
          });
        } else {
          setErrorMsg({
            title: 'Eroare de conexiune',
            message: data.message || 'A apărut o problemă la comunicarea cu asistentul AI. Încercați din nou.'
          });
        }
        setIsLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: 'model', content: data.content }]);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg({
        title: 'Eroare de rețea',
        message: 'Nu s-a putut trimite mesajul. Verificați conexiunea la internet și încercați din nou.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Handle auto-submit if page was opened with a topic parameter (e.g., from an article page CTA)
  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic && messages.length === 0 && !hasAutoSent.current) {
      hasAutoSent.current = true;
      const initialPrompt = `Bună! Am citit ghidul despre „${topic}” și aș dori să aflu mai multe detalii sau clarificări suplimentare pe această temă.`;
      handleSendMessage(initialPrompt);
    }
  }, [searchParams, messages.length, handleSendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  const handleResetChat = () => {
    setMessages([]);
    setErrorMsg(null);
    setInputVal('');
    hasAutoSent.current = false;
  };

  // Helper to safely parse markdown and custom alerts inside messages
  const parseMessage = (content: string): string => {
    // Parse markdown with marked
    const html = marked.parse(content) as string;
    
    // Replace markdown alerts with custom blockquote tags
    return html
      .replace(/<blockquote>\s*<p>\s*\[!NOTE\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-note"><p>')
      .replace(/<blockquote>\s*<p>\s*\[!TIP\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-tip"><p>')
      .replace(/<blockquote>\s*<p>\s*\[!WARNING\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-warning"><p>')
      .replace(/<blockquote>\s*<p>\s*\[!CAUTION\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-caution"><p>');
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col h-[650px] overflow-hidden w-full">
      {/* Workspace Header */}
      <div className="bg-surface-container-low border-b border-outline-variant px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-headline font-bold text-base text-primary">Asistent Proceduri Administrative</h2>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium mt-0.5">
            <span className="w-1.5 h-1.5 bg-carpathian-forest rounded-full inline-block"></span>
            <span>Răspunde din ghidurile oficiale</span>
          </div>
        </div>
        {messages.length > 0 && (
          <button onClick={handleResetChat} className="bg-transparent hover:bg-surface border border-outline-variant text-on-surface-variant hover:text-primary px-3 py-1.5 rounded transition-all text-xs font-semibold cursor-pointer" id="chat-reset-btn">
            Resetează chat-ul
          </button>
        )}
      </div>

      {/* Message List Area */}
      <div className="flex-grow p-6 overflow-y-auto bg-surface/30 flex flex-col" ref={messageAreaRef} id="chat-message-list">
        {messages.length === 0 ? (
          /* Welcome View */
          <div className="flex flex-col items-center justify-center h-full text-center max-w-[480px] mx-auto p-4 my-auto">
            <div className="text-accent mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="font-headline font-bold text-lg text-primary mb-2">Asistență digitală pentru ghidare</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Adresează întrebări specifice despre înregistrarea BSN, asigurări obligatorii de sănătate sau deschiderea unei firme ca ZZP (KVK) în Olanda.
            </p>
            <div className="text-[10px] text-outline uppercase font-bold tracking-wider mb-2 text-left w-full">Întrebări frecvente:</div>
            <div className="flex flex-col gap-2 w-full">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  id={`sug-btn-${i}`}
                  onClick={() => handleSendMessage(sug.query)}
                  className="w-full bg-surface-container-lowest border border-outline-variant hover:border-outline hover:text-accent px-4 py-3 rounded-lg text-left text-xs font-semibold transition-all flex justify-between items-center cursor-pointer"
                >
                  <span>{sug.text}</span>
                  <span className="text-outline text-sm">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages View */
          <div className="flex flex-col gap-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col gap-1.5 w-full ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className={`text-[10px] text-outline uppercase font-bold tracking-wider ${
                  msg.role === 'user' ? 'text-right' : ''
                }`}>
                  {msg.role === 'user' ? 'Întrebare Utilizator' : 'Răspuns Asistent'}
                </div>
                <div
                  className={`max-w-[90%] px-5 py-3.5 rounded-lg text-sm leading-relaxed shadow-sm markdown-content ${
                    msg.role === 'user' 
                      ? 'bg-primary/5 text-primary border border-primary/10 self-end' 
                      : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant border-l-4 border-l-accent self-start w-full'
                  }`}
                  id={`msg-bubble-${index}`}
                  dangerouslySetInnerHTML={{
                    __html: msg.role === 'user' ? msg.content : parseMessage(msg.content),
                  }}
                />
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col gap-1.5 items-start w-full">
                <div className="text-[10px] text-outline uppercase font-bold tracking-wider">Asistentul scrie...</div>
                <div className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant border-l-4 border-l-accent self-start rounded-lg p-4 shadow-sm w-[80px]">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-outline rounded-full inline-block animate-bounce" style={{ animationDelay: '-0.32s' }}></span>
                    <span className="w-1.5 h-1.5 bg-outline rounded-full inline-block animate-bounce" style={{ animationDelay: '-0.16s' }}></span>
                    <span className="w-1.5 h-1.5 bg-outline rounded-full inline-block animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message Display */}
            {errorMsg && (
              <div className="bg-error-container border border-error/20 text-on-error-container rounded-lg p-4 text-xs flex flex-col gap-2 w-full" id="chat-error-box">
                <div className="font-bold text-sm text-error">{errorMsg.title}</div>
                <div>{errorMsg.message}</div>
                {errorMsg.message.includes('GEMINI_API_KEY') && (
                  <div className="mt-1.5 pt-1.5 border-t border-error/10 text-on-surface-variant">
                    <strong>Notă tehnică:</strong> Adăugați <code>GEMINI_API_KEY</code> în fișierul local <code>.env.local</code>.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex flex-col gap-2">
        <div className="flex gap-3 items-center w-full">
          <input
            type="text"
            id="chat-user-input"
            className="flex-grow px-4 py-2.5 rounded border border-outline-variant bg-surface-container-lowest focus:border-primary text-sm transition-all focus:ring-1 focus:ring-primary"
            placeholder="Adresează o întrebare legată de procedurile din Olanda..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-navy-abyss text-white px-5 py-2.5 rounded font-semibold text-xs transition-all shadow-sm cursor-pointer disabled:bg-outline disabled:border-outline-variant disabled:cursor-not-allowed"
            id="chat-send-btn"
            disabled={isLoading || !inputVal.trim()}
          >
            Trimite
          </button>
        </div>
        <div className="text-[10px] text-outline text-center leading-normal">
          Notă (EU AI Act): Acest serviciu utilizează un sistem de Inteligență Artificială (AI) pentru a răspunde la întrebări pe baza ghidurilor disponibile. Răspunsurile au caracter pur informativ și nu înlocuiesc asistența juridică sau oficială a instituțiilor statului.
        </div>
      </form>
    </div>
  );
}

export default function AsistentPage() {
  return (
    <div className="container py-8 max-w-[800px] w-full mx-auto flex-grow flex flex-col">
      <Suspense fallback={
        <div className="flex justify-center items-center h-[300px] w-full">
          <div className="text-on-surface-variant font-semibold text-sm">Se încarcă chat-ul...</div>
        </div>
      }>
        <ChatInterface />
      </Suspense>
    </div>
  );
}
