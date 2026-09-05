"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, PartyPopper, ArrowUpRight, Sparkles, Phone, ChevronLeft } from "lucide-react";

// Official WhatsApp SVG icon
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppSideTab() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-none"
      aria-label="WhatsApp Enquiries"
    >
      <div className="relative flex items-center justify-end">
        {/* ── 1. SLIDE-OUT OPTIONS PANEL (POSITIONED ABSOLUTELY TO THE LEFT OF TAB) ── */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 transition-all duration-300 ease-out origin-right transform ${
            isOpen
              ? "translate-x-0 opacity-100 scale-100 pointer-events-auto visible"
              : "translate-x-6 opacity-0 scale-95 pointer-events-none invisible"
          } w-[290px] sm:w-[320px] bg-slate-950/95 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl p-3.5 sm:p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
        >
          {/* Top Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black tracking-tight text-white flex items-center gap-1.5" style={{ fontFamily: "'Fredoka', 'Nunito', sans-serif" }}>
                  WhatsApp Enquiries
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Instant Reply</span>
                </div>
              </div>
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-2">
            {/* OPTION 1: GENERAL ENQUIRIES */}
            <a
              href="https://api.whatsapp.com/send?phone=919830359999&text=Hello!%20I%20have%20a%20general%20Query%20about%20Jus%27%20Jumpin."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/90 hover:bg-emerald-950/50 border border-white/10 hover:border-emerald-500/50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    General Enquiries
                  </h4>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                  Tickets, park timings & general info
                </p>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                  <Phone className="w-2.5 h-2.5" />
                  <span>+91 98303 59999</span>
                </div>
              </div>
            </a>

            {/* OPTION 2: BOOKINGS & BIRTHDAY PARTY */}
            <a
              href="https://api.whatsapp.com/send?phone=919800005721&text=Hey%20we%20need%20help%20for%20Bookings%20%26%20Birthday%20Party."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/90 hover:bg-purple-950/50 border border-white/10 hover:border-purple-500/50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <PartyPopper className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1">
                    Bookings & Birthday Party
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  </h4>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-purple-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                  Birthday packages, school trips & groups
                </p>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-purple-400">
                  <Phone className="w-2.5 h-2.5" />
                  <span>+91 98000 05721</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ── 2. SLIM VERTICAL EDGE TAB: MORE HEIGHT, LESS WIDTH ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="pointer-events-auto group relative flex flex-col items-center justify-between py-3.5 px-2 bg-gradient-to-b from-[#25D366] via-[#20bd5a] to-[#128C7E] hover:from-[#22c35e] hover:to-[#17a04e] text-white rounded-l-2xl shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.7)] border-y border-l border-white/30 transition-all duration-300 cursor-pointer focus:outline-none w-9 sm:w-10 min-h-[140px]"
          aria-expanded={isOpen}
        >
          {/* Top: WhatsApp Logo */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-[#25D366] shadow-sm group-hover:scale-110 transition-transform mb-2">
            <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#25D366]" />
          </div>

          {/* Middle: Vertical Text (Reading top to bottom) */}
          <span
            className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-white drop-shadow-sm rotate-180 py-1"
            style={{
              writingMode: "vertical-rl",
              fontFamily: "'Fredoka', 'Nunito', sans-serif",
            }}
          >
            WhatsApp Enquiries
          </span>

          {/* Bottom: Subtle indicator arrow */}
          <div className="mt-2 text-white/90 group-hover:-translate-x-0.5 transition-transform">
            <ChevronLeft
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

