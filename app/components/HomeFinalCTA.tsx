"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimationControls, Variants } from "framer-motion";
import {
  Ticket,
  Cake,
  MapPin,
  Sparkles,
  ArrowRight,
  Star,
  PartyPopper,
  Users,
  Clock
} from "lucide-react";
import BirthdayBookingModal from "./birthday/BirthdayBookingModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const floatingElements = [
  { icon: "🎈", delay: 0, x: "6%", y: "15%" },
  { icon: "🎪", delay: 0.5, x: "12%", y: "70%" },
  { icon: "🎠", delay: 1, x: "88%", y: "18%" },
  { icon: "🎡", delay: 1.5, x: "84%", y: "72%" },
  { icon: "🎢", delay: 2, x: "50%", y: "8%" },
  { icon: "✨", delay: 2.5, x: "25%", y: "82%" },
];

export default function HomeFinalCTA() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const controls = useAnimationControls();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      controls.start("visible");
    }
  }, [isInView, controls, isMounted]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  const handleScrollToLocations = (e: React.MouseEvent) => {
    e.preventDefault();
    const locSection = document.getElementById("locations");
    if (locSection) {
      locSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#0a0a14] flex items-center justify-center text-white border-t border-white/10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Full-Bleed High-Quality Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/image/intro/CTA-jusjumpin.webp"
            alt="Kids enjoying trampoline park at Jus Jumpin"
            fill
            priority
            className="object-cover object-center transform scale-105 filter brightness-[0.85] contrast-[1.05] saturate-[1.15]"
            sizes="100vw"
            quality={90}
          />

          {/* Layered Gradient Overlays for High Legibility & Vivid Colors */}
          <div className="absolute inset-0 bg-[#0a0a14]/60 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-[#0a0a14]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/70 via-transparent to-[#0a0a14]/70" />

          {/* Interactive spotlight following cursor */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(109, 192, 101, 0.18) 0%, transparent 45%)`,
              transition: "background 0.25s ease-out",
            }}
          />

          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:36px_36px]" />
          </div>

          {/* Animated floating elements (Hidden on small mobile to keep focus on CTA) */}
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl sm:text-4xl lg:text-5xl select-none pointer-events-none hidden sm:block"
              style={{ left: element.x, top: element.y }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, -10, 0],
                rotate: [0, 6, -6, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
            >
              <motion.span
                animate={{
                  opacity: [0.35, 0.85, 0.35],
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay,
                }}
                className="drop-shadow-2xl"
              >
                {element.icon}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Content Box */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center max-w-5xl">
          {/* Header Pill */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-[11px] sm:text-xs font-black text-[#6dc065] uppercase tracking-wider sm:tracking-widest mb-4 sm:mb-6 shadow-xl shadow-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" />
              <span className="drop-shadow-md">Ready for the Ultimate Bounce?</span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight mb-3 sm:mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            Reserve Your Fun Today &{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#d4e157] drop-shadow-md">
              Create Unforgettable Memories!
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-slate-100 text-xs sm:text-base md:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Join thousands of happy kids and families at Jus Jumpin.
            Book your tickets online or host a grand birthday party today!
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-5 sm:mt-7 mb-7 sm:mb-9"
          >
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 sm:bg-white/10 backdrop-blur-xl border border-white/20 shadow-md">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs sm:text-sm font-bold text-white">4.9/5 Rating</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 sm:bg-white/10 backdrop-blur-xl border border-white/20 shadow-md">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6dc065]" />
              <span className="text-xs sm:text-sm font-bold text-white">1 Million+ Smiles</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 sm:bg-white/10 backdrop-blur-xl border border-white/20 shadow-md">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8fc93a]" />
              <span className="text-xs sm:text-sm font-bold text-white">Open 7 Days</span>
            </div>
          </motion.div>

          {/* Optimized Action Buttons with clear hierarchy */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 lg:gap-5 w-full max-w-3xl mx-auto"
          >
            {/* Primary Action: Book Tickets */}
            <motion.a
              href="https://jusjumpin.co.in/customer/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-[#6dc065] via-[#7bc652] to-[#b2d235] text-slate-950 font-black text-sm sm:text-base rounded-full shadow-[0_8px_25px_rgba(109,192,101,0.45)] hover:shadow-[0_12px_32px_rgba(109,192,101,0.6)] overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-white/25 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>Book Tickets Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            {/* Secondary Action: Book Birthday Party */}
            <motion.button
              onClick={() => setIsBookingModalOpen(true)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center px-6 sm:px-7 py-3.5 sm:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-xl border-2 border-white/40 hover:border-yellow-300/80 text-white font-black text-sm sm:text-base rounded-full overflow-hidden transition-all duration-300 shadow-lg shadow-black/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Cake className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <span>Book Birthday Party</span>
                <PartyPopper className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-transform text-pink-300" />
              </span>
            </motion.button>

            {/* Tertiary Action: Find Nearest Location */}
            <motion.a
              href="#locations"
              onClick={handleScrollToLocations}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-xl border border-white/25 hover:border-[#6dc065] text-slate-100 font-bold text-sm sm:text-base rounded-full transition-all duration-300 overflow-hidden shadow-lg shadow-black/40"
            >
              <span className="absolute inset-0 bg-[#6dc065]/15 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#6dc065] group-hover:scale-110 transition-transform" />
                <span>Find Location</span>
              </span>
            </motion.a>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex items-center justify-center gap-3"
          >
            <div className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  </motion.span>
                ))}
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm text-slate-200 font-medium">
                Trusted by parents across India
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6dc065]/50 to-transparent" />
      </motion.section>

      {/* Booking Modal */}
      <BirthdayBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}