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

  const links = [
    { href: "#platform", label: "PLATFORM" },
    { href: "#intelligence", label: "INTELLIGENCE" },
    { href: "#infrastructure", label: "SECURITY" },
    { href: "#scale", label: "SCALE" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
          <Activity className="text-black h-5 w-5 sm:h-6 sm:w-6 stroke-[1.5]" />
          <span className="font-bold text-xl sm:text-2xl tracking-tighter font-display">CURA</span>
        </div>

        <div className="hidden md:flex space-x-12 text-[11px] font-mono font-bold tracking-[0.2em] text-black">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:line-through transition-all">
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenDeck}
          className="hidden md:block bg-black text-white px-8 py-3 text-[11px] font-mono font-bold tracking-[0.2em] hover:bg-white hover:text-black border border-black transition-instant"
        >
          REQUEST DEMO
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-black">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-black py-8 px-6 space-y-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-2xl font-display font-bold">{l.label}</a>
          ))}
          <button className="w-full bg-black text-white py-4 font-mono font-bold">REQUEST DEMO</button>
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
      className={`group bg-white p-10 border border-black transition-instant hover:bg-black hover:text-white ${isVisible ? 'section-visible' : 'section-hidden'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-black text-white border border-white flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-black transition-instant">
        {icon}
      </div>
      <h3 className="text-2xl font-bold font-display mb-4 tracking-tight">
        {title}
      </h3>
      <p className="font-body text-[17px] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
        {desc}
      </p>
    </div>
  );
}

function MetricItem({ value, label, delay }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div 
      ref={ref}
      className={`px-6 py-12 sm:py-16 group hover:bg-white/10 transition-instant border-b sm:border-b-0 sm:border-r border-white/20 last:border-0 ${isVisible ? 'section-visible' : 'section-hidden'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-5xl sm:text-7xl font-bold font-display mb-3 tracking-tighter">
        {value}
      </div>
      <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.3em] opacity-50">
        {label}
      </div>
    </div>
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const baseStyles = "px-6 sm:px-10 py-4 sm:py-5 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase transition-instant flex items-center justify-center border-2";
  const variants = {
    primary: "bg-black text-white border-black hover:bg-white hover:text-black",
    secondary: "bg-white text-black border-black hover:bg-black hover:text-white",
    ghost: "bg-transparent text-black border-transparent hover:line-through"
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
    <div className={`flex flex-col max-w-5xl mb-12 sm:mb-24 ${alignment}`}>
      <h2 className={`text-[clamp(1.75rem,8vw,6rem)] font-bold tracking-tight mb-4 sm:mb-8 leading-[1] sm:leading-[0.9] font-display ${light ? 'text-white' : 'text-black'}`}>
        {title}
        {subtitle && (
          <>
            <br />
            <span className="text-gray-400 italic font-medium">{subtitle}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-base sm:text-xl lg:text-2xl font-body leading-relaxed max-w-3xl ${light ? 'text-white/70' : 'text-black/60'}`}>
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
        className="relative flex items-center justify-center min-h-screen px-5 sm:px-6 pt-28 sm:pt-40 pb-20 sm:pb-32 bg-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-mono-grid" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start text-left">
          <div className="inline-block border border-black px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-8 sm:mb-12 animate-fade-in">
            GEMINI 1.5 INTEGRATION LIVE
          </div>

          <h1 className="text-[clamp(2.5rem,15vw,12rem)] font-bold leading-[0.85] sm:leading-[0.8] font-display text-black mb-8 sm:mb-12 tracking-tighter">
            STARK<br />
            <span className="italic font-medium text-gray-400">INTELLIGENCE.</span>
          </h1>

          <div className="w-full h-0.5 sm:h-1 bg-black mb-10 sm:mb-16" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-end w-full">
            <p className="text-lg sm:text-2xl lg:text-3xl font-body leading-relaxed text-black max-w-2xl">
              CURA orchestrates real-time synergy between patients, clinics, and
              pharmacies — removing friction to ensure life-saving accuracy at
              scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                EXPLORE CORE <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button variant="secondary" onClick={() => setModalOpen(true)} className="w-full sm:w-auto">
                INVESTOR DECK
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-black w-full" />

      {/* ── METRICS ──────────────────────────────── */}
      <section className="bg-black text-white py-0 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-lines-v" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "100k+", label: "SYSTEM NODES" },
              { value: "4.5M", label: "EXECUTIONS" },
              { value: "2.4K", label: "PHARMACIES" },
              { value: "99.9%", label: "RELIABILITY" },
            ].map(({ value, label }, idx) => (
              <MetricItem key={label} value={value} label={label} delay={idx * 50} />
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 bg-black w-full" />

      <section
        id="intelligence"
        className="py-32 px-6 relative overflow-hidden bg-white"
      >
        <div className="absolute inset-0 bg-mono-grid" />
        <SectionReveal>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-10 border border-black transition-instant hover:bg-white hover:text-black">
                <Cpu className="h-8 w-8 stroke-[1.5]" />
              </div>
              
              <SectionHeader 
                align="left"
                title="Clinical intelligence."
                subtitle="Built right in."
                description="By directly integrating Google Gemini 1.5 into our core routing layer, CURA automatically interprets handwritten prescriptions, triangulates symptom severity, and eliminates human-error latency."
              />

              <div className="space-y-10">
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

            <div className="relative group animate-fade-in w-full overflow-hidden">
              <div className="bg-white border-[3px] border-black p-0.5 sm:p-1 transition-instant sm:group-hover:-translate-y-2 sm:group-hover:translate-x-2">
                <div className="border border-black overflow-hidden">
                  <div className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-black bg-gray-50">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-black" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-black/40" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-black/10" />
                    <div className="text-[9px] sm:text-[11px] text-black ml-2 sm:ml-4 font-mono font-bold tracking-widest uppercase truncate">
                      inference_engine.js
                    </div>
                  </div>
                  <div className="p-4 sm:p-8 font-mono text-[11px] sm:text-[13px] leading-relaxed bg-white overflow-x-auto">
                    <p className="text-black/40 mb-3 sm:mb-4 whitespace-nowrap">{"// Executing clinical parse"}</p>
                    <p className="text-black whitespace-nowrap">
                      <span className="font-bold">const</span> result = <span className="font-bold">await</span> gemini.parse(rx);
                    </p>
                    <div className="bg-gray-50 p-4 sm:p-6 mt-4 sm:mt-6 border-l-4 border-black min-w-[200px]">
                      <p className="text-black">{"{"}</p>
                      <p className="pl-4 sm:pl-6 whitespace-nowrap"><span className="text-black/50">"medication"</span>: <span className="font-bold">"Amoxicillin"</span>,</p>
                      <p className="pl-4 sm:pl-6"><span className="text-black/50">"stock"</span>: <span className="font-bold">true</span>,</p>
                      <p className="pl-4 sm:pl-6"><span className="text-black/50">"confidence"</span>: <span className="font-bold">0.99</span></p>
                      <p className="text-black">{"}"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="h-1 bg-black w-full" />

      {/* ── INFRASTRUCTURE ───────────────────────── */}
      <section
        id="infrastructure"
        className="py-32 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="A fortress of infrastructure."
            description="We've bypassed fragile mapping frameworks in favor of a zero-dependency local discovery engine, secured by granular Supabase RLS protocols."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-black">
            <BentoCard
              icon={<Globe className="h-6 w-6 stroke-[1.5]" />}
              title="Locally Computed"
              desc="Haversine geometry runs on the edge. No dependency on Google Maps — zero external downtime, ever."
              delay={0}
            />
            <BentoCard
              icon={<Shield className="h-6 w-6 stroke-[1.5]" />}
              title="Zero-Trust Vault"
              desc="Architected on Supabase. Row-level security ensures clinical data is only visible to the right participants."
              delay={100}
            />
            <BentoCard
              icon={<Zap className="h-6 w-6 stroke-[1.5]" />}
              title="Real-Time Sync"
              desc="Sub-millisecond WebSockets ensure a vital prescription reaches the pharmacy in real time."
              delay={200}
            />
          </div>
        </div>
      </section>

      <div className="h-2 bg-black w-full" />

      {/* ── SCALE CTA ────────────────────────────── */}
      <section
        id="scale"
        className="py-24 sm:py-40 px-6 bg-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-lines-v opacity-20" />
        
        <SectionReveal>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white text-black flex items-center justify-center mb-12 sm:mb-16 border border-white hover:bg-black hover:text-white transition-instant group cursor-pointer">
              <Activity className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-125 transition-transform" />
            </div>
            
            <SectionHeader 
              light
              title="Proven in complexity."
              subtitle="Designed for scale."
              description="Forged in Cairo's high-density medical sector. A system built to handle extreme fragmentation is ready to deploy globally."
            />

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-12 w-full sm:w-auto">
              <Button variant="secondary" className="border-white w-full sm:w-auto">REQUEST IMPLEMENTATION</Button>
              <Button variant="ghost" onClick={() => setModalOpen(true)} className="text-white hover:text-white w-full sm:w-auto">
                VIEW INVESTOR DECK →
              </Button>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="bg-white border-t-4 border-black py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-black">
              <Activity className="h-6 w-6 stroke-[1.5]" />
              <span className="font-bold tracking-tighter text-3xl font-display">CURA</span>
            </div>
            <p className="text-black/50 max-w-sm font-body">
              The intelligent infrastructure for modern healthcare. Built for scale, secured by design.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <div className="space-y-4">
              <h4 className="font-mono text-[11px] font-bold tracking-widest text-black/30 uppercase">Platform</h4>
              <nav className="flex flex-col space-y-3 text-[14px] font-bold">
                <a href="#" className="hover:line-through">Intelligence</a>
                <a href="#" className="hover:line-through">Security</a>
                <a href="#" className="hover:line-through">Global Scale</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[11px] font-bold tracking-widest text-black/30 uppercase">Legal</h4>
              <nav className="flex flex-col space-y-3 text-[14px] font-bold">
                <a href="#" className="hover:line-through">Privacy</a>
                <a href="#" className="hover:line-through">Terms</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[11px] font-bold tracking-widest text-black/30 uppercase">Contact</h4>
              <nav className="flex flex-col space-y-3 text-[14px] font-bold">
                <a href="mailto:hello@cura.tech" className="hover:line-through">hello@cura.tech</a>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] font-mono font-bold text-black/40">
          <span>© 2026 CURA TECHNOLOGIES. ALL RIGHTS RESERVED.</span>
          <span>STAY STARK.</span>
        </div>
      </footer>
    </div>
  );
}
