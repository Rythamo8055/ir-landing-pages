"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const ExperienceFooter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Mouse magnetic effect for the Book Consultation CTA button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return;
      const rect = ctaRef.current.getBoundingClientRect();
      const ctaX = rect.left + rect.width / 2;
      const ctaY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - ctaX, e.clientY - ctaY);

      if (dist < 180) {
        const pullX = (e.clientX - ctaX) * 0.35;
        const pullY = (e.clientY - ctaY) * 0.35;
        ctaRef.current.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.05)`;
      } else {
        ctaRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Interactive Canvas: Vascular Catheter Pathway simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse on canvas
    let targetMouse = { x: width / 2, y: height / 2 };
    let currentMouse = { x: width / 2, y: height / 2 };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleCanvasMouseMove);

    // Vascular network nodes
    const lines = Array.from({ length: 6 }, (_, i) => ({
      seed: Math.random() * 100,
      speed: 0.005 + Math.random() * 0.005,
      yOffset: (height / 6) * i + 40,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;

      // Draw elegant grid points
      ctx.fillStyle = "rgba(42, 157, 143, 0.04)";
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw vascular catheter paths
      lines.forEach((line) => {
        line.seed += line.speed;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(42, 157, 143, 0.15)";
        ctx.lineWidth = 1.5;

        for (let x = 0; x < width; x += 10) {
          // Dynamic wave morph
          const baseSin = Math.sin(x * 0.005 + line.seed);
          // Mouse proximity pull
          const distToMouse = Math.hypot(x - currentMouse.x, line.yOffset - currentMouse.y);
          const mousePull = Math.max(0, (150 - distToMouse) / 150) * 35;
          const y = line.yOffset + baseSin * 15 - mousePull * Math.sin(x * 0.02);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Pulse guide wire target indicators
      ctx.beginPath();
      ctx.arc(currentMouse.x, currentMouse.y, 60, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(231, 111, 81, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(currentMouse.x, currentMouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#E76F51";
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleCanvasMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-[85vh] w-full bg-obsidian border-t border-border-glass flex flex-col justify-between overflow-hidden p-8 md:p-14 lg:p-20 select-none mt-24"
    >
      
      {/* Background Interactive Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* 1. Main Floating Header / Status */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-2 h-2 bg-cyan-glow rounded-full">
            <div className="absolute inset-0 bg-cyan-glow rounded-full animate-ping opacity-30" />
          </div>
          <span className="font-heading text-[10px] font-bold text-light tracking-tag uppercase">
            RYTHAMO HOSPITALS &bull; ACCREDITED EST. 2026
          </span>
        </div>
      </div>

      {/* 2. Central Editorial Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-stretch gap-12 my-12">
        
        {/* Left Side: Bold Brand Statement & Magnetic CTA */}
        <div className="flex-grow flex flex-col justify-between items-start space-y-8 w-full md:w-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-black font-heading leading-[0.87] tracking-tighter text-light uppercase">
              PRECISION <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(23,42,40,0.3)" }}>HEALING</span>
            </h1>
            <p className="mt-6 text-xs text-cyan-glow font-bold max-w-sm leading-relaxed uppercase tracking-tag">
              Replacing open surgical risks with micrometric guide wires and absolute diagnostic clarity.
            </p>
          </div>

          <a 
            ref={ctaRef}
            href="#appointment"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-azure-glow bg-azure-glow hover:bg-[#F48C72] flex flex-col items-center justify-center group transition-all duration-500 cursor-pointer overflow-hidden z-20 shadow-md"
            style={{ transition: "transform 0.1s ease-out, background-color 0.4s ease, border-color 0.4s ease" }}
          >
            <ArrowUpRight className="w-6 h-6 text-obsidian" />
            <span className="text-[9px] font-bold text-obsidian uppercase tracking-tag mt-1">Book</span>
          </a>
        </div>

        {/* Right Side: Bento outcomes deck */}
        <div className="w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col gap-4 justify-center z-20">
          {[
            { id: "001", title: "ADMISSION STATUS", val: "Open Referral", type: "progress" },
            { id: "002", title: "OUTCOMES AUDIT", val: "95%+ Same-Day", type: "data" },
            { id: "003", title: "CREDENTIAL STANDARDS", val: "ABR Board Diplomates", type: "text" }
          ].map((item) => (
            <div 
              key={item.id} 
              className="border border-border-glass bg-surface-obsidian rounded-lg p-6 hover:border-cyan-glow transition-all duration-300 shadow-[0_2px_8px_rgba(23,42,40,0.02)]"
            >
              <span className="font-heading text-[9px] text-muted/40 uppercase tracking-widest block mb-2 font-bold">
                {item.id} // {item.title}
              </span>
              
              {item.type === "progress" ? (
                <div className="flex justify-between items-end mt-2">
                  <h4 className="text-xl sm:text-2xl font-bold font-heading text-light tracking-hero">{item.val}</h4>
                  <div className="h-[2px] w-20 bg-border-glass rounded-full overflow-hidden mb-2">
                     <div className="h-full bg-cyan-glow w-[85%] animate-pulse" />
                  </div>
                </div>
              ) : item.type === "data" ? (
                <div className="mt-3 flex flex-col gap-2 font-heading text-[10px] text-muted font-semibold">
                  <div className="flex justify-between">
                    <span>Patient Recovery Rate</span>
                    <span className="text-cyan-glow font-bold">95%+ discharged &lt; 4h</span>
                  </div>
                  <div className="h-[1px] w-full bg-border-glass" />
                  <div className="flex justify-between">
                    <span>Incisions Made</span>
                    <span className="text-azure-glow font-bold">0 Suture Incisions</span>
                  </div>
                </div>
              ) : (
                <h3 className="text-xs font-semibold text-muted mt-2 leading-relaxed tracking-body">
                  All physicians hold <span className="italic text-light">Diagnostic & Interventional Radiology</span> fellowship credentials.
                </h3>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* 3. Global Copyright Footer Bar */}
      <div className="relative z-10 border-t border-border-glass pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-muted/40 space-y-4 sm:space-y-0 font-semibold">
        <div>
          &copy; 2026 Rythamo Hospitals &amp; Research Systems. All rights reserved. American College of Radiology Accredited Facility.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-cyan-glow transition-colors">Privacy Practices</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-cyan-glow transition-colors">HIPAA compliance</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-cyan-glow transition-colors">Patient Bill of Rights</a>
        </div>
      </div>

    </section>
  );
};
