"use client";

import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileHover={{ transform: "scale(1.04)" }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-md ${className}`}
      {...props}
    />
  );
}
