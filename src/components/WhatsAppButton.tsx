"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/4916092282112"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Kontakt"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl hover:shadow-[#25D366]/40 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <MessageCircle size={24} fill="white" className="sm:hidden" />
      <MessageCircle size={28} fill="white" className="hidden sm:block" />
    </motion.a>
  );
}
