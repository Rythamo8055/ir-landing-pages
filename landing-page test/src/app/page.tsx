"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ScrollExpandMedia from "@/components/ScrollExpandMedia";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { SlideTabs } from "@/components/ui/slide-tabs";
import Testimonial1 from "@/components/ui/testimonial-1";
import { ExperienceFooter } from "@/components/ui/experience-footer";

// Types for Procedures
interface Procedure {
  id: string;
  name: string;
  category: string;
  overview: string;
  whoItTreats: string;
  benefits: string[];
  recoveryTime: string;
  sedation: string;
}

export default function Home() {
  // Loading & Hydration State
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    procedureInterest: "General IR Inquiry",
    urgency: "Routine",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Procedures Database
  const procedures: Procedure[] = [
    {
      id: "angioplasty",
      name: "Angioplasty & Stenting",
      category: "Vascular & Arterial",
      overview: "A catheter with a tiny balloon at its tip is threaded under real-time X-ray guidance into a blocked blood vessel. The balloon is inflated to reopen the vessel, and a small metal mesh cylinder (stent) is permanently placed to keep the channel open.",
      whoItTreats: "Patients with Peripheral Artery Disease (PAD), atherosclerosis, severe limb pain, or high risk of diabetic limb amputation.",
      benefits: ["Restores blood flow immediately", "Avoids bypass surgery", "Local anesthesia only", "Outpatient same-day return"],
      recoveryTime: "24-48 Hours",
      sedation: "Moderate Sedation"
    },
    {
      id: "uae",
      name: "Uterine Artery Embolization (UAE)",
      category: "Embolization Therapies",
      overview: "An advanced, uterus-sparing treatment for symptomatic uterine fibroids. Microscopic particles are injected through a microcatheter directly into the uterine arteries, blocking the blood supply to the fibroids, causing them to shrink and resolve.",
      whoItTreats: "Women experiencing severe pelvic pain, heavy menstrual bleeding, and pressure symptoms caused by benign uterine fibroids.",
      benefits: ["Uterus-sparing alternative to hysterectomy", "No surgical incisions", "Over 90% clinical success rate", "Fast return to work"],
      recoveryTime: "5-7 Days",
      sedation: "Moderate / Conscious Sedation"
    },
    {
      id: "thrombolysis",
      name: "Targeted Thrombolysis",
      category: "Vascular & Arterial",
      overview: "Direct catheter-guided injection of clot-dissolving medications (like tPA) directly into a major blood clot inside deep veins or arteries. This rapidly melts the occlusion and restores essential perfusion.",
      whoItTreats: "Patients suffering from acute Deep Vein Thrombosis (DVT), acute limb ischemia, or massive pulmonary embolisms.",
      benefits: ["Dissolves clots rapidly", "Protects limbs from tissue death", "Significantly reduces post-thrombotic syndrome risk", "Extremely precise delivery"],
      recoveryTime: "24-72 Hours",
      sedation: "Moderate Sedation"
    },
    {
      id: "tace",
      name: "Chemoembolization (TACE)",
      category: "Interventional Oncology",
      overview: "A targeted cancer therapy that delivers high-dose chemotherapeutic agents directly into the blood vessels feeding a tumor, combined with embolization particles that lock the chemotherapy in place and starve the tumor's blood supply.",
      whoItTreats: "Patients with primary liver cancer (hepatocellular carcinoma) or metastatic lesions unable to undergo standard surgical resection.",
      benefits: ["Delivers chemotherapy directly to tumor, saving healthy tissue", "Cuts off oxygen/nutrient supply to malignant cells", "Minimal systemic side effects", "Prolongs survival"],
      recoveryTime: "3-5 Days",
      sedation: "Moderate Sedation"
    },
    {
      id: "kyphoplasty",
      name: "Kyphoplasty & Vertebroplasty",
      category: "Spinal & Core Structural",
      overview: "Under real-time dual CT/Fluoroscopic guidance, a needle is navigated into a fractured, collapsed vertebra. A small balloon is inflated to restore the bone's original height, and medical-grade bone cement is injected to solidify and support the spine.",
      whoItTreats: "Patients suffering from severe back pain caused by osteoporotic or malignant vertebral compression fractures.",
      benefits: ["Instant, dramatic back pain relief", "Restores spinal column alignment", "Bypasses invasive spinal fusion hardware", "Performed in under 1 hour"],
      recoveryTime: "24 Hours",
      sedation: "Conscious Sedation / Local Anesthesia"
    },
    {
      id: "needle-biopsy",
      name: "Image-Guided Core Biopsy",
      category: "Spinal & Core Structural",
      overview: "Using high-resolution CT, MRI, or ultrasound guidance, a small biopsy needle is navigated with absolute accuracy to extract tissue cores from hard-to-reach organs. Provides definitive diagnoses without open surgical exploration.",
      whoItTreats: "Patients requiring diagnostic sampling of suspicious lung nodules, liver lesions, kidney masses, or breast abnormalities.",
      benefits: ["Requires no surgical incisions or stitches", "High clinical diagnostic yield", "Virtually no pain", "Completed in 30 minutes"],
      recoveryTime: "Same Day",
      sedation: "Local Anesthesia only"
    },
    {
      id: "g-tube",
      name: "Fluoroscopic Gastrostomy Placement",
      category: "Specialized Core Access",
      overview: "Direct insertion of a feeding tube (G-tube) through the abdominal wall into the stomach, guided continuously by real-time fluoroscopic imaging to guarantee perfect anatomical placement and patient safety.",
      whoItTreats: "Patients with swallowing disorders, ALS, head/neck cancers, or severe nutritional deficits unable to take nourishment orally.",
      benefits: ["Extremely safe compared to endoscopic/surgical routes", "Ensures precise anatomical location", "Minimal procedural discomfort", "Rapid outpatient setup"],
      recoveryTime: "24 Hours",
      sedation: "Moderate Sedation"
    },
    {
      id: "ivc-filter",
      name: "IVC Filter Insertion & Retrieval",
      category: "Specialized Core Access",
      overview: "A tiny basket-like filter is navigated into the Inferior Vena Cava (the body's main abdominal vein) to trap migrating blood clots originating in the legs before they reach the lungs and cause life-threatening pulmonary embolism.",
      whoItTreats: "Patients diagnosed with deep vein thrombosis (DVT) who are unable to take standard blood-thinning medications.",
      benefits: ["Prevents catastrophic pulmonary embolism", "Minimally invasive entry via jugular or femoral vein", "Easily retrievable once clot risk resolves", "No stitches required"],
      recoveryTime: "24 Hours",
      sedation: "Local Anesthesia"
    }
  ];

  // Active Category State
  const [activeCategory, setActiveCategory] = useState("all");
  // Active Detail Modal State
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);


  // Filter procedures based on active tab
  const filteredProcedures = activeCategory === "all" 
    ? procedures 
    : procedures.filter(p => p.category === activeCategory);

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to dispatch appointment request. Please try again.");
      }
      
      setFormSubmitted(true);
    } catch (error: any) {
      console.error("Intake dispatch error (test 1):", error);
      setFormError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#2A9D8F] z-[9999]" />;
  }

  return (
    <div className="relative min-h-screen bg-obsidian text-light font-sans tracking-body select-none">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#2A9D8F]"
          >
            <div className="flex flex-col items-center space-y-8">
              <Logo size={120} animate={true} className="text-[#172A28]" />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold font-heading tracking-hero text-[#172A28]">
                  RYTHAMO HOSPITALS
                </h2>
                <p className="text-xs font-heading tracking-tag text-[#FAF8F5] uppercase font-bold">
                  Pioneering Pinhole Therapeutics
                </p>
              </div>
              {/* Premium Loading Progress Bar */}
              <div className="w-48 h-[1px] bg-[#172A28]/20 relative overflow-hidden rounded-full mt-4">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  className="absolute top-0 bottom-0 w-24 bg-[#172A28]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* 1. Floating Header / Navigation (Pinned over Scroll-Expansion) */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
        <nav className="max-w-7xl mx-auto rounded-xl border border-border-glass bg-surface-obsidian px-6 py-2.5 flex items-center justify-between pointer-events-auto shadow-[0_2px_12px_rgba(23,42,40,0.04)]">
          <div className="flex items-center space-x-3">
            <Logo size={30} />
            <span className="text-xl font-bold font-heading tracking-hero text-light flex items-center">
              RYTHAMO
            </span>
            <div className="h-4 w-[1px] bg-border-glass hidden sm:block" />
            <span className="text-[10px] font-heading tracking-tag text-muted hidden sm:block uppercase">
              HOSPITALS &bull; 100% INTERVENTIONAL RADIOLOGY
            </span>
          </div>
          
          <div className="hidden lg:block">
            <SlideTabs />
          </div>

          <div>
            <a 
              href="#appointment" 
              className="px-5 py-2.5 rounded-lg bg-azure-glow text-obsidian font-heading font-bold text-xs hover:bg-[#F48C72] hover:-translate-y-0.5 active:translate-y-0 transition-all inline-block tracking-action select-none"
            >
              Book Consultation
            </a>
          </div>
        </nav>
      </header>

      {/* 2. High-End Scroll Expansion Hero Wrapper */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/theatre.png"
        bgImageSrc="/lobby.png"
        title="RYTHAMO HOSPITALS"
        date="EST. 2026"
        scrollToExpand="Scroll to expand clinical precision"
        textBlend={false}
      >
        {/* Intro Mission / Overview Section (Unfolds once expanded) */}
        <section className="relative pt-12 md:pt-20 pb-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Side: Medical Copy */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow tracking-tag uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-glow" />
              <span>Pioneering Pinhole Therapeutics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading leading-tight tracking-hero text-light">
              Precision Guidance. <br />
              <span className="text-azure-glow">
                Pinhole Healing.
              </span>
            </h1>

            <p className="text-lg text-muted max-w-2xl leading-relaxed tracking-body">
              Welcome to <strong className="text-light">Rythamo Hospitals</strong>—the world's premier boutique clinical institution specializing <strong>strictly</strong> in Interventional Radiology. By replacing large open surgeries with image-guided micro-catheters, we eliminate the need for general anesthesia, sutures, and hospital stays.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#appointment" 
                className="px-8 py-4 rounded-sm bg-azure-glow text-obsidian font-heading font-bold text-base hover:bg-azure-glow/90 transition-all text-center tracking-action"
              >
                Request Same-Day Consultation
              </a>
              <a 
                href="#procedures" 
                className="px-8 py-4 rounded-sm glass-panel border border-border-glass text-light font-heading font-bold text-base hover:bg-surface-obsidian transition-all text-center tracking-action"
              >
                Explore IR Procedures
              </a>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border-glass">
              <div>
                <div className="text-3xl font-bold font-heading text-cyan-glow tracking-hero">100%</div>
                <div className="text-xs text-muted mt-1 uppercase tracking-tag">IR Specialized</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-heading text-cyan-glow tracking-hero">95%+</div>
                <div className="text-xs text-muted mt-1 uppercase tracking-tag">Same-Day Home</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-heading text-light tracking-hero">0</div>
                <div className="text-xs text-muted mt-1 uppercase tracking-tag">Open Incisions</div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Testimonials & Clinical Outcomes */}
          <div className="lg:col-span-5 relative w-full z-10">
            <Testimonial1 />
          </div>
        </section>

        {/* 3. The Boutique Advantage Model */}
        <section id="boutique-advantage" className="py-24 bg-surface-obsidian/30 border-y border-border-glass relative w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold text-azure-glow tracking-tag uppercase">The Boutique Clinic Advantage</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light tracking-hero">
                Why We Specialize in Interventional Radiology Only
              </h2>
              <p className="text-muted leading-relaxed tracking-body">
                At Rythamo Hospitals, we believe in singular dedication. Traditional hospitals disperse their focus across hundreds of surgical subspecialties. By concentrating 100% of our clinical facility on image-guided procedures, we achieve unparalleled therapeutic precision and patient outcomes.
              </p>
            </div>            {/* Alternating 50/50 Visual Editorial Grid */}
            <div className="space-y-24 mt-16">
              
              {/* Row 1: Image-Guided Precision vs Open Mechanical Scalpel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text */}
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow tracking-tag uppercase animate-pulse">
                    <span>Clinical Advantage 01</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-light tracking-hero">
                    Pinhole Entry vs. Open Incisions
                  </h3>
                  <p className="text-sm text-muted leading-relaxed tracking-body">
                    Traditional general surgeries rely on large mechanical incisions using scalpels to physically expose the organs, which requires extensive suturing and leaves prominent scars. At Rythamo, we navigate directly inside the blood vessels using a single microscopic 2mm pinhole entry, requiring zero scalpels, stitches, or surgical staples.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-border-glass pt-4 text-xs font-mono">
                    <div className="text-red-500">
                      <div className="font-bold uppercase tracking-tag">Open Surgery</div>
                      <div className="mt-1 font-sans text-muted">10cm - 25cm invasive cuts requiring mechanical exposure.</div>
                    </div>
                    <div className="text-cyan-glow">
                      <div className="font-bold uppercase tracking-tag">Rythamo IR</div>
                      <div className="mt-1 font-sans text-light">&lt; 2mm microscopic puncture requiring zero sutures.</div>
                    </div>
                  </div>
                </div>

                {/* Right: Illustration */}
                <div className="glass-panel border border-[#E1ECEB] rounded-lg overflow-hidden h-[360px] relative">
                  <Image 
                    src="/images/pinhole_catheter.png" 
                    alt="Pinhole vascular guidance grid"
                    width={1080}
                    height={1404}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#172A28]/10 mix-blend-multiply pointer-events-none" />
                </div>
              </div>

              {/* Row 2: Conscious Sedation vs Full Cardiovascular Anesthesia */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Illustration */}
                <div className="glass-panel border border-[#E1ECEB] rounded-lg overflow-hidden h-[360px] relative lg:order-1 order-2">
                  <Image 
                    src="/images/conscious_sedation.png" 
                    alt="Cardiac rhythm conscious sedation finish"
                    width={1080}
                    height={1404}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#172A28]/10 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Right: Text */}
                <div className="space-y-6 lg:order-2 order-1">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow tracking-tag uppercase animate-pulse">
                    <span>Clinical Advantage 02</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-light tracking-hero">
                    Conscious Sedation vs. General Anesthesia
                  </h3>
                  <p className="text-sm text-muted leading-relaxed tracking-body">
                    Deep general anesthesia paralyzes the respiratory system, requiring mechanical ventilators, chemical paralytics, and carries high cardiovascular risk profiles. Rythamo uses advanced local blocks and conscious sedation, keeping patients completely comfortable, awake, and breathing naturally throughout the procedure.
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-border-glass pt-4 text-xs font-mono">
                    <div className="text-red-500">
                      <div className="font-bold uppercase tracking-tag">General Anesthesia</div>
                      <div className="mt-1 font-sans text-muted">Mechanical intubation, respiratory paralysis, high risk profile.</div>
                    </div>
                    <div className="text-cyan-glow">
                      <div className="font-bold uppercase tracking-tag">Rythamo Comfort</div>
                      <div className="mt-1 font-sans text-light">Awake, conscious, fully responsive, localized anesthetic blocking.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Same-Day Return Recovery vs ICU Admission */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text */}
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow tracking-tag uppercase animate-pulse">
                    <span>Clinical Advantage 03</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-light tracking-hero">
                    Same-Day Return vs. ICU Admissions
                  </h3>
                  <p className="text-sm text-muted leading-relaxed tracking-body">
                    Large incision sites require prolonged hospital stays in high-risk ICU environments or general wards to monitor for infection and manage severe systemic surgical pain. Because IR bypasses large muscle cuts, over 95% of Rythamo patients are discharged from our boutique private recovery suites to return home within 4 hours.
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-border-glass pt-4 text-xs font-mono">
                    <div className="text-red-500">
                      <div className="font-bold uppercase tracking-tag">Standard Hospital</div>
                      <div className="mt-1 font-sans text-muted">Average 3 to 7 days hospital admission in sterile ICU wards.</div>
                    </div>
                    <div className="text-cyan-glow">
                      <div className="font-bold uppercase tracking-tag">Rythamo Sanctuary</div>
                      <div className="mt-1 font-sans text-light">95%+ discharged in under 4 hours to recover in own bed.</div>
                    </div>
                  </div>
                </div>

                {/* Right: Illustration */}
                <div className="glass-panel border border-[#E1ECEB] rounded-lg overflow-hidden h-[360px] relative">
                  <Image 
                    src="/images/recovery_suite.png" 
                    alt="Luxury stationery pulp finish"
                    width={1080}
                    height={1404}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#172A28]/10 mix-blend-multiply pointer-events-none" />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Interactive IR Procedures Hub */}
        <section id="procedures" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold text-cyan-glow tracking-tag uppercase">The Clinical Catalog</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light tracking-hero">
                Expertly Rendered IR Procedures
              </h2>
              <p className="text-muted text-sm leading-relaxed tracking-body">
                Select a category to filter our advanced clinical operations. Click on any procedure card to access detailed clinical specifications, patient eligibility, and expected recovery metrics.
              </p>
            </div>
          </div>

          {/* Tab Filters */}
          <div className="flex flex-wrap gap-2 pb-8 border-b border-border-glass mb-12">
            {[
              { id: "all", label: "All Interventions" },
              { id: "Vascular & Arterial", label: "Vascular & Arterial" },
              { id: "Embolization Therapies", label: "Embolization Therapies" },
              { id: "Interventional Oncology", label: "Interventional Oncology" },
              { id: "Spinal & Core Structural", label: "Spinal & Core Structural" },
              { id: "Specialized Core Access", label: "Specialized Core Access" }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-sm font-heading text-sm font-semibold transition-all cursor-pointer tracking-action ${
                  activeCategory === tab.id 
                    ? "bg-cyan-glow text-obsidian" 
                    : "bg-surface-obsidian text-muted hover:text-light hover:bg-surface-obsidian-hover"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Procedures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProcedures.map(procedure => (
              <div 
                key={procedure.id}
                onClick={() => setSelectedProcedure(procedure)}
                className="glass-panel rounded-lg p-6 flex flex-col justify-between cursor-pointer group hover:scale-[1.02] transition-transform duration-300 relative"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold tracking-tag text-cyan-glow uppercase bg-cyan-glow/10 px-2.5 py-1 rounded">
                      {procedure.category}
                    </span>
                    <span className="text-xs text-muted font-mono">{procedure.recoveryTime} Recovery</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-light group-hover:text-cyan-glow transition-colors tracking-hero">
                    {procedure.name}
                  </h3>
                  <p className="text-xs text-muted line-clamp-3 leading-relaxed tracking-body">
                    {procedure.overview}
                  </p>
                </div>

                <div className="border-t border-border-glass pt-4 mt-6 flex justify-between items-center text-xs tracking-action">
                  <span className="text-muted">Sedation: <strong>{procedure.sedation}</strong></span>
                  <span className="text-cyan-glow font-heading font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    View Specs
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 ml-1">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.63L10.2 5.03a.75.75 0 011.06-1.06l5.5 5.5a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 11-1.06-1.06l4.18-4.17H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Detail Dialog */}
          {selectedProcedure && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1413]/70 backdrop-blur-sm">
              <div className="glass-panel w-full max-w-2xl rounded-lg p-8 relative overflow-hidden border-cyan-glow/40 max-h-[90vh] overflow-y-auto">
                
                {/* Close Button */}
                <button 
                  type="button"
                  onClick={() => setSelectedProcedure(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full border border-border-glass flex items-center justify-center text-muted hover:text-light hover:border-light transition-colors cursor-pointer"
                >
                  &times;
                </button>

                <div className="space-y-6">
                  
                  {/* Header */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-tag text-cyan-glow uppercase bg-cyan-glow/10 px-2.5 py-1 rounded">
                      {selectedProcedure.category} &bull; Clinical Data
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-heading text-light tracking-hero">
                      {selectedProcedure.name}
                    </h3>
                  </div>

                  {/* Grid details */}
                  <div className="grid grid-cols-2 gap-4 border-y border-border-glass py-4 font-mono text-xs">
                    <div>
                      <div className="text-muted uppercase tracking-tag">Clinical Recovery</div>
                      <div className="text-sm font-bold text-cyan-glow mt-0.5">{selectedProcedure.recoveryTime}</div>
                    </div>
                    <div>
                      <div className="text-muted uppercase tracking-tag">Sedation Route</div>
                      <div className="text-sm font-bold text-azure-glow mt-0.5">{selectedProcedure.sedation}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-tag text-light">Procedure Overview</h4>
                    <p className="text-sm text-muted leading-relaxed tracking-body">
                      {selectedProcedure.overview}
                    </p>
                  </div>

                  {/* Who it treats */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-tag text-light">Target Patient Indication</h4>
                    <p className="text-sm text-muted leading-relaxed tracking-body">
                      {selectedProcedure.whoItTreats}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-tag text-light font-heading">Key Patient Advantages</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm tracking-body">
                      {selectedProcedure.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-muted">
                          <span className="text-cyan-glow font-bold">&bull;</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA inside Modal */}
                  <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <a 
                      href="#appointment" 
                      onClick={() => setSelectedProcedure(null)}
                      className="px-6 py-3 rounded-sm bg-azure-glow text-obsidian font-heading font-bold text-sm text-center flex-grow hover:bg-azure-glow/90 transition-all tracking-action"
                    >
                      Discuss Procedure Eligibility
                    </a>
                    <button 
                      type="button"
                      onClick={() => setSelectedProcedure(null)}
                      className="px-6 py-3 rounded-sm glass-panel border border-border-glass text-light font-heading font-semibold text-sm hover:bg-surface-obsidian transition-all tracking-action"
                    >
                      Close Specifications
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

        </section>

        {/* 5. Clinical Outcomes & Trust */}
        <section id="clinical-outcomes" className="py-24 bg-surface-obsidian/30 border-y border-border-glass relative w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Alternating Outcomes Editorial Layout */}
            <div className="space-y-24">
              
              {/* Row 1: Outcomes Data & Progress Bars */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Progress Bars */}
                <div className="space-y-6">
                  <span className="text-xs font-bold text-azure-glow tracking-tag uppercase animate-pulse">Verified Medical Performance</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light tracking-hero">
                    Outcomes That Redefine Surgery
                  </h2>
                  <p className="text-muted leading-relaxed tracking-body text-sm">
                    By maintaining a highly strict specialized facility model, our clinical staff guarantees performance metrics that far exceed average surgical environments. Our data represents audited, consecutive patient cohorts.
                  </p>

                  {/* Progress Bars of Outcomes */}
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm tracking-body">
                        <span className="text-light font-semibold">Outpatient Same-Day Return Rate</span>
                        <span className="text-cyan-glow font-bold font-mono">95%</span>
                      </div>
                      <div className="h-2 w-full bg-border-glass rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-glow rounded-full" style={{ width: "95%" }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm tracking-body">
                        <span className="text-light font-semibold">Severe Complication Incidence</span>
                        <span className="text-cyan-glow font-bold font-mono">&lt; 0.5%</span>
                      </div>
                      <div className="h-2 w-full bg-border-glass rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-glow rounded-full" style={{ width: "2%" }} />
                      </div>
                      <div className="text-[10px] text-muted text-right font-mono tracking-body">Standard Surgery baseline averages 4.5%</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm tracking-body">
                        <span className="text-light font-semibold">Post-Procedural Narcotic Reduction</span>
                        <span className="text-cyan-glow font-bold font-mono">92%</span>
                      </div>
                      <div className="h-2 w-full bg-border-glass rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-glow rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Illustration */}
                <div className="glass-panel border border-[#E1ECEB] rounded-lg overflow-hidden h-[360px] relative">
                  <Image 
                    src="/images/outcomes_metrics.png" 
                    alt="Clinical statistical tracking chart"
                    width={1080}
                    height={1404}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#172A28]/10 mix-blend-multiply pointer-events-none" />
                </div>
              </div>

              {/* Row 2: Specialists Credentials */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Illustration */}
                <div className="glass-panel border border-[#E1ECEB] rounded-lg overflow-hidden h-[360px] relative lg:order-1 order-2">
                  <Image 
                    src="/images/medical_specialists.png" 
                    alt="Board certified credential credentials"
                    width={1080}
                    height={1404}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#172A28]/10 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Right: Specialists Text */}
                <div id="specialists" className="space-y-6 lg:order-2 order-1">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow tracking-tag uppercase animate-pulse">
                    <span>Certified Board Standards</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-light tracking-hero">Who Operates At Rythamo?</h3>
                  
                  <p className="text-sm text-muted leading-relaxed tracking-body">
                    Every interventional radiologist on our clinical staff is a medical doctor who has achieved absolute specialization in image-guided therapeutics. We do not hire general diagnostic radiologists.
                  </p>

                  {/* Qualification details */}
                  <div className="space-y-4 pt-2 tracking-body text-sm">
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-glow/10 flex items-center justify-center text-cyan-glow text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <h4 className="text-sm font-semibold text-light">Board-Certified Specialists</h4>
                        <p className="text-xs text-muted">Diplomates of the American Board of Radiology (ABR), fully certified in Diagnostic and Interventional Radiology.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-glow/10 flex items-center justify-center text-cyan-glow text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <h4 className="text-sm font-semibold text-light">Dedicated Fellowship Training</h4>
                        <p className="text-xs text-muted">Completion of accredited clinical fellowships in advanced vascular interventions and interventional oncology.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-glow/10 flex items-center justify-center text-cyan-glow text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <h4 className="text-sm font-semibold text-light">Collaborative Treatment Model</h4>
                        <p className="text-xs text-muted">Working directly with referring cardiologists, oncologists, and gynecologists to ensure seamless multidisciplinary management.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 6. Form Intake and Global Access */}
        <section id="appointment" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Access Numbers */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-cyan-glow tracking-tag uppercase">Immediate Operational Intake</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light tracking-hero">
                  Request An Appointment
                </h2>
                <p className="text-muted leading-relaxed tracking-body">
                  Contact our specialized scheduling office directly or submit a referral inquiry. Rythamo Hospitals receives patients from Maryland, nationwide, and international clinics. No prior surgical referral required for initial consults.
                </p>
              </div>

              {/* Visual Phone Numbers grid */}
              <div className="space-y-4 pt-6">
                
                <div className="glass-panel p-4 rounded-sm flex items-center space-x-4 border-cyan-glow/10">
                  <div className="w-10 h-10 rounded-lg bg-cyan-glow/10 flex items-center justify-center text-cyan-glow">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.545 2.181a1.875 1.875 0 01-.585 1.986l-1.91 1.91a10.211 10.211 0 005.13 5.13l1.91-1.91a1.875 1.875 0 011.986-.585l2.181.545c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted tracking-tag">USA Toll-Free Scheduling</div>
                    <div className="text-lg font-bold font-heading text-light tracking-hero">855-RYTHAMO</div>
                    <div className="text-[10px] text-muted font-mono">855-798-4266 &bull; Mon-Fri 8am-6pm EST</div>
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-sm flex items-center space-x-4 border-cyan-glow/10">
                  <div className="w-10 h-10 rounded-lg bg-cyan-glow/10 flex items-center justify-center text-cyan-glow">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M1.5 8.678c0-.754.446-1.4 1.102-1.652l8.52-3.281a.75.75 0 01.556 0l8.52 3.281c.656.252 1.102.898 1.102 1.652V18.04c0 .884-.666 1.609-1.536 1.728l-8.52 1.16a.75.75 0 01-.202 0l-8.52-1.16A1.737 1.737 0 011.5 18.04V8.678z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted tracking-tag">Maryland Local Office</div>
                    <div className="text-lg font-bold font-heading text-light tracking-hero">410-955-5000</div>
                    <div className="text-[10px] text-muted font-mono font-normal">Baltimore Main Clinical Center</div>
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-sm flex items-center space-x-4 border-cyan-glow/10">
                  <div className="w-10 h-10 rounded-lg bg-cyan-glow/10 flex items-center justify-center text-cyan-glow">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted tracking-tag">International Intake</div>
                    <div className="text-lg font-bold font-heading text-light tracking-hero">+1-410-502-7683</div>
                    <div className="text-[10px] text-muted font-mono font-normal">Direct Global Concierge Services</div>
                  </div>
                </div>

              </div>

              <div className="text-xs text-muted leading-relaxed tracking-body">
                * Rythamo Hospitals is accredited by the American College of Radiology (ACR) and works in absolute compliance with HIPPA data protection directives.
              </div>
            </div>

            {/* Right Column: Dynamic Form */}
            <div className="lg:col-span-7 glass-panel rounded-lg p-8 relative overflow-hidden border-cyan-glow/20">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-16 h-16 rounded-full bg-cyan-glow/10 border border-cyan-glow flex items-center justify-center text-cyan-glow text-3xl animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-light tracking-hero">Consultation Requested</h3>
                  <p className="text-sm text-muted max-w-md leading-relaxed tracking-body">
                    Thank you, <strong className="text-light">{formData.name}</strong>. Your clinical request has been securely routed to our Baltimore scheduling office. An Interventional Radiology coordinator will review your file and contact you via phone (<strong className="text-light">{formData.phone}</strong>) or email in under 2 hours.
                  </p>
                  <button 
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", procedureInterest: "General IR Inquiry", urgency: "Routine", message: "" });
                      setFormError("");
                    }}
                    className="px-6 py-2.5 rounded-sm bg-surface-obsidian hover:bg-surface-obsidian-hover text-light text-xs font-semibold font-heading tracking-action transition-all border border-border-glass cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6" suppressHydrationWarning={true}>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-light tracking-hero">Clinical Consultation Request</h3>
                    <p className="text-xs text-muted mt-1 tracking-body">Submit your information securely. HIPPA protected data terminal.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2" suppressHydrationWarning={true}>
                      <label className="text-xs font-semibold text-light uppercase tracking-tag block">Full Name</label>
                      <input 
                        type="text" 
                        required
                        suppressHydrationWarning={true}
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-obsidian border border-border-glass rounded-sm px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors tracking-body"
                      />
                    </div>
                    <div className="space-y-2" suppressHydrationWarning={true}>
                      <label className="text-xs font-semibold text-light uppercase tracking-tag block">Email Address</label>
                      <input 
                        type="email" 
                        required
                        suppressHydrationWarning={true}
                        placeholder="e.g. john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-obsidian border border-border-glass rounded-sm px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors tracking-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2" suppressHydrationWarning={true}>
                      <label className="text-xs font-semibold text-light uppercase tracking-tag block">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        suppressHydrationWarning={true}
                        placeholder="e.g. (410) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-obsidian border border-border-glass rounded-sm px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors tracking-body"
                      />
                    </div>
                    <div className="space-y-2" suppressHydrationWarning={true}>
                      <label className="text-xs font-semibold text-light uppercase tracking-tag block">Procedure Focus</label>
                      <select
                        value={formData.procedureInterest}
                        onChange={(e) => setFormData({ ...formData, procedureInterest: e.target.value })}
                        className="w-full bg-obsidian border border-border-glass rounded-sm px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors tracking-action cursor-pointer"
                      >
                        <option value="General IR Inquiry">General IR Consultation</option>
                        <option value="Angioplasty">Angioplasty & Stenting</option>
                        <option value="Uterine Artery Embolization">Uterine Fibroids (UAE)</option>
                        <option value="Targeted Thrombolysis">Clot dissolution (Thrombolysis)</option>
                        <option value="Kyphoplasty">Kyphoplasty (Vertebral Pain)</option>
                        <option value="Oncological TACE">Chemoembolization (TACE)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2" suppressHydrationWarning={true}>
                    <label className="text-xs font-semibold text-light uppercase tracking-tag block">Urgency Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Routine", "Urgent", "Physician Referral"].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: status })}
                          className={`py-2 rounded-sm font-heading text-xs font-semibold border transition-all cursor-pointer tracking-action ${
                            formData.urgency === status 
                              ? "bg-cyan-glow/15 border-cyan-glow text-cyan-glow" 
                              : "bg-obsidian border-border-glass text-muted hover:text-light"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-light uppercase tracking-tag block">Clinical Notes / Message (Optional)</label>
                    <textarea 
                      rows={4}
                      placeholder="Briefly describe symptoms, duration, or previous diagnoses..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-obsidian border border-border-glass rounded-sm px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors resize-none tracking-body"
                    />
                  </div>

                  {formError && (
                    <div className="text-xs text-red-500 font-semibold mb-2" suppressHydrationWarning={true}>
                      ⚠️ {formError}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-4 rounded-sm bg-azure-glow text-obsidian font-heading font-bold text-base hover:bg-azure-glow/90 transition-all cursor-pointer tracking-action disabled:opacity-55"
                  >
                    {formSubmitting ? "Dispatched..." : "Submit Secure Consultation Request"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* 7. High-End Experience Footer */}
        <ExperienceFooter />
      </ScrollExpandMedia>
    </div>
  );
}
