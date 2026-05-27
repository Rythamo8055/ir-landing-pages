"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const SlideTabs: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tabs = [
    { label: "Boutique Advantage", href: "#boutique-advantage" },
    { label: "IR Procedures", href: "#procedures" },
    { label: "Clinical Outcomes", href: "#clinical-outcomes" },
    { label: "Our Specialists", href: "#specialists" },
  ];

  return (
    <ul
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative flex items-center space-x-1"
    >
      {tabs.map((tab, idx) => {
        const isHovered = hoveredIndex === idx;
        return (
          <li
            key={tab.href}
            onMouseEnter={() => setHoveredIndex(idx)}
            className="relative list-none"
          >
            {isHovered && (
              <motion.span
                layoutId="hover-pill"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
                className="absolute inset-0 bg-cyan-glow rounded-full z-0"
              />
            )}
            <a
              href={tab.href}
              className={`relative z-10 block px-4 py-2 text-xs font-bold uppercase tracking-action whitespace-nowrap transition-colors duration-300 select-none ${
                isHovered ? "text-obsidian" : "text-light hover:text-cyan-glow"
              }`}
            >
              {tab.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
