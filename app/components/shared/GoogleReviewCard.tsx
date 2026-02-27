// app/shared/GoogleReviewCard.tsx
"use client";

import { motion } from "framer-motion";

interface GoogleReviewCardProps {
    rating?: number;     // aggregate. Default 4.9
    reviewCount?: number; // Default 120
    compact?: boolean;
    animateOnView?: boolean;
}

function GoogleLogo({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

export default function GoogleReviewCard({
    rating = 4.9,
    reviewCount = 120,
    compact = false,
    animateOnView = true,
}: GoogleReviewCardProps) {
    const stars = Math.round(rating);

    return (
        <motion.div
            initial={animateOnView ? { opacity: 0, scale: 0.9 } : { opacity: 1 }}
            whileInView={animateOnView ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: compact ? 8 : 12,
                background: "rgba(255,255,255,0.95)",
                border: "1.5px solid #e2eaf3",
                borderRadius: compact ? 14 : 18,
                padding: compact ? "8px 14px" : "12px 20px",
                boxShadow: "0 4px 20px rgba(27,58,92,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            }}
            aria-label={`Google rating: ${rating} out of 5 from ${reviewCount} reviews`}
        >
            {/* Google logo */}
            <GoogleLogo size={compact ? 18 : 24} />

            {/* Divider */}
            <div style={{ width: 1, height: compact ? 24 : 32, background: "#e2eaf3" }} />

            {/* Rating + stars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{
                        fontFamily: '"Fredoka One", cursive',
                        fontSize: compact ? "1rem" : "1.3rem",
                        color: "#0f2d52",
                        lineHeight: 1,
                    }}>
                        {rating.toFixed(1)}
                    </span>
                    <div style={{ display: "flex", gap: 1 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} width={compact ? 10 : 13} height={compact ? 10 : 13} viewBox="0 0 24 24">
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                    fill={i < stars ? "#f59e0b" : "none"}
                                    stroke={i < stars ? "#f59e0b" : "#d1d5db"}
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ))}
                    </div>
                </div>
                {!compact && (
                    <span style={{
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "0.68rem",
                        color: "#6b8eaf",
                        fontWeight: 700,
                    }}>
                        {reviewCount}+ Google Reviews
                    </span>
                )}
            </div>
        </motion.div>
    );
}