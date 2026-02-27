// app/shared/TestimonialCard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

/* ─── Types (inline — no separate types file needed) ─── */
export interface Testimonial {
    id: number;
    name: string;
    role: string;
    school: string;        // or "Parent" / "Guardian" for birthday page
    rating: number;        // 1–5, supports decimals
    text: string;
    avatar?: string;       // next/image path — falls back to initials
    featured?: boolean;
    googleReview?: boolean;
    verified?: boolean;
    date?: string;         // "March 2025"
    accentColor?: string;  // override per card
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    index?: number;
    compact?: boolean;
    animateOnView?: boolean; // false in marquee (already moving)
}

/* ─── Accent palette cycles by index ─── */
const ACCENTS = [
    { color: "#3080c0", bg: "#e8f4ff" },
    { color: "#FE5000", bg: "#fff3ed" },
    { color: "#10b981", bg: "#e6faf3" },
    { color: "#f59e0b", bg: "#fffbea" },
    { color: "#6366f1", bg: "#eef2ff" },
    { color: "#0ea5e9", bg: "#e0f6ff" },
];

function initials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function TestimonialCard({
    testimonial,
    index = 0,
    compact = false,
    animateOnView = true,
}: TestimonialCardProps) {
    const [hovered, setHovered] = useState(false);
    const acc = ACCENTS[index % ACCENTS.length];
    const color = testimonial.accentColor ?? acc.color;
    const bg = acc.bg;

    return (
        <motion.article
            initial={animateOnView ? { opacity: 0, y: 36 } : { opacity: 1 }}
            whileInView={animateOnView ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (index % 3) * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
            aria-label={`Testimonial from ${testimonial.name}, ${testimonial.role} at ${testimonial.school}`}
        >
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: `1.5px solid ${hovered ? color + "44" : "#e2eaf3"}`,
                    borderRadius: 22,
                    padding: compact ? "18px 18px 16px" : "26px 24px 22px",
                    boxShadow: hovered
                        ? `0 20px 48px rgba(0,0,0,0.08), 0 0 0 1px ${color}22`
                        : "0 4px 24px rgba(27,58,92,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {/* Corner tint */}
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: 100, height: 100,
                    background: `radial-gradient(circle at top right, ${bg} 0%, transparent 70%)`,
                    pointerEvents: "none",
                    opacity: hovered ? 1 : 0.65,
                    transition: "opacity 0.3s ease",
                }} />

                {/* Accent top bar */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${color}, ${color}55)`,
                    borderRadius: "22px 22px 0 0",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }} />

                {/* ── Top row: quote + badges ── */}
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: 12, position: "relative", zIndex: 1,
                }}>
                    {/* Large quote mark */}
                    <div style={{
                        fontFamily: "Georgia, serif",
                        fontSize: compact ? 48 : 64, lineHeight: 0.65,
                        color, opacity: 0.13, userSelect: "none", fontWeight: 900,
                    }} aria-hidden="true">"</div>

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        {testimonial.googleReview && (
                            <div title="Google Review" style={{
                                width: 24, height: 24, borderRadius: "50%",
                                background: "#fff", border: "1.5px solid #e2eaf3",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                            }}>
                                <svg width="13" height="13" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </div>
                        )}
                        {testimonial.verified && (
                            <div style={{
                                display: "flex", alignItems: "center", gap: 3,
                                background: "#e6faf3", border: "1.5px solid #10b98130",
                                borderRadius: 20, padding: "2px 7px 2px 4px",
                                fontSize: "0.62rem",
                                fontFamily: '"Nunito", sans-serif', fontWeight: 800, color: "#059669",
                            }}>
                                <BadgeCheck size={10} color="#10b981" />
                                Verified
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Quote text ── */}
                <p style={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: compact ? "0.82rem" : "0.93rem",
                    color: "#2d4a6a", fontWeight: 700, lineHeight: 1.7,
                    margin: "0 0 18px", flex: 1,
                    position: "relative", zIndex: 1, fontStyle: "italic",
                }}>
                    {testimonial.text}
                </p>

                {/* ── Bottom: avatar + info + stars ── */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 11,
                    paddingTop: 14, borderTop: "1.5px solid #f0f4f8",
                    position: "relative", zIndex: 1,
                }}>
                    {/* Avatar */}
                    <div style={{
                        width: compact ? 36 : 44, height: compact ? 36 : 44,
                        borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                        border: `2px solid ${color}33`, background: bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 3px 10px ${color}20`, position: "relative",
                    }}>
                        {testimonial.avatar ? (
                            <Image
                                src={testimonial.avatar} alt={testimonial.name}
                                fill sizes="44px" style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <span style={{
                                fontFamily: '"Fredoka One", cursive',
                                fontSize: compact ? "0.82rem" : "0.95rem",
                                color, fontWeight: 400,
                            }}>
                                {initials(testimonial.name)}
                            </span>
                        )}
                    </div>

                    {/* Name / role / school */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            fontFamily: '"Fredoka One", cursive',
                            fontSize: compact ? "0.86rem" : "0.98rem",
                            color: "#0f2d52", lineHeight: 1.2, marginBottom: 2,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                            {testimonial.name}
                        </div>
                        <div style={{
                            fontFamily: '"Nunito", sans-serif',
                            fontSize: compact ? "0.68rem" : "0.72rem",
                            color: "#6b8eaf", fontWeight: 700, lineHeight: 1.3,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                            {testimonial.role}
                        </div>
                        <div style={{
                            fontFamily: '"Nunito", sans-serif',
                            fontSize: "0.68rem", color, fontWeight: 800, marginTop: 1,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                            {testimonial.school}
                        </div>
                    </div>

                    {/* Stars + date */}
                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                        {/* Inline star render — no separate component needed */}
                        <div style={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} width="11" height="11" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                        fill={i < testimonial.rating ? "#f59e0b" : "none"}
                                        stroke={i < testimonial.rating ? "#f59e0b" : "#d1d5db"}
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ))}
                        </div>
                        {testimonial.date && (
                            <div style={{
                                fontFamily: '"Nunito", sans-serif',
                                fontSize: "0.6rem", color: "#9eb8cc",
                                fontWeight: 700, marginTop: 3,
                            }}>
                                {testimonial.date}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}