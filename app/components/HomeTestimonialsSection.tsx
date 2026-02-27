// app/components/HomeTestimonialsSection.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import TestimonialMarquee from "../components/shared/TestimonialMarquee";
import GoogleReviewCard from "../components/shared/GoogleReviewCard";
import type { Testimonial } from "../components/shared/TestimonialCard";

/* ══════════════════════════════════════════════════════════
   HOME PAGE TESTIMONIALS DATA
   "school" field = zone label (Kids Zone / Adult Zone / etc.)
   "role"   field = visitor type (Parent, Adult, Group, etc.)
   Export so page.tsx can pass to StructuredData too.
══════════════════════════════════════════════════════════ */
export const homeTestimonialsData: Testimonial[] = [
    /* ── KIDS ZONE ── */
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "Parent of two",
        school: "🧒 Kids Zone",
        rating: 5,
        text: "My kids absolutely lost their minds with excitement. The foam pits, trampolines and climbing walls kept them busy for hours. Cleanest soft play we've ever visited — we're coming back next weekend.",
        googleReview: true,
        verified: true,
        date: "April 2025",
        accentColor: "#FE5000",
    },
    {
        id: 2,
        name: "James & Chloe Patel",
        role: "Parents",
        school: "🧒 Kids Zone",
        rating: 5,
        text: "Both our 4-year-old and 9-year-old were perfectly catered for — different sections for different ages. The staff were warm, attentive and genuinely fun. Cannot recommend enough.",
        googleReview: true,
        date: "March 2025",
        accentColor: "#FE5000",
    },
    {
        id: 3,
        name: "Amara Osei",
        role: "Mum of three",
        school: "🧒 Kids Zone",
        rating: 5,
        text: "We visit almost every school holiday. The safety mats, padding and supervision give me total peace of mind while the kids just have the most incredible time. A proper adventure for little ones.",
        verified: true,
        date: "February 2025",
        accentColor: "#FE5000",
    },
    {
        id: 4,
        name: "Tom Greenwood",
        role: "Dad",
        school: "🧒 Kids Zone",
        rating: 5,
        text: "Brought my son for his 7th birthday. The party package was flawless — from the dedicated host to the food. Every child left exhausted and beaming. Genuinely the best birthday venue around.",
        googleReview: true,
        verified: true,
        date: "January 2025",
        accentColor: "#FE5000",
    },
    {
        id: 5,
        name: "Priya Nair",
        role: "Parent",
        school: "🧒 Kids Zone",
        rating: 5,
        text: "The toddler area is beautifully designed — safe, colourful and stimulating. My 2-year-old was in her element. Staff were incredibly patient and kind. We'll definitely be regulars.",
        date: "December 2024",
        accentColor: "#FE5000",
    },

    /* ── ADULT ZONE ── */
    {
        id: 6,
        name: "Marcus Reid",
        role: "Adult visitor",
        school: "💪 Adult Zone",
        rating: 5,
        text: "I came expecting a basic trampoline park and left completely amazed. The adult zone is next-level — freestyle walls, dodgeball courts and slam dunk areas. Full body workout without feeling like exercise.",
        googleReview: true,
        verified: true,
        date: "April 2025",
        accentColor: "#3080c0",
    },
    {
        id: 7,
        name: "Leila Fernandez",
        role: "Fitness enthusiast",
        school: "💪 Adult Zone",
        rating: 5,
        text: "Came with my gym crew for a Friday night session. We had an absolute blast — competitive, physical and ridiculously fun. Way better than another night at the gym. Already booked our next visit.",
        googleReview: true,
        date: "March 2025",
        accentColor: "#3080c0",
    },
    {
        id: 8,
        name: "Dan Kowalski",
        role: "Group of 8 adults",
        school: "💪 Adult Zone",
        rating: 5,
        text: "Booked the adult zone for a mate's stag do. Best decision we ever made. Honestly the most fun I've had in years. The foam pit alone is worth the visit. Every single person had the time of their life.",
        verified: true,
        date: "February 2025",
        accentColor: "#3080c0",
    },
    {
        id: 9,
        name: "Yemi Adeyemi",
        role: "Regular visitor",
        school: "💪 Adult Zone",
        rating: 5,
        text: "I come here at least twice a month. The staff always make you feel welcome and the space is immaculate. If you haven't tried the parkour wall yet — get yourself here immediately.",
        googleReview: true,
        verified: true,
        date: "January 2025",
        accentColor: "#3080c0",
    },
    {
        id: 10,
        name: "Sophie Banks",
        role: "Office team outing",
        school: "💪 Adult Zone",
        rating: 5,
        text: "Our entire office came for a team-building day and it was genuinely the best team activity we've ever done. Competitive, hilarious, and everyone bonded properly. 100% doing it again.",
        date: "December 2024",
        accentColor: "#3080c0",
    },
];

/* ─── Split by zone for labelled rows ─── */
const kidsZone = homeTestimonialsData.filter((t) => t.school.includes("Kids"));
const adultZone = homeTestimonialsData.filter((t) => t.school.includes("Adult"));

/* ─── Stats ─── */
const STATS = [
    { value: "10k+", label: "Happy Visitors" },
    { value: "4.9★", label: "Google Rating" },
    { value: "2", label: "Amazing Zones" },
    { value: "7yrs", label: "Of Fun" },
];

/* ═══════════════════════════════════════════════════════
   ZONE TAB PILL (Kids / Adult label above each row)
═══════════════════════════════════════════════════════ */
function ZoneLabel({
    emoji,
    label,
    color,
    delay = 0,
}: {
    emoji: string;
    label: string;
    color: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: `${color}12`,
                border: `1.5px solid ${color}30`,
                borderRadius: 60,
                padding: "6px 16px",
                marginBottom: 16,
                marginLeft: 24,
            }}
        >
            <span style={{ fontSize: "1rem" }}>{emoji}</span>
            <span style={{
                fontFamily: '"Fredoka One", cursive',
                fontSize: "0.88rem",
                color,
                letterSpacing: "0.4px",
            }}>
                {label}
            </span>
            {/* Small star dots */}
            {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24">
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill={color}
                        stroke={color}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════ */
export default function HomeTestimonialsSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

    return (
        <section
            aria-labelledby="home-testimonials-heading"
            style={{
                position: "relative",
                width: "100%",
                background:
                    "linear-gradient(180deg, #ffffff 0%, #fafcff 35%, #f0f7ff 70%, #ffffff 100%)",
                paddingTop: 88,
                overflow: "hidden",
            }}
        >
            {/* ── Background ── */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(circle, #3080c018 1px, transparent 1px)",
                    backgroundSize: "30px 30px", opacity: 0.5,
                }} />
                <div style={{
                    position: "absolute", top: "6%", left: "-8%",
                    width: 500, height: 500, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(254,80,0,0.05) 0%, transparent 65%)",
                }} />
                <div style={{
                    position: "absolute", bottom: "5%", right: "-6%",
                    width: 440, height: 440, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(48,128,192,0.05) 0%, transparent 65%)",
                }} />
                {/* Watermark */}
                <div style={{
                    position: "absolute", top: "8%", right: "2%",
                    fontFamily: "Georgia, serif", fontSize: 200, lineHeight: 0.7,
                    color: "#FE5000", opacity: 0.025, userSelect: "none", fontWeight: 900,
                }}>"</div>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        textAlign: "center",
                        padding: "0 24px",
                        maxWidth: 720,
                        margin: "0 auto 10px",
                    }}
                >
                    {/* Google badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.15, duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{ marginBottom: 18, display: "flex", justifyContent: "center" }}
                    >
                        <GoogleReviewCard rating={4.9} reviewCount={320} animateOnView={false} />
                    </motion.div>

                    <h2
                        id="home-testimonials-heading"
                        style={{
                            fontFamily: '"Fredoka One", cursive',
                            fontSize: "clamp(1.9rem, 5vw, 3.3rem)",
                            color: "#0f2d52",
                            lineHeight: 1.1,
                            margin: "0 0 14px",
                            fontWeight: 400,
                        }}
                    >
                        Loved by Kids.{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #FE5000 0%, #ff7e40 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Adored by Adults.
                        </span>
                    </h2>

                    <p style={{
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "clamp(0.92rem, 2vw, 1.05rem)",
                        color: "#4a6a8a", fontWeight: 700, lineHeight: 1.65, margin: 0,
                    }}>
                        From toddler tumbles to adult dodgeball — real people, real experiences, real smiles.
                    </p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={headerInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        style={{
                            width: 64, height: 4,
                            background: "linear-gradient(90deg, #FE5000, #3080c0)",
                            borderRadius: 4, margin: "18px auto 0",
                            transformOrigin: "center",
                        }}
                    />
                </motion.div>

                {/* ── Stats strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "8px 28px",
                        padding: "26px 24px 44px",
                    }}
                >
                    {STATS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, scale: 0.82 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 + i * 0.07, duration: 0.38, ease: [0.34, 1.56, 0.64, 1] }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
                        >
                            <span style={{
                                fontFamily: '"Fredoka One", cursive',
                                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                                color: "#0f2d52", lineHeight: 1.1,
                            }}>
                                {s.value}
                            </span>
                            <span style={{
                                fontFamily: '"Nunito", sans-serif',
                                fontSize: "0.7rem", color: "#6b8eaf", fontWeight: 700,
                                letterSpacing: "0.5px", textTransform: "uppercase",
                            }}>
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ══════════════════════════════════════
            KIDS ZONE ROW
        ══════════════════════════════════════ */}
                <ZoneLabel emoji="🧒" label="Kids Zone" color="#FE5000" delay={0} />
                <TestimonialMarquee
                    testimonials={kidsZone}
                    cardWidth={350}
                    speed={52}
                    singleRow
                />

                {/* ══════════════════════════════════════
            ADULT ZONE ROW
        ══════════════════════════════════════ */}
                <div style={{ marginTop: 28 }}>
                    <ZoneLabel emoji="💪" label="Adult Zone" color="#3080c0" delay={0.1} />
                    <TestimonialMarquee
                        testimonials={adultZone}
                        cardWidth={350}
                        speed={48}
                        singleRow
                    />
                </div>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center", padding: "48px 24px 68px", position: "relative" }}
                >
                    <div style={{
                        position: "absolute", top: 0, left: "50%",
                        transform: "translateX(-50%)",
                        width: "50%", height: 1,
                        background: "linear-gradient(90deg, transparent, rgba(254,80,0,0.15), transparent)",
                    }} />

                    <p style={{
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "0.88rem", color: "#6b8eaf", fontWeight: 700, marginBottom: 18,
                    }}>
                        Kids zone, adult zone or both — we've got a session for everyone.
                    </p>

                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <motion.div
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Link
                                href="/activities"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    background: "linear-gradient(135deg, #FE5000, #ff7e40)",
                                    color: "#fff",
                                    fontFamily: '"Fredoka One", cursive',
                                    fontSize: "1rem", padding: "14px 30px",
                                    borderRadius: 60, textDecoration: "none",
                                    boxShadow: "0 8px 24px rgba(254,80,0,0.26)",
                                }}
                            >
                                Kids Zone
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Link
                                href="/activities#adult"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    background: "linear-gradient(135deg, #1b3a5c, #3080c0)",
                                    color: "#fff",
                                    fontFamily: '"Fredoka One", cursive',
                                    fontSize: "1rem", padding: "14px 30px",
                                    borderRadius: 60, textDecoration: "none",
                                    boxShadow: "0 8px 24px rgba(48,128,192,0.24)",
                                }}
                            >
                                Adult Zone
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Trust micro tags */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 16, marginTop: 16, flexWrap: "wrap",
                    }}>
                        {["Walk-ins Welcome", "Online Booking", "Group Discounts"].map((tag) => (
                            <div key={tag} style={{
                                display: "flex", alignItems: "center", gap: 5,
                                fontFamily: '"Nunito", sans-serif',
                                fontSize: "0.73rem", color: "#8aaac8", fontWeight: 700,
                            }}>
                                <div style={{
                                    width: 13, height: 13, borderRadius: "50%",
                                    background: "#10b98114", border: "1.5px solid #10b98135",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "0.48rem", color: "#10b981",
                                }}>✓</div>
                                {tag}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800&display=swap');
      `}</style>
        </section>
    );
}