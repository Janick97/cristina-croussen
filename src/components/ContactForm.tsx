"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from "lucide-react";

interface ContactData {
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
  datenschutz: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    telefon: "",
    nachricht: "",
    datenschutz: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox"
      ? target.checked
      : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ name: "", email: "", telefon: "", nachricht: "", datenschutz: false });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="bg-beige-light/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Schreiben Sie mir
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Kontakt
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="font-[family-name:var(--font-londrina)] text-2xl text-dark">
              So erreichen Sie mich
            </h3>
            <p className="mt-4 text-dark/60">
              Haben Sie eine Frage oder möchten einen Termin vereinbaren? Ich
              freue mich auf Ihre Nachricht.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">Telefon</p>
                  <a
                    href="tel:+4916092282112"
                    className="text-dark/60 transition-colors hover:text-primary"
                  >
                    0160 92282112
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">WhatsApp</p>
                  <a
                    href="https://wa.me/4916092282112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark/60 transition-colors hover:text-primary"
                  >
                    Nachricht senden
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">Adresse</p>
                  <p className="text-dark/60">
                    Hochstr. 96
                    <br />
                    52525 Heinsberg
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 shadow-lg sm:p-10 lg:col-span-3"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle size={48} className="mb-4 text-green-500" />
                <h3 className="font-[family-name:var(--font-londrina)] text-2xl text-dark">
                  Nachricht gesendet!
                </h3>
                <p className="mt-2 text-dark/60">
                  Vielen Dank! Ich melde mich schnellstmöglich bei Ihnen.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white"
                >
                  Neue Nachricht
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-dark">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-dark">
                      E-Mail *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="ihre@email.de"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-telefon" className="mb-2 block text-sm font-medium text-dark">
                      Telefon
                    </label>
                    <input
                      id="contact-telefon"
                      name="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="0160 1234567"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-nachricht" className="mb-2 block text-sm font-medium text-dark">
                      Nachricht *
                    </label>
                    <textarea
                      id="contact-nachricht"
                      name="nachricht"
                      required
                      rows={5}
                      value={formData.nachricht}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Wie kann ich Ihnen helfen?"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="datenschutz"
                        required
                        checked={formData.datenschutz}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded border-beige accent-primary"
                      />
                      <span className="text-sm text-dark/60">
                        Ich habe die{" "}
                        <a
                          href="/datenschutz"
                          target="_blank"
                          className="text-primary underline"
                        >
                          Datenschutzerklärung
                        </a>{" "}
                        gelesen und stimme der Verarbeitung meiner Daten zu. *
                      </span>
                    </label>
                  </div>
                </div>

                {status === "error" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                    <AlertCircle size={18} />
                    Fehler beim Senden. Bitte versuchen Sie es erneut.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/20 disabled:opacity-60"
                >
                  <Send size={18} />
                  {status === "loading" ? "Wird gesendet..." : "Nachricht senden"}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
