"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-londrina)] font-semibold text-3xl font-bold text-dark">
                Cristina
              </span>
              <span className="font-[family-name:var(--font-caveat)] text-2xl text-primary">
                Croußen
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              className="mx-auto mt-4 h-0.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
