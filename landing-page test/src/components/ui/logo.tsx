"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  animate?: boolean;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  animate = false,
  size = 40 
}) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.8, 
        ease: "easeInOut" 
      } 
    }
  } as const;

  const wireVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2.2, 
        ease: "easeInOut",
        delay: 0.3
      } 
    }
  } as const;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Monogram R Catheter Loop - Outer catheter tube */}
        {animate ? (
          <motion.path
            d="M 65 155 V 45 C 65 45, 135 30, 135 90 C 135 120, 105 125, 65 120 C 80 120, 110 125, 135 155"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        ) : (
          <path
            d="M 65 155 V 45 C 65 45, 135 30, 135 90 C 135 120, 105 125, 65 120 C 80 120, 110 125, 135 155"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Catheter Guide wire tip (delicate core line inside) */}
        {animate ? (
          <motion.path
            d="M 65 150 V 50 C 65 50, 130 37, 130 90 C 130 118, 100 123, 65 120 C 78 120, 105 124, 128 150"
            stroke="#E76F51"
            strokeWidth="2.5"
            strokeLinecap="round"
            variants={wireVariants}
            initial="hidden"
            animate="visible"
          />
        ) : (
          <path
            d="M 65 150 V 50 C 65 50, 130 37, 130 90 C 130 118, 100 123, 65 120 C 78 120, 105 124, 128 150"
            stroke="#E76F51"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Outer circular boundary representing fluoroscopic scope scope scope */}
        {animate ? (
          <motion.circle
            cx="100"
            cy="100"
            r="85"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 6"
            opacity="0.3"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 0.3 }}
            transition={{ 
              rotate: { duration: 10, ease: "linear", repeat: Infinity },
              opacity: { duration: 1, delay: 0.5 }
            }}
          />
        ) : (
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 6"
            opacity="0.3"
          />
        )}
      </svg>
    </div>
  );
};
