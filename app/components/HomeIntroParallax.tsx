"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Users,
  Trophy,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Zap,
  Flame,
  Mountain,
  Target,
  PartyPopper,
  ArrowRight,
} from "lucide-react";
import LottieIcon from "./LottieIcon";

// ── Activity cards configuration ───────────────────────────────────────────
const ACTIVITIES = [
  {
    id: "trampoline",
    name: "Trampoline",
    tagline: "Bounce Higher",
    description: "Interconnected wall-to-wall trampolines, high flying slam dunks & tumble tracks.",
    image: "/image/intro/hero-trampoline-fun.webp",
    accentColor: "#a855f7",
    icon: Zap,
    link: "/our-activities#trampoline",
    shape: "rounded-diamond",
  },
  {
    id: "softplay",
    name: "Soft Play",
    tagline: "Play Safer",
    description: "Cushioned toddler mazes, colorful ball pits, foam obstacles and gentle slides.",
    image: "/image/intro/activity-softplay.webp",
    accentColor: "#ec4899",
    icon: Sparkles,
    link: "/our-activities#soft-play",
    shape: "corner-round",
  },
  {
    id: "ninja",
    name: "Ninja Course",
    tagline: "Challenge Yourself",
    description: "Speed runs, balance beams, hanging rings and high-adrenaline obstacle courses.",
    image: "/image/intro/activity-ninja.webp",
    accentColor: "#f59e0b",
    icon: Flame,
    link: "/our-activities#ninja-course",
    shape: "star-flower",
  },
  {
    id: "climbing",
    name: "Climbing",
    tagline: "Reach New Heights",
    description: "Vertical climbing towers with automated safety harnesses for all skill levels.",
    image: "/image/intro/activity-climbing.webp",
    accentColor: "#84cc16",
    icon: Mountain,
    link: "/our-activities#wall-climbing",
    shape: "gear",
  },
  {
    id: "dodgeball",
    name: "Dodgeball",
    tagline: "Team Up",
    description: "Extreme trampoline dodgeball matches for friendly competitive team action.",
    image: "/image/intro/activity-dodgeball.webp",
    accentColor: "#06b6d4",
    icon: Target,
    link: "/our-activities#dodgeball",
    shape: "rounded-diamond",
  },
  {
    id: "birthday",
    name: "Birthday Parties",
    tagline: "Celebrate Bigger",
    description: "Dedicated party lounges, custom themes, tasty treats and private jump times.",
    image: "/image/intro/birthday_parties.webp",
    accentColor: "#8b5cf6",
    icon: PartyPopper,
    link: "/birthday-celebration",
    shape: "corner-round",
  },
];

// ── SVG Shape Definitions ──────────────────────────────────────────────────
const SHAPE_PATHS = {
  "rounded-diamond": "M197.6 42.4L42.4 197.6a60 60 0 0 0 0 84.8l155.2 155.2a60 60 0 0 0 84.8 0l155.2-155.2a60 60 0 0 0 0-84.8L282.4 42.4a60 60 0 0 0-84.8 0Z",
  "corner-round": "M0 0h230c138 0 250 112 250 250v230H250C112 480 0 368 0 230V0Z",
  "star-flower": "M480 240c0-29.1-20.7-55.8-55.2-76.5 9.7-39.1 5.5-72.6-15-93.2-20.7-20.6-54.2-24.8-93.3-15.1C295.8 20.7 269.1 0 240 0s-55.8 20.7-76.5 55.2c-39.1-9.7-72.6-5.5-93.2 15s-24.8 54.2-15.1 93.2C20.7 184.3 0 211 0 240s20.7 55.8 55.2 76.5c-9.7 39.1-5.5 72.6 15 93.2 20.7 20.6 54.2 24.8 93.2 15.1C184.3 459.3 211 480 240 480s55.8-20.7 76.5-55.2c39.1 9.7 72.6 5.5 93.2-15s24.8-54.2 15.1-93.2C459.3 295.8 480 269 480 240Z",
  "gear": "M450 210a57 57 0 0 1-40.3-97.3 30 30 0 1 0-42.4-42.4A57 57 0 0 1 270 30a30 30 0 1 0-60 0 57 57 0 0 1-97.3 40.3 30 30 0 1 0-42.4 42.4A57 57 0 0 1 30 210a30 30 0 1 0 0 60 57 57 0 0 1 40.3 97.3 30 30 0 1 0 42.4 42.4A57 57 0 0 1 210 450a30 30 0 1 0 60 0 57 57 0 0 1 97.3-40.3 30 30 0 1 0 42.4-42.4A57 57 0 0 1 450 270a30 30 0 1 0 0-60Z",
};

// ── Main Hero Blob Path ─────────────────────────────────────────────────────
const HERO_BLOB_PATH = "M195.3 -201C246.1 -190.2 275.2 -122 272.1 -59.8C269 2.4 233.6 58.4 191.9 92.1C150.2 125.8 102.1 137.1 64.3 131.3C26.4 125.4 -1.2 102.4 -52.5 102C-103.8 101.7 -178.8 124.1 -208.3 104.8C-237.8 85.6 -221.8 24.6 -199.4 -23.5C-177.1 -71.7 -148.3 -107.1 -114 -120.7C-79.7 -134.3 -39.9 -126.2 16.2 -145.5C72.3 -164.8 144.6 -211.7 195.3 -201";

export default function HomeIntroParallax() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgBlobY1 = useTransform(scrollYProgress, [0, 1], [-70, 90]);
  const bgBlobY2 = useTransform(scrollYProgress, [0, 1], [50, -110]);
  const heroVisualY = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const mascotY = useTransform(scrollYProgress, [0, 1], [35, -15]);

  // Carousel scroll checker
  const checkScrollPosition = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition, { passive: true });
      checkScrollPosition();
      return () => el.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="intro-section"
      className="relative w-full overflow-hidden bg-[#070814] text-white py-12 sm:py-16 md:py-20 lg:py-24 select-none"
    >
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 1. BACKGROUND AMBIENT                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/4 right-0 w-[700px] lg:w-[900px] h-[700px] lg:h-[900px] bg-purple-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] lg:w-[1100px] h-[600px] bg-blue-900/15 rounded-full blur-[170px]" />
        <div className="absolute bottom-10 -right-20 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />

        <motion.div
          style={{ y: bgBlobY1 }}
          className="absolute top-20 right-1/4 w-96 lg:w-[500px] h-96 lg:h-[500px] rounded-full bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 blur-3xl"
        />
        <motion.div
          style={{ y: bgBlobY2 }}
          className="absolute bottom-32 left-10 w-80 lg:w-[450px] h-80 lg:h-[450px] rounded-full bg-gradient-to-br from-lime-500/10 to-teal-500/10 blur-3xl"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTAINER                                                          */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* HERO SECTION                                                        */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">

          {/* ── LEFT: TEXT CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col space-y-5 sm:space-y-6 text-left"
          >
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-[#6dc065]/40 text-xs font-black uppercase tracking-wider text-[#6dc065] shadow-[0_0_15px_rgba(109,192,101,0.2)] backdrop-blur-md w-fit">
              <span>📍</span>
              <span>WELCOME TO JUS JUMPIN</span>
            </div>

            {/* Title */}
            <div className="relative">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-[1.1] tracking-tight text-white"
                style={{ fontFamily: "'Fredoka', 'Fredoka One', cursive, sans-serif" }}
              >
                Where Every Leap
                <br />
                <span className="relative inline-block text-[#6dc065]">
                  Sparks Pure Joy
                  {/* Hand-drawn Animated Underline */}
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3.5 left-0 w-full h-3 sm:h-4 lg:h-5 overflow-visible pointer-events-none"
                    viewBox="0 0 300 20"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    {/* Main hand-drawn stroke */}
                    <motion.path
                      d="M3 13C45 6 95 4 145 7C195 10 245 12 297 5"
                      stroke="#fbbf24"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.85,
                        delay: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    {/* Secondary organic hand-drawn stroke */}
                    <motion.path
                      d="M15 17C65 12 120 11 175 14C225 17 265 14 290 10"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.7 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.75,
                        delay: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
              Since 2017, Jus Jumpin has reimagined playtime with vibrant parks across India.
              We are committed to safety, cleanliness, and high-energy experiences that spark joy for every age.
              With over 15 rides and gaming activities, we continue to offer a perfect day out destination
              where memories are brewed and stress goes out of the window.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/activities"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#6dc065] to-[#8fc93a] text-slate-950 font-black text-sm tracking-wide shadow-[0_10px_25px_-5px_rgba(109,192,101,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(109,192,101,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Explore Our Park</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/15 hover:border-white/30 text-white font-bold text-sm tracking-wide shadow-lg backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Our Story</span>
                <span className="w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-300 flex items-center justify-center text-xs">
                  ▶
                </span>
              </Link>
            </div>

            {/* Compact Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-base sm:text-lg">🛡</span>
                <span className="font-semibold">100% Safe & Secure</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-base sm:text-lg">✨</span>
                <span className="font-semibold">Always Clean & Hygienic</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-base sm:text-lg">👥</span>
                <span className="font-semibold">Trained Supervisors</span>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: ORGANIC BLOB HERO VISUAL WITH FLOATING CARDS & MASCOT ── */}
          <div className="relative flex items-center justify-center pt-8 sm:pt-4 w-full">

            {/* Parallax Abstract Glowing Halos Behind Image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute -top-8 -right-8 w-64 sm:w-96 lg:w-[480px] h-64 sm:h-96 lg:h-[480px] rounded-full bg-purple-600/30 blur-3xl transform -rotate-12" />
              <div className="absolute -bottom-10 -left-10 w-56 sm:w-80 lg:w-[420px] h-56 sm:h-80 lg:h-[420px] rounded-full bg-[#6dc065]/20 blur-3xl" />
            </div>

            {/* Main Wavy Organic Image Container with SVG Path Mask */}
            <motion.div
              style={{ y: heroVisualY }}
              className="relative z-10 w-full max-w-[500px] sm:max-w-[580px] md:max-w-[640px] lg:max-w-[700px] xl:max-w-[760px] 2xl:max-w-[820px] aspect-[4/3] group"
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                {/* Outer Glowing Border SVG with exact user blob shape */}
                <div className="absolute inset-0 -m-1 sm:-m-2 pointer-events-none filter drop-shadow-[0_15px_35px_rgba(109,192,101,0.25)] drop-shadow-[0_20px_45px_rgba(168,85,247,0.35)]">
                  <svg viewBox="-240 -220 520 370" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="heroBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="45%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <clipPath id="heroBlobShapeClip">
                        <path d={HERO_BLOB_PATH} />
                      </clipPath>
                    </defs>

                    {/* Clipped Image */}
                    <g clipPath="url(#heroBlobShapeClip)">
                      <image
                        href="/image/intro/activity-trampoline.webp"
                        x="-240"
                        y="-180"
                        width="520"
                        height="370"
                        preserveAspectRatio="xMidYMid slice"
                        className="group-hover:scale-105 transition-transform duration-700 ease-out origin-center"
                      />
                    </g>

                    {/* Gradient Rim Outline */}
                    <path
                      d={HERO_BLOB_PATH}
                      fill="none"
                      stroke="url(#heroBorderGradient)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 4 FLOATING STATISTIC STICKER CARDS (EXACT MATCHING MOCKUP)    */}
                {/* ------------------------------------------------------------- */}

                {/* CARD 1: TOP-LEFT (Pink) - 🏆 15+ Activities */}
                <motion.div
                  initial={{ opacity: 0, x: -20, rotate: -12 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -4 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 0, scale: 1.06 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.2 },
                    x: { duration: 0.6, delay: 0.2 },
                    rotate: { duration: 0.6, delay: 0.2 },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.2 }
                  }}
                  className="absolute -top-3 left-0 sm:-top-6 sm:-left-4 lg:-top-8 lg:-left-6 z-20 cursor-pointer bg-gradient-to-br from-pink-400 to-rose-300 text-slate-950 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_12px_24px_rgba(244,63,94,0.4)] border-2 border-white/90 flex items-center gap-2 sm:gap-2.5 backdrop-blur-sm"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-950/10 flex items-center justify-center text-slate-900">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm sm:text-lg font-black tracking-tight text-slate-950">25+</div>
                    <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-900/80">Activities</div>
                  </div>
                </motion.div>

                {/* CARD 2: TOP-RIGHT (Purple) - 🛡 100% Padded & Sanitized */}
                <motion.div
                  initial={{ opacity: 0, x: 20, rotate: 12 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 4 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 0, scale: 1.06 }}
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.3 },
                    x: { duration: 0.6, delay: 0.3 },
                    rotate: { duration: 0.6, delay: 0.3 },
                    y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.8 }
                  }}
                  className="absolute -top-3 right-0 sm:-top-6 sm:-right-2 lg:-top-8 lg:-right-4 z-20 cursor-pointer bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-[0_12px_24px_rgba(147,51,234,0.45)] border-2 border-purple-300/40 flex items-center gap-2 sm:gap-2.5 backdrop-blur-sm"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs sm:text-base font-black tracking-tight text-white">100%</div>
                    <div className="text-[8px] sm:text-[10px] font-semibold text-purple-200">Padded & Sanitized</div>
                  </div>
                </motion.div>

                {/* CARD 3: LOWER-LEFT (Yellow/Orange) - 👥 50K+ Happy Bounces */}
                <motion.div
                  initial={{ opacity: 0, x: -20, rotate: -8 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 0, scale: 1.06 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.4 },
                    x: { duration: 0.6, delay: 0.4 },
                    rotate: { duration: 0.6, delay: 0.4 },
                    y: { repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1.2 }
                  }}
                  className="absolute bottom-4 -left-2 sm:bottom-6 sm:-left-6 lg:bottom-8 lg:-left-8 z-20 cursor-pointer bg-gradient-to-br from-amber-400 to-yellow-300 text-slate-950 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_12px_24px_rgba(245,158,11,0.4)] border-2 border-white/90 flex items-center gap-2 sm:gap-2.5"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-950/10 flex items-center justify-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm sm:text-lg font-black tracking-tight text-slate-950">50K+</div>
                    <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-900/80">Happy Bounces</div>
                  </div>
                </motion.div>

                {/* CARD 4: LOWER-RIGHT (Lime Green) - 📍 Multiple Locations */}
                <motion.div
                  initial={{ opacity: 0, x: 20, rotate: 6 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 4 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 0, scale: 1.06 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.5 },
                    x: { duration: 0.6, delay: 0.5 },
                    rotate: { duration: 0.6, delay: 0.5 },
                    y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.5 }
                  }}
                  className="absolute top-1/2 -right-2 sm:-right-6 lg:-right-8 -translate-y-1/2 z-20 cursor-pointer bg-gradient-to-br from-[#84cc16] to-[#65a30d] text-slate-950 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl shadow-[0_10px_20px_rgba(132,204,22,0.4)] border-2 border-white/90 flex items-center gap-1.5 sm:gap-2"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-950/10 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs sm:text-sm font-black tracking-tight text-slate-950">24+ Locations</div>
                    <div className="text-[8px] sm:text-[10px] font-bold text-slate-900/80">Across India</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* 5. MASCOT WITH DYNAMIC SPEECH BUBBLE (BOTTOM RIGHT)            */}
            {/* ------------------------------------------------------------- */}
            <motion.div
              style={{ y: mascotY }}
              className="absolute -bottom-8 -right-2 xs:-bottom-10 xs:right-0 sm:-bottom-12 sm:right-0 lg:-bottom-12 lg:right-2 z-30 pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                {/* Playful Speech Bubble */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="relative bg-white text-slate-900 text-xs sm:text-sm font-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] border-2 border-slate-900/10 whitespace-nowrap mb-1"
                  style={{ fontFamily: "'Fredoka', 'Nunito', sans-serif" }}
                >
                  What are we playing today? 👀
                  {/* Tail pointing toward mascot */}
                  <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
                </motion.div>

                {/* Lottie Mascot Animation */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 relative -mt-2 cursor-pointer filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform duration-300"
                >
                  <LottieIcon
                    src="/json/gifimage2.json"
                    alt="Jus Jumpin Mascot Character"
                    className="w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* EXPLORE YOUR ADVENTURE — ACTIVITY CAROUSEL                            */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 text-center md:text-left">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#6dc065] mb-2 flex items-center justify-center md:justify-start gap-2">
                <span>✦</span> EXPLORE YOUR <span>✦</span>
              </div>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white relative inline-block"
                style={{ fontFamily: "'Fredoka', 'Fredoka One', cursive, sans-serif" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-[#6dc065]">
                  Adventure
                </span>
                <span className="absolute -right-6 sm:-right-8 -top-2 text-yellow-400 text-xl sm:text-2xl animate-bounce">
                  ✨
                </span>
              </h3>
            </div>
          </div>

          {/* Carousel Wrapper with Side Arrows */}
          <div className="relative group/carousel">
            {/* Left Arrow */}
            <button
              onClick={() => scrollCarousel("left")}
              disabled={!canScrollLeft}
              aria-label="Previous activities"
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-slate-900/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 -translate-x-1/2 shadow-xl ${canScrollLeft
                ? "text-white hover:bg-white/20 hover:border-[#6dc065] hover:scale-110 active:scale-95 cursor-pointer"
                : "text-slate-600 opacity-0 pointer-events-none"
                }`}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollCarousel("right")}
              disabled={!canScrollRight}
              aria-label="Next activities"
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-slate-900/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 translate-x-1/2 shadow-xl ${canScrollRight
                ? "text-white hover:bg-white/20 hover:border-[#6dc065] hover:scale-110 active:scale-95 cursor-pointer"
                : "text-slate-600 opacity-0 pointer-events-none"
                }`}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={carouselRef}
              className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto pb-6 pt-2 hide-scrollbar scroll-smooth snap-x snap-mandatory w-full px-1"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {ACTIVITIES.map((activity, index) => {
                const IconComponent = activity.icon;
                const shapePath = SHAPE_PATHS[activity.shape as keyof typeof SHAPE_PATHS];
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex-shrink-0 w-[72vw] xs:w-[60vw] sm:w-[32vw] md:w-[24vw] lg:w-[18.5vw] xl:w-[17vw] 2xl:w-[16vw] snap-start"
                  >
                    <Link
                      href={activity.link}
                      className="group/card block relative h-full"
                    >
                      {/* Shape Image Container */}
                      <div className="relative w-full aspect-square mb-3 sm:mb-4">
                        {/* Glow on hover */}
                        <div
                          className="absolute inset-0 blur-2xl opacity-0 group-hover/card:opacity-50 transition-opacity duration-500 rounded-full"
                          style={{ backgroundColor: activity.accentColor }}
                        />

                        {/* SVG Shape with Image */}
                        <div className="relative w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover/card:scale-[1.03] transition-transform duration-500">
                          <svg
                            viewBox="0 0 480 480"
                            className="w-full h-full"
                            style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))" }}
                          >
                            <defs>
                              <clipPath id={`card-clip-${activity.id}`}>
                                <path d={shapePath} />
                              </clipPath>
                            </defs>

                            {/* Background shape */}
                            <path
                              d={shapePath}
                              fill={`${activity.accentColor}18`}
                              stroke={activity.accentColor}
                              strokeWidth="3"
                              className="transition-all duration-500 group-hover/card:stroke-[5]"
                            />

                            {/* Clipped image */}
                            <image
                              href={activity.image}
                              width="480"
                              height="480"
                              clipPath={`url(#card-clip-${activity.id})`}
                              preserveAspectRatio="xMidYMid slice"
                              className="transition-transform duration-700 group-hover/card:scale-110"
                            />

                            {/* Overlay gradient */}
                            <path
                              d={shapePath}
                              fill="url(#cardGrad)"
                              opacity="0.3"
                              className="group-hover/card:opacity-10 transition-opacity duration-500"
                            />

                            <defs>
                              <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="100%" stopColor="#070814" />
                              </linearGradient>
                            </defs>
                          </svg>

                          {/* Category badge */}
                          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-white shadow-lg">
                            <span
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
                              style={{ backgroundColor: activity.accentColor }}
                            />
                            {activity.name}
                          </div>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="space-y-1 sm:space-y-1.5 px-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className="text-base sm:text-lg lg:text-xl font-black text-white group-hover/card:text-[#6dc065] transition-colors"
                            style={{ fontFamily: "'Fredoka', 'Nunito', sans-serif" }}
                          >
                            {activity.name}
                          </h4>
                          <div
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover/card:rotate-12 group-hover/card:scale-110"
                            style={{ backgroundColor: `${activity.accentColor}25` }}
                          >
                            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: activity.accentColor }} />
                          </div>
                        </div>

                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                          {activity.tagline}
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {activity.description}
                        </p>

                        <div className="pt-1 flex items-center gap-1.5 text-xs font-black text-[#6dc065] group-hover/card:translate-x-1 transition-transform">
                          <span>Explore Zone</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="sm:hidden flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 mt-1">
              <span>Swipe to explore</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#6dc065] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* BOTTOM WAVE SEPARATOR                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full mt-16 sm:mt-20 lg:mt-28 pointer-events-none">
        <svg
          className="w-full h-12 sm:h-16 lg:h-24 text-[#0a0a14] fill-current"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,58.7C672,43,768,21,864,21.3C960,21,1056,43,1152,53.3C1248,64,1344,64,1392,64L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z" />
        </svg>
      </div>
    </section>
  );
}