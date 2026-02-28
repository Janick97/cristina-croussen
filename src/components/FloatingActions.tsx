"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, Plus, X, Star } from "lucide-react";

const actions = [
  {
    id: "feedback",
    label: "Feedback",
    icon: Star,
    bg: "bg-[#D9A397]",
    shadow: "shadow-[#D9A397]/40",
    href: "#feedback",
    target: "_self",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    bg: "bg-[#25D366]",
    shadow: "shadow-[#25D366]/40",
    href: "https://wa.me/4916092282112",
    target: "_blank",
    iconFill: true,
  },
  {
    id: "chat",
    label: "KI-Chat",
    icon: Sparkles,
    bg: "bg-dark",
    shadow: "shadow-dark/30",
    href: null,
  },
];

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const handleAction = (id: string) => {
    if (id === "chat") {
      window.dispatchEvent(new CustomEvent("aichat-open"));
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-8 sm:right-6">
      {/* Sub-buttons */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.8 }}
              transition={{ delay: i * 0.06, duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              {/* Label */}
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-dark shadow-md">
                {action.label}
              </span>
              {/* Button */}
              {action.href ? (
                <a
                  href={action.href}
                  target={action.target}
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ${action.bg} ${action.shadow} transition-transform hover:scale-110 active:scale-95`}
                >
                  <action.icon
                    size={22}
                    fill={action.iconFill ? "white" : "none"}
                  />
                </a>
              ) : (
                <button
                  onClick={() => handleAction(action.id)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ${action.bg} ${action.shadow} transition-transform hover:scale-110 active:scale-95`}
                >
                  <action.icon size={22} />
                </button>
              )}
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-shadow hover:shadow-2xl hover:shadow-primary/40"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={26} />
        </motion.div>
      </motion.button>
    </div>
  );
}
