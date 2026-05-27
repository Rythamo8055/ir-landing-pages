"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatItem {
  percentage: string;
  label: string;
  isIncrease: boolean;
  title: string;
  icon: React.ReactNode;
}

export default function Testimonial1() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const stats: StatItem[] = [
    {
      percentage: "100%",
      title: "Board Certified",
      label: "Diplomates of the American Board of Radiology (ABR)",
      isIncrease: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" />
        </svg>
      )
    },
    {
      percentage: "95%+",
      title: "Same-Day Return",
      label: "Outpatient same-day recovery rate in private suites",
      isIncrease: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      percentage: "< 0.5%",
      title: "Complications",
      label: "Severe complication rate (vs 4.5% open surgery standard)",
      isIncrease: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      percentage: "92%",
      title: "Narcotic Reduction",
      label: "Post-procedural opioid use reduction nationwide",
      isIncrease: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full rounded-xl border border-border-glass bg-surface-obsidian p-8 flex flex-col justify-between shadow-[0_2px_12px_rgba(23,42,40,0.02)] h-full relative overflow-hidden select-none">
      
      {/* Decorative subtle medical fluoroscopy grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.01] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #2A9D8F 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }} 
      />

      <div className="relative z-10 space-y-8 flex-grow flex flex-col justify-center py-4">
        {/* Badge */}
        <div className="flex justify-start">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-[10px] font-bold text-cyan-glow tracking-tag uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
            <span>Clinical Trust</span>
          </span>
        </div>

        {/* Interactive Statement */}
        <div className="text-left text-light">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading leading-tight tracking-hero">
            We make it easy for{" "}
            
            {/* Tooltip 1: Specialists */}
            <span className="inline-block mx-1.5 align-middle relative">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-border-glass overflow-hidden cursor-pointer hover:border-cyan-glow transition-all duration-300 hover:scale-105 active:scale-95"
                onMouseEnter={() => setActiveTooltip("specialists")}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === "specialists" ? null : "specialists")}
              >
                <img
                  src="https://pro-section.ui-layouts.com/people/aam1.png"
                  alt="Board certified interventional radiologist specialists"
                  className="object-cover w-full h-full"
                />
              </div>

              <AnimatePresence>
                {activeTooltip === "specialists" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute z-30 bottom-14 left-1/2 -translate-x-1/2 w-64 bg-[#172A28] text-white p-4 rounded-lg border border-cyan-glow/20 shadow-xl"
                  >
                    <p className="text-xs italic leading-relaxed text-[#FAF8F5]/90 mb-2">
                      "Image-guided catheter operations allow us to navigate vascular pathways with absolute micrometric precision."
                    </p>
                    <p className="text-[10px] font-bold tracking-tag text-cyan-glow uppercase">
                      Dr. Sarah Jenkins, MD, FSIR
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>

            <span className="font-heading font-extrabold text-cyan-glow">specialists</span> and their{" "}
            
            {/* Tooltip 2: Patients */}
            <span className="inline-block mx-1.5 align-middle relative">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-border-glass overflow-hidden cursor-pointer hover:border-cyan-glow transition-all duration-300 hover:scale-105 active:scale-95"
                onMouseEnter={() => setActiveTooltip("patients")}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === "patients" ? null : "patients")}
              >
                <img
                  src="https://pro-section.ui-layouts.com/people/aam3.jpg"
                  alt="Rythamo outpatient patient"
                  className="object-cover w-full h-full"
                />
              </div>

              <AnimatePresence>
                {activeTooltip === "patients" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute z-30 bottom-14 left-1/2 -translate-x-1/2 w-64 bg-[#172A28] text-white p-4 rounded-lg border border-cyan-glow/20 shadow-xl"
                  >
                    <p className="text-xs italic leading-relaxed text-[#FAF8F5]/90 mb-2">
                      "Bypassing standard surgery was a blessing. I had zero pain, no stitches, and was home enjoying dinner in my own bed."
                    </p>
                    <p className="text-[10px] font-bold tracking-tag text-cyan-glow uppercase">
                      Robert H., Outpatient UAE Patient
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>

            <span className="font-heading font-extrabold text-azure-glow">patients</span> to achieve clinical excellence and non-surgical healing.
          </h2>
        </div>
      </div>

      {/* Bottom Outcomes Stats Board */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#FAF8F5] border border-border-glass rounded-lg px-4 py-4 w-full relative z-10">
        {stats.map((stat, idx) => (
          <div
            key={stat.title}
            className="flex-1 flex flex-col justify-center items-center relative group min-h-[50px] cursor-pointer"
          >
            {/* Divider */}
            {idx !== 0 && (
              <div className="hidden sm:block w-[1px] h-8 bg-border-glass absolute left-0" />
            )}

            {/* Logo Icon Layer */}
            <div className="w-full h-full flex items-center justify-center text-cyan-glow opacity-100 group-hover:opacity-0 group-hover:-translate-y-8 transition-all duration-300 ease-out select-none">
              <div className="flex flex-col items-center space-y-1">
                {stat.icon}
                <span className="text-[9px] font-bold uppercase tracking-tag text-muted mt-0.5">
                  {stat.title}
                </span>
              </div>
            </div>

            {/* Hover Outcomes Statistics Layer */}
            <div className="absolute inset-0 opacity-0 flex flex-col items-center justify-center w-full group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-300 ease-out select-none">
              <div className="flex items-center justify-center gap-1">
                {stat.isIncrease ? (
                  <ArrowUp className="w-4 h-4 text-cyan-glow" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-azure-glow" />
                )}
                <span className="text-lg font-extrabold font-heading text-light leading-none tracking-hero">
                  {stat.percentage}
                </span>
              </div>
              <p className="text-[9px] text-muted text-center leading-tight mt-1 px-1 font-semibold">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
