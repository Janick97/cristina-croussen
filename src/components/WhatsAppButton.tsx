"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setChatOpen(detail.open);
    };
    window.addEventListener("aichat-toggle", handler);
    return () => window.removeEventListener("aichat-toggle", handler);
  }, []);

  return (
    <AnimatePresence>
      {!chatOpen && (
        <motion.a
          href="https://wa.me/4916092282112"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Kontakt"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-4 z-[51] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl hover:shadow-[#25D366]/40 sm:bottom-8 sm:right-6 sm:h-14 sm:w-14"
        >
          <MessageCircle size={26} fill="white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
