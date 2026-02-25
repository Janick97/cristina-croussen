"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, Loader2 } from "lucide-react";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (open) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
      }
    }
  }, [open]);

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
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-4 z-[51] flex items-center gap-2 rounded-full bg-dark px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl sm:bottom-8 sm:left-6 sm:px-5 sm:py-3"
          >
            <Sparkles size={18} className="text-primary-light" />
            <span className="hidden sm:inline">Versicherungs-Check</span>
            <span className="sm:hidden">KI-Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-6 sm:left-6 sm:h-[520px] sm:w-[380px] sm:max-w-[calc(100vw-3rem)] sm:rounded-2xl sm:border sm:border-beige/30 sm:shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-dark px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 sm:py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
                  <Bot size={20} className="text-primary-light" />
                </div>
                <p className="text-sm font-semibold text-white">
                  Versicherungs-Assistent
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Chat schließen"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col justify-between">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      <Sparkles size={28} className="text-primary" />
                    </div>
                    <h3 className="font-[family-name:var(--font-londrina)] text-xl text-dark">
                      Hallo!
                    </h3>
                    <p className="mt-2 text-sm text-dark/50">
                      Ich helfe Ihnen herauszufinden, welche Versicherung
                      Ihren Schadensfall abdeckt.
                    </p>
                  </div>

                  {/* Quick Questions */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium text-dark/30">
                      Häufige Fragen:
                    </p>
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="block w-full rounded-xl border border-beige/40 px-4 py-3 text-left text-sm text-dark/70 transition-all hover:border-primary/30 hover:bg-primary/5 active:bg-primary/10 sm:py-2.5"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
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
                      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-beige-light/30 px-4 py-3 text-sm text-dark/50">
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
            <div className="border-t border-beige/20 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
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
              <p className="mt-2 text-center text-[10px] text-dark/25">
                KI-basierte Auskunft – keine rechtsverbindliche Beratung
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
