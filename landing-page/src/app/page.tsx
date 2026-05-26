"use client";

import React, { useState } from "react";

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

  // Procedures Database
  const procedures: Procedure[] = [
    {
      id: "angioplasty",
      name: "Angioplasty & Stenting",
      category: "vascular",
      overview: "A catheter with a tiny balloon at its tip is threaded under real-time X-ray guidance into a blocked blood vessel. The balloon is inflated to reopen the vessel, and a small metal mesh cylinder (stent) is permanently placed to keep the channel open.",
      whoItTreats: "Patients with Peripheral Artery Disease (PAD), atherosclerosis, severe limb pain, or high risk of diabetic limb amputation.",
      benefits: ["Restores blood flow immediately", "Avoids bypass surgery", "Local anesthesia only", "Outpatient same-day return"],
      recoveryTime: "24-48 Hours",
      sedation: "Moderate Sedation"
    },
    {
      id: "uae",
      name: "Uterine Artery Embolization (UAE)",
      category: "embolization",
      overview: "An advanced, uterus-sparing treatment for symptomatic uterine fibroids. Microscopic particles are injected through a microcatheter directly into the uterine arteries, blocking the blood supply to the fibroids, causing them to shrink and resolve.",
      whoItTreats: "Women experiencing severe pelvic pain, heavy menstrual bleeding, and pressure symptoms caused by benign uterine fibroids.",
      benefits: ["Uterus-sparing alternative to hysterectomy", "No surgical incisions", "Over 90% clinical success rate", "Fast return to work"],
      recoveryTime: "5-7 Days",
      sedation: "Moderate / Conscious Sedation"
    },
    {
      id: "thrombolysis",
      name: "Targeted Thrombolysis",
      category: "vascular",
      overview: "Direct catheter-guided injection of clot-dissolving medications (like tPA) directly into a major blood clot inside deep veins or arteries. This rapidly melts the occlusion and restores essential perfusion.",
      whoItTreats: "Patients suffering from acute Deep Vein Thrombosis (DVT), acute limb ischemia, or massive pulmonary embolisms.",
      benefits: ["Dissolves clots rapidly", "Protects limbs from tissue death", "Significantly reduces post-thrombotic syndrome risk", "Extremely precise delivery"],
      recoveryTime: "24-72 Hours",
      sedation: "Moderate Sedation"
    },
    {
      id: "tace",
      name: "Chemoembolization (TACE)",
      category: "oncology",
      overview: "A targeted cancer therapy that delivers high-dose chemotherapeutic agents directly into the blood vessels feeding a tumor, combined with embolization particles that lock the chemotherapy in place and starve the tumor's blood supply.",
      whoItTreats: "Patients with primary liver cancer (hepatocellular carcinoma) or metastatic lesions unable to undergo standard surgical resection.",
      benefits: ["Delivers chemotherapy directly to tumor, saving healthy tissue", "Cuts off oxygen/nutrient supply to malignant cells", "Minimal systemic side effects", "Prolongs survival"],
      recoveryTime: "3-5 Days",
      sedation: "Moderate Sedation"
    },
    {
      id: "kyphoplasty",
      name: "Kyphoplasty & Vertebroplasty",
      category: "structural",
      overview: "Under real-time dual CT/Fluoroscopic guidance, a needle is navigated into a fractured, collapsed vertebra. A small balloon is inflated to restore the bone's original height, and medical-grade bone cement is injected to solidify and support the spine.",
      whoItTreats: "Patients suffering from severe back pain caused by osteoporotic or malignant vertebral compression fractures.",
      benefits: ["Instant, dramatic back pain relief", "Restores spinal column alignment", "Bypasses invasive spinal fusion hardware", "Performed in under 1 hour"],
      recoveryTime: "24 Hours",
      sedation: "Conscious Sedation / Local Anesthesia"
    },
    {
      id: "needle-biopsy",
      name: "Image-Guided Core Biopsy",
      category: "structural",
      overview: "Using high-resolution CT, MRI, or ultrasound guidance, a small biopsy needle is navigated with absolute accuracy to extract tissue cores from hard-to-reach organs. Provides definitive diagnoses without open surgical exploration.",
      whoItTreats: "Patients requiring diagnostic sampling of suspicious lung nodules, liver lesions, kidney masses, or breast abnormalities.",
      benefits: ["Requires no surgical incisions or stitches", "High clinical diagnostic yield", "Virtually no pain", "Completed in 30 minutes"],
      recoveryTime: "Same Day",
      sedation: "Local Anesthesia only"
    },
    {
      id: "g-tube",
      name: "Fluoroscopic Gastrostomy Placement",
      category: "access",
      overview: "Direct insertion of a feeding tube (G-tube) through the abdominal wall into the stomach, guided continuously by real-time fluoroscopic imaging to guarantee perfect anatomical placement and patient safety.",
      whoItTreats: "Patients with swallowing disorders, ALS, head/neck cancers, or severe nutritional deficits unable to take nourishment orally.",
      benefits: ["Extremely safe compared to endoscopic/surgical routes", "Ensures precise anatomical location", "Minimal procedural discomfort", "Rapid outpatient setup"],
      recoveryTime: "24 Hours",
      sedation: "Moderate Sedation"
    },
    {
      id: "ivc-filter",
      name: "IVC Filter Insertion & Retrieval",
      category: "access",
      overview: "A tiny basket-like filter is navigated into the Inferior Vena Cava (the body's main abdominal vein) to trap migrating blood clots originating in the legs before they reach the lungs and cause life-threatening pulmonary embolisms.",
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
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-light selection:bg-cyan-glow/20 overflow-x-hidden font-sans">
      
      {/* Dynamic Background Glows */}
      <div className="ambient-glow w-[600px] h-[600px] bg-cyan-glow top-[-200px] left-[-200px]" />
      <div className="ambient-glow w-[500px] h-[500px] bg-azure-glow bottom-[200px] right-[-100px]" />
      
      {/* 1. Header / Navigation */}
      <header className="sticky top-4 z-50 px-4 md:px-8">
        <nav className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold font-heading tracking-wider text-light flex items-center">
              RYTHAMO
              <span className="w-2 h-2 rounded-full bg-cyan-glow ml-1.5 animate-pulse-cyan" />
            </span>
            <div className="h-5 w-[1px] bg-border-glass/40 hidden sm:block" />
            <span className="text-xs font-heading tracking-widest text-muted hidden sm:block">
              HOSPITALS &bull; 100% INTERVENTIONAL RADIOLOGY
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-sm font-heading tracking-wide">
            <a href="#boutique-advantage" className="text-muted hover:text-cyan-glow transition-colors">Boutique Advantage</a>
            <a href="#procedures" className="text-muted hover:text-cyan-glow transition-colors">IR Procedures</a>
            <a href="#clinical-outcomes" className="text-muted hover:text-cyan-glow transition-colors">Clinical Outcomes</a>
            <a href="#specialists" className="text-muted hover:text-cyan-glow transition-colors">Our Specialists</a>
          </div>

          <div>
            <a 
              href="#appointment" 
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-azure-glow to-cyan-glow text-obsidian font-heading font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all transform hover:-translate-y-0.5 inline-block"
            >
              Book Consultation
            </a>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Medical Copy */}
        <div className="lg:col-span-7 space-y-8 z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-glow" />
            <span>Pioneering Pinhole Therapeutics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading leading-tight tracking-tight text-light">
            Precision Guidance. <br />
            <span className="bg-gradient-to-r from-cyan-glow to-azure-glow bg-clip-text text-transparent">
              Pinhole Healing.
            </span>
          </h1>

          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Welcome to <strong className="text-light">Rythamo Hospitals</strong>—the world's premier boutique clinical institution specializing **strictly** in Interventional Radiology. By replacing large open surgeries with image-guided micro-catheters, we eliminate the need for general anesthesia, sutures, and hospital stays.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#appointment" 
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-azure-glow to-cyan-glow text-obsidian font-heading font-bold text-base hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] transition-all transform hover:-translate-y-0.5 text-center"
            >
              Request Same-Day Consultation
            </a>
            <a 
              href="#procedures" 
              className="px-8 py-4 rounded-xl glass-panel border border-border-glass text-light font-heading font-bold text-base hover:bg-surface-obsidian transition-all text-center"
            >
              Explore IR Procedures
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border-glass/40">
            <div>
              <div className="text-3xl font-bold font-heading text-cyan-glow">100%</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">IR Specialized</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-heading text-azure-glow">95%+</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">Same-Day Home</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-heading text-light">0</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">Open Incisions</div>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Clinical HUD */}
        <div className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto z-10">
          <div className="w-full h-full glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border-cyan-glow/20">
            
            {/* Hologram Scanner Effect */}
            <div className="scan-line" />
            
            {/* Header info of HUD */}
            <div className="flex justify-between items-center border-b border-border-glass/40 pb-4 text-xs font-mono text-muted tracking-widest uppercase">
              <span className="flex items-center text-cyan-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow mr-1.5 animate-pulse-cyan" />
                SYS STATUS: OPTIMAL
              </span>
              <span>DEV_ID: R-400_GUIDE</span>
            </div>

            {/* Core Visual: Vascular Pathway Grid */}
            <div className="flex-grow flex items-center justify-center relative py-6">
              
              {/* Dynamic Grid Background */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(circle, #00F2FE 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} 
              />
              
              {/* Animated Vascular Paths */}
              <svg viewBox="0 0 200 200" className="w-4/5 h-4/5 text-cyan-glow/30 drop-shadow-[0_0_8px_rgba(0,242,254,0.1)]">
                {/* Main Arterial line */}
                <path 
                  d="M100 20 C100 60 40 80 40 120 C40 160 80 180 100 180" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeDasharray="4,4"
                />
                <path 
                  d="M100 20 C100 60 160 80 160 120 C160 160 120 180 100 180" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeDasharray="4,4"
                />
                
                {/* Micro-catheter line (pulsing green/cyan) */}
                <path 
                  d="M100 20 C100 60 40 80 40 120" 
                  fill="none" 
                  stroke="#00F2FE" 
                  strokeWidth="3.5"
                  className="animate-pulse"
                />

                {/* Target Node Indicator */}
                <circle cx="40" cy="120" r="7" fill="#00F2FE" className="animate-ping opacity-75" />
                <circle cx="40" cy="120" r="4" fill="#00F2FE" />
                <circle cx="100" cy="20" r="3" fill="currentColor" />
                <circle cx="100" cy="180" r="3" fill="currentColor" />
              </svg>

              {/* HUD HUD Data Labels */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-muted border border-border-glass/40 bg-obsidian/60 p-2 rounded">
                <div className="text-light">TARGET FOCUS:</div>
                <div className="text-cyan-glow font-bold">VASCULAR EMBOLUS</div>
                <div>DEPTH: 84.6 mm</div>
              </div>

              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted border border-border-glass/40 bg-obsidian/60 p-2 rounded text-right">
                <div className="text-light">CATHETER POSITION:</div>
                <div className="text-azure-glow font-bold">ARTERIAL ENTRY</div>
                <div>ANGIOPLASTY ACTIVE</div>
              </div>
            </div>

            {/* Footer metrics of HUD */}
            <div className="border-t border-border-glass/40 pt-4 grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="border-r border-border-glass/40">
                <div className="text-[10px] text-muted uppercase tracking-wider">Fluoroscopy Dose</div>
                <div className="text-base font-bold text-light flex items-baseline">
                  0.14 <span className="text-[9px] text-muted ml-1">mGy/s</span>
                </div>
              </div>
              <div className="pl-2">
                <div className="text-[10px] text-muted uppercase tracking-wider">Vital Flow Rate</div>
                <div className="text-base font-bold text-light flex items-baseline">
                  98.2 <span className="text-[9px] text-cyan-glow ml-1">cm/s</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. The Boutique Advantage Model */}
      <section id="boutique-advantage" className="py-24 bg-surface-obsidian/30 border-y border-border-glass/30 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-azure-glow tracking-widest uppercase">The Boutique Clinic Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light">
              Why We Specialize in Interventional Radiology Only
            </h2>
            <p className="text-muted leading-relaxed">
              At Rythamo Hospitals, we believe in singular dedication. Traditional hospitals disperse their focus across hundreds of surgical subspecialties. By concentrating 100% of our clinical facility on image-guided procedures, we achieve unparalleled therapeutic precision and patient outcomes.
            </p>
          </div>

          {/* Model Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Traditional Surgery Card (Left) */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-8 border-red-500/10 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                  <span>Traditional General Hospitals</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-light">Open Surgical Paradigm</h3>
                <p className="text-sm text-muted">
                  Traditional open surgeries require large mechanical incisions to physically expose organs, requiring full-body general anesthesia and a prolonged post-operative hospital stay.
                </p>
                <ul className="space-y-3 pt-4 text-sm text-muted">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 font-bold">&times;</span>
                    <span>Large incisions requiring scalpel cuts, clips, and sutures.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 font-bold">&times;</span>
                    <span>General anesthesia (high cardiovascular risk profile).</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 font-bold">&times;</span>
                    <span>Significant post-op pain requiring high doses of systemic narcotics.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 font-bold">&times;</span>
                    <span>Average 3 to 7 days hospital admission in ICU or general wards.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 font-bold">&times;</span>
                    <span>Prolonged downtime (weeks of complete recovery work-leave).</span>
                  </li>
                </ul>
              </div>
              <div className="border-t border-border-glass/40 pt-6 mt-8 text-xs text-muted flex items-center">
                <span>Outcome Focus: General/Shared Hospital Resources</span>
              </div>
            </div>

            {/* Brand Focal Graphic (Middle Arrow) */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-6 lg:py-0 text-cyan-glow">
              <div className="w-12 h-12 rounded-full border border-cyan-glow/20 flex items-center justify-center bg-obsidian">
                <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" className="w-6 h-6 animate-pulse">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase mt-3 text-muted">Shift Focus</span>
            </div>

            {/* Rythamo Specialty Model (Right) */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-8 border-cyan-glow/30 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-glow/10 to-transparent pointer-events-none" />
              
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow">
                  <span>Rythamo Specialized Hospital</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-cyan-glow">Precision IR Paradigm</h3>
                <p className="text-sm text-muted">
                  We use advanced 3D scanning and custom micro-catheters to treat conditions directly inside blood vessels and organs. Performed through a microscopic pinhole incision.
                </p>
                <ul className="space-y-3 pt-4 text-sm text-light">
                  <li className="flex items-start space-x-3">
                    <span className="text-cyan-glow font-bold">&bull;</span>
                    <span><strong>No Scalpels:</strong> Entry points smaller than 2mm, requiring no sutures or stitches.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-cyan-glow font-bold">&bull;</span>
                    <span><strong>Conscious/Local Anesthesia:</strong> Safe, quick recovery without full general sedation.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-cyan-glow font-bold">&bull;</span>
                    <span><strong>Targeted Pain Relief:</strong> Micro-targeted local blocks keep patients completely comfortable.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-cyan-glow font-bold">&bull;</span>
                    <span><strong>Same-Day Discharge:</strong> 95%+ of patients return home in under 4 hours.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-cyan-glow font-bold">&bull;</span>
                    <span><strong>Rapid Normalization:</strong> Return to regular activities within 24 to 48 hours.</span>
                  </li>
                </ul>
              </div>
              <div className="border-t border-cyan-glow/20 pt-6 mt-8 text-xs text-cyan-glow flex items-center font-semibold">
                <span>Outcome Focus: 100% Specialized Clinical Excellence</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Interactive IR Procedures Hub */}
      <section id="procedures" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-cyan-glow tracking-widest uppercase">The Clinical Catalog</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light">
              Expertly Rendered IR Procedures
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Select a category to filter our advanced clinical operations. Click on any procedure card to access detailed clinical specifications, patient eligibility, and expected recovery metrics.
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-border-glass/40 mb-12">
          {[
            { id: "all", label: "All Interventions" },
            { id: "vascular", label: "Vascular & Arterial" },
            { id: "embolization", label: "Embolization Therapies" },
            { id: "oncology", label: "Interventional Oncology" },
            { id: "structural", label: "Spinal & Core Structural" },
            { id: "access", label: "Specialized Core Access" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-heading text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === tab.id 
                  ? "bg-cyan-glow text-obsidian shadow-[0_0_15px_rgba(0,242,254,0.3)]" 
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
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between cursor-pointer group hover:scale-[1.02] transition-transform duration-300 relative"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-glow uppercase bg-cyan-glow/10 px-2.5 py-1 rounded">
                    {procedure.category}
                  </span>
                  <span className="text-xs text-muted font-mono">{procedure.recoveryTime} Recovery</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-light group-hover:text-cyan-glow transition-colors">
                  {procedure.name}
                </h3>
                <p className="text-xs text-muted line-clamp-3 leading-relaxed">
                  {procedure.overview}
                </p>
              </div>

              <div className="border-t border-border-glass/40 pt-4 mt-6 flex justify-between items-center text-xs">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
            <div className="glass-panel w-full max-w-2xl rounded-3xl p-8 relative overflow-hidden border-cyan-glow/40 max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProcedure(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-border-glass/60 flex items-center justify-center text-muted hover:text-light hover:border-light transition-colors cursor-pointer"
              >
                &times;
              </button>

              <div className="space-y-6">
                
                {/* Header */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-glow uppercase bg-cyan-glow/10 px-2.5 py-1 rounded">
                    {selectedProcedure.category} &bull; Clinical Data
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-light">
                    {selectedProcedure.name}
                  </h3>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-4 border-y border-border-glass/40 py-4 font-mono text-xs">
                  <div>
                    <div className="text-muted uppercase">Clinical Recovery</div>
                    <div className="text-sm font-bold text-cyan-glow mt-0.5">{selectedProcedure.recoveryTime}</div>
                  </div>
                  <div>
                    <div className="text-muted uppercase">Sedation Route</div>
                    <div className="text-sm font-bold text-azure-glow mt-0.5">{selectedProcedure.sedation}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-light">Procedure Overview</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {selectedProcedure.overview}
                  </p>
                </div>

                {/* Who it treats */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-light">Target Patient Indication</h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {selectedProcedure.whoItTreats}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-light font-heading">Key Patient Advantages</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-azure-glow to-cyan-glow text-obsidian font-heading font-bold text-sm text-center flex-grow hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
                  >
                    Discuss Procedure Eligibility
                  </a>
                  <button 
                    onClick={() => setSelectedProcedure(null)}
                    className="px-6 py-3 rounded-xl glass-panel border border-border-glass text-light font-heading font-semibold text-sm hover:bg-surface-obsidian transition-all"
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
      <section id="clinical-outcomes" className="py-24 bg-surface-obsidian/30 border-y border-border-glass/30 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side: Outcomes Graph HUD */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-azure-glow tracking-widest uppercase">Verified Medical Performance</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light">
                Outcomes That Redefine Surgery
              </h2>
              <p className="text-muted leading-relaxed">
                By maintaining a highly strict specialized facility model, our clinical staff guarantees performance metrics that far exceed average surgical environments. Our data represents audited, consecutive patient cohorts.
              </p>

              {/* Progress Bars of Outcomes */}
              <div className="space-y-6 pt-4">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-light font-semibold">Outpatient Same-Day Return Rate</span>
                    <span className="text-cyan-glow font-bold font-mono">95%</span>
                  </div>
                  <div className="h-2 w-full bg-border-glass/40 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-azure-glow to-cyan-glow rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-light font-semibold">Severe Complication Incidence (Standard Procedures)</span>
                    <span className="text-cyan-glow font-bold font-mono">&lt; 0.5%</span>
                  </div>
                  <div className="h-2 w-full bg-border-glass/40 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-glow rounded-full" style={{ width: "2%" }} />
                  </div>
                  <div className="text-[10px] text-muted text-right font-mono">Standard Surgery baseline averages 4.5%</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-light font-semibold">Post-Procedural Narcotic Usage Reduction</span>
                    <span className="text-cyan-glow font-bold font-mono">92%</span>
                  </div>
                  <div className="h-2 w-full bg-border-glass/40 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-azure-glow to-cyan-glow rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>

              </div>
            </div>

            {/* Right side: Specialist Credentials */}
            <div id="specialists" className="lg:col-span-6 glass-panel rounded-3xl p-8 border-cyan-glow/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-glow/5 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 text-xs font-semibold text-cyan-glow uppercase">
                  <span>Certified Board Standards</span>
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-light">Who Operates At Rythamo?</h3>
                
                <p className="text-sm text-muted leading-relaxed">
                  Every interventional radiologist on our clinical staff is a medical doctor who has achieved absolute specialization. We do not hire general radiologists.
                </p>

                {/* Qualification details */}
                <div className="space-y-4 pt-2">
                  
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
                      <p className="text-xs text-muted">Working directly with referring cardiologists, oncologists, and neurologists to ensure seamless multidisciplinary management.</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Form Intake and Global Access */}
      <section id="appointment" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Access Numbers */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-cyan-glow tracking-widest uppercase">Immediate Operational Intake</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-light">
                Request An Appointment
              </h2>
              <p className="text-muted leading-relaxed">
                Contact our specialized scheduling office directly or submit a referral inquiry. Rythamo Hospitals receives patients from Maryland, nationwide, and international clinics. No prior surgical referral required for initial consults.
              </p>
            </div>

            {/* Visual Phone Numbers grid */}
            <div className="space-y-4 pt-6">
              
              <div className="glass-panel p-4 rounded-xl flex items-center space-x-4 border-cyan-glow/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-glow/10 flex items-center justify-center text-cyan-glow">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l.545 2.181a1.875 1.875 0 01-.585 1.986l-1.91 1.91a10.211 10.211 0 005.13 5.13l1.91-1.91a1.875 1.875 0 011.986-.585l2.181.545c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-muted tracking-wider">USA Toll-Free Scheduling</div>
                  <div className="text-lg font-bold font-heading text-light">855-RYTHAMO</div>
                  <div className="text-[10px] text-muted">855-798-4266 &bull; Mon-Fri 8am-6pm EST</div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl flex items-center space-x-4 border-cyan-glow/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-glow/10 flex items-center justify-center text-cyan-glow">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M1.5 8.678c0-.754.446-1.4 1.102-1.652l8.52-3.281a.75.75 0 01.556 0l8.52 3.281c.656.252 1.102.898 1.102 1.652V18.04c0 .884-.666 1.609-1.536 1.728l-8.52 1.16a.75.75 0 01-.202 0l-8.52-1.16A1.737 1.737 0 011.5 18.04V8.678z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-muted tracking-wider">Maryland Local Office</div>
                  <div className="text-lg font-bold font-heading text-light">410-955-5000</div>
                  <div className="text-[10px] text-muted">Baltimore Main Clinical Center</div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl flex items-center space-x-4 border-cyan-glow/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-glow/10 flex items-center justify-center text-cyan-glow">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-muted tracking-wider">International Intake</div>
                  <div className="text-lg font-bold font-heading text-light">+1-410-502-7683</div>
                  <div className="text-[10px] text-muted">Direct Global Concierge Services</div>
                </div>
              </div>

            </div>

            <div className="text-xs text-muted leading-relaxed">
              * Rythamo Hospitals is accredited by the American College of Radiology (ACR) and works in absolute compliance with HIPPA data protection directives.
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 relative overflow-hidden border-cyan-glow/20">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-16 h-16 rounded-full bg-cyan-glow/10 border border-cyan-glow flex items-center justify-center text-cyan-glow text-3xl animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-heading text-light">Consultation Requested</h3>
                <p className="text-sm text-muted max-w-md leading-relaxed">
                  Thank you, <strong className="text-light">{formData.name}</strong>. Your clinical request has been securely routed to our Baltimore scheduling office. An Interventional Radiology coordinator will review your file and contact you via phone (<strong className="text-light">{formData.phone}</strong>) or email in under 2 hours.
                </p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", procedureInterest: "General IR Inquiry", urgency: "Routine", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-surface-obsidian hover:bg-surface-obsidian-hover text-light text-xs font-semibold font-heading tracking-wide transition-all border border-border-glass cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-light">Clinical Consultation Request</h3>
                  <p className="text-xs text-muted mt-1">Submit your information securely. HIPPA protected data terminal.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-light uppercase tracking-wider block">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-obsidian border border-border-glass/60 rounded-xl px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-light uppercase tracking-wider block">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-obsidian border border-border-glass/60 rounded-xl px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-light uppercase tracking-wider block">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. (410) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-obsidian border border-border-glass/60 rounded-xl px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-light uppercase tracking-wider block">Procedure Focus</label>
                    <select
                      value={formData.procedureInterest}
                      onChange={(e) => setFormData({ ...formData, procedureInterest: e.target.value })}
                      className="w-full bg-obsidian border border-border-glass/60 rounded-xl px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors"
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

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-light uppercase tracking-wider block">Urgency Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Routine", "Urgent", "Physician Referral"].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: status })}
                        className={`py-2 rounded-lg font-heading text-xs font-semibold border transition-all cursor-pointer ${
                          formData.urgency === status 
                            ? "bg-azure-glow/10 border-azure-glow text-azure-glow" 
                            : "bg-obsidian border-border-glass/60 text-muted hover:text-light"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-light uppercase tracking-wider block">Clinical Notes / Message (Optional)</label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe symptoms, duration, or previous diagnoses..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-obsidian border border-border-glass/60 rounded-xl px-4 py-3 text-sm text-light focus:border-cyan-glow focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-azure-glow to-cyan-glow text-obsidian font-heading font-bold text-base hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Submit Secure Consultation Request
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 7. Clinical Footer */}
      <footer className="bg-surface-obsidian/40 border-t border-border-glass/40 py-16 px-4 md:px-8 mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Main Info Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="md:col-span-2 space-y-4">
              <span className="text-xl font-bold font-heading tracking-wider text-light flex items-center">
                RYTHAMO
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow ml-1.5" />
              </span>
              <p className="text-xs text-muted max-w-sm leading-relaxed">
                Rythamo Hospitals represents a dedicated network of clinical environments focusing strictly on advanced Interventional Radiology and Vascular Medicine. We are committed to replacing invasive surgeries with precision, pinhole imaging therapies.
              </p>
              <div className="flex space-x-3 text-xs text-muted pt-2">
                <span>Accredited:</span>
                <strong className="text-light">ACR</strong> &bull;
                <strong className="text-light">SIR</strong> &bull;
                <strong className="text-light">AHA</strong>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-light font-heading">Baltimore Clinical Center</h4>
              <p className="text-xs text-muted leading-relaxed">
                100 Precision Way, Suite 400<br />
                Baltimore, MD 21201<br />
                Phone: 410-955-5000
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-light font-heading">Regulatory & Care</h4>
              <ul className="space-y-2 text-xs text-muted">
                <li><a href="#" className="hover:text-cyan-glow transition-colors">Notice of Privacy Practices</a></li>
                <li><a href="#" className="hover:text-cyan-glow transition-colors">Patient Bill of Rights</a></li>
                <li><a href="#" className="hover:text-cyan-glow transition-colors">Price Transparency</a></li>
                <li><a href="#" className="hover:text-cyan-glow transition-colors">Non-Discrimination Notice</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="border-t border-border-glass/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted space-y-4 sm:space-y-0">
            <div>
              &copy; {new Date().getFullYear()} Rythamo Hospitals &amp; Research Systems. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-light">Privacy Policy</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-light">Terms &amp; Conditions</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-light">Manage Cookies</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
