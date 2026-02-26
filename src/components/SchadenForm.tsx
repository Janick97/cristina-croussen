"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, FileText, X } from "lucide-react";

const versicherungsarten = [
  "Bitte wählen...",
  "Haftpflichtversicherung",
  "Hausratversicherung",
  "Wohngebäudeversicherung",
  "KFZ-Versicherung",
  "Berufsunfähigkeitsversicherung",
  "Rechtsschutzversicherung",
  "Unfallversicherung",
  "Reiseversicherung",
  "Sonstige",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FormData {
  name: string;
  email: string;
  telefon: string;
  kundeBeicristina: string;
  versicherungsgesellschaft: string;
  produktart: string;
  versicherungsart: string;
  beschreibung: string;
  datenschutz: boolean;
}

export default function SchadenForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    telefon: "",
    kundeBeicristina: "",
    versicherungsgesellschaft: "",
    produktart: "",
    versicherungsart: "",
    beschreibung: "",
    datenschutz: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [versicherungsschein, setVersicherungsschein] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isKunde = formData.kundeBeicristina === "ja";
  const isFremd = formData.kundeBeicristina === "nein";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox"
      ? target.checked
      : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleVersicherungsscheinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg("Die Datei ist zu groß. Maximale Dateigröße: 10 MB.");
      return;
    }
    setErrorMsg("");
    setVersicherungsschein(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("telefon", formData.telefon);
      body.append("kundeBeicristina", formData.kundeBeicristina);
      body.append("beschreibung", formData.beschreibung);
      body.append("datenschutz", String(formData.datenschutz));

      if (isKunde) {
        body.append("versicherungsart", formData.versicherungsart);
      } else if (isFremd) {
        body.append("versicherungsgesellschaft", formData.versicherungsgesellschaft);
        body.append("produktart", formData.produktart);
        if (versicherungsschein) {
          body.append("versicherungsschein", versicherungsschein);
        }
      }

      files.forEach((file) => body.append("dokumente", file));

      const res = await fetch("/api/schadenspruefung", {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error("Fehler beim Senden");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        telefon: "",
        kundeBeicristina: "",
        versicherungsgesellschaft: "",
        produktart: "",
        versicherungsart: "",
        beschreibung: "",
        datenschutz: false,
      });
      setFiles([]);
      setVersicherungsschein(null);
    } catch {
      setStatus("error");
      setErrorMsg("Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    }
  };

  if (status === "success") {
    return (
      <section id="schadenspruefung" className="bg-beige-light/20 py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 shadow-lg sm:p-12"
          >
            <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
            <h3 className="font-[family-name:var(--font-londrina)] text-3xl text-dark">
              Vielen Dank!
            </h3>
            <p className="mt-4 text-lg text-dark/70">
              Ihre Anfrage wurde erfolgreich übermittelt. Wir prüfen Ihren Fall
              und melden uns zeitnah bei Ihnen.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary-dark"
            >
              Neue Anfrage stellen
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="schadenspruefung" className="bg-beige-light/20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Schnell & unkompliziert
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Schadensprüfung
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 mx-auto max-w-2xl text-base text-dark/70 sm:mt-6 sm:text-lg">
            Sie hatten einen Schaden? Schildern Sie uns Ihren Fall und wir
            prüfen Ihre Ansprüche – kostenlos und unverbindlich.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-5 shadow-lg sm:mt-12 sm:p-8 md:p-12"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="sm:col-span-2">
              <label htmlFor="schaden-name" className="mb-2 block text-sm font-medium text-dark">
                Name *
              </label>
              <input
                id="schaden-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Ihr vollständiger Name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="schaden-email" className="mb-2 block text-sm font-medium text-dark">
                E-Mail *
              </label>
              <input
                id="schaden-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="ihre@email.de"
              />
            </div>

            {/* Telefon */}
            <div>
              <label htmlFor="schaden-telefon" className="mb-2 block text-sm font-medium text-dark">
                Telefon
              </label>
              <input
                id="schaden-telefon"
                name="telefon"
                type="tel"
                value={formData.telefon}
                onChange={handleChange}
                className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="0160 1234567"
              />
            </div>

            {/* Kunde bei Cristina? */}
            <div className="sm:col-span-2">
              <p className="mb-3 text-sm font-medium text-dark">
                Kunde bei Cristina? *
              </p>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="kundeBeicristina"
                    value="ja"
                    required
                    checked={formData.kundeBeicristina === "ja"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-dark">Ja</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="kundeBeicristina"
                    value="nein"
                    checked={formData.kundeBeicristina === "nein"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-dark">Nein</span>
                </label>
              </div>
            </div>

            {/* Conditional fields for existing customers */}
            <AnimatePresence mode="wait">
              {isKunde && (
                <motion.div
                  key="kunde-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="sm:col-span-2"
                >
                  <label htmlFor="versicherungsart" className="mb-2 block text-sm font-medium text-dark">
                    Versicherungsart
                  </label>
                  <select
                    id="versicherungsart"
                    name="versicherungsart"
                    value={formData.versicherungsart}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {versicherungsarten.map((art) => (
                      <option key={art} value={art === "Bitte wählen..." ? "" : art}>
                        {art}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Conditional fields for non-customers */}
              {isFremd && (
                <motion.div
                  key="fremd-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-5 sm:col-span-2 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="versicherungsgesellschaft" className="mb-2 block text-sm font-medium text-dark">
                      Aktuelle Versicherungsgesellschaft *
                    </label>
                    <input
                      id="versicherungsgesellschaft"
                      name="versicherungsgesellschaft"
                      type="text"
                      required
                      value={formData.versicherungsgesellschaft}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="z.B. Allianz, HUK-Coburg"
                    />
                  </div>
                  <div>
                    <label htmlFor="produktart" className="mb-2 block text-sm font-medium text-dark">
                      Produktart *
                    </label>
                    <input
                      id="produktart"
                      name="produktart"
                      type="text"
                      required
                      value={formData.produktart}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="z.B. Hausratversicherung"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-dark">
                      Versicherungsschein hochladen
                    </label>
                    <label
                      htmlFor="versicherungsschein"
                      className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-beige/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                    >
                      <Upload size={24} className="text-primary/60" />
                      <span className="text-sm text-dark/60">
                        PDF, JPG oder PNG (max. 10 MB)
                      </span>
                      <input
                        id="versicherungsschein"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleVersicherungsscheinChange}
                        className="hidden"
                      />
                    </label>
                    {versicherungsschein && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm text-dark/70">
                        <FileText size={16} className="text-primary" />
                        {versicherungsschein.name}
                        <button
                          type="button"
                          onClick={() => setVersicherungsschein(null)}
                          className="ml-auto text-dark/40 hover:text-dark/70"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Beschreibung */}
            <div className="sm:col-span-2">
              <label htmlFor="beschreibung" className="mb-2 block text-sm font-medium text-dark">
                Schadenbeschreibung *
              </label>
              <textarea
                id="beschreibung"
                name="beschreibung"
                required
                rows={5}
                value={formData.beschreibung}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-beige/50 px-4 py-3 text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Beschreiben Sie den Schaden so detailliert wie möglich..."
              />
            </div>

            {/* File Upload */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-dark">
                Dokumente hochladen
              </label>
              <label
                htmlFor="dokumente"
                className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-beige/50 p-5 transition-all hover:border-primary/50 hover:bg-primary/5 sm:p-8"
              >
                <Upload size={32} className="text-primary/60" />
                <span className="text-sm text-dark/60">
                  Fotos, Rechnungen oder Dokumente hierher ziehen oder klicken
                </span>
                <input
                  id="dokumente"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm text-dark/70"
                    >
                      <FileText size={16} className="text-primary" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DSGVO */}
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

          {/* Error */}
          {status === "error" && (
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              <AlertCircle size={18} />
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-8 w-full rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/20 disabled:opacity-60"
          >
            {status === "loading" ? "Wird gesendet..." : "Schaden jetzt prüfen lassen"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
