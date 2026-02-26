// components/school-trips/EducationalBenefits.tsx
"use client";

import { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useAnimate,
} from "framer-motion";
import { CheckCircle, Award, Target, Users, Heart, Zap } from "lucide-react";
import Image from "next/image";

/* ─── Benefits data ─── */
const benefits = [
    {
        icon: Target,
        title: "Curriculum Aligned",
        desc: "Activities designed to support PE, Science & PSHE objectives",
        color: "#3080c0",
    },
    {
        icon: Users,
        title: "Team Building",
        desc: "Develop communication and collaboration skills through group activities",
        color: "#FE5000",
    },
    {
        icon: Heart,
        title: "Confidence Building",
        desc: "Encourage personal growth and self-esteem in a supportive environment",
        color: "#6BCB77",
    },
    {
        icon: Award,
        title: "Skill Development",
        desc: "Physical coordination, spatial awareness, and motor skills",
        color: "#ffbb00",
    },
    {
        icon: Zap,
        title: "Active Learning",
        desc: "Kinesthetic learning experiences that improve retention",
        color: "#3080c0",
    },
    {
        icon: CheckCircle,
        title: "Ofsted Aligned",
        desc: "Meeting educational inspection frameworks with proven outcomes",
        color: "#FE5000",
    },
];

/* ═══════════════════════════════════════════════
   MOBILE BUS PAIR
   
   FIX EXPLANATION:
   The previous approach used whileInView on the motion.div that starts
   at x:"-120vw". This NEVER works — the element is off-screen so the
   Intersection Observer never detects it entering the viewport.
   
   CORRECT APPROACH:
   1. Watch a VISIBLE wrapper div with useInView
   2. When wrapper enters viewport, imperatively animate() the bus divs
   3. Bus divs start at translateX(-120vw) via initial CSS
   4. Section has overflowX:clip so no scrollbar appears
═══════════════════════════════════════════════ */
function MobileBusPair() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [leftScope, animateLeft] = useAnimate();
    const [rightScope, animateRight] = useAnimate();

    /* Watch the visible wrapper — this always fires correctly */
    const isInView = useInView(wrapperRef, { once: true, margin: "0px 0px -60px 0px" });

    useEffect(() => {
        if (isInView) {
            /* Slight stagger: left starts immediately, right 80ms later */
            animateLeft(leftScope.current, { x: 0 }, {
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
                delay: 0,
            });
            animateRight(rightScope.current, { x: 0 }, {
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.08,
            });
        }
    }, [isInView]); // eslint-disable-line

    return (
        /* Wrapper is VISIBLE and SIZED — useInView watches this */
        <div
            ref={wrapperRef}
            style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 12,
                /* clip without creating scroll container */
                overflowX: "clip",
            }}
        >
            {/* ── LEFT BUS ── */}
            <div style={{ width: "49%", position: "relative" }}>
                {/* This motion.div starts off-screen via translateX, 
            animated imperatively by animateLeft() when wrapper is visible */}
                <motion.div
                    ref={leftScope}
                    style={{
                        width: "100%",
                        position: "relative",
                        x: "-120vw", /* initial off-screen position */
                    }}
                >
                    {/* Motion trail — separate element, not in the transform chain */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            right: "-5%",
                            bottom: "38%",
                            width: "38%",
                            height: "13%",
                            background:
                                "linear-gradient(90deg, rgba(255,218,60,0.45) 0%, transparent 100%)",
                            borderRadius: "50%",
                            filter: "blur(7px)",
                            pointerEvents: "none",
                        }}
                    />
                    {/* Ground shadow */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            bottom: -4,
                            left: "8%",
                            right: "8%",
                            height: 10,
                            background:
                                "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
                            filter: "blur(3px)",
                        }}
                    />
                    {/* Bus image */}
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
                        <Image
                            src="/image/school/school-bus-left.png"
                            alt="School bus arriving from the left"
                            fill
                            sizes="180px"
                            style={{
                                objectFit: "contain",
                                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.18))",
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* ── RIGHT BUS ── */}
            <div style={{ width: "49%", position: "relative" }}>
                <motion.div
                    ref={rightScope}
                    style={{
                        width: "100%",
                        position: "relative",
                        x: "120vw", /* initial off-screen position */
                    }}
                >
                    {/* Motion trail */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            left: "-5%",
                            bottom: "38%",
                            width: "38%",
                            height: "13%",
                            background:
                                "linear-gradient(270deg, rgba(255,218,60,0.45) 0%, transparent 100%)",
                            borderRadius: "50%",
                            filter: "blur(7px)",
                            pointerEvents: "none",
                        }}
                    />
                    {/* Ground shadow */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            bottom: -4,
                            left: "8%",
                            right: "8%",
                            height: 10,
                            background:
                                "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
                            filter: "blur(3px)",
                        }}
                    />
                    {/* Bus image */}
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
                        <Image
                            src="/image/school/school-bus-right.png"
                            alt="School bus arriving from the right"
                            fill
                            sizes="180px"
                            style={{
                                objectFit: "contain",
                                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.18))",
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   DESKTOP BUS — scroll-driven, absolute positioned
═══════════════════════════════════════════════ */
function DesktopBus({
    direction,
    scrollYProgress,
}: {
    direction: "left" | "right";
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const isLeft = direction === "left";

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        isLeft ? ["-120%", "0%"] : ["120%", "0%"]
    );
    const rotate = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        isLeft ? [-10, 0, 5] : [10, 0, -5]
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1],
        [0, 1, 1, 0.8]
    );

    return (
        <motion.div
            className={`absolute ${isLeft ? "left-0 md:left-6 lg:left-10" : "right-0 md:right-6 lg:right-10"
                } top-1/2 -translate-y-1/2 z-20 pointer-events-none`}
            style={{ x, rotate, opacity }}
        >
            <div className="relative w-[220px] md:w-[280px] lg:w-[360px]">
                <div className="relative w-full aspect-square">
                    <Image
                        src={`/image/school/school-bus-${direction}.png`}
                        alt={`School bus arriving from ${direction}`}
                        fill
                        sizes="(max-width: 1024px) 280px, 360px"
                        style={{
                            objectFit: "contain",
                            filter:
                                "drop-shadow(0 22px 44px rgba(0,0,0,0.22)) drop-shadow(0 6px 12px rgba(0,0,0,0.15))",
                        }}
                        priority
                    />
                </div>

                {/* Trail */}
                <motion.div
                    className={`absolute top-[55%] -translate-y-1/2 ${isLeft ? "-right-8" : "-left-8"
                        } w-20 h-7 rounded-full blur-xl`}
                    style={{
                        background: `linear-gradient(to ${isLeft ? "right" : "left"}, rgba(255,218,60,0.6), transparent)`,
                    }}
                    animate={{ opacity: [0.3, 0.75, 0.3], scaleX: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Speed lines */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={`absolute top-[55%] ${isLeft ? "right-0" : "left-0"} h-0.5 bg-white/50 rounded-full`}
                        style={{ width: 18 + i * 14 }}
                        animate={{
                            x: isLeft ? [0, 28, 0] : [0, -28, 0],
                            opacity: [0.2, 0.65, 0.2],
                        }}
                        transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                    />
                ))}

                {/* Dust */}
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={`d${i}`}
                        className="absolute w-2 h-2 bg-gray-400/40 rounded-full"
                        style={{
                            [isLeft ? "right" : "left"]: `${12 + i * 14}%`,
                            bottom: `${12 + i * 4}%`,
                        }}
                        animate={{
                            x: isLeft ? [0, 24 + i * 10] : [0, -24 - i * 10],
                            y: [0, -14 - i * 5],
                            opacity: [0.5, 0],
                            scale: [1, 1.8],
                        }}
                        transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
                    />
                ))}

                {/* Ground shadow */}
                <div
                    style={{
                        position: "absolute",
                        bottom: -5,
                        left: "10%",
                        right: "10%",
                        height: 14,
                        background:
                            "radial-gradient(ellipse, rgba(0,0,0,0.17) 0%, transparent 70%)",
                        filter: "blur(5px)",
                    }}
                />
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   BENEFITS CONTENT — shared card body
═══════════════════════════════════════════════ */
function BenefitsContent({ compact = false }: { compact?: boolean }) {
    return (
        <>
            <div
                className={`grid ${compact
                    ? "grid-cols-1 gap-3"
                    : "grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                    }`}
            >
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 + index * 0.07, duration: 0.42 }}
                            whileHover={
                                !compact
                                    ? {
                                        scale: 1.02,
                                        x: 3,
                                        transition: { type: "spring", stiffness: 400 },
                                    }
                                    : {}
                            }
                            className={`flex gap-3 rounded-2xl group cursor-default border border-transparent transition-all ${compact
                                ? "p-3"
                                : "p-4 hover:bg-gradient-to-r hover:from-white hover:to-gray-50 hover:border-gray-100"
                                }`}
                            style={compact ? { background: `${benefit.color}0d` } : {}}
                        >
                            <motion.div
                                className={`${compact ? "w-10 h-10" : "w-12 h-12"
                                    } rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}
                                style={{
                                    background: `linear-gradient(135deg, ${benefit.color}15, ${benefit.color}05)`,
                                    border: `1px solid ${benefit.color}25`,
                                }}
                                whileHover={!compact ? { rotate: 5, scale: 1.1 } : {}}
                            >
                                <Icon
                                    className={compact ? "w-5 h-5" : "w-6 h-6"}
                                    style={{ color: benefit.color }}
                                />
                            </motion.div>
                            <div>
                                <h3
                                    className={`font-bold text-[#172B44] mb-0.5 group-hover:text-[#3080c0] transition-colors ${compact ? "text-sm" : "text-base md:text-lg"
                                        }`}
                                    style={{ fontFamily: '"Fredoka One", cursive' }}
                                >
                                    {benefit.title}
                                </h3>
                                <p
                                    className="text-gray-600 leading-relaxed"
                                    style={{ fontSize: compact ? "0.76rem" : "0.875rem" }}
                                >
                                    {benefit.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Ofsted badge */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                className="mt-5 pt-4 border-t-2 border-dashed border-gray-200 flex justify-center"
            >
                <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg"
                    style={{
                        background:
                            "linear-gradient(135deg, #3080c0 0%, #4a9fd1 50%, #6BCB77 100%)",
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                    </div>
                    <span
                        className="font-bold text-white text-sm"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        Ofsted Aligned Framework ✓
                    </span>
                </motion.div>
            </motion.div>
        </>
    );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function EducationalBenefits() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);
    const contentScale = useTransform(scrollYProgress, [0.3, 0.5], [0.95, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-28"
            style={{
                background:
                    "linear-gradient(180deg, #ffffff 0%, #f0f7ff 30%, #e0f0ff 70%, #ffffff 100%)",
                /* clip horizontal overflow without creating a scroll container
                   (overflow:hidden would block Intersection Observer on off-screen elements) */
                overflowX: "clip",
                overflowY: "visible",
            }}
        >
            {/* Top wave */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                <svg
                    className="relative block w-full h-12 md:h-20"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            {/* Background deco */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                {[
                    { icon: "🎓", x: "5%", y: "20%", delay: 0 },
                    { icon: "📚", x: "92%", y: "30%", delay: 1 },
                    { icon: "⭐", x: "8%", y: "70%", delay: 2 },
                    { icon: "📝", x: "95%", y: "60%", delay: 1.5 },
                    { icon: "🎯", x: "15%", y: "85%", delay: 0.5 },
                    { icon: "🏆", x: "88%", y: "80%", delay: 2.5 },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-3xl md:text-4xl"
                        style={{ left: item.x, top: item.y, opacity: 0.05 }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0],
                            opacity: [0.04, 0.08, 0.04],
                        }}
                        transition={{
                            duration: 6,
                            delay: item.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {item.icon}
                    </motion.div>
                ))}
                <div className="absolute top-40 left-10 w-72 h-72 bg-[#3080c0]/8 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-10 w-80 h-80 bg-[#FE5000]/8 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-10">

                {/* ── Heading (shared) ── */}
                <motion.div
                    className="text-center mb-8 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3080c0]/10 text-[#3080c0] rounded-full font-bold text-sm mb-4 border border-[#3080c0]/20"
                        whileHover={{ scale: 1.05 }}
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        <Award className="w-4 h-4" />
                        Learning Outcomes
                    </motion.span>

                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-[#172B44] mb-4"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        Educational{" "}
                        <span className="bg-gradient-to-r from-[#3080c0] to-[#6BCB77] bg-clip-text text-transparent">
                            Benefits
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        More than just fun — measurable learning outcomes for every student
                    </p>
                </motion.div>

                {/* ══════════════════════════════════════
            MOBILE LAYOUT (< md)
            Heading → Buses → Card
        ══════════════════════════════════════ */}
                <div className="block md:hidden">
                    <MobileBusPair />

                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/80"
                    >
                        <BenefitsContent compact={true} />
                    </motion.div>
                </div>

                {/* ══════════════════════════════════════
            DESKTOP LAYOUT (≥ md)
            Buses flank centre card, scroll-driven
        ══════════════════════════════════════ */}
                <div className="hidden md:block">
                    <div className="relative min-h-[450px] lg:min-h-[500px] flex items-center justify-center">
                        <DesktopBus direction="left" scrollYProgress={scrollYProgress} />
                        <DesktopBus direction="right" scrollYProgress={scrollYProgress} />

                        <motion.div
                            className="relative z-10 w-full max-w-3xl mx-auto"
                            style={{
                                opacity: contentOpacity,
                                y: contentY,
                                scale: contentScale,
                            }}
                        >
                            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] border border-white/80">
                                <BenefitsContent compact={false} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll hint */}
                    <motion.div
                        className="text-center mt-8 text-gray-400 text-sm font-semibold flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.span
                            animate={{ x: [-4, 0, -4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            🚌
                        </motion.span>
                        Scroll up to watch the buses arrive
                        <motion.span
                            animate={{ x: [4, 0, 4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            🚌
                        </motion.span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none">
                <svg
                    className="relative block w-full h-12 md:h-20"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>
        </section>
    );
}