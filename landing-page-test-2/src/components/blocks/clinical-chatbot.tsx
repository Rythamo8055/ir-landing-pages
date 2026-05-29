'use client';

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Calendar, HelpCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ClinicalChatbotProps {
  onOpenBooking: () => void;
}

const presetQuestions = [
  "How is UAE different from a Hysterectomy?",
  "What credentials does Dr. Bharath K.S. hold?",
  "Are your procedures completely stitch-free?",
  "What is Chemoembolization (TACE)?"
];

export default function ClinicalChatbot({ onOpenBooking }: ClinicalChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Rythamo Hospitals. I am Dr. Bharath's Virtual Clinical Educator. I am here to help answer your questions about our advanced outpatient Interventional Radiology (IR) procedures, such as Uterine Artery Embolization (UAE), Angioplasty, TACE, or varicose vein treatments.\n\nHow can I reassure or guide you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingCta, setShowBookingCta] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Show a beautiful luxury welcome bubble 3.5s after landing to capture user attention
    const bubbleTimer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcomeBubble(true);
      }
    }, 3500);

    return () => clearTimeout(bubbleTimer);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();
      
      if (data.output) {
        setMessages(prev => [...prev, { role: "assistant", content: data.output }]);
        
        // Show booking call-to-action button if patient shows procedural interest
        const lowerText = text.toLowerCase();
        if (
          lowerText.includes("book") ||
          lowerText.includes("consult") ||
          lowerText.includes("appointment") ||
          lowerText.includes("cost") ||
          lowerText.includes("how much") ||
          lowerText.includes("where") ||
          messages.length >= 3
        ) {
          setShowBookingCta(true);
        }
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            role: "assistant", 
            content: "I apologize, I experienced a connectivity issue. Please ensure your internet connection is active or try resubmitting your question." 
          }
        ]);
      }
    } catch (error) {
      console.error("Error communicating with clinical assistant:", error);
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I apologize, I was unable to reach the clinical knowledge base. Please try again shortly." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* 0. PREMIUM FLOATING WELCOME BALLOON BUBBLE */}
      {!isOpen && showWelcomeBubble && (
        <div
          style={{
            position: "fixed",
            bottom: "92px",
            right: "24px",
            zIndex: 90,
            width: "280px",
            backgroundColor: "rgba(252, 251, 250, 0.94)", // glassmorphic lifted-cream
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "16px",
            padding: "14px 18px",
            boxShadow: "0 10px 32px rgba(20, 20, 19, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            animation: "loaderTextFade 0.5s ease forwards",
            cursor: "pointer"
          }}
          onClick={() => {
            setIsOpen(true);
            setShowWelcomeBubble(false);
          }}
        >
          {/* Close button for bubble */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowWelcomeBubble(false);
            }}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "none",
              border: "none",
              color: "var(--slate-gray)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px",
              borderRadius: "50%"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(20,20,19,0.06)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <X size={12} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--light-signal-orange)"
              }}
            />
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--light-signal-orange)" }}>
              Dr. Bharath's AI Assistant
            </span>
          </div>
          
          <p style={{ fontSize: "0.85rem", fontWeight: "500", color: "var(--ink-black)", margin: 0, lineHeight: "1.4" }}>
            Have a question about outpatient Pinhole Procedures? Ask me! 🤖
          </p>

          {/* Small Speech Balloon Arrow pointing down to the bubble */}
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              right: "24px",
              width: "0",
              height: "0",
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid rgba(252, 251, 250, 0.94)",
              zIndex: 90
            }}
          />
        </div>
      )}

      {/* 1. FLOATING CHAT BUBBLE TRIGGER */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowWelcomeBubble(false);
        }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 90,
          backgroundColor: "var(--ink-black)",
          color: "var(--white)",
          border: "none",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
          transition: "transform 0.2s ease, background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.backgroundColor = "var(--light-signal-orange)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "var(--ink-black)";
        }}
        aria-label="Open AI Clinical Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* 2. CHAT PANEL WINDOW */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "92px",
            right: "24px",
            width: "min(400px, 90vw)",
            height: "min(550px, 80vh)",
            backgroundColor: "rgba(252, 251, 250, 0.85)", // lifted-cream with glassmorphism
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 20px 48px rgba(20, 20, 19, 0.12)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 99,
          }}
        >
          {/* Header Panel */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1.5px solid var(--divider-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(20, 20, 19, 0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--light-signal-orange)",
                  animation: "pulseGlow 2s infinite"
                }}
              />
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: 0, color: "var(--ink-black)" }}>
                  Dr. Bharath's AI Assistant
                </h3>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)", fontWeight: "500" }}>
                  Clinical IR Educator
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--slate-gray)",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(20,20,19,0.06)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <X size={18} />
            </button>
          </div>

          {/* Conversation Thread */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              scrollBehavior: "smooth"
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {/* Bubble Container */}
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: m.role === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                    backgroundColor: m.role === "user" ? "var(--ink-black)" : "var(--white)",
                    color: m.role === "user" ? "var(--white)" : "var(--ink-black)",
                    fontSize: "0.9375rem",
                    lineHeight: "1.5",
                    boxShadow: m.role === "user" ? "none" : "0 4px 12px rgba(0,0,0,0.03)",
                    border: m.role === "user" ? "none" : "1px solid rgba(20,20,19,0.04)",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Premium Catheter SVG Loading Path Animation */}
            {isLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", alignSelf: "flex-start" }}>
                <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 32 C20 16, 44 48, 52 32" stroke="rgba(20,20,19,0.06)" strokeWidth="4" strokeLinecap="round" />
                  <path className="loading-path-draw" d="M12 32 C20 16, 44 48, 52 32" stroke="var(--light-signal-orange)" strokeWidth="4" strokeLinecap="round" strokeDasharray="120" strokeDashoffset="120" />
                  <circle cx="32" cy="32" r="5" stroke="var(--signal-orange)" strokeWidth="1.5" className="loading-pulse-beacon" />
                  <circle cx="32" cy="32" r="2.5" fill="var(--signal-orange)" />
                </svg>
                <span style={{ fontSize: "0.8rem", color: "var(--slate-gray)", fontWeight: "500", letterSpacing: "0.02em" }}>
                  Navigating IR database...
                </span>
              </div>
            )}

            {/* Suggestion Chips (Only show at the very beginning) */}
            {messages.length === 1 && !isLoading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: "4px" }}>
                  <HelpCircle size={12} /> Suggested Questions:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {presetQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetClick(q)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        backgroundColor: "var(--white)",
                        border: "1px solid var(--divider-color)",
                        fontSize: "0.8rem",
                        color: "var(--ink-black)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--light-signal-orange)";
                        e.currentTarget.style.backgroundColor = "rgba(243, 115, 56, 0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--divider-color)";
                        e.currentTarget.style.backgroundColor = "var(--white)";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Smart Booking CTA */}
            {showBookingCta && !isLoading && (
              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(243, 115, 56, 0.05)",
                  border: "1px dashed var(--light-signal-orange)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "10px",
                  marginTop: "8px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--signal-orange)" }}>
                  <Sparkles size={16} />
                  <span style={{ fontSize: "0.85rem", fontWeight: "700" }}>Intake Office Available</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--slate-gray)", margin: 0 }}>
                  Schedule a private clinical conversation directly with Dr. Bharath's outpatient scheduling team.
                </p>
                <button
                  onClick={() => {
                    onOpenBooking();
                    setIsOpen(false);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    backgroundColor: "var(--ink-black)",
                    color: "var(--white)",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--light-signal-orange)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--ink-black)"}
                >
                  <Calendar size={14} /> Request Intake Consultation
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            style={{
              padding: "12px 16px",
              borderTop: "1.5px solid var(--divider-color)",
              display: "flex",
              gap: "8px",
              backgroundColor: "rgba(20, 20, 19, 0.01)",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about procedures..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "999px",
                border: "1.5px solid var(--divider-color)",
                backgroundColor: "var(--white)",
                fontSize: "0.9rem",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--light-signal-orange)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--divider-color)"}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: inputValue.trim() && !isLoading ? "var(--ink-black)" : "rgba(20,20,19,0.06)",
                color: inputValue.trim() && !isLoading ? "var(--white)" : "var(--slate-gray)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: inputValue.trim() && !isLoading ? "pointer" : "default",
                transition: "background-color 0.2s ease, transform 0.1s ease",
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim() && !isLoading) {
                  e.currentTarget.style.backgroundColor = "var(--light-signal-orange)";
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim() && !isLoading) {
                  e.currentTarget.style.backgroundColor = "var(--ink-black)";
                }
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Global CSS for our glowing and drawing micro-animations */}
      <style jsx global>{`
        @keyframes pathDraw {
          0% {
            stroke-dashoffset: 120;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -120;
          }
        }
        .loading-path-draw {
          animation: pathDraw 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes pulseBeacon {
          0%, 100% {
            transform: scale(0.9);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.6);
            opacity: 1;
          }
        }
        .loading-pulse-beacon {
          transform-origin: 32px 32px;
          animation: pulseBeacon 1.2s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.25);
            box-shadow: 0 0 8px var(--light-signal-orange);
          }
        }
      `}</style>
    </>
  );
}
