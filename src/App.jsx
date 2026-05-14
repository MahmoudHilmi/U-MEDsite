import React, { useState, useEffect } from "react";
import {
  Shield,
  Globe,
  Zap,
  Cpu,
  ArrowRight,
  Sparkles,
  Activity,
  X,
  Download,
  PlayCircle,
  Menu,
  ChevronDown,
} from "lucide-react";

// =============================================
// HOOKS
// =============================================
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return [domRef, isVisible];
}

// =============================================
// CONFIGURATION — Replace these with real links
// =============================================
const PITCH_DECK_URL =
  "https://fqxrhrrgddinllsayvdb.supabase.co/storage/v1/object/public/assets/CURA_Investor_Deck.pdf";
const DEMO_URL =
  "https://github.com/MahmoudHilmi/CURAsite/releases/download/preview/application-f1893b54-9332-421c-9cdc-064f56357b0a.apk";
// =============================================

/* =========================================
   PITCH DECK MODAL
   ========================================= */
function PitchDeckModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
      {/* Frosted backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card — slides up on mobile, scales in on desktop */}
      <div
        className="
        relative bg-[#FBFBFD] w-full max-w-5xl
        rounded-t-[28px] sm:rounded-[28px] md:rounded-[32px]
        shadow-[0_32px_80px_rgba(0,0,0,0.18)]
        flex flex-col
        max-h-[92vh] sm:max-h-[88vh]
        border border-white/60
        animate-[scaleIn_0.22s_ease-out_forwards]
        overflow-hidden
      "
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between
          px-5 sm:px-8 py-4 sm:py-5
          border-b border-gray-200/60 bg-white/80 backdrop-blur-md flex-shrink-0"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Activity className="text-black h-5 w-5 stroke-[2.5] flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base md:text-lg tracking-tight text-black truncate">
              CURA Executive Architecture Deck
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-[#86868B] hover:text-[#1D1D1F]"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Modal body — stacks vertically on mobile */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          {/* Left: Abstract + CTAs */}
          <div
            className="
            w-full lg:w-[38%]
            px-5 sm:px-8 py-6 sm:py-10
            border-b lg:border-b-0 lg:border-r border-gray-200/60
            flex flex-col bg-[#FBFBFD]
            overflow-y-auto flex-shrink-0
          "
          >
            <span className="inline-flex items-center bg-black text-white px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-4 sm:mb-6 w-fit">
              Confidential
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black mb-3 sm:mb-4 leading-tight">
              Investment
              <br />
              Abstract
            </h3>
            <p className="text-[#86868B] leading-relaxed text-sm sm:text-[15.5px] mb-6">
              CURA is fundamentally reorganizing healthcare routing. This deck
              outlines our clinical edge intelligence, our API-free engineering
              moat, and expansion methodology designed for hyper-dense urban
              markets.
            </p>

            {/* Action Buttons */}
            <div className="mt-auto pt-6 border-t border-gray-200/60 space-y-3">
              <a
                href={PITCH_DECK_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-black text-white px-5 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-[16px] font-medium hover:bg-gray-800 transition-all flex items-center justify-center shadow-lg"
              >
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                Download Full Deck
              </a>
              <a
                href={DEMO_URL}
                className="w-full bg-white border border-gray-200 text-black px-5 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-[16px] font-medium hover:border-black hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm"
              >
                <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-black" />
                Access Prototype Demo
              </a>
            </div>
          </div>

          {/* Right: Embedded PDF viewer (hidden on small phones, shown md+) */}
          <div className="hidden sm:flex w-full lg:w-[62%] bg-[#F0F0F3] relative min-h-[300px] lg:min-h-0">
            <iframe
              src={`${PITCH_DECK_URL}#view=FitH&toolbar=0`}
              className="absolute inset-0 w-full h-full border-0 grayscale"
              title="CURA Pitch Deck"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   NAVBAR
   ========================================= */
function Navbar({ onOpenDeck }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to md+
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const links = [
    { href: "#platform", label: "Platform" },
    { href: "#intelligence", label: "Intelligence" },
    { href: "#infrastructure", label: "Security" },
    { href: "#scale", label: "Scale" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#FBFBFD]/80 backdrop-blur-2xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="bg-black p-1 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Activity className="text-white h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tighter text-black">
            CURA
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8 lg:space-x-10 text-sm font-medium tracking-wide text-[#86868B]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-black transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={onOpenDeck}
          className="hidden md:block bg-black text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-xl active:scale-95"
        >
          Request Demo
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 text-[#1D1D1F] rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-md py-4 px-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 px-2 text-black font-medium text-base border-b border-gray-50 last:border-0 hover:pl-4 transition-all"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenDeck();
            }}
            className="mt-3 w-full bg-black text-white px-5 py-3 rounded-full text-sm font-semibold shadow-lg"
          >
            Request Demo
          </button>
        </div>
      )}
    </nav>
  );
}

/* =========================================
   BENTO CARD
   ========================================= */
function BentoCard({ icon, title, desc, delay }) {
  const [ref, isVisible] = useScrollReveal();
  
  return (
    <div 
      ref={ref}
      className={`bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[28px] border-2 border-gray-100 hover:border-black hover:shadow-2xl transition-all duration-500 group ${isVisible ? 'section-visible' : 'section-hidden'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-xl shadow-lg flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-black tracking-tight mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-[#86868B] leading-relaxed font-medium text-sm sm:text-[15px] group-hover:text-black transition-colors">
        {desc}
      </p>
    </div>
  );
}

function MetricItem({ value, label, accent, delay }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div 
      ref={ref}
      className={`px-4 py-8 sm:py-12 group hover:bg-gray-50 transition-all duration-700 ${isVisible ? 'section-visible' : 'section-hidden'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`text-3xl sm:text-4xl lg:text-6xl font-bold mb-1 sm:mb-2 tracking-tighter transition-transform group-hover:scale-110 ${accent ? "text-black" : "text-black/80"}`}>
        {value}
      </div>
      <div className={`text-[10px] sm:text-[13px] font-bold uppercase tracking-[0.2em] ${accent ? "text-black" : "text-[#86868B]"}`}>
        {label}
      </div>
    </div>
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const baseStyles = "px-8 py-4 sm:py-5 rounded-full text-base sm:text-[17px] font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white border-2 border-black text-black hover:bg-gray-50 shadow-sm",
    ghost: "bg-transparent text-black hover:bg-gray-100 shadow-none"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function SectionHeader({ title, subtitle, description, align = "center", light = false }) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-20 ${alignment}`}>
      <h2 className={`text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-6 sm:mb-8 leading-tight ${light ? 'text-white' : 'text-black'}`}>
        {title}
        {subtitle && (
          <>
            <br />
            <span className="text-gray-400">{subtitle}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-base sm:text-[18px] lg:text-[19px] font-normal leading-relaxed px-2 sm:px-0 ${light ? 'text-white/80' : 'text-[#86868B]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureItem({ title, desc, dotColor = "bg-black" }) {
  return (
    <div className="flex items-start">
      <div className="mt-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mr-3 sm:mr-4">
        <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${dotColor} rounded-full`} />
      </div>
      <div>
        <h4 className="text-[#1D1D1F] font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 tracking-tight">
          {title}
        </h4>
        <p className="text-[#86868B] leading-relaxed text-sm sm:text-base">
          {desc}
        </p>
      </div>
    </div>
  );
}

function SectionReveal({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'section-visible' : 'section-hidden'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================
   MAIN APP
   ========================================= */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white selection:bg-opacity-90">
      <Navbar onOpenDeck={() => setModalOpen(true)} />
      <PitchDeckModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── HERO ─────────────────────────────────── */}
      <section
        id="platform"
        className="relative flex items-center justify-center min-h-[100svh] overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24"
      >
        <div className="absolute inset-0 bg-premium-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-100 rounded-full blur-[100px] animate-float-slow opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full blur-[120px] animate-float opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[600px] lg:h-[800px] bg-gray-100 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none opacity-50" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide mb-6 sm:mb-10 shadow-xl animate-fade-in">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white flex-shrink-0" />
            <span>Introducing Gemini 1.5 Clinical Integration</span>
          </div>

          <h1 className="text-[clamp(2.8rem,9vw,7rem)] font-bold tracking-tighter mb-5 sm:mb-8 leading-[0.9] text-black animate-fade-in">
            The intelligent core <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-600 to-black bg-[length:200%_auto] animate-shimmer">
              for modern healthcare.
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-[#86868B] max-w-2xl mx-auto mb-8 sm:mb-14 font-medium tracking-tight leading-relaxed sm:leading-snug px-2 sm:px-0 animate-fade-in [animation-delay:0.2s]">
            CURA orchestrates real-time synergy between patients, clinics, and
            pharmacies — removing friction to ensure life-saving accuracy at
            scale.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto px-2 sm:px-0 animate-fade-in [animation-delay:0.4s]">
            <Button>
              Explore Platform <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              View Pitch Deck
            </Button>
          </div>

          <div className="mt-20 animate-bounce cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-white border-y border-gray-100/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-gray-100 text-center">
            {[
              { value: "100k+", label: "Active System Nodes", accent: false },
              { value: "4.5M", label: "Triage Executions", accent: false },
              { value: "2.4K", label: "Verified Pharmacies", accent: false },
              { value: "99.9%", label: "Platform Reliability", accent: true },
            ].map(({ value, label, accent }, idx) => (
              <MetricItem key={label} value={value} label={label} accent={accent} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CORE ENGINE ───────────────────────── */}
      <section
        id="intelligence"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gray-100 rounded-full blur-[100px] pointer-events-none opacity-40" />
        <SectionReveal>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-2xl">
              <Cpu className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-4 sm:mb-6 text-black tracking-tight leading-tight">
              Clinical intelligence.
              <br />
              <span className="text-gray-400">Built right in.</span>
            </h2>
            <p className="text-[#86868B] text-base sm:text-[18px] lg:text-[19px] mb-8 sm:mb-10 leading-relaxed font-medium">
              By directly integrating Google Gemini 1.5 into our core routing
              layer, CURA automatically interprets handwritten prescriptions,
              triangulates symptom severity, and eliminates human-error latency.
            </p>
            <div className="space-y-6 sm:space-y-8">
              <FeatureItem 
                title="Optical Interpretation" 
                desc="Converts physical doctor notes into structured, executable pharmacy routing data instantly." 
              />
              <FeatureItem 
                dotColor="bg-gray-400"
                title="Encrypted Analysis" 
                desc="Symptom data is sanitized client-side before being processed by the intelligence layer." 
              />
            </div>
          </div>

          {/* Code window */}
          <div className="relative group mt-8 lg:mt-0 animate-float">
            <div className="absolute -inset-4 bg-gray-200 opacity-30 blur-2xl group-hover:opacity-50 transition duration-700 rounded-3xl" />
            <div className="bg-white border-2 border-black p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:rotate-1 hover:scale-[1.02]">
              <div className="bg-white rounded-[16px] sm:rounded-[20px] border border-gray-100 overflow-hidden">
                {/* Titlebar */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-100/80 bg-white">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27C93F]" />
                  <div className="text-[10px] sm:text-xs text-[#86868B] ml-3 sm:ml-4 font-mono font-medium tracking-wide">
                    inference_engine.js
                  </div>
                </div>
                {/* Code body */}
                <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[13px] leading-relaxed overflow-x-auto">
                  <p className="text-[#86868B] mb-3 sm:mb-4">
                    {"/* Executing confident clinical parse */"}
                  </p>
                  <p className="text-black whitespace-nowrap">
                    <span className="text-gray-400">const</span> result ={" "}
                    <span className="text-black font-bold">await</span>{" "}
                    gemini.parse(rx);
                  </p>
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-3 border border-gray-100 shadow-inner">
                    <p className="text-black">{"{"}</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="text-gray-500">"medication"</span>:{" "}
                      <span className="text-black font-medium">
                        "Amoxicillin 500mg"
                      </span>
                      ,
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="text-gray-500">"stock_status"</span>:{" "}
                      <span className="text-black font-medium">true</span>,
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="text-gray-500">"confidence"</span>:{" "}
                      <span className="text-black font-medium">0.9992</span>,
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="text-gray-500">"routing"</span>:{" "}
                      <span className="text-black font-medium">"Sector_7_Main"</span>
                    </p>
                    <p className="text-black">{"}"}</p>
                  </div>
                  <p className="text-black font-bold mt-3 sm:mt-4 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-black mr-2 flex-shrink-0 animate-pulse" />
                    Dispatched to available pharmacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>

      {/* ── INFRASTRUCTURE ───────────────────────── */}
      <section
        id="infrastructure"
        className="py-16 sm:py-24 lg:py-32 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="A fortress of infrastructure."
            description="We've bypassed fragile mapping frameworks in favor of a zero-dependency local discovery engine, secured by granular Supabase RLS protocols."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <BentoCard
              icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Locally Computed"
              desc="Haversine geometry runs on the edge. No dependency on Google Maps — zero external downtime, ever."
              delay={0}
            />
            <BentoCard
              icon={<Shield className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Zero-Trust Vault"
              desc="Architected on Supabase. Row-level security ensures clinical data is only visible to the right participants."
              delay={100}
            />
            <BentoCard
              icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Real-Time Sync"
              desc="Sub-millisecond WebSockets ensure a vital prescription reaches the pharmacy in real time."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* ── SCALE CTA ────────────────────────────── */}
      <section
        id="scale"
        className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-100"
      >
        <div className="absolute inset-0 bg-premium-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-black to-transparent" />
        
        {/* Decorative floating shapes */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-gray-100 rounded-full blur-[100px] animate-float opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gray-100 rounded-full blur-[100px] animate-float-slow opacity-50" />

        <SectionReveal>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-2xl flex items-center justify-center mb-10 shadow-2xl hover:rotate-12 transition-all cursor-pointer group">
              <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-white group-hover:scale-110 transition-transform" />
            </div>
            
            <SectionHeader 
              title="Proven in complexity."
              subtitle="Designed for scale."
              description="Forged in Cairo's high-density medical sector. A system built to handle extreme fragmentation is ready to deploy globally."
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button>Request Implementation</Button>
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                View Investor Deck
              </Button>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2 text-black">
            <Activity className="h-5 w-5 stroke-[2.5]" />
            <span className="font-bold tracking-tighter text-xl">CURA</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-[#86868B] font-bold">
            <a
              href="#platform"
              className="hover:text-black transition-colors"
            >
              Privacy
            </a>
            <a
              href="#platform"
              className="hover:text-black transition-colors"
            >
              Terms
            </a>
            <span>© 2026 CURA Technologies. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
