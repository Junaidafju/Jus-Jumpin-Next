// components/school-trips/SchoolTripsHero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ArrowRight, School, Users, Shield } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    { icon: School, value: 500, suffix: "+", label: "Schools" },
    { icon: Users, value: 15000, suffix: "+", label: "Students" },
    { icon: Shield, value: 100, suffix: "%", label: "Safety" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const end = value;
                    const duration = 2000;
                    const increment = end / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) { setCount(end); clearInterval(timer); }
                        else { setCount(Math.floor(start)); }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
}

// ─── Education icons (reduced to 8 unique icons) ─────────────────────────────
const eduIcons = [
    <svg key="pencil" width="32" height="32" viewBox="0 0 34 34" fill="none">
        <rect x="12" y="2" width="10" height="22" rx="3" fill="#FE5000" />
        <polygon points="12,24 22,24 17,34" fill="#FFB366" />
        <rect x="12" y="2" width="10" height="6" rx="2" fill="#FFD700" />
        <rect x="12" y="22" width="10" height="3" fill="#FFA07A" />
    </svg>,
    <svg key="book" width="36" height="28" viewBox="0 0 38 30" fill="none">
        <rect x="1" y="3" width="16" height="24" rx="2" fill="#3080c0" />
        <rect x="21" y="3" width="16" height="24" rx="2" fill="#3080c0" />
        <path d="M17 3 L19 7 L21 3" fill="#5BA3D9" />
        <line x1="3" y1="10" x2="15" y2="10" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="3" y1="16" x2="15" y2="16" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="23" y1="10" x2="35" y2="10" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="23" y1="16" x2="35" y2="16" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
    </svg>,
    <svg key="star" width="34" height="32" viewBox="0 0 36 34" fill="none">
        <polygon points="18,2 22,12 33,12 25,19 28,30 18,23 8,30 11,19 3,12 14,12"
            fill="#FFD700" stroke="#FFA500" strokeWidth="1.2" />
    </svg>,
    <svg key="atom" width="36" height="36" viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="4" fill="#48c080" />
        <ellipse cx="19" cy="19" rx="16" ry="6" fill="none" stroke="#48c080" strokeWidth="2" />
        <ellipse cx="19" cy="19" rx="16" ry="6" fill="none" stroke="#48c080" strokeWidth="2" transform="rotate(60 19 19)" />
        <ellipse cx="19" cy="19" rx="16" ry="6" fill="none" stroke="#48c080" strokeWidth="2" transform="rotate(120 19 19)" />
    </svg>,
    <svg key="trophy" width="32" height="34" viewBox="0 0 34 36" fill="none">
        <path d="M7 4h20v11a10 10 0 01-20 0V4z" fill="#FFD700" stroke="#FFA500" strokeWidth="1.2" />
        <path d="M3 6h4v7a4 4 0 01-4-3V6z" fill="#FFD700" fillOpacity="0.7" />
        <path d="M31 6h-4v7a4 4 0 004-3V6z" fill="#FFD700" fillOpacity="0.7" />
        <rect x="12" y="23" width="10" height="5" rx="1" fill="#FFD700" />
        <rect x="8" y="28" width="18" height="4" rx="1" fill="#FFD700" />
    </svg>,
    <svg key="rocket" width="28" height="42" viewBox="0 0 30 44" fill="none">
        <path d="M15 2C15 2 26 9 26 22L15 32 4 22C4 9 15 2 15 2z" fill="#FE5000" stroke="#FF7A40" strokeWidth="1.5" />
        <circle cx="15" cy="17" r="5" fill="white" fillOpacity="0.45" />
        <circle cx="15" cy="17" r="2.5" fill="#FE5000" />
        <path d="M4 26L1 36 10 32z" fill="#FE5000" fillOpacity="0.7" />
        <path d="M26 26L29 36 20 32z" fill="#FE5000" fillOpacity="0.7" />
        <ellipse cx="15" cy="39" rx="4" ry="5" fill="#FFD700" fillOpacity="0.9" />
        <ellipse cx="15" cy="41" rx="2.5" ry="3" fill="#FFA500" />
    </svg>,
    <svg key="bulb" width="26" height="36" viewBox="0 0 28 38" fill="none">
        <path d="M14 3C8 3 3 8 3 14c0 5 3 9 7 11v6h8v-6c4-2 7-6 7-11 0-6-5-11-11-11z" fill="#FFD700" stroke="#FFA500" strokeWidth="1.2" />
        <rect x="9" y="31" width="10" height="3" rx="1" fill="#FFA500" />
        <rect x="10" y="34" width="8" height="3" rx="1" fill="#FFA500" />
        <ellipse cx="14" cy="14" rx="4.5" ry="5.5" fill="white" fillOpacity="0.4" />
    </svg>,
    <svg key="cap" width="38" height="28" viewBox="0 0 40 30" fill="none">
        <polygon points="20,3 38,13 20,21 2,13" fill="#FE5000" stroke="#FF7A40" strokeWidth="1" />
        <path d="M31 17L31 26Q20 32 9 26L9 17" fill="#FE5000" fillOpacity="0.75" />
        <line x1="38" y1="13" x2="38" y2="24" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="25" r="2.5" fill="#FFD700" />
    </svg>,
];

// ─── Smooth Rising Icon with fade-out at 80% ─────────────────────────────────
function RisingIcon({ iconIdx, x, delay, duration, drift }: {
    iconIdx: number;
    x: string;
    delay: number;
    duration: number;
    drift: number;
}) {
    return (
        <motion.div
            className="absolute"
            style={{
                left: x,
                bottom: "10%",
                zIndex: 1,
                willChange: "transform, opacity",
            }}
            animate={{
                y: [-10, -800],
                x: [0, drift, 0, -drift * 0.5, drift * 0.3, 0],
                opacity: [0, 0.8, 0.7, 0.5, 0.3, 0.1, 0], // Fades out gradually
            }}
            transition={{
                y: {
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0,
                },
                x: {
                    duration: duration * 0.9,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0,
                },
                opacity: {
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1], // Smooth fade throughout
                    repeatDelay: 0,
                },
            }}
        >
            {eduIcons[iconIdx]}
        </motion.div>
    );
}

// Stream config — reduced to 15 total (was 28), spread across width
const streamConfig = [
    { idx: 0, x: "5%", delay: 0, dur: 10, drift: 12 },
    { idx: 2, x: "15%", delay: 2.5, dur: 11, drift: -10 },
    { idx: 4, x: "25%", delay: 1.5, dur: 9.5, drift: 14 },
    { idx: 1, x: "35%", delay: 4, dur: 10.5, drift: -12 },
    { idx: 5, x: "45%", delay: 0.8, dur: 11, drift: 10 },
    { idx: 3, x: "55%", delay: 3.2, dur: 9, drift: -11 },
    { idx: 6, x: "65%", delay: 1.2, dur: 10, drift: 13 },
    { idx: 7, x: "75%", delay: 5, dur: 9.8, drift: -13 },
    { idx: 0, x: "85%", delay: 2, dur: 10.2, drift: 11 },
    { idx: 2, x: "95%", delay: 3.8, dur: 10.8, drift: -9 },
    // Second staggered layer (lighter density)
    { idx: 4, x: "10%", delay: 5.5, dur: 10, drift: -8 },
    { idx: 1, x: "30%", delay: 6.2, dur: 9.5, drift: 9 },
    { idx: 6, x: "50%", delay: 4.8, dur: 10.3, drift: -10 },
    { idx: 3, x: "70%", delay: 7, dur: 9.2, drift: 8 },
    { idx: 5, x: "90%", delay: 5.2, dur: 10.6, drift: -9 },
];

// ─── Cloud Bank (unchanged) ─────────────────────────────────────────────────
function FuffyCloudItem({
    width, bottom, left, opacity = 1, driftX = 15, driftDur = 12, delay = 0, zIndex = 2
}: {
    width: number; bottom: number; left: string;
    opacity?: number; driftX?: number; driftDur?: number; delay?: number; zIndex?: number;
}) {
    const h = Math.round(width * 0.48);
    const bubbles: [number, number, number, number][] = [
        [8, 18, 84, 40],
        [5, 30, 22, 42],
        [16, 38, 30, 56],
        [30, 46, 32, 66],
        [38, 50, 28, 72],
        [45, 52, 22, 60],
        [54, 44, 28, 60],
        [66, 36, 26, 50],
        [76, 26, 20, 40],
        [20, 28, 18, 34],
        [60, 26, 20, 36],
    ];

    return (
        <motion.div
            style={{ position: "absolute", left, bottom, width, height: h, zIndex }}
            animate={{
                x: [0, driftX, 0, -driftX * 0.7, 0],
                y: [0, -6, 0, 5, 0],
            }}
            transition={{ duration: driftDur, repeat: Infinity, ease: "easeInOut", delay }}
        >
            {bubbles.map((b, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: `${b[0]}%`, bottom: `${b[1]}%`,
                    width: `${b[2]}%`, height: `${b[3]}%`,
                    background: "white",
                    borderRadius: "50%",
                    opacity,
                    boxShadow: "inset -4px -6px 12px rgba(180,210,240,0.35), inset 2px 2px 8px rgba(255,255,255,0.9)",
                }} />
            ))}
        </motion.div>
    );
}

function CloudBank() {
    return (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: "40%", zIndex: 3 }}>
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "70%",
                background: "linear-gradient(to top, rgba(30,90,180,0.22) 0%, rgba(48,128,192,0.08) 60%, transparent 100%)",
            }} />
            {/* Back row */}
            <FuffyCloudItem width={360} bottom={-20} left="-4%" opacity={0.72} driftX={22} driftDur={14} delay={0} zIndex={2} />
            <FuffyCloudItem width={310} bottom={-10} left="18%" opacity={0.68} driftX={-18} driftDur={16} delay={0.8} zIndex={2} />
            <FuffyCloudItem width={340} bottom={-25} left="40%" opacity={0.70} driftX={20} driftDur={13} delay={0.4} zIndex={2} />
            <FuffyCloudItem width={320} bottom={-15} left="62%" opacity={0.68} driftX={-22} driftDur={15} delay={1.2} zIndex={2} />
            <FuffyCloudItem width={350} bottom={-20} left="80%" opacity={0.72} driftX={18} driftDur={14} delay={0.6} zIndex={2} />
            {/* Mid row */}
            <FuffyCloudItem width={280} bottom={10} left="5%" opacity={0.88} driftX={16} driftDur={11} delay={0.3} zIndex={3} />
            <FuffyCloudItem width={260} bottom={20} left="24%" opacity={0.85} driftX={-14} driftDur={12} delay={1.0} zIndex={3} />
            <FuffyCloudItem width={290} bottom={8} left="46%" opacity={0.88} driftX={18} driftDur={10} delay={0.2} zIndex={3} />
            <FuffyCloudItem width={265} bottom={15} left="67%" opacity={0.85} driftX={-16} driftDur={13} delay={0.9} zIndex={3} />
            <FuffyCloudItem width={280} bottom={5} left="84%" opacity={0.88} driftX={14} driftDur={11} delay={0.5} zIndex={3} />
            {/* Front row */}
            <FuffyCloudItem width={240} bottom={30} left="-2%" opacity={0.97} driftX={12} driftDur={9} delay={0.1} zIndex={5} />
            <FuffyCloudItem width={220} bottom={38} left="14%" opacity={1} driftX={-10} driftDur={10} delay={0.7} zIndex={5} />
            <FuffyCloudItem width={250} bottom={25} left="32%" opacity={0.96} driftX={14} driftDur={8} delay={0} zIndex={5} />
            <FuffyCloudItem width={230} bottom={35} left="52%" opacity={1} driftX={-12} driftDur={11} delay={1.1} zIndex={5} />
            <FuffyCloudItem width={245} bottom={28} left="71%" opacity={0.97} driftX={10} driftDur={9} delay={0.4} zIndex={5} />
            <FuffyCloudItem width={220} bottom={32} left="88%" opacity={1} driftX={-11} driftDur={10} delay={0.8} zIndex={5} />
            {/* White floor */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
                background: "linear-gradient(to top, white 50%, transparent 100%)",
                zIndex: 6,
            }} />
        </div>
    );
}

export default function SchoolTripsHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
    const headlineWords = ["School", "Trips", "&", "Educational", "Outings"];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-[#0a1628] overflow-hidden flex items-center justify-center pt-24 lg:pt-0"
        >
            {/* Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060e1f] via-[#0d2040] to-[#1a4a7a]" />

            {/* Ambient glow blobs */}
            <motion.div className="absolute w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
                style={{ background: "rgba(48,128,192,0.18)", top: "3%", left: "8%" }}
                animate={{ x: [0, 70, 0], y: [0, -30, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: "rgba(254,80,0,0.12)", top: "20%", right: "5%" }}
                animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />

            {/* Rising icons — reduced density, behind clouds */}
            {streamConfig.map((cfg, i) => (
                <RisingIcon
                    key={i}
                    iconIdx={cfg.idx}
                    x={cfg.x}
                    delay={cfg.delay}
                    duration={cfg.dur}
                    drift={cfg.drift}
                />
            ))}

            {/* Cloud bank */}
            <CloudBank />

            {/* Floating Hero Image — Desktop */}
            <motion.div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block z-20" style={{ y, scale }}>
                <motion.div className="relative w-[500px] h-[500px]"
                    animate={{ y: [0, -20, 0, 20, 0], rotate: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}>
                    <Image src="/image/school/school-hero1.png" alt="School trip adventures at Jus Jumpin"
                        width={500} height={500} className="w-full h-auto object-contain drop-shadow-2xl" priority
                        style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.4))' }} />
                    <motion.div className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 font-bold text-sm whitespace-nowrap"
                        style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                        <span className="text-[#FE5000] text-base mr-1">🎓</span>
                        <span style={{ color: '#172B44' }}>Learning Fun</span>
                    </motion.div>
                    <motion.div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 font-bold text-sm whitespace-nowrap"
                        style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                        animate={{ y: [0, 8, 0], rotate: [0, 3, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}>
                        <span style={{ color: '#172B44' }}>Safe & Secure</span>
                        <span className="text-[#3080c0] text-base ml-1">🛡️</span>
                    </motion.div>
                    {[...Array(4)].map((_, i) => ( // Reduced from 6 to 4 stars
                        <motion.div key={i} className="absolute text-2xl"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100, opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: [0, 360] }}
                            transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                            style={{ left: '50%', top: '50%' }}>⭐</motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left w-full" style={{ opacity }}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
                    <div className="flex-1 w-full">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                            <GraduationCap className="w-5 h-5 text-[#FE5000]" />
                            <span className="text-white font-semibold text-sm">Educational Excellence 🎓</span>
                        </motion.div>

                        <h1 className="font-['Fredoka_One'] text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-white leading-tight mb-6">
                            {headlineWords.map((word, index) => (
                                <motion.span key={index}
                                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                                    className={`inline-block mr-4 ${word === "Educational" ? "text-[#FE5000]" : word === "Outings" ? "block mt-2" : ""}`}>
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        {/* Mobile Hero Image */}
                        <motion.div className="lg:hidden w-full flex justify-center my-8"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                                <Image src="/image/school/school-hero1.png" alt="School trip adventures at Jus Jumpin"
                                    width={400} height={400} className="w-full h-auto object-contain drop-shadow-2xl" priority />
                                <motion.div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 font-bold text-xs whitespace-nowrap"
                                    style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
                                    animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <span className="text-[#FE5000] mr-1">🎓</span>
                                    <span style={{ color: '#172B44' }}>Learning Fun</span>
                                </motion.div>
                                <motion.div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 font-bold text-xs whitespace-nowrap"
                                    style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
                                    animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}>
                                    <span style={{ color: '#172B44' }}>Safe & Secure</span>
                                    <span className="text-[#3080c0] ml-1">🛡️</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-['Nunito'] leading-relaxed">
                            Creating memorable, curriculum-aligned experiences where learning comes alive through active play and discovery.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-row gap-3 justify-center lg:justify-start"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                                className="group relative flex-1 sm:flex-none px-4 py-3 sm:px-8 sm:py-4 bg-[#FE5000] text-white font-bold text-sm sm:text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 min-w-0"
                                style={{ boxShadow: '4px 4px 0 #1b3a5c' }}
                            >
                                <span className="truncate">View Packages</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.95 }}
                                className="flex-1 sm:flex-none px-4 py-3 sm:px-8 sm:py-4 bg-transparent text-white font-bold text-sm sm:text-lg rounded-full border-2 border-white/50 transition-all duration-300 min-w-0"
                                style={{ boxShadow: '4px 4px 0 #1b3a5c', color: '#FE5000' }}
                            >
                                <span className="truncate">Request Quote</span>
                            </motion.button>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div key={index} className="text-center group" whileHover={{ y: -5 }}>
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

            {/* Scroll Indicator */}
            <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
                animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} whileHover={{ scale: 1.2 }}>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div className="w-1 h-2 bg-white/50 rounded-full"
                        animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                </div>
            </motion.div>

            <motion.div className="absolute top-32 left-1/4 w-2 h-2 bg-[#FE5000] rounded-full z-30"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="absolute bottom-80 right-1/3 w-3 h-3 bg-[#3080c0] rounded-full z-30"
                animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
        </section>
    );
}