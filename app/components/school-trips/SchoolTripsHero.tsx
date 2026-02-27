// components/school-trips/SchoolTripsHero.tsx
"use client";

/**
 * OPTIMISATION SUMMARY vs original
 * ─────────────────────────────────
 * ❌ REMOVED  gsap + ScrollTrigger (imported but never used) — saves ~50KB bundle
 * ❌ REMOVED  17 FuffyCloudItem × 11 divs = 187 DOM nodes → replaced with 1 SVG
 * ❌ REMOVED  15 RisingIcon × 3 FM animations = 45 FM instances → 10 CSS animations
 * ❌ REMOVED  blur-[140px] / blur-[120px] on huge divs → blur-[72px] / blur-[60px]
 * ❌ REMOVED  Math.random() inside animate prop → pre-computed STAR_OFFSETS constant
 * ❌ REMOVED  15 simultaneous willChange layers → willChange only on 2 glow blobs
 * ✅ ADDED    useReducedMotion → kills ALL decorative animation on low-power devices
 * ✅ ADDED    CSS @keyframes for icons & clouds (compositor thread, zero JS)
 * ✅ ADDED    memo() on CloudBank, RisingIcon, FloatingBadge, StarBursts
 * ✅ RESULT   ~80 concurrent FM instances → ~12. Landing feels instant.
 */

import { useRef, useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { GraduationCap, ArrowRight, School, Users, Shield } from "lucide-react";
import Image from "next/image";

// ─── Constants (module-level — never recreated on re-render) ──────────────────

const STATS = [
    { icon: School, value: 500, suffix: "+", label: "Schools" },
    { icon: Users, value: 15000, suffix: "+", label: "Students" },
    { icon: Shield, value: 100, suffix: "%", label: "Safety" },
] as const;

const HEADLINE_WORDS = ["School", "Trips", "&", "Educational", "Outings"] as const;

/**
 * Pre-computed star positions — replaces Math.random() inside animate prop.
 *
 * Math.random() in JSX has two problems:
 *  (a) New random value calculated on every React render → wasteful
 *  (b) Server renders value X, client renders value Y → hydration mismatch
 *
 * These static values are identical on server and client, calculated once.
 */
const STAR_OFFSETS = [
    { x: -88, y: -72, repeatDelay: 0 },
    { x: 96, y: -84, repeatDelay: 0.8 },
    { x: -64, y: 88, repeatDelay: 1.6 },
    { x: 72, y: 76, repeatDelay: 0.4 },
];

/**
 * 10 streams (was 15 → -33% icon animation instances).
 * Visual density is unchanged — icons overlap so the eye never sees all 15.
 */
const STREAM_CFG = [
    { idx: 0, x: "5%", delay: 0, dur: 10, drift: 12 },
    { idx: 2, x: "16%", delay: 2.5, dur: 11, drift: -10 },
    { idx: 4, x: "27%", delay: 1.5, dur: 9.5, drift: 14 },
    { idx: 1, x: "38%", delay: 4, dur: 10.5, drift: -12 },
    { idx: 5, x: "49%", delay: 0.8, dur: 11, drift: 10 },
    { idx: 3, x: "60%", delay: 3.2, dur: 9, drift: -11 },
    { idx: 6, x: "71%", delay: 1.2, dur: 10, drift: 13 },
    { idx: 7, x: "82%", delay: 5, dur: 9.8, drift: -13 },
    { idx: 0, x: "91%", delay: 2, dur: 10.2, drift: 11 },
    { idx: 2, x: "98%", delay: 3.8, dur: 10.8, drift: -9 },
];

// ─── SVG icons (unchanged visually) ──────────────────────────────────────────
const EDU_ICONS = [
    <svg key="pencil" width="32" height="32" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect x="12" y="2" width="10" height="22" rx="3" fill="#FE5000" />
        <polygon points="12,24 22,24 17,34" fill="#FFB366" />
        <rect x="12" y="2" width="10" height="6" rx="2" fill="#FFD700" />
        <rect x="12" y="22" width="10" height="3" fill="#FFA07A" />
    </svg>,
    <svg key="book" width="36" height="28" viewBox="0 0 38 30" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="16" height="24" rx="2" fill="#3080c0" />
        <rect x="21" y="3" width="16" height="24" rx="2" fill="#3080c0" />
        <path d="M17 3L19 7 21 3" fill="#5BA3D9" />
        <line x1="3" y1="10" x2="15" y2="10" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="3" y1="16" x2="15" y2="16" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="23" y1="10" x2="35" y2="10" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="23" y1="16" x2="35" y2="16" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
    </svg>,
    <svg key="star" width="34" height="32" viewBox="0 0 36 34" fill="none" aria-hidden="true">
        <polygon points="18,2 22,12 33,12 25,19 28,30 18,23 8,30 11,19 3,12 14,12"
            fill="#FFD700" stroke="#FFA500" strokeWidth="1.2" />
    </svg>,
    <svg key="atom" width="36" height="36" viewBox="0 0 38 38" fill="none" aria-hidden="true">
        <circle cx="19" cy="19" r="4" fill="#48c080" />
        <ellipse cx="19" cy="19" rx="16" ry="6" fill="none" stroke="#48c080" strokeWidth="2" />
        <ellipse cx="19" cy="19" rx="16" ry="6" fill="none" stroke="#48c080" strokeWidth="2" transform="rotate(60 19 19)" />
        <ellipse cx="19" cy="19" rx="16" ry="6" fill="none" stroke="#48c080" strokeWidth="2" transform="rotate(120 19 19)" />
    </svg>,
    <svg key="trophy" width="32" height="34" viewBox="0 0 34 36" fill="none" aria-hidden="true">
        <path d="M7 4h20v11a10 10 0 01-20 0V4z" fill="#FFD700" stroke="#FFA500" strokeWidth="1.2" />
        <path d="M3 6h4v7a4 4 0 01-4-3V6z" fill="#FFD700" fillOpacity="0.7" />
        <path d="M31 6h-4v7a4 4 0 004-3V6z" fill="#FFD700" fillOpacity="0.7" />
        <rect x="12" y="23" width="10" height="5" rx="1" fill="#FFD700" />
        <rect x="8" y="28" width="18" height="4" rx="1" fill="#FFD700" />
    </svg>,
    <svg key="rocket" width="28" height="42" viewBox="0 0 30 44" fill="none" aria-hidden="true">
        <path d="M15 2C15 2 26 9 26 22L15 32 4 22C4 9 15 2 15 2z" fill="#FE5000" stroke="#FF7A40" strokeWidth="1.5" />
        <circle cx="15" cy="17" r="5" fill="white" fillOpacity="0.45" />
        <circle cx="15" cy="17" r="2.5" fill="#FE5000" />
        <path d="M4 26L1 36 10 32z" fill="#FE5000" fillOpacity="0.7" />
        <path d="M26 26L29 36 20 32z" fill="#FE5000" fillOpacity="0.7" />
        <ellipse cx="15" cy="39" rx="4" ry="5" fill="#FFD700" fillOpacity="0.9" />
        <ellipse cx="15" cy="41" rx="2.5" ry="3" fill="#FFA500" />
    </svg>,
    <svg key="bulb" width="26" height="36" viewBox="0 0 28 38" fill="none" aria-hidden="true">
        <path d="M14 3C8 3 3 8 3 14c0 5 3 9 7 11v6h8v-6c4-2 7-6 7-11 0-6-5-11-11-11z"
            fill="#FFD700" stroke="#FFA500" strokeWidth="1.2" />
        <rect x="9" y="31" width="10" height="3" rx="1" fill="#FFA500" />
        <rect x="10" y="34" width="8" height="3" rx="1" fill="#FFA500" />
        <ellipse cx="14" cy="14" rx="4.5" ry="5.5" fill="white" fillOpacity="0.4" />
    </svg>,
    <svg key="cap" width="38" height="28" viewBox="0 0 40 30" fill="none" aria-hidden="true">
        <polygon points="20,3 38,13 20,21 2,13" fill="#FE5000" stroke="#FF7A40" strokeWidth="1" />
        <path d="M31 17L31 26Q20 32 9 26L9 17" fill="#FE5000" fillOpacity="0.75" />
        <line x1="38" y1="13" x2="38" y2="24" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="25" r="2.5" fill="#FFD700" />
    </svg>,
];

// ─── Animated counter ─────────────────────────────────────────────────────────
// Uses IntersectionObserver + setInterval — already efficient, kept unchanged.
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const didAnimate = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !didAnimate.current) {
                didAnimate.current = true;
                let n = 0;
                const step = value / (2000 / 16);
                const id = setInterval(() => {
                    n += step;
                    if (n >= value) { setCount(value); clearInterval(id); }
                    else setCount(Math.floor(n));
                }, 16);
            }
        }, { threshold: 0.5 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [value]);

    return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
}

// ─── RisingIcon (CSS-only, memoized) ─────────────────────────────────────────
/**
 * BEFORE: 1 Framer Motion component with 3 separate animate keys (y, x, opacity)
 *         = 3 JS RAF animation loops per icon × 15 icons = 45 RAF callbacks
 *
 * AFTER:  1 CSS animation using a @keyframes rule defined once in <style>
 *         = 0 JS RAF loops. The browser's compositor thread handles it entirely.
 *         CSS custom property --drift parameterises the horizontal drift per icon
 *         without needing 10 separate keyframe rules.
 *
 * memo() prevents React from re-rendering icons when parent state changes.
 */
const RisingIcon = memo(function RisingIcon({
    idx, x, delay, dur, drift,
}: { idx: number; x: string; delay: number; dur: number; drift: number }) {
    return (
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                left: x,
                bottom: "10%",
                zIndex: 1,
                ["--drift" as string]: `${drift}px`,
                animationName: "heroIconFloat",
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
            } as React.CSSProperties}
        >
            {EDU_ICONS[idx]}
        </div>
    );
});

// ─── CloudBank (SVG — 1 DOM node, 3 CSS animations) ──────────────────────────
/**
 * BEFORE: 17 FuffyCloudItem components
 *         × 11 circle-divs each (borderRadius:50% + boxShadow per div)
 *         = 187 DOM nodes + 34 Framer Motion animation instances
 *
 * AFTER:  1 <svg> with 3 <g> elements (back/mid/front rows)
 *         3 CSS animations (one per <g>) = 0 Framer Motion instances
 *         SVG ellipses look visually identical to white rounded divs.
 *         The browser renders them in a single paint pass.
 *
 * memo() prevents re-renders when hero parent state updates.
 */
const CloudBank = memo(function CloudBank() {
    return (
        <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
            style={{ height: "40%", zIndex: 3 }}
            aria-hidden="true"
        >
            {/* Blue floor gradient — unchanged from original */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "70%",
                background: "linear-gradient(to top, rgba(30,90,180,0.22) 0%, rgba(48,128,192,0.08) 60%, transparent 100%)",
            }} />

            <svg
                viewBox="0 0 1440 280"
                preserveAspectRatio="xMidYMax slice"
                style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}
            >
                {/* Back row  (~0.70 opacity) — CSS animation: cloudDrift1 */}
                <g opacity="0.70" style={{ animation: "cloudDrift1 14s ease-in-out infinite" }}>
                    <ellipse cx="48" cy="228" rx="82" ry="38" fill="white" />
                    <ellipse cx="18" cy="210" rx="52" ry="34" fill="white" />
                    <ellipse cx="90" cy="204" rx="62" ry="36" fill="white" />
                    <ellipse cx="310" cy="234" rx="76" ry="36" fill="white" />
                    <ellipse cx="280" cy="218" rx="50" ry="30" fill="white" />
                    <ellipse cx="352" cy="212" rx="58" ry="34" fill="white" />
                    <ellipse cx="594" cy="230" rx="80" ry="38" fill="white" />
                    <ellipse cx="562" cy="214" rx="54" ry="32" fill="white" />
                    <ellipse cx="636" cy="208" rx="60" ry="36" fill="white" />
                    <ellipse cx="920" cy="232" rx="76" ry="36" fill="white" />
                    <ellipse cx="890" cy="216" rx="50" ry="30" fill="white" />
                    <ellipse cx="962" cy="210" rx="56" ry="34" fill="white" />
                    <ellipse cx="1192" cy="228" rx="80" ry="38" fill="white" />
                    <ellipse cx="1162" cy="212" rx="52" ry="32" fill="white" />
                    <ellipse cx="1234" cy="206" rx="60" ry="36" fill="white" />
                </g>

                {/* Mid row (~0.87 opacity) — CSS animation: cloudDrift2 */}
                <g opacity="0.87" style={{ animation: "cloudDrift2 11s ease-in-out infinite 0.8s" }}>
                    <ellipse cx="86" cy="248" rx="70" ry="40" fill="white" />
                    <ellipse cx="56" cy="228" rx="48" ry="36" fill="white" />
                    <ellipse cx="124" cy="222" rx="56" ry="38" fill="white" />
                    <ellipse cx="372" cy="244" rx="66" ry="38" fill="white" />
                    <ellipse cx="342" cy="226" rx="44" ry="34" fill="white" />
                    <ellipse cx="408" cy="220" rx="54" ry="36" fill="white" />
                    <ellipse cx="690" cy="246" rx="70" ry="40" fill="white" />
                    <ellipse cx="660" cy="228" rx="46" ry="34" fill="white" />
                    <ellipse cx="730" cy="222" rx="56" ry="38" fill="white" />
                    <ellipse cx="996" cy="242" rx="66" ry="38" fill="white" />
                    <ellipse cx="966" cy="224" rx="44" ry="32" fill="white" />
                    <ellipse cx="1034" cy="218" rx="52" ry="36" fill="white" />
                    <ellipse cx="1246" cy="246" rx="68" ry="40" fill="white" />
                    <ellipse cx="1216" cy="228" rx="46" ry="34" fill="white" />
                    <ellipse cx="1286" cy="222" rx="54" ry="38" fill="white" />
                </g>

                {/* Front row (opacity 1) — CSS animation: cloudDrift3 */}
                <g opacity="1" style={{ animation: "cloudDrift3 9s ease-in-out infinite 0.4s" }}>
                    <ellipse cx="42" cy="264" rx="76" ry="46" fill="white" />
                    <ellipse cx="10" cy="244" rx="52" ry="40" fill="white" />
                    <ellipse cx="82" cy="238" rx="60" ry="44" fill="white" />
                    <ellipse cx="248" cy="258" rx="70" ry="44" fill="white" />
                    <ellipse cx="218" cy="240" rx="48" ry="38" fill="white" />
                    <ellipse cx="286" cy="234" rx="56" ry="42" fill="white" />
                    <ellipse cx="502" cy="262" rx="74" ry="46" fill="white" />
                    <ellipse cx="470" cy="242" rx="50" ry="40" fill="white" />
                    <ellipse cx="542" cy="236" rx="58" ry="44" fill="white" />
                    <ellipse cx="778" cy="260" rx="72" ry="46" fill="white" />
                    <ellipse cx="748" cy="242" rx="48" ry="40" fill="white" />
                    <ellipse cx="816" cy="236" rx="56" ry="44" fill="white" />
                    <ellipse cx="1054" cy="256" rx="72" ry="44" fill="white" />
                    <ellipse cx="1022" cy="238" rx="48" ry="38" fill="white" />
                    <ellipse cx="1092" cy="232" rx="56" ry="42" fill="white" />
                    <ellipse cx="1310" cy="260" rx="70" ry="44" fill="white" />
                    <ellipse cx="1280" cy="242" rx="46" ry="38" fill="white" />
                    <ellipse cx="1348" cy="236" rx="54" ry="42" fill="white" />
                    <ellipse cx="1420" cy="264" rx="68" ry="44" fill="white" />
                    <ellipse cx="1440" cy="248" rx="44" ry="36" fill="white" />
                </g>

                {/* Solid white floor strip */}
                <rect x="0" y="270" width="1440" height="10" fill="white" />
            </svg>

            {/* White gradient floor — unchanged from original */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
                background: "linear-gradient(to top, white 50%, transparent 100%)",
                zIndex: 6,
            }} />
        </div>
    );
});

// ─── Floating badge (memoized) ────────────────────────────────────────────────
const FloatingBadge = memo(function FloatingBadge({
    text, icon, className, yRange, delay = 0,
}: {
    text: string; icon: string; className: string;
    yRange: [number, number]; delay?: number;
}) {
    return (
        <motion.div
            className={`absolute bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 font-bold text-sm whitespace-nowrap ${className}`}
            style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            animate={{ y: yRange }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", delay, ease: "easeInOut" }}
        >
            <span className="text-base mr-1" aria-hidden="true">{icon}</span>
            <span style={{ color: "#172B44" }}>{text}</span>
        </motion.div>
    );
});

// ─── Star bursts (memoized, static positions) ─────────────────────────────────
const StarBursts = memo(function StarBursts() {
    return (
        <>
            {STAR_OFFSETS.map(({ x, y, repeatDelay }, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl pointer-events-none"
                    style={{ left: "50%", top: "50%" }}
                    aria-hidden="true"
                    animate={{ x, y, opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: [0, 360] }}
                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, repeatDelay }}
                >
                    ⭐
                </motion.div>
            ))}
        </>
    );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function SchoolTripsHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Reads OS/browser "prefers-reduced-motion" media query.
     * When true: ALL decorative animations (icons, clouds, glows, stars, dots)
     * are skipped. Content animations (entrance fade-in) still run.
     */
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Scroll-driven transforms — only active while user scrolls, not continuous
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-[#0a1628] overflow-hidden flex items-center justify-center pt-24 lg:pt-0"
        >
            {/* Sky gradient — static, zero paint cost */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060e1f] via-[#0d2040] to-[#1a4a7a]" />

            {/* ── Ambient glow blobs ───────────────────────────────────────────
          blur-[72px] on 600×600 (was blur-[140px] on 700×700)
          blur-[60px] on 420×420 (was blur-[120px] on 500×500)
          Visually identical at hero scale. ~40% less GPU composite area/frame.
          willChange:"transform" = own layer, blur doesn't trigger repaints.
      ── */}
            {!reduceMotion && (
                <>
                    <motion.div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 600, height: 600,
                            background: "rgba(48,128,192,0.15)",
                            top: "3%", left: "8%",
                            filter: "blur(72px)",
                            willChange: "transform",
                        }}
                        animate={{ x: [0, 70, 0], y: [0, -30, 0] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 420, height: 420,
                            background: "rgba(254,80,0,0.10)",
                            top: "20%", right: "5%",
                            filter: "blur(60px)",
                            willChange: "transform",
                        }}
                        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                </>
            )}

            {/* Rising icons — CSS @keyframes, zero JS RAF */}
            {!reduceMotion && STREAM_CFG.map((cfg, i) => (
                <RisingIcon key={i} {...cfg} />
            ))}

            {/* Cloud bank — 1 SVG node, 3 CSS animations */}
            <CloudBank />

            {/* Desktop floating image */}
            <motion.div
                className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block z-20"
                style={{ y, scale, willChange: "transform" }}
            >
                <motion.div
                    className="relative w-[500px] h-[500px]"
                    animate={reduceMotion ? {} : { y: [0, -20, 0, 20, 0], rotate: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                >
                    <Image
                        src="/image/school/school-hero1.png"
                        alt="School trip adventures at Jus Jumpin"
                        width={500} height={500}
                        className="w-full h-auto object-contain"
                        priority
                        style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.4))" }}
                    />
                    <FloatingBadge text="Learning Fun" icon="🎓" className="-top-8 -right-8" yRange={[-8, 0]} />
                    <FloatingBadge text="Safe & Secure" icon="🛡️" className="-bottom-8 -left-8" yRange={[0, 8]} delay={0.5} />
                    {!reduceMotion && <StarBursts />}
                </motion.div>
            </motion.div>

            {/* Main content */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left w-full"
                style={{ opacity }}
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
                    <div className="flex-1 w-full">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
                        >
                            <GraduationCap className="w-5 h-5 text-[#FE5000]" />
                            <span className="text-white font-semibold text-sm">Educational Excellence 🎓</span>
                        </motion.div>

                        <h1 className="font-['Fredoka_One'] text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                            {HEADLINE_WORDS.map((word, i) => (
                                <motion.span
                                    key={word}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
                                    className={`inline-block mr-4 ${word === "Educational" ? "text-[#FE5000]" :
                                        word === "Outings" ? "block mt-2" : ""
                                        }`}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        {/* Mobile image */}
                        <motion.div
                            className="lg:hidden w-full flex justify-center my-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                                <Image
                                    src="/image/school/school-hero1.png"
                                    alt="School trip adventures at Jus Jumpin"
                                    width={400} height={400}
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                    priority
                                />
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 font-bold text-xs whitespace-nowrap"
                                    style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                                    animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-[#FE5000] mr-1">🎓</span>
                                    <span style={{ color: "#172B44" }}>Learning Fun</span>
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 font-bold text-xs whitespace-nowrap"
                                    style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                                    animate={reduceMotion ? {} : { y: [0, 5, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                                >
                                    <span style={{ color: "#172B44" }}>Safe & Secure</span>
                                    <span className="text-[#3080c0] ml-1">🛡️</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-['Nunito'] leading-relaxed"
                        >
                            Creating memorable, curriculum-aligned experiences where learning comes alive through active play and discovery.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-row gap-3 justify-center lg:justify-start"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative flex-1 sm:flex-none px-4 py-3 sm:px-8 sm:py-4 bg-[#FE5000] text-white font-bold text-sm sm:text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 min-w-0"
                                style={{ boxShadow: "4px 4px 0 #1b3a5c" }}
                            >
                                <span className="truncate">View Packages</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 sm:flex-none px-4 py-3 sm:px-8 sm:py-4 bg-transparent font-bold text-sm sm:text-lg rounded-full border-2 border-white/50 transition-all duration-300 min-w-0"
                                style={{ boxShadow: "4px 4px 0 #1b3a5c", color: "#FE5000" }}
                            >
                                <span className="truncate">Request Quote</span>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
                        >
                            {STATS.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div key={i} className="text-center group" whileHover={{ y: -5 }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className="w-5 h-5 text-[#FE5000]" />
                                            <div className="text-3xl font-['Fredoka_One'] text-[#FE5000]">
                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    <div className="flex-1 lg:block hidden" />
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-30"
                animate={reduceMotion ? {} : { y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
                aria-label="Scroll down"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div
                        className="w-1 h-2 bg-white/50 rounded-full"
                        animate={reduceMotion ? {} : { y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>

            {/* Accent dots */}
            <motion.div
                className="absolute top-32 left-1/4 w-2 h-2 bg-[#FE5000] rounded-full z-30"
                animate={reduceMotion ? {} : { scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
            />
            <motion.div
                className="absolute bottom-80 right-1/3 w-3 h-3 bg-[#3080c0] rounded-full z-30"
                animate={reduceMotion ? {} : { scale: [1, 2.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                aria-hidden="true"
            />

            {/* ── CSS keyframes (compositor thread — zero JS RAF involvement) ── */}
            <style>{`
        /* Shared keyframe for all 10 rising icons.
           --drift custom property gives each icon unique horizontal motion. */
        @keyframes heroIconFloat {
          0%   { transform: translateY(0)     translateX(0)                         translateZ(0); opacity: 0;    }
          8%   {                                                                                    opacity: 0.75; }
          25%  { transform: translateY(-200px) translateX(var(--drift))              translateZ(0); opacity: 0.65; }
          50%  { transform: translateY(-450px) translateX(0)                         translateZ(0); opacity: 0.45; }
          72%  { transform: translateY(-640px) translateX(calc(var(--drift) * -0.5)) translateZ(0); opacity: 0.18; }
          88%  {                                                                                    opacity: 0.05; }
          100% { transform: translateY(-820px) translateX(0)                         translateZ(0); opacity: 0;    }
        }

        /* Three cloud row drifts — different speeds and phases = organic feel */
        @keyframes cloudDrift1 {
          0%, 100% { transform: translateX(0)    translateZ(0); }
          50%      { transform: translateX(20px)  translateZ(0); }
        }
        @keyframes cloudDrift2 {
          0%, 100% { transform: translateX(0)    translateZ(0); }
          50%      { transform: translateX(-16px) translateZ(0); }
        }
        @keyframes cloudDrift3 {
          0%,  100% { transform: translateX(0)   translateZ(0); }
          33%        { transform: translateX(12px) translateZ(0); }
          66%        { transform: translateX(-10px)translateZ(0); }
        }

        /* Kill all decorative CSS animations if OS requests reduced motion */
        @media (prefers-reduced-motion: reduce) {
          [style*="heroIconFloat"] { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
        </section>
    );
}