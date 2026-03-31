"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <motion.div
      whileHover={{ transform: "translateY(-4px) scale(1.01)" }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-white p-6 shadow-md"
    >
      {children}
    </motion.div>
  );
}
