"use client";

import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { marked } from "marked";
import { Send, ArrowRight, AlertTriangle } from "@/components/icons";

interface Message {
  role: "user" | "model";
  content: string;
}

const SUGGESTIONS = [
  "Tocmai am ajuns. De unde încep?",
  "Cum obțin BSN-ul cât mai repede?",
  "Ce-mi trebuie pentru asigurarea de sănătate?",
  "Cum mă înregistrez ca ZZP la KVK?",
];

function parseMessage(content: string): string {
  const html = marked.parse(content) as string;
  return html
    .replace(/<blockquote>\s*<p>\s*\[!NOTE\]\s*(?:<br\s*\/?>)?/gi, "<blockquote>")
    .replace(/<blockquote>\s*<p>\s*\[!TIP\]\s*(?:<br\s*\/?>)?/gi, "<blockquote>")
    .replace(/<blockquote>\s*<p>\s*\[!WARNING\]\s*(?:<br\s*\/?>)?/gi, "<blockquote>")
    .replace(/<blockquote>\s*<p>\s*\[!CAUTION\]\s*(?:<br\s*\/?>)?/gi, "<blockquote>");
}

function ChatInterface() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const streamRef = useRef<HTMLDivElement>(null);
  const hasAutoSent = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback(
    async (promptToSend: string) => {
      if (!promptToSend.trim() || isLoading) return;

      const userMsg: Message = { role: "user", content: promptToSend };
      const updatedMessages = [...messages, userMsg];

      setMessages(updatedMessages);
      setInputVal("");
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMsg(
            data.message ||
              "A apărut o problemă la comunicarea cu Ana. Încearcă din nou."
          );
          return;
        }

        setMessages((prev) => [...prev, { role: "model", content: data.content }]);
      } catch (err) {
        console.error(err);
        setErrorMsg(
          "Nu am putut trimite mesajul. Verifică conexiunea la internet și încearcă din nou."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Auto-send when opened from an article CTA (/asistent?topic=...)
  useEffect(() => {
    const topic = searchParams.get("topic");
    if (topic && messages.length === 0 && !hasAutoSent.current) {
      hasAutoSent.current = true;
      handleSendMessage(
        `Am citit ghidul „${topic}” și aș vrea câteva lămuriri suplimentare.`
      );
    }
  }, [searchParams, messages.length, handleSendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  const empty = messages.length === 0 && !isLoading && !errorMsg;

  return (
    <div className="ana-shell mx-auto max-w-[840px]">
      {/* Hero */}
      <div className="mb-[34px] text-center">
        <span className="ana-face mx-auto mb-5 h-[88px] w-[88px] rounded-full text-[40px]">
          A
        </span>
        <h1 className="font-display text-[clamp(34px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.02em]">
          Salut, sunt <em className="not-italic text-poppy">Ana</em>.
        </h1>
        <p className="mx-auto mt-3.5 max-w-[48ch] text-[17px] text-soft">
          Asistenta ta digitală pentru viața în Olanda. Întreabă-mă orice despre acte
          sau primii pași și îți răspund în română.
        </p>
      </div>

      {/* Chat card */}
      <div className="overflow-hidden rounded-[26px] border border-line bg-card shadow-[0_30px_60px_-42px_rgba(60,40,20,0.5)]">
        <div className="chat-stream" ref={streamRef}>
          {empty ? (
            <div className="px-2.5 py-[18px] text-center">
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-faint">
                Întrebări frecvente
              </div>
              <div className="mx-auto flex max-w-[480px] flex-col gap-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSendMessage(s)}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-[14px] border border-line bg-paper px-[18px] py-3.5 text-left font-display text-base font-semibold text-ink transition-all duration-200 hover:translate-x-[3px] hover:border-poppy hover:text-poppy-d"
                  >
                    <span>{s}</span>
                    <ArrowRight className="h-[18px] w-[18px] flex-none text-faint" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="msg user">
                    <div className="m-av">Tu</div>
                    <div className="bubble">{msg.content}</div>
                  </div>
                ) : (
                  <div key={i} className="msg ana">
                    <div className="m-av">A</div>
                    <div
                      className="bubble"
                      dangerouslySetInnerHTML={{ __html: parseMessage(msg.content) }}
                    />
                  </div>
                )
              )}

              {isLoading && (
                <div className="msg ana">
                  <div className="m-av">A</div>
                  <div className="bubble">
                    <div className="typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="callout warning mx-auto w-full max-w-[480px]" role="alert">
                  <div className="ct">
                    <AlertTriangle className="h-[18px] w-[18px]" />
                    Ceva n-a mers bine
                  </div>
                  {errorMsg}
                </div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-line bg-paper px-5 py-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 rounded-[12px] transition-shadow focus-within:ring-2 focus-within:ring-poppy-d/45"
          >
            <input
              type="text"
              className="flex-1 border-none bg-transparent px-1 py-2 text-base text-ink outline-none placeholder:text-faint"
              placeholder="Scrie întrebarea ta..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              aria-label="Trimite mesajul"
              className="grid h-[46px] w-[46px] flex-none place-items-center rounded-full bg-poppy text-white transition-all duration-200 hover:scale-105 hover:bg-poppy-d disabled:cursor-not-allowed disabled:bg-line2 disabled:hover:scale-100"
            >
              <Send className="h-[19px] w-[19px]" />
            </button>
          </form>
        </div>
      </div>

      <p className="mx-auto mt-[18px] max-w-[60ch] text-center text-[12.5px] leading-[1.6] text-faint">
        Ana folosește un sistem AI (conform EU AI Act). Răspunsurile sunt orientative și
        nu înlocuiesc asistența oficială a instituțiilor statului.
      </p>
    </div>
  );
}

export default function AsistentPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 pb-[70px] pt-[42px] sm:px-7">
      <Suspense
        fallback={
          <div className="flex h-[300px] items-center justify-center text-sm font-semibold text-soft">
            Se încarcă conversația...
          </div>
        }
      >
        <ChatInterface />
      </Suspense>
    </div>
  );
}
