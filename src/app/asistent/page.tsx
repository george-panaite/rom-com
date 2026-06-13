"use client";

import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { marked } from 'marked';
import styles from './page.module.css';

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
            message: data.message || 'A apărut o problemă la comunicarea cu asistentul AI. Încearcă din nou.'
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
    <div className={styles.chatContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.headerTitle}>Asistent Virtual AI</h2>
          <div className={styles.headerStatus}>
            <span className={styles.statusDot}></span>
            <span>Online • Răspunde pe baza ghidurilor</span>
          </div>
        </div>
        {messages.length > 0 && (
          <button onClick={handleResetChat} className={styles.resetBtn} id="chat-reset-btn">
            Resetează Chat-ul
          </button>
        )}
      </div>

      {/* Message List Area */}
      <div className={styles.messageArea} ref={messageAreaRef} id="chat-message-list">
        {messages.length === 0 ? (
          /* Welcome View */
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeIcon}>🇹🇩</div>
            <h3 className={styles.welcomeTitle}>Bun venit la Asistentul AI!</h3>
            <p className={styles.welcomeText}>
              Întreabă-mă orice legat de înregistrarea la primărie (BSN), asigurarea de sănătate obligatorie sau înființarea unei firme în Olanda ca ZZP (KVK).
            </p>
            <div className={styles.suggestionsTitle}>Întrebări Frecvente:</div>
            <div className={styles.suggestionsGrid}>
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  id={`sug-btn-${i}`}
                  onClick={() => handleSendMessage(sug.query)}
                  className={styles.suggestionBtn}
                >
                  <span>{sug.text}</span>
                  <span className={styles.suggestionArrow}>→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages View */
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.messageBubble} ${
                  msg.role === 'user' ? styles.userMessage : styles.modelMessage
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.role === 'user' ? msg.content : parseMessage(msg.content),
                }}
              />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className={`${styles.messageBubble} ${styles.modelMessage}`} style={{ width: '80px' }}>
                <div className={styles.typingContainer}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
              </div>
            )}

            {/* Error Message Display */}
            {errorMsg && (
              <div className={styles.errorDisplay} id="chat-error-box">
                <div className={styles.errorTitle}>{errorMsg.title}</div>
                <div>{errorMsg.message}</div>
                {errorMsg.message.includes('GEMINI_API_KEY') && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', borderTop: '1px solid #fee2e2', paddingTop: '0.5rem' }}>
                    <strong>Instrucțiuni dezvoltator:</strong> Creați un fișier numit <code>.env.local</code> în folderul rădăcină (dacă nu există deja) și adăugați: <br />
                    <code>GEMINI_API_KEY=cheia_ta_de_la_google_ai_studio</code>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          id="chat-user-input"
          className={styles.chatInput}
          placeholder="Scrie o întrebare aici..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className={styles.sendBtn} id="chat-send-btn" disabled={isLoading || !inputVal.trim()}>
          Trimite
        </button>
      </form>
    </div>
  );
}

export default function AsistentPage() {
  return (
    <div className="container" style={{ flexGrow: 1, display: "flex" }}>
      <div className={styles.chatWrapper}>
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '100%' }}>
            <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Se încarcă chat-ul...</div>
          </div>
        }>
          <ChatInterface />
        </Suspense>
      </div>
    </div>
  );
}
