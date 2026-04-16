import React, { useState, useEffect } from 'react';
import {
  Shield, Globe, Zap, Cpu, ArrowRight, Sparkles,
  Activity, X, Download, PlayCircle, Menu
} from 'lucide-react';

// =============================================
// CONFIGURATION — Replace these with real links
// =============================================
const PITCH_DECK_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const DEMO_URL = "#demo";
// =============================================

/* =========================================
   PITCH DECK MODAL
   ========================================= */
function PitchDeckModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
      <div className="
        relative bg-[#FBFBFD] w-full max-w-5xl
        rounded-t-[28px] sm:rounded-[28px] md:rounded-[32px]
        shadow-[0_32px_80px_rgba(0,0,0,0.18)]
        flex flex-col
        max-h-[92vh] sm:max-h-[88vh]
        border border-white/60
        animate-[scaleIn_0.22s_ease-out_forwards]
        overflow-hidden
      ">
        {/* Modal Header */}
        <div className="flex items-center justify-between
          px-5 sm:px-8 py-4 sm:py-5
          border-b border-gray-200/60 bg-white/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Activity className="text-[#0071E3] h-5 w-5 stroke-[2.5] flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base md:text-lg tracking-tight text-[#1D1D1F] truncate">
              U-MED Executive Architecture Deck
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
          <div className="
            w-full lg:w-[38%]
            px-5 sm:px-8 py-6 sm:py-10
            border-b lg:border-b-0 lg:border-r border-gray-200/60
            flex flex-col bg-[#FBFBFD]
            overflow-y-auto flex-shrink-0
          ">
            <span className="inline-flex items-center bg-blue-50 border border-blue-100 text-[#0071E3] px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-4 sm:mb-6 w-fit">
              Confidential
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mb-3 sm:mb-4 leading-tight">
              Investment<br />Abstract
            </h3>
            <p className="text-[#86868B] leading-relaxed text-sm sm:text-[15.5px] mb-6">
              U-MED is fundamentally reorganizing healthcare routing. This deck outlines our clinical edge intelligence, our API-free engineering moat, and expansion methodology designed for hyper-dense urban markets.
            </p>

            {/* Action Buttons */}
            <div className="mt-auto pt-6 border-t border-gray-200/60 space-y-3">
              <a
                href={PITCH_DECK_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#1D1D1F] text-white px-5 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-[16px] font-medium hover:bg-[#333336] transition-all flex items-center justify-center shadow-md"
              >
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                Download Full Deck
              </a>
              <a
                href={DEMO_URL}
                className="w-full bg-white border border-gray-200 text-[#1D1D1F] px-5 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-[16px] font-medium hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm"
              >
                <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#0071E3]" />
                Access Prototype Demo
              </a>
            </div>
          </div>

          {/* Right: Embedded PDF viewer (hidden on small phones, shown md+) */}
          <div className="hidden sm:flex w-full lg:w-[62%] bg-[#F0F0F3] relative min-h-[300px] lg:min-h-0">
            <iframe
              src={`${PITCH_DECK_URL}#view=FitH&toolbar=0`}
              className="absolute inset-0 w-full h-full border-0"
              title="U-MED Pitch Deck"
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
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const links = [
    { href: '#platform', label: 'Platform' },
    { href: '#intelligence', label: 'Intelligence' },
    { href: '#infrastructure', label: 'Security' },
    { href: '#scale', label: 'Scale' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#FBFBFD]/80 backdrop-blur-2xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Activity className="text-[#0071E3] h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-[#1D1D1F]">U-MED</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8 lg:space-x-10 text-sm font-medium tracking-wide text-[#86868B]">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-[#1D1D1F] transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={onOpenDeck}
          className="hidden md:block bg-[#1D1D1F] text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm font-medium hover:bg-[#333336] transition-colors shadow-sm"
        >
          Request Demo
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 text-[#1D1D1F] rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-md py-4 px-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 px-2 text-[#1D1D1F] font-medium text-base border-b border-gray-50 last:border-0 hover:text-[#0071E3] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onOpenDeck(); }}
            className="mt-3 w-full bg-[#1D1D1F] text-white px-5 py-3 rounded-full text-sm font-medium"
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
function BentoCard({ icon, title, desc }) {
  return (
    <div className="bg-[#FBFBFD] p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[28px] border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-300">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 sm:mb-8 text-[#1D1D1F]">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight mb-2 sm:mb-3">{title}</h3>
      <p className="text-[#86868B] leading-relaxed font-normal text-sm sm:text-[15px]">{desc}</p>
    </div>
  );
}

/* =========================================
   MAIN APP
   ========================================= */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white">

      <Navbar onOpenDeck={() => setModalOpen(true)} />
      <PitchDeckModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── HERO ─────────────────────────────────── */}
      <section id="platform" className="relative flex items-center justify-center min-h-[100svh] overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24">
        <div className="absolute inset-0 bg-premium-grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFD] via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[600px] lg:h-[800px] bg-blue-100/40 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-[#1D1D1F] px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide mb-6 sm:mb-10 shadow-sm">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#0071E3] flex-shrink-0" />
            <span>Introducing Gemini 1.5 Clinical Integration</span>
          </div>

          <h1 className="text-[clamp(2.4rem,8vw,6rem)] font-semibold tracking-[-0.04em] mb-5 sm:mb-8 leading-[1.05] text-[#1D1D1F]">
            The intelligent core{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#409CFF]">
              for modern healthcare.
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-[#86868B] max-w-2xl mx-auto mb-8 sm:mb-14 font-normal tracking-tight leading-relaxed sm:leading-snug px-2 sm:px-0">
            U-MED orchestrates real-time synergy between patients, clinics, and pharmacies — removing friction to ensure life-saving accuracy at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto px-2 sm:px-0">
            <button className="bg-[#0071E3] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-[17px] font-medium hover:bg-[#0060C0] transition-all shadow-md hover:shadow-lg flex items-center justify-center">
              Explore Platform <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white border border-gray-200 text-[#1D1D1F] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-[17px] font-medium hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
            >
              View Pitch Deck
            </button>
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-white border-y border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-gray-100 text-center">
            {[
              { value: '100k+', label: 'Active System Nodes', accent: false },
              { value: '4.5M',  label: 'Triage Executions',   accent: false },
              { value: '2.4K',  label: 'Verified Pharmacies', accent: false },
              { value: '99.9%', label: 'Platform Reliability', accent: true  },
            ].map(({ value, label, accent }) => (
              <div key={label} className="px-4 py-8 sm:py-12">
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-semibold mb-1 sm:mb-2 tracking-tight ${accent ? 'text-[#0071E3]' : 'text-[#1D1D1F]'}`}>
                  {value}
                </div>
                <div className={`text-[10px] sm:text-[13px] font-medium uppercase tracking-widest ${accent ? 'text-[#0071E3]' : 'text-[#86868B]'}`}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CORE ENGINE ───────────────────────── */}
      <section id="intelligence" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          
          {/* Text */}
          <div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-[#0071E3] rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-sm">
              <Cpu className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mb-4 sm:mb-6 text-[#1D1D1F] tracking-tight leading-tight">
              Clinical intelligence.<br />Built right in.
            </h2>
            <p className="text-[#86868B] text-base sm:text-[18px] lg:text-[19px] mb-8 sm:mb-10 leading-relaxed font-normal">
              By directly integrating Google Gemini 1.5 into our core routing layer, U-MED automatically interprets handwritten prescriptions, triangulates symptom severity, and eliminates human-error latency.
            </p>
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  dot: 'bg-[#0071E3]', bg: 'bg-blue-50',
                  title: 'Optical Interpretation',
                  desc: 'Converts physical doctor notes into structured, executable pharmacy routing data instantly.'
                },
                {
                  dot: 'bg-gray-400', bg: 'bg-gray-50 border border-gray-100',
                  title: 'Encrypted Analysis',
                  desc: 'Symptom data is sanitized client-side before being processed by the intelligence layer.'
                },
              ].map(({ dot, bg, title, desc }) => (
                <div key={title} className="flex items-start">
                  <div className={`mt-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0 mr-3 sm:mr-4`}>
                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${dot} rounded-full`} />
                  </div>
                  <div>
                    <h4 className="text-[#1D1D1F] font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 tracking-tight">{title}</h4>
                    <p className="text-[#86868B] leading-relaxed text-sm sm:text-base">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code window */}
          <div className="relative group mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-transparent opacity-50 blur-2xl group-hover:opacity-70 transition duration-700 rounded-3xl" />
            <div className="bg-white border border-gray-200/60 p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative overflow-hidden">
              <div className="bg-[#FBFBFD] rounded-[16px] sm:rounded-[20px] border border-gray-100 overflow-hidden">
                {/* Titlebar */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-100/80 bg-white">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27C93F]" />
                  <div className="text-[10px] sm:text-xs text-[#86868B] ml-3 sm:ml-4 font-mono font-medium tracking-wide">inference_engine.js</div>
                </div>
                {/* Code body */}
                <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[13px] leading-relaxed overflow-x-auto">
                  <p className="text-[#86868B] mb-3 sm:mb-4">{'/* Executing confident clinical parse */'}</p>
                  <p className="text-[#1D1D1F] whitespace-nowrap">
                    <span className="text-[#AF52DE]">const</span> result = <span className="text-[#0071E3]">await</span> gemini.parse(rx);
                  </p>
                  <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 mt-3 border border-gray-100 shadow-sm">
                    <p className="text-[#1D1D1F]">{'{'}</p>
                    <p className="pl-3 sm:pl-4"><span className="text-[#0071E3]">"medication"</span>: <span className="text-[#34C759]">"Amoxicillin 500mg"</span>,</p>
                    <p className="pl-3 sm:pl-4"><span className="text-[#0071E3]">"stock_status"</span>: <span className="text-[#AF52DE]">true</span>,</p>
                    <p className="pl-3 sm:pl-4"><span className="text-[#0071E3]">"confidence"</span>: <span className="text-[#FF9500]">0.9992</span>,</p>
                    <p className="pl-3 sm:pl-4"><span className="text-[#0071E3]">"routing"</span>: <span className="text-[#34C759]">"Sector_7_Main"</span></p>
                    <p className="text-[#1D1D1F]">{'}'}</p>
                  </div>
                  <p className="text-[#34C759] font-medium mt-3 sm:mt-4 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] mr-2 flex-shrink-0" />
                    Dispatched to available pharmacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ───────────────────────── */}
      <section id="infrastructure" className="py-16 sm:py-24 lg:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold text-[#1D1D1F] tracking-tight mb-4 sm:mb-6">
              A fortress of infrastructure.
            </h2>
            <p className="text-base sm:text-[18px] lg:text-[19px] text-[#86868B] font-normal leading-relaxed">
              We've bypassed fragile mapping frameworks in favor of a zero-dependency local discovery engine, secured by granular Supabase RLS protocols.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <BentoCard
              icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Locally Computed"
              desc="Haversine geometry runs on the edge. No dependency on Google Maps — zero external downtime, ever."
            />
            <BentoCard
              icon={<Shield className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Zero-Trust Vault"
              desc="Architected on Supabase. Row-level security ensures clinical data is only visible to the right participants."
            />
            <BentoCard
              icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Real-Time Sync"
              desc="Sub-millisecond WebSockets ensure a vital prescription reaches the pharmacy in real time."
            />
          </div>
        </div>
      </section>

      {/* ── SCALE CTA ────────────────────────────── */}
      <section id="scale" className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-[#FBFBFD] relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 bg-premium-grid" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center mb-8 sm:mb-10 shadow-sm">
            <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D1D1F]" />
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6 sm:mb-8 text-[#1D1D1F] leading-tight">
            Proven in complexity.<br />Designed for scale.
          </h2>
          <p className="text-base sm:text-[18px] lg:text-[19px] text-[#86868B] mb-10 sm:mb-12 font-normal leading-relaxed px-2 sm:px-0">
            Forged in Cairo's high-density medical sector. A system built to handle extreme fragmentation is ready to deploy globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="bg-[#0071E3] text-white px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-[17px] font-medium hover:bg-[#0060C0] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
              Request Implementation
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white border border-gray-200 text-[#1D1D1F] px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-[17px] font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              View Investor Deck
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2 text-[#1D1D1F]">
            <Activity className="h-5 w-5 stroke-[2.5]" />
            <span className="font-semibold tracking-tight text-lg">U-MED</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-[#86868B] font-medium">
            <a href="#platform" className="hover:text-[#0071E3] transition-colors">Privacy</a>
            <a href="#platform" className="hover:text-[#0071E3] transition-colors">Terms</a>
            <span>© 2026 U-MED Technologies. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
