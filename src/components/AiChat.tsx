"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, Loader2, ChevronLeft } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "Welche Versicherung zahlt bei Wasserschaden?",
  "Was deckt eine Haftpflicht ab?",
  "Brauche ich eine Berufsunfähigkeit?",
  "Was zahlt die Teilkasko?",
];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && window.innerWidth >= 640) inputRef.current?.focus();
  }, [open]);

  // Listen for open event from FloatingActions
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("aichat-open", handler);
    return () => window.removeEventListener("aichat-open", handler);
  }, []);

  // Prevent body scroll when chat is open & notify other components
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("aichat-toggle", { detail: { open: true } }));
      return () => {
        document.body.style.overflow = "";
        window.dispatchEvent(new CustomEvent("aichat-toggle", { detail: { open: false } }));
      };
    }
  }, [open]);

  // Handle mobile keyboard — resize chat to visible viewport
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      setViewportHeight(vv.height);
    };

    vv.addEventListener("resize", onResize);
    onResize();
    return () => vv.removeEventListener("resize", onResize);
  }, [open]);

  // Scroll to bottom when keyboard opens
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Entschuldigung, ich bin gerade nicht erreichbar. Bitte kontaktieren Sie Cristina direkt unter 0160 92282112.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Entschuldigung, es gab einen Verbindungsfehler. Bitte versuchen Sie es später erneut.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[60] flex flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-6 sm:left-6 sm:h-[520px] sm:w-[380px] sm:max-w-[calc(100vw-3rem)] sm:rounded-2xl sm:border sm:border-beige/30 sm:shadow-2xl"
            style={{
              height: viewportHeight && window.innerWidth < 640
                ? `${viewportHeight}px`
                : undefined,
              top: window.innerWidth < 640 ? "auto" : undefined,
            }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between bg-dark px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Mobile: back arrow, Desktop: bot icon */}
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 active:bg-white/10 sm:hidden"
                  aria-label="Chat schließen"
                >
                  <ChevronLeft size={22} />
                </button>
                <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary/20 sm:flex">
                  <Bot size={20} className="text-primary-light" />
                </div>
                <p className="text-sm font-semibold text-white">
                  Versicherungs-Assistent
                </p>
              </div>
              {/* Desktop close button */}
              <button
                onClick={() => setOpen(false)}
                className="hidden h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white sm:flex"
                aria-label="Chat schließen"
              >
                <X size={18} />
              </button>
              {/* Mobile close X */}
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 active:bg-white/10 sm:hidden"
                aria-label="Chat schließen"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col justify-between">
                  <div className="pt-4 text-center sm:pt-0">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      <Sparkles size={28} className="text-primary" />
                    </div>
                    <h3 className="font-[family-name:var(--font-londrina)] font-semibold text-xl text-dark">
                      Hallo!
                    </h3>
                    <p className="mt-2 text-sm text-dark/50">
                      Ich helfe Ihnen herauszufinden, welche Versicherung
                      Ihren Schadensfall abdeckt.
                    </p>
                  </div>

                  {/* Quick Questions */}
                  <div className="mt-4 space-y-2 pb-1">
                    <p className="text-xs font-medium text-dark/30">
                      Häufige Fragen:
                    </p>
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="block w-full rounded-xl border border-beige/40 px-4 py-3 text-left text-sm text-dark/70 transition-all hover:border-primary/30 hover:bg-primary/5 active:bg-primary/10"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed sm:text-sm ${
                          msg.role === "user"
                            ? "rounded-br-md bg-primary text-white"
                            : "rounded-bl-md bg-beige-light/30 text-dark/80"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-beige-light/30 px-4 py-2.5 text-sm text-dark/50">
                        <Loader2 size={16} className="animate-spin" />
                        Einen Moment...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-beige/20 bg-white px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={scrollToBottom}
                  placeholder="Ihre Frage..."
                  disabled={loading}
                  className="flex-1 rounded-xl border border-beige/40 px-4 py-3 text-base text-dark outline-none transition-all placeholder:text-dark/30 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 sm:py-2.5 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary-dark active:scale-95 disabled:opacity-30 sm:h-10 sm:w-10"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="mt-1.5 text-center text-[10px] text-dark/25 sm:mt-2">
                KI-basierte Auskunft – keine rechtsverbindliche Beratung
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
