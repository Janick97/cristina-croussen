"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, AlertCircle, Heart } from "lucide-react";

const gefieltOptions = [
  "Design",
  "Übersichtlichkeit",
  "Informationen",
  "Ladezeit",
  "Mobile-Ansicht",
];

const verbesserOptions = [
  "Mehr Infos",
  "Bessere Navigation",
  "Weniger Text",
  "Mehr Bilder",
  "Schnellere Ladezeit",
];

const geflundenOptions = ["Ja", "Teilweise", "Nein"];

export default function FeedbackForm() {
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [gefielt, setGefielt] = useState<string[]>([]);
  const [verbessern, setVerbessern] = useState<string[]>([]);
  const [gefunden, setGefunden] = useState("");
  const [gutGefallen, setGutGefallen] = useState("");
  const [gefehlt, setGefehlt] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleOption = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (stars === 0) return;
    setStatus("loading");

    const body = {
      stars,
      gefielt: gefielt.join(", "),
      verbessern: verbessern.join(", "),
      gefunden,
      gutGefallen,
      gefehlt,
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="feedback" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-primary/5 p-10"
          >
            <CheckCircle size={56} className="mx-auto mb-4 text-primary" />
            <h3 className="font-[family-name:var(--font-londrina)] font-semibold text-3xl text-dark">
              Vielen Dank!
            </h3>
            <p className="mt-3 inline-flex items-center gap-1 text-dark/60">
              Dein Feedback hilft mir, die Seite noch besser zu machen.<Heart size={16} fill="#D9A397" color="#D9A397" className="inline ml-0.5 -mt-0.5" />
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="feedback" className="bg-beige-light/20 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Deine Meinung zählt
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] font-semibold text-4xl text-dark sm:text-5xl">
            Feedback zur Website
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-sm text-dark/60">
            Was denkst du? Ich freue mich über jede Rückmeldung – ganz anonym.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-8 rounded-3xl bg-white p-6 shadow-lg sm:p-10"
        >
          {/* Sterne */}
          <div>
            <p className="mb-3 text-sm font-semibold text-dark">
              Wie findest du die Website insgesamt? *
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHoverStar(n)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => setStars(n)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    size={36}
                    className={`transition-colors ${
                      n <= (hoverStar || stars)
                        ? "fill-[#D9A397] text-[#D9A397]"
                        : "fill-none text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            {stars === 0 && status === "error" && (
              <p className="mt-1 text-xs text-red-500">Bitte eine Bewertung abgeben.</p>
            )}
          </div>

          {/* Was gefällt */}
          <div>
            <p className="mb-3 text-sm font-semibold text-dark">
              Was gefällt dir besonders? <span className="font-normal text-dark/40">(Mehrfachauswahl)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {gefieltOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleOption(gefielt, setGefielt, opt)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                    gefielt.includes(opt)
                      ? "border-[#D9A397] bg-[#D9A397]/10 text-[#C48B7E]"
                      : "border-gray-200 text-dark/60 hover:border-[#D9A397]/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Was verbessern */}
          <div>
            <p className="mb-3 text-sm font-semibold text-dark">
              Was würdest du verbessern? <span className="font-normal text-dark/40">(Mehrfachauswahl)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {verbesserOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleOption(verbessern, setVerbessern, opt)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                    verbessern.includes(opt)
                      ? "border-[#D9A397] bg-[#D9A397]/10 text-[#C48B7E]"
                      : "border-gray-200 text-dark/60 hover:border-[#D9A397]/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Gefunden */}
          <div>
            <p className="mb-3 text-sm font-semibold text-dark">
              Hast du gefunden, was du gesucht hast? *
            </p>
            <div className="flex gap-3">
              {geflundenOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setGefunden(opt)}
                  className={`flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-all ${
                    gefunden === opt
                      ? "border-[#D9A397] bg-[#D9A397]/10 text-[#C48B7E]"
                      : "border-gray-200 text-dark/60 hover:border-[#D9A397]/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Freitext: gut gefallen */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-dark">
              Was hat dir gut gefallen?
            </label>
            <textarea
              rows={3}
              value={gutGefallen}
              onChange={(e) => setGutGefallen(e.target.value)}
              placeholder="Erzähl mir gerne mehr..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition-all focus:border-[#D9A397] focus:ring-2 focus:ring-[#D9A397]/20"
            />
          </div>

          {/* Freitext: gefehlt */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-dark">
              Was hat dir gefehlt?
            </label>
            <textarea
              rows={3}
              value={gefehlt}
              onChange={(e) => setGefehlt(e.target.value)}
              placeholder="Was vermisst du auf der Seite?"
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition-all focus:border-[#D9A397] focus:ring-2 focus:ring-[#D9A397]/20"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              <AlertCircle size={16} />
              Etwas ist schiefgelaufen. Bitte versuche es erneut.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || stars === 0}
            className="w-full rounded-full bg-primary py-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50"
          >
            {status === "loading" ? "Wird gesendet..." : "Feedback absenden"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
