// app/shared/TestimonialCarousel.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
    /** Number of cards visible on desktop. Default: 3 */
    visibleCount?: number;
    autoPlay?: boolean;
    /** ms between auto-advances. Default: 4000 */
    interval?: number;
}

export default function TestimonialCarousel({
    testimonials,
    visibleCount = 3,
    autoPlay = false,
    interval = 4000,
}: TestimonialCarouselProps) {
    const [current, setCurrent] = useState(0);
    const total = testimonials.length;
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const prev = () => setCurrent((c) => (c - 1 + total) % total);
    const next = () => setCurrent((c) => (c + 1) % total);

    /* Get visible cards (wrapping) */
    const visible = Array.from({ length: Math.min(visibleCount, total) }).map(
        (_, i) => testimonials[(current + i) % total]
    );

    return (
        <div style={{ position: "relative", width: "100%" }}>
            {/* Cards row */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(visibleCount, total)}, 1fr)`,
                    gap: 20,
                }}
                className="tc-cards-grid"
            >
                <AnimatePresence mode="popLayout">
                    {visible.map((t, i) => (
                        <motion.div
                            key={`${t.id}-${current}-${i}`}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.38, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <TestimonialCard
                                testimonial={t}
                                index={(current + i) % total}
                                animateOnView={false}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Nav row */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                marginTop: 28,
            }}>
                {/* Prev */}
                <button
                    onClick={prev}
                    aria-label="Previous testimonials"
                    style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        border: "1.5px solid #e2eaf3",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#3080c0";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#3080c0";
                        (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.9)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2eaf3";
                        (e.currentTarget as HTMLButtonElement).style.color = "";
                    }}
                >
                    <ChevronLeft size={18} color="#3080c0" />
                </button>

                {/* Dot indicators */}
                <div style={{ display: "flex", gap: 6 }}>
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            style={{
                                width: i === current ? 24 : 8,
                                height: 8,
                                borderRadius: 4,
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                background: i === current ? "#FE5000" : "#d1dce8",
                                transition: "all 0.3s ease",
                            }}
                        />
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={next}
                    aria-label="Next testimonials"
                    style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        border: "1.5px solid #e2eaf3",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#3080c0";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#3080c0";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.9)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2eaf3";
                    }}
                >
                    <ChevronRight size={18} color="#3080c0" />
                </button>
            </div>

            {/* Responsive grid override */}
            <style>{`
        @media (max-width: 768px) {
          .tc-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .tc-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
        </div>
    );
}