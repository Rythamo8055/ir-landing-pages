"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ShieldCheck,
  Heart,
  Activity,
  Award,
  ChevronRight,
  ExternalLink,
  BookOpen
} from "lucide-react";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import ClinicalChatbot from "@/components/blocks/clinical-chatbot";

export default function LandingPage() {
  // Mount Check for Hydration Protection
  const [isMounted, setIsMounted] = useState(false);

  // Website Loading Screen State
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    procedure: "uterine-fibroid",
    date: "",
    message: ""
  });

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Nav Scroll Indicator
  const [activeSection, setActiveSection] = useState("hero");

  // Expandable Clinical Report State for Dr. Bharath KS
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fadeTimer = setTimeout(() => {
      setFadeLoader(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2300);

    const handleScroll = () => {
      const sections = ["hero", "advantage", "specialist", "procedures", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate premium scheduling dispatch
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      procedure: "uterine-fibroid",
      date: "",
      message: ""
    });
    setIsSubmitted(false);
    setIsModalOpen(false);
  };

  const openBookingWithProcedure = (procKey: string) => {
    setFormData(prev => ({ ...prev, procedure: procKey }));
    setIsModalOpen(true);
  };

  return (
    <div className="page-wrapper">
      
      {/* Premium Luxury Loading Screen with Animated Path Logo */}
      {isMounted && isPageLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--white)", // Solid white background as requested
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            opacity: fadeLoader ? 0 : 1,
            transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: fadeLoader ? "none" : "auto",
          }}
        >
          {/* Glowing Animated Rythamo Logo */}
          <div style={{ transform: "scale(1.8)", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <svg width="40" height="28" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
              {/* Concentric orbits rotating */}
              <circle cx="11" cy="11" r="9" stroke="rgba(243, 115, 56, 0.25)" strokeWidth="1" strokeDasharray="1.5 2" className="loader-rotate" style={{ transformOrigin: "11px 11px" }} />
              <circle cx="11" cy="11" r="6" stroke="rgba(20, 20, 19, 0.08)" strokeWidth="1" />
              
              {/* Catheter path drawing */}
              <path className="loader-path-draw" d="M4 11 C9 5, 17 17, 22 11" stroke="url(#loader-logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="60" />
              
              {/* Precision beacon pulsing */}
              <circle cx="22" cy="11" r="9" stroke="rgba(20, 20, 19, 0.12)" strokeWidth="1" />
              <circle cx="22" cy="11" r="3.5" fill="var(--ink-black)" />
              <circle cx="22" cy="11" r="1.5" fill="var(--light-signal-orange)" className="loader-pulse-dot" style={{ transformOrigin: "22px 11px" }} />
              
              <defs>
                <linearGradient id="loader-logo-grad" x1="4" y1="11" x2="22" y2="11" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--signal-orange)" />
                  <stop offset="100%" stopColor="var(--light-signal-orange)" />
                </linearGradient>
              </defs>
            </svg>
            
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "var(--ink-black)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: "8px",
                opacity: 0,
                animation: "loaderTextFade 0.6s ease forwards 0.4s",
              }}
            >
              RYTHAMO
            </span>
          </div>

          {/* Global Loader Keyframe Styles */}
          <style jsx>{`
            @keyframes loaderRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes loaderPathDraw {
              to { stroke-dashoffset: 0; }
            }
            @keyframes loaderPulseDot {
              0%, 100% { transform: scale(0.85); opacity: 0.5; }
              50% { transform: scale(1.4); opacity: 1; }
            }
            @keyframes loaderTextFade {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
            :global(.loader-rotate) {
              animation: loaderRotate 8s linear infinite;
            }
            :global(.loader-path-draw) {
              animation: loaderPathDraw 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.1s;
            }
            :global(.loader-pulse-dot) {
              animation: loaderPulseDot 1.2s ease-in-out infinite;
            }
          `}</style>
        </div>
      )}
      
      {/* ==========================================================================
         1. FLOATING NAVIGATION BAR (Navbar)
         ========================================================================== */}
      <header className="nav-floating-container">
        <nav className="nav-floating-pill">
          {/* Logo with delicate vascular pathways and precision guiding beacon */}
          <a href="#hero" className="nav-logo-group" aria-label="Rythamo Hospitals Home" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ overflow: "visible" }}>
              {/* Concentric guidance orbits */}
              <circle cx="11" cy="11" r="9" stroke="rgba(243, 115, 56, 0.15)" strokeWidth="1" strokeDasharray="1.5 2" />
              <circle cx="11" cy="11" r="6" stroke="rgba(20, 20, 19, 0.05)" strokeWidth="1" />
              {/* Vascular micro-catheter path */}
              <path d="M4 11 C9 5, 17 17, 22 11" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Overlapping precision beacon node */}
              <circle cx="22" cy="11" r="9" stroke="rgba(20, 20, 19, 0.08)" strokeWidth="1" />
              <circle cx="22" cy="11" r="3.5" fill="var(--ink-black)" />
              <circle cx="22" cy="11" r="1.5" fill="var(--light-signal-orange)" />
              {/* Gradients */}
              <defs>
                <linearGradient id="logo-grad" x1="4" y1="11" x2="22" y2="11" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--signal-orange)" />
                  <stop offset="100%" stopColor="var(--light-signal-orange)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="nav-brand-name">RYTHAMO</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            <li>
              <a 
                href="#advantage" 
                className={activeSection === "advantage" ? "active" : ""}
              >
                Advantage
              </a>
            </li>
            <li>
              <a 
                href="#specialist" 
                className={activeSection === "specialist" ? "active" : ""}
              >
                Our Specialist
              </a>
            </li>
            <li>
              <a 
                href="#procedures" 
                className={activeSection === "procedures" ? "active" : ""}
              >
                Procedures
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === "contact" ? "active" : ""}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Action CTAs */}
          <div className="nav-actions">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary nav-cta"
            >
              Book Consultation
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="mobile-nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-list">
          <li>
            <a 
              href="#advantage" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Advantage
            </a>
          </li>
          <li>
            <a 
              href="#specialist" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Specialist
            </a>
          </li>
          <li>
            <a 
              href="#procedures" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Procedures
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsModalOpen(true);
            }}
            className="btn-primary"
            style={{ width: "100%", padding: "16px" }}
          >
            Book Consultation
          </button>
          <a 
            href="tel:855-798-4266" 
            className="btn-secondary" 
            style={{ width: "100%", padding: "16px", textDecoration: "none", textAlign: "center" }}
          >
            Call Scheduling Office
          </a>
        </div>
      </div>


      {/* ==========================================================================
         2. HERO SECTION (Scroll Expansion Hero)
         ========================================================================== */}
      <section id="hero" style={{ backgroundColor: "var(--canvas-cream)", position: "relative" }}>
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="/hero-clinical.png"
          bgImageSrc="/operating-theater.png"
          title="Precision Guidance. Pinhole Healing."
          date="• RYTHAMO HOSPITALS"
          scrollToExpand="Scroll to Enter the Clinic"
          textBlend={true}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", color: "var(--ink-black)", marginTop: "-40px" }}>
            <p className="typography-lead" style={{ fontSize: "1.25rem", color: "var(--slate-gray)", marginBottom: "32px", lineHeight: "1.6", textAlign: "center", maxWidth: "800px" }}>
              The world's first medical institution dedicated solely to advanced Interventional Radiology and Vascular Medicine. We operate inside blood vessels using micro-catheters, bypassing traditional incisions, general anesthesia, and hospital stays.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                Book Consultation <ArrowRight size={18} />
              </button>
              <a href="#advantage" className="btn-secondary">
                Explore the Advantage
              </a>
            </div>

            {/* Statistics Bar (Clinical Benchmarks) */}
            <div className="stats-banner" style={{ width: "100%", maxWidth: "1100px" }}>
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Pinhole Incision Entry (No Stitches, No Scarring)</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">95%+</span>
                <span className="stat-label">Same-Day Outpatient Discharge & Return Home</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">&lt;0.5%</span>
                <span className="stat-label">Minor Complication Rate (Unmatched Surgical Safety)</span>
              </div>
            </div>
          </div>
        </ScrollExpandMedia>
      </section>


      {/* ==========================================================================
         3. ABOUT SECTION (The Advantage)
         ========================================================================== */}
      <section id="advantage" className="section-spacing" style={{ backgroundColor: "var(--lifted-cream)" }}>
        <div className="container">
          <div className="editorial-grid">
            
            {/* Left Column: Reassuring Clinical Philosophy */}
            <div>
              <div className="eyebrow" style={{ marginBottom: "16px" }}>
                The Advantage
              </div>
              <h2 style={{ marginBottom: "24px" }}>
                Why Interventional Radiology is the Future of Care
              </h2>
              <p style={{ color: "var(--slate-gray)", marginBottom: "20px" }}>
                Traditional open surgery requires large skin cuts, muscle retraction, and systemic anesthesia—leading to long hospital stays, scarring, and extended painful recovery.
              </p>
              <p style={{ color: "var(--slate-gray)", marginBottom: "32px" }}>
                At Rythamo Hospitals, we operate completely inside blood vessels and organs using micro-catheters under advanced 3D fluoroscopy guidance. This hyper-precision means your surrounding healthy tissue is untouched. We enter through a tiny pinhole smaller than a match head.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ 
                    backgroundColor: "var(--white)", 
                    padding: "12px", 
                    borderRadius: "50%", 
                    color: "var(--light-signal-orange)",
                    boxShadow: "rgba(0,0,0,0.04) 0px 4px 12px"
                  }}>
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>Deeply Reassuring Environment</h4>
                    <p style={{ fontSize: "0.9375rem", color: "var(--slate-gray)" }}>
                      Every staff member specializes solely in IR, assuring customized clinical prep and stress-free pathways.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ 
                    backgroundColor: "var(--white)", 
                    padding: "12px", 
                    borderRadius: "50%", 
                    color: "var(--light-signal-orange)",
                    boxShadow: "rgba(0,0,0,0.04) 0px 4px 12px"
                  }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>Zero General Anesthesia Risk</h4>
                    <p style={{ fontSize: "0.9375rem", color: "var(--slate-gray)" }}>
                      We utilize targeted local anesthesia and mild conscious sedation. You remain awake, stable, and completely pain-free.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Comparative Matrix Card */}
            <div className="compare-card">
              <h3 className="compare-title">Surgical Paradigm Shift</h3>
              
              <div className="compare-row">
                <div className="compare-item">
                  <span className="compare-item-label">Conventional Surgery</span>
                  <span className="compare-item-val" style={{ color: "var(--slate-gray)" }}>Incisions & Sutures</span>
                </div>
                <div className="compare-item ir">
                  <span className="compare-item-label">Rythamo IR</span>
                  <span className="compare-item-val">Pinhole (No Stitches)</span>
                </div>
              </div>

              <div className="compare-row">
                <div className="compare-item">
                  <span className="compare-item-label">General Anesthesia</span>
                  <span className="compare-item-val" style={{ color: "var(--slate-gray)" }}>High Risk (Intubation)</span>
                </div>
                <div className="compare-item ir">
                  <span className="compare-item-label">Conscious Sedation</span>
                  <span className="compare-item-val">Local (Safe & Comfortable)</span>
                </div>
              </div>

              <div className="compare-row">
                <div className="compare-item">
                  <span className="compare-item-label">Typical Recovery Stay</span>
                  <span className="compare-item-val" style={{ color: "var(--slate-gray)" }}>3–7 Days Ward Stay</span>
                </div>
                <div className="compare-item ir">
                  <span className="compare-item-label">Outpatient Stay</span>
                  <span className="compare-item-val">Same Day (Home in Hours)</span>
                </div>
              </div>

              <div className="compare-row">
                <div className="compare-item">
                  <span className="compare-item-label">Post-Operative Pain</span>
                  <span className="compare-item-val" style={{ color: "var(--slate-gray)" }}>Moderate to Severe</span>
                </div>
                <div className="compare-item ir">
                  <span className="compare-item-label">Post-op Discomfort</span>
                  <span className="compare-item-val">92% Pain Level Reduction</span>
                </div>
              </div>

              <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ width: "100%" }}>
                  Compare Your Procedure Options
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ==========================================================================
         4. ABOUT THE DOCTOR SECTION
         ========================================================================== */}
      <section id="specialist" className="section-spacing" style={{ overflow: "hidden" }}>
        {/* Ghost Watermark Background Label behind components */}
        <div className="ghost-watermark">TRUST</div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="editorial-grid-reverse">
            
            {/* Left Column: Perfect Circle Doctor Portrait & Satellite CTA */}
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div className="circular-portrait-container" style={{ width: "min(340px, 80vw)", height: "min(340px, 80vw)", maxWidth: "100%", marginBottom: "32px" }}>
                <div className="circular-portrait-inner" style={{ border: "4px solid var(--white)", boxShadow: "rgba(0,0,0,0.1) 0px 32px 64px" }}>
                  <img 
                    src="/dr-bharath.png" 
                    alt="Clinical portrait of Dr. Bharath K.S., Chief Interventional Radiologist" 
                    className="circular-portrait-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>

                {/* Satellite Circular CTA Button */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="satellite-cta" 
                  aria-label="Book a direct consultation with Dr. Bharath K.S."
                >
                  <ArrowRight />
                </button>
              </div>
            </div>

            {/* Right Column: Expert Bio and Credentials */}
            <div>
              <div className="eyebrow" style={{ marginBottom: "16px" }}>
                Our Chief Specialist
              </div>
              <h2 style={{ marginBottom: "16px" }}>
                Dr. Bharath K.S.
              </h2>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(243, 115, 56, 0.08)", padding: "6px 16px", borderRadius: "999px", marginBottom: "24px" }}>
                <Award size={16} style={{ color: "var(--light-signal-orange)" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--light-signal-orange)" }}>
                  MBBS, DNB, FRCR (UK) &bull; FELLOWSHIP IN INTERVENTIONAL RADIOLOGY
                </span>
              </div>
              
              <p style={{ color: "var(--slate-gray)", marginBottom: "16px" }}>
                Dr. Bharath K.S. is an eminent, board-certified Interventional Radiologist with nearly 18 years of elite clinical expertise in performing advanced vascular, endovascular, and oncological image-guided procedures.
              </p>
              
              <p style={{ color: "var(--slate-gray)", marginBottom: "24px" }}>
                "We don't view surgery as the default answer. We navigate inside blood vessels and organs using micro-catheters under millimeter-precise 3D fluoroscopy guidance. By avoiding the trauma of traditional open cuts, we give patients back their active lives with almost zero recovery disruption."
              </p>

              {/* Commitments Checklist */}
              <ul className="doctor-checklist" style={{ marginBottom: "32px" }}>
                <li className="doctor-checklist-item">
                  <CheckCircle2 size={18} /> UK FRCR (London) Board Certified
                </li>
                <li className="doctor-checklist-item">
                  <CheckCircle2 size={18} /> Fellowship in Advanced Interventional Radiology
                </li>
                <li className="doctor-checklist-item">
                  <CheckCircle2 size={18} /> 18+ Years Active Clinical Experience
                </li>
                <li className="doctor-checklist-item">
                  <CheckCircle2 size={18} /> Specialist in Same-Day Outpatient Outcomes
                </li>
              </ul>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button 
                  onClick={() => setIsReportOpen(!isReportOpen)} 
                  className="btn-secondary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <BookOpen size={18} /> {isReportOpen ? "Hide Clinical Report" : "View Clinical Specialty Report"}
                </button>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                  Request Intake Meeting
                </button>
              </div>
            </div>

          </div>

          {/* Expandable Detailed Clinical Specialty Report Card */}
          <div 
            className="doctor-report-container"
            style={{ 
              marginTop: "48px", 
              maxHeight: isReportOpen ? "1500px" : "0", 
              opacity: isReportOpen ? "1" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
              pointerEvents: isReportOpen ? "auto" : "none"
            }}
          >
            <div className="compare-card" style={{ padding: "40px" }}>
              <span className="eyebrow" style={{ marginBottom: "16px" }}>Clinical Dossier Report &bull; Verified Credentials</span>
              <h3 style={{ marginBottom: "8px", fontSize: "1.75rem" }}>Dr. Bharath K.S. Detailed Profile</h3>
              <p style={{ color: "var(--slate-gray)", marginBottom: "32px" }}>
                Comprehensive operational breakdown of academic certifications, international accreditations, and therapeutic categories.
              </p>

              {/* Specialty Category Columns Grid */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
                gap: "32px",
                borderTop: "1.5px solid var(--divider-color)",
                paddingTop: "32px"
              }}>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--light-signal-orange)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "16px" }}>
                    Oncological & Biliary
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9375rem" }}>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>TACE Therapy:</strong> Transarterial Chemoembolization for targeted cancer therapies.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Tumor Ablations:</strong> Advanced Microwave & Radiofrequency tissue ablation.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>PTBD & Stents:</strong> Biliary drainage and stenting for complete hepatic recovery.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>TIPS System:</strong> Transjugular Intrahepatic Portosystemic Shunts.</span></li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--light-signal-orange)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "16px" }}>
                    Obstetrics & Gynae
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9375rem" }}>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Uterine Fibroids (UAE):</strong> Minimally invasive Uterine Artery Embolization as hysterectomy alternative.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Postpartum Hemorrhage:</strong> Immediate, life-saving embolization treatments.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Adherent Placenta:</strong> Highly technical preventative balloon placements.</span></li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--light-signal-orange)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "16px" }}>
                    Vascular & Endovascular
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9375rem" }}>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Varicose Vein Relief:</strong> Dual RFA, Laser, and advanced Venaseal glue closures.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>EVAR Aneurysm Repair:</strong> Endovascular exclusion of aortic anomalies.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Bleeding Control:</strong> High-speed embolizations for pulmonary or gastrointestinal hemorrhage.</span></li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--light-signal-orange)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "16px" }}>
                    Urology & Structural
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9375rem" }}>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Prostatic Embolization:</strong> Prostate Artery Embolization (PAE) for BPH relief.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Varicocele Treatment:</strong> Highly effective non-surgical coil or foam embolizations.</span></li>
                    <li style={{ display: "flex", gap: "8px", color: "var(--slate-gray)" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "4px", color: "var(--light-signal-orange)" }} /> <span><strong>Percutaneous Access:</strong> High-precision nephrostomy and enteric tube systems.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ==========================================================================
         5. PROCEDURES SECTION (Constellation Layout)
         ========================================================================== */}
      <section id="procedures" className="section-spacing" style={{ backgroundColor: "var(--lifted-cream)", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative" }}>
          
          {/* Section Header */}
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
            <div className="eyebrow" style={{ marginBottom: "16px" }}>
              Our Specialized Constellation
            </div>
            <h2>
              Advanced Pinhole Therapies
            </h2>
            <p style={{ color: "var(--slate-gray)", margin: "16px auto 0" }}>
              Our boutique clinics offer targeted endovascular pathways covering highly complex medical diagnoses, executed completely without hospitalizations.
            </p>
          </div>

          {/* SVG Orbital Connective Arcs (Desktop Only) */}
          <svg className="desktop-only-arcs" style={{
            position: "absolute",
            top: "160px",
            left: "0",
            width: "100%",
            height: "400px",
            pointerEvents: "none",
            zIndex: 1
          }}>
            {/* Draw a beautiful connecting orange arc between our staggered circles */}
            <path 
              d="M 180,200 Q 560,480 940,160" 
              fill="none" 
              stroke="var(--light-signal-orange)" 
              strokeWidth="1.5" 
              strokeDasharray="4 6" 
              opacity="0.85" 
            />
          </svg>

          {/* Constellation Staggered Cards */}
          <div className="constellation-wrapper">
            
            {/* Card 1: UAE */}
            <div className="circular-card">
              <div className="circular-portrait-container">
                <div className="circular-portrait-inner">
                  <svg 
                    className="circular-portrait-img" 
                    viewBox="0 0 200 200" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Warm clinical representation of uterine artery therapy"
                  >
                    <rect width="200" height="200" fill="#FBF8F6" />
                    {/* Stylized vascular pathway illustration */}
                    <circle cx="100" cy="100" r="60" stroke="rgba(243, 115, 56, 0.2)" strokeWidth="1" />
                    <path d="M60 140 C 90 90, 110 90, 140 140" stroke="var(--light-signal-orange)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="100" cy="95" r="8" fill="var(--ink-black)" />
                    <circle cx="70" cy="120" r="4" fill="var(--light-signal-orange)" />
                    <circle cx="130" cy="120" r="4" fill="var(--light-signal-orange)" />
                  </svg>
                </div>
                
                {/* Satellite CTA */}
                <button 
                  onClick={() => openBookingWithProcedure("uterine-fibroid")}
                  className="satellite-cta"
                  aria-label="Learn about Uterine Artery Embolization"
                >
                  <ArrowRight />
                </button>
              </div>

              <div className="circular-card-content">
                <span className="eyebrow">Fibroid Cure</span>
                <h3>Uterine Embolization</h3>
                <p>
                  A non-surgical, uterus-sparing alternative to hysterectomy. We block fibroid blood supply through a tiny wrist pinhole, shrinking tumors rapidly.
                </p>
              </div>
            </div>

            {/* Card 2: Angioplasty */}
            <div className="circular-card">
              <div className="circular-portrait-container">
                <div className="circular-portrait-inner">
                  <svg 
                    className="circular-portrait-img" 
                    viewBox="0 0 200 200" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Vascular channel illustration"
                  >
                    <rect width="200" height="200" fill="#F4F2EE" />
                    {/* Stylized stent restoration pathway */}
                    <path d="M20 100 H 180" stroke="rgba(20, 20, 19, 0.15)" strokeWidth="12" strokeLinecap="round" />
                    <path d="M50 100 H 150" stroke="var(--light-signal-orange)" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="28" stroke="var(--ink-black)" strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>
                </div>
                
                {/* Satellite CTA */}
                <button 
                  onClick={() => openBookingWithProcedure("angioplasty-stenting")}
                  className="satellite-cta"
                  aria-label="Learn about Angioplasty and Stenting"
                >
                  <ArrowRight />
                </button>
              </div>

              <div className="circular-card-content">
                <span className="eyebrow">Vascular Flow</span>
                <h3>Angioplasty & Stenting</h3>
                <p>
                  Restoring healthy arterial blood circulation to legs, kidneys, and peripheral vessels by micro-ballooning and placing cobalt-alloy stents.
                </p>
              </div>
            </div>

            {/* Card 3: TACE */}
            <div className="circular-card">
              <div className="circular-portrait-container">
                <div className="circular-portrait-inner">
                  <svg 
                    className="circular-portrait-img" 
                    viewBox="0 0 200 200" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Targeted oncological therapy illustration"
                  >
                    <rect width="200" height="200" fill="#EAE8E4" />
                    {/* Targeted delivery nodes */}
                    <circle cx="100" cy="100" r="40" stroke="var(--ink-black)" strokeWidth="1" strokeDasharray="6 2" />
                    <path d="M100 20 V 180 M20 100 H 180" stroke="rgba(20,20,19,0.06)" strokeWidth="1" />
                    <circle cx="100" cy="100" r="16" fill="var(--light-signal-orange)" opacity="0.9" />
                    <circle cx="100" cy="100" r="6" fill="var(--ink-black)" />
                  </svg>
                </div>
                
                {/* Satellite CTA */}
                <button 
                  onClick={() => openBookingWithProcedure("chemoembolization")}
                  className="satellite-cta"
                  aria-label="Learn about Oncological Chemoembolization"
                >
                  <ArrowRight />
                </button>
              </div>

              <div className="circular-card-content">
                <span className="eyebrow">Oncology Target</span>
                <h3>Oncological TACE</h3>
                <p>
                  Delivering highly concentrated tumor-starving chemotherapy particles directly into oncology targets, avoiding systemic chemotherapy trauma.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CSS rules to handle the orbital lines and responsive displays */}
        <style jsx global>{`
          @media (max-width: 1024px) {
            .desktop-only-arcs {
              display: none !important;
            }
          }
        `}</style>
      </section>


      {/* ==========================================================================
         6. INTERACTIVE REASSURING INTAKE MODAL
         ========================================================================== */}
      {isMounted && (
        <div 
          className={`modal-backdrop ${isModalOpen ? "open" : ""}`}
          onClick={resetForm}
          aria-hidden={!isModalOpen}
          role="dialog"
        >
          <div 
            className="modal-stadium"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={resetForm}
              className="modal-close"
              aria-label="Close booking modal"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="modal-header">
                  <span className="eyebrow">Private Intake Schedule</span>
                  <h2>Request Clinical Consultation</h2>
                  <p style={{ color: "var(--slate-gray)" }}>
                    Connect directly with Dr. Bharath K.S.'s outpatient scheduling team. Bypassing traditional waiting rooms, our clinical assistants respond within two operational hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="modal-form" suppressHydrationWarning>
                  
                  <div className="form-field" suppressHydrationWarning>
                    <label htmlFor="name">Patient Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input" 
                      placeholder="e.g., Eleanor Vance"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="form-group-grid" suppressHydrationWarning>
                    <div className="form-field" suppressHydrationWarning>
                      <label htmlFor="phone">Direct Contact Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input" 
                        placeholder="e.g., (555) 019-2834"
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="form-field" suppressHydrationWarning>
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input" 
                        placeholder="e.g., eleanor@example.com"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="form-group-grid" suppressHydrationWarning>
                    <div className="form-field" suppressHydrationWarning>
                      <label htmlFor="procedure">Target Procedure Pathway</label>
                      <select 
                        id="procedure" 
                        name="procedure" 
                        value={formData.procedure}
                        onChange={handleInputChange}
                        className="form-input form-select"
                        suppressHydrationWarning
                      >
                        <option value="uterine-fibroid">Uterine Artery Embolization (UAE)</option>
                        <option value="angioplasty-stenting">Angioplasty & Vascular Stenting</option>
                        <option value="chemoembolization">Oncological Chemoembolization (TACE)</option>
                        <option value="general-ir">General IR Diagnostic Consultation</option>
                      </select>
                      {/* Dynamic pathway helper text to clarify clinical options */}
                      {formData.procedure === "uterine-fibroid" && (
                        <span style={{ fontSize: "0.75rem", color: "var(--light-signal-orange)", marginTop: "4px", display: "block" }}>
                          Uterus-sparing, outpatient treatment for fibroids with zero incisions.
                        </span>
                      )}
                      {formData.procedure === "angioplasty-stenting" && (
                        <span style={{ fontSize: "0.75rem", color: "var(--light-signal-orange)", marginTop: "4px", display: "block" }}>
                          Restoring healthy arterial blood circulation via specialized catheters.
                        </span>
                      )}
                      {formData.procedure === "chemoembolization" && (
                        <span style={{ fontSize: "0.75rem", color: "var(--light-signal-orange)", marginTop: "4px", display: "block" }}>
                          Delivering highly concentrated local tumor-starving therapies.
                        </span>
                      )}
                      {formData.procedure === "general-ir" && (
                        <span style={{ fontSize: "0.75rem", color: "var(--slate-gray)", marginTop: "4px", display: "block" }}>
                          Comprehensive, non-surgical consult for complex vascular concerns.
                        </span>
                      )}
                    </div>
                    <div className="form-field" suppressHydrationWarning>
                      <label htmlFor="date">Preferred Intake Date</label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date}
                        onChange={handleInputChange}
                        className="form-input" 
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="form-field" suppressHydrationWarning>
                    <label htmlFor="message">Clinical Context or Message (Optional)</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-input" 
                      placeholder="Provide any symptoms, diagnosed conditions, or vascular queries..."
                      style={{ resize: "none", borderRadius: "16px" }}
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="form-actions" suppressHydrationWarning>
                    <button 
                      type="button" 
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary"
                    >
                      Confirm Private Intake <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">
                  <CheckCircle2 size={36} />
                </div>
                <h2>Intake Confirmed</h2>
                <p style={{ color: "var(--slate-gray)", marginTop: "12px", marginBottom: "32px", maxWidth: "480px" }}>
                  Thank you, <strong>{formData.name}</strong>. Your private vascular file has been generated. A clinical administrative specialist will contact you directly at <strong>{formData.phone}</strong> within two business hours to coordinate scheduling.
                </p>

                <div style={{ 
                  backgroundColor: "var(--white)", 
                  padding: "24px", 
                  borderRadius: "24px", 
                  width: "100%", 
                  textAlign: "left",
                  boxShadow: "rgba(0,0,0,0.03) 0px 8px 24px",
                  border: "1px solid var(--divider-color)",
                  marginBottom: "32px"
                }}>
                  <h4 style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <ShieldCheck size={18} style={{ color: "var(--light-signal-orange)" }} /> Immediate Next Steps
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", color: "var(--slate-gray)" }}>
                    <li style={{ display: "flex", gap: "8px" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "3px" }} /> Bring prior diagnostic MRIs, CT scans, or ultrasound records.</li>
                    <li style={{ display: "flex", gap: "8px" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "3px" }} /> Ensure your referring doctor's details are prepared.</li>
                    <li style={{ display: "flex", gap: "8px" }}><ChevronRight size={14} style={{ flexShrink: 0, marginTop: "3px" }} /> Direct scheduling hotline operates at <strong>855-RYTHAMO</strong>.</li>
                  </ul>
                </div>

                <button 
                  onClick={resetForm}
                  className="btn-primary"
                  style={{ width: "100%" }}
                >
                  Return to Clinic Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* ==========================================================================
         7. FOOTER SECTION (Deep Ink Black #141413)
         ========================================================================== */}
      <footer id="contact" className="editorial-footer">
        <div className="container">
          
          <div className="footer-top">
            <h2>
              Surgery is no longer the answer. Welcome to pinhole healing.
            </h2>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary" 
                style={{ backgroundColor: "var(--white)", color: "var(--ink-black)", borderColor: "var(--white)" }}
              >
                Schedule Private Consultation <ArrowRight size={18} />
              </button>
              <a 
                href="tel:855-798-4266" 
                className="btn-secondary" 
                style={{ backgroundColor: "transparent", color: "var(--white)", borderColor: "rgba(255,255,255,0.4)" }}
              >
                <Phone size={18} /> 855-RYTHAMO
              </a>
            </div>
          </div>

          {/* Links Columns Grid */}
          <div className="footer-grid">
            
            {/* Column 1: Direct Support */}
            <div className="footer-column">
              <h4>Direct Support</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                    Patient Portal Registration <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                    Physician Referral Hotline
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                    Clinical Intake Protocols
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                    Insurance & Billing Matrix
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Clinical Departments */}
            <div className="footer-column">
              <h4>Specialized Pathways</h4>
              <ul className="footer-links">
                <li>
                  <a href="#procedures" onClick={() => openBookingWithProcedure("uterine-fibroid")}>
                    Uterine Fibroid Center
                  </a>
                </li>
                <li>
                  <a href="#procedures" onClick={() => openBookingWithProcedure("angioplasty-stenting")}>
                    Peripheral Vascular Stenting
                  </a>
                </li>
                <li>
                  <a href="#procedures" onClick={() => openBookingWithProcedure("chemoembolization")}>
                    Interventional Oncology Care
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                    Kyphoplasty Spine Recovery
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="footer-column">
              <h4>Clinical Office</h4>
              <ul className="footer-links">
                <li style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <MapPin size={16} style={{ flexShrink: 0, marginTop: "3px", opacity: 0.7 }} />
                  <span>Rythamo Outpatient Tower<br />Suite 450, Medical Center Blvd</span>
                </li>
                <li style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <Clock size={16} style={{ flexShrink: 0, marginTop: "3px", opacity: 0.7 }} />
                  <span>Mon - Fri: 8:00 AM - 5:00 PM<br />Emergency Vascular: 24/7</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Immediate Intake */}
            <div className="footer-column">
              <h4>Emergency Recovery</h4>
              <ul className="footer-links">
                <li>
                  <a href="tel:855-798-4200" style={{ fontWeight: "700", color: "var(--light-signal-orange)" }}>
                    +1-855-798-4200 (Physician)
                  </a>
                </li>
                <li>
                  <a href="mailto:referrals@rythamohospitals.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Mail size={16} /> referrals@rythamo.com
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom Row */}
          <div className="footer-bottom">
            <span className="copyright-text">
              &copy; 2026 Rythamo Hospitals Clinical Board. All rights reserved.
            </span>

            <ul className="footer-legal-links">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>IR Compliance Audit</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>EEAT Certification</a>
              </li>
            </ul>

            <button className="footer-country-badge">
              United States (English) &bull; USD
            </button>
          </div>

        </div>
      </footer>

      {/* Floating Clinical IR AI Chatbot Assistant */}
      <ClinicalChatbot onOpenBooking={() => setIsModalOpen(true)} />

    </div>
  );
}
