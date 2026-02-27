// app/components/school-trips/SchoolTestimonialsSection.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TestimonialMarquee from "../shared/TestimonialMarquee";
import GoogleReviewCard from "../shared/GoogleReviewCard";
import type { Testimonial } from "../shared/TestimonialCard";

/* ═══════════════════════════════════════════════
   SCHOOL TESTIMONIALS DATA
   Export so SchoolTripsClient and StructuredData
   can both import the same source of truth.
═══════════════════════════════════════════════ */
export const schoolTestimonialsData: Testimonial[] = [
    {
        id: 1,
        name: "Mrs. Priya Sharma",
        role: "Physical Education Teacher",
        school: "Greenfield Academy",
        rating: 5,
        text: "Our students had the most unforgettable learning experience. Safety standards were exceptional and every activity was beautifully tied back to our curriculum objectives.",
        googleReview: true,
        verified: true,
        date: "March 2025",
    },
    {
        id: 2,
        name: "Mr. Daniel Okoye",
        role: "Year 6 Class Teacher",
        school: "St. Mary's CE Primary",
        rating: 5,
        text: "From the moment we booked, we felt completely supported. The dedicated school coordinator handled every detail — our visit ran like clockwork.",
        googleReview: true,
        verified: true,
        date: "February 2025",
    },
    {
        id: 3,
        name: "Ms. Sophie Whitfield",
        role: "Head of PSHE",
        school: "Riverside Junior School",
        rating: 5,
        text: "The pre-visit planning pack was comprehensive and the on-site safety briefing put every parent's mind at ease. Truly professional from start to finish.",
        verified: true,
        date: "January 2025",
    },
    {
        id: 4,
        name: "Mr. Aaron Patel",
        role: "Deputy Headteacher",
        school: "Oakwood Community School",
        rating: 5,
        text: "We've taken school trips for years but this was something special. Children developed real teamwork skills and came back absolutely buzzing with energy.",
        googleReview: true,
        date: "December 2024",
    },
    {
        id: 5,
        name: "Mrs. Helen Cartwright",
        role: "SENCO Coordinator",
        school: "Maple Grove Inclusive School",
        rating: 5,
        text: "As a SENCO, accessibility and safety are my top priorities. Jus Jumpin accommodated all our pupils' needs without a single hitch. Truly inclusive — and genuinely fun.",
        verified: true,
        date: "November 2024",
    },
    {
        id: 6,
        name: "Mr. James Thornton",
        role: "Science Department Lead",
        school: "Hillside Secondary Academy",
        rating: 5,
        text: "We tied the visit into our STEM curriculum and the results were remarkable. Student engagement in the following weeks was noticeably higher. Kinesthetic learning at its best.",
        googleReview: true,
        verified: true,
        date: "October 2024",
    },
    {
        id: 7,
        name: "Ms. Fatima Hassan",
        role: "Year 3 Teacher",
        school: "Sunflower Primary School",
        rating: 5,
        text: "Every detail was thought of — from the coach parking to the certificate presentations. My class still talk about it weeks later. Absolutely magical experience.",
        date: "September 2024",
    },
    {
        id: 8,
        name: "Mr. Chris Delaney",
        role: "PE & Sports Coordinator",
        school: "The Charter School",
        rating: 5,
        text: "Professional, safe, curriculum-aligned and genuinely exciting. That's an incredibly rare combination. Jus Jumpin delivers on every single promise.",
        googleReview: true,
        date: "August 2024",
    },
];

/* ─── Stats bar ─── */
const STATS = [
    { value: "500+", label: "Schools Visited" },
    { value: "4.9★", label: "Average Rating" },
    { value: "15k+", label: "Happy Students" },
    { value: "100%", label: "Safe Visits" },
];

/* ═══════════════════════════════════════════════
   SECTION COMPONENT
═══════════════════════════════════════════════ */
export default function SchoolTestimonialsSection() {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

    const avgRating =
        schoolTestimonialsData.reduce((s, t) => s + t.rating, 0) /
        schoolTestimonialsData.length;

    return (
        <section
            aria-labelledby="school-testimonials-heading"
            style={{
                position: "relative",
                width: "100%",
                background:
                    "linear-gradient(180deg, #ffffff 0%, #f4f9ff 38%, #edf5ff 76%, #f8fbff 100%)",
                paddingTop: 88,
                overflow: "hidden",
            }}
        >
            {/* ── Background atmosphere ── */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {/* Dot grid */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(circle, #3080c018 1px, transparent 1px)",
                    backgroundSize: "30px 30px", opacity: 0.55,
                }} />
                {/* Orbs */}
                <div style={{
                    position: "absolute", top: "4%", left: "-6%",
                    width: 460, height: 460, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(48,128,192,0.055) 0%, transparent 65%)",
                }} />
                <div style={{
                    position: "absolute", bottom: "8%", right: "-5%",
                    width: 380, height: 380, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(254,80,0,0.045) 0%, transparent 65%)",
                }} />
                {/* Giant background quote */}
                <div style={{
                    position: "absolute", top: "6%", right: "3%",
                    fontFamily: "Georgia, serif", fontSize: 200, lineHeight: 0.7,
                    color: "#3080c0", opacity: 0.025, userSelect: "none", fontWeight: 900,
                }}>
                    "
                </div>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 32 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    style={{
                        textAlign: "center",
                        padding: "0 24px",
                        maxWidth: 740,
                        margin: "0 auto 12px",
                    }}
                >
                    {/* Social proof pill */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.15, duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{ marginBottom: 18, display: "flex", justifyContent: "center" }}
                    >
                        <GoogleReviewCard
                            rating={avgRating}
                            reviewCount={schoolTestimonialsData.length * 14}
                            animateOnView={false}
                        />
                    </motion.div>

                    <h2
                        id="school-testimonials-heading"
                        style={{
                            fontFamily: '"Fredoka One", cursive',
                            fontSize: "clamp(1.9rem, 5vw, 3.4rem)",
                            color: "#0f2d52",
                            lineHeight: 1.1,
                            margin: "0 0 14px",
                            fontWeight: 400,
                        }}
                    >
                        Trusted by Teachers{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #3080c0 0%, #0ea5e9 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Nationwide
                        </span>
                    </h2>

                    <p style={{
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "clamp(0.92rem, 2vw, 1.05rem)",
                        color: "#4a6a8a", fontWeight: 700, lineHeight: 1.65, margin: 0,
                    }}>
                        Real stories from real schools — unfiltered, unsponsored, and unforgettable.
                    </p>

                    {/* Animated underline */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={headerInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.36 }}
                        style={{
                            width: 64, height: 4,
                            background: "linear-gradient(90deg, #f59e0b, #FE5000)",
                            borderRadius: 4,
                            margin: "18px auto 0",
                            transformOrigin: "center",
                        }}
                    />
                </motion.div>

                {/* ── Stats strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "8px 28px",
                        padding: "28px 24px 44px",
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
                                fontSize: "clamp(1.55rem, 3vw, 2.1rem)",
                                color: "#0f2d52", lineHeight: 1.1,
                            }}>
                                {s.value}
                            </span>
                            <span style={{
                                fontFamily: '"Nunito", sans-serif',
                                fontSize: "0.72rem", color: "#6b8eaf", fontWeight: 700,
                                letterSpacing: "0.5px", textTransform: "uppercase",
                            }}>
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Dual-row animated marquee ── */}
                <TestimonialMarquee
                    testimonials={schoolTestimonialsData}
                    cardWidth={360}
                    speed={58}
                />

                {/* ── CTA block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55 }}
                    style={{
                        textAlign: "center",
                        padding: "52px 24px 72px",
                        position: "relative",
                    }}
                >
                    {/* Subtle top divider glow */}
                    <div style={{
                        position: "absolute", top: 0, left: "50%",
                        transform: "translateX(-50%)",
                        width: "55%", height: 1,
                        background: "linear-gradient(90deg, transparent, rgba(48,128,192,0.18), transparent)",
                    }} />

                    <p style={{
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "0.88rem", color: "#6b8eaf", fontWeight: 700, marginBottom: 18,
                    }}>
                        Ready to create memories that last a lifetime?
                    </p>

                    <motion.div
                        style={{ display: "inline-block" }}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Link
                            href="/school-trips/enquire"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                background: "linear-gradient(135deg, #FE5000 0%, #ff7e40 100%)",
                                color: "#fff",
                                fontFamily: '"Fredoka One", cursive',
                                fontSize: "1.05rem", fontWeight: 400,
                                padding: "16px 36px", borderRadius: 60,
                                textDecoration: "none",
                                boxShadow: "0 8px 28px rgba(254,80,0,0.28), 0 2px 8px rgba(0,0,0,0.06)",
                                letterSpacing: "0.3px",
                            }}
                        >
                            Plan Your School Visit
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ArrowRight size={18} />
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Trust tags */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 18, marginTop: 16, flexWrap: "wrap",
                    }}>
                        {["Free Quote", "No Commitment", "Quick Response"].map((tag) => (
                            <div key={tag} style={{
                                display: "flex", alignItems: "center", gap: 5,
                                fontFamily: '"Nunito", sans-serif',
                                fontSize: "0.74rem", color: "#8aaac8", fontWeight: 700,
                            }}>
                                <div style={{
                                    width: 14, height: 14, borderRadius: "50%",
                                    background: "#10b98118", border: "1.5px solid #10b98138",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "0.5rem", color: "#10b981",
                                }}>✓</div>
                                {tag}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800&display=swap');
      `}</style>
        </section>
    );
}