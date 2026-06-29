"use client";

import React from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursorColor?: string;
}

export function TypewriterText({
  text,
  className = "",
  speed = 0.04,
  delay = 0.05,
  cursorColor = "currentColor"
}: TypewriterTextProps) {
  const characters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const characterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <motion.span
      key={text}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: (t) => (t < 0.5 ? 0 : 1) }}
        className="inline-block w-[3px] h-[0.85em] ml-1.5 align-middle"
        style={{ backgroundColor: cursorColor }}
      />
    </motion.span>
  );
}
