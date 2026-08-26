// app/components/shared/PromoPopup.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PromoPopup() {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_PROMO_POPUP?.toLowerCase() === "true";
  const redirectUrl = process.env.NEXT_PUBLIC_PROMO_POPUP_URL || "/our-activities";
  const popupTitle = process.env.NEXT_PUBLIC_PROMO_POPUP_TITLE || "Celebrate Freedom & Play!";
  const popupDesc = process.env.NEXT_PUBLIC_PROMO_POPUP_DESC || "Join us for the ultimate high-energy trampoline experience and massive indoor slides during this Independence Day week!";

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!isEnabled) return;

    // Check localStorage cache (24 hours cooldown)
    const dismissedTime = localStorage.getItem("jj_promo_dismissed_time");
    if (dismissedTime) {
      const parsedTime = parseInt(dismissedTime, 10);
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - parsedTime < oneDay) {
        return;
      }
    }

    // Delay popup entry by 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isEnabled]);

  if (!isEnabled || !mounted) {
    return null;
  }

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("jj_promo_dismissed_time", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Image-Based Glassmorphism Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="relative w-full max-w-[420px] aspect-[3/4] md:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 bg-zinc-950 flex flex-col justify-end"
          >
            {/* Background Image of kids jumping / playing */}
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
              alt="Kids jumping at trampoline park"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Dark Vignette Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40 select-none pointer-events-none" />

            {/* Top Left Flag Badge */}
            <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 select-none shadow-lg max-w-[220px] md:max-w-none">
              <span className="flex gap-0.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#128807]" />
              </span>
              <span className="text-[9px] md:text-[10px] font-black tracking-wider uppercase text-white/90 truncate">
                Exclusive Offer this Independence Day!
              </span>
            </div>

            {/* Top Right Styled Cross Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-lg z-10"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Bottom Content Area (Frosted Glassmorphism Panel) */}
            <div className="w-[calc(100%-24px)] mx-3 mb-3 p-5 md:p-6 bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-10 flex flex-col justify-end">
              {/* Category Title */}
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#FF9933] mb-1 flex items-center gap-1.5 select-none">
                <Sparkles size={12} className="text-[#FF9933] animate-pulse" />
                Independence Day Special
              </span>

              {/* Main Title */}
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-1.5">
                {popupTitle}
              </h3>

              {/* Description */}
              <p className="text-zinc-300 text-xs md:text-sm mb-5 leading-relaxed font-semibold">
                {popupDesc}
              </p>

              {/* Row of Buttons (OK and More Details) */}
              <div className="flex gap-2.5 w-full">
                {/* OK/Dismiss button (30% width) */}
                <button
                  onClick={handleDismiss}
                  className="w-[30%] bg-white/10 hover:bg-white/15 border border-white/10 text-white font-extrabold py-3.5 px-2 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center cursor-pointer"
                >
                  OK
                </button>

                {/* More Details link button (70% width) */}
                <Link
                  href={redirectUrl}
                  onClick={handleDismiss}
                  className="w-[70%] bg-white hover:bg-white/95 text-black font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-1 cursor-pointer shadow-xl text-center"
                >
                  <span>More Details</span>
                  <ChevronRight size={14} className="stroke-[3]" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
