"use client";

import React from "react";
import { Logo } from "@/components/ui/logo";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-obsidian px-4 select-none">
      
      {/* Subtle diagnostic fluoroscopy grid in background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #2A9D8F 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* Animated Brand Logo */}
        <div className="flex justify-center">
          <Logo size={100} animate={true} className="text-cyan-glow" />
        </div>

        {/* 404 Header */}
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-black font-heading tracking-tighter text-light opacity-10">
            404
          </h1>
          <h2 className="text-2xl font-bold font-heading tracking-hero text-light -mt-4">
            Anatomical Path Lost
          </h2>
          <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed tracking-body">
            The clinical procedure page you are looking for does not exist or has been relocated to another vascular route.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-azure-glow hover:bg-[#F48C72] text-obsidian font-heading font-bold text-sm tracking-action transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </a>

          <a
            href="/#procedures"
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-border-glass bg-surface-obsidian hover:bg-surface-obsidian-hover text-light font-heading font-bold text-sm tracking-action transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4 text-cyan-glow" />
            <span>Explore IR catalog</span>
          </a>
        </div>

      </div>

    </div>
  );
}
