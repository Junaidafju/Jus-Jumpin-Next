// app/shared/TestimonialMarquee.tsx
"use client";

import TestimonialCard, { type Testimonial } from "./TestimonialCard";

interface TestimonialMarqueeProps {
    testimonials: Testimonial[];
    /** px width of each card. Default: 340 */
    cardWidth?: number;
    /** Seconds for one full loop. Default: 55 */
    speed?: number;
    /** Show one row (true) or two staggered rows (false). Default: false */
    singleRow?: boolean;
}

function Row({
    testimonials,
    reverse = false,
    speed = 55,
    cardWidth = 340,
}: {
    testimonials: Testimonial[];
    reverse?: boolean;
    speed?: number;
    cardWidth?: number;
}) {
    /* Duplicate for seamless loop */
    const doubled = [...testimonials, ...testimonials];

    return (
        <div
            style={{
                overflow: "hidden",
                width: "100%",
                /* Fade edges */
                maskImage:
                    "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
            }}
        >
            <div
                className={
                    reverse
                        ? "tm-marquee-track tm-marquee-reverse"
                        : "tm-marquee-track"
                }
                style={{ animationDuration: `${speed}s`, gap: 18 }}
            >
                {doubled.map((t, i) => (
                    <div
                        key={`${t.id}-${i}`}
                        style={{ width: cardWidth, flexShrink: 0 }}
                    >
                        <TestimonialCard
                            testimonial={t}
                            index={i % testimonials.length}
                            compact
                            animateOnView={false} /* no scroll trigger inside a moving row */
                        />
                    </div>
                ))}
            </div>

            <style>{`
        .tm-marquee-track {
          display: flex;
          width: max-content;
          animation: tm-scroll linear infinite;
          will-change: transform;
        }
        .tm-marquee-track:hover {
          animation-play-state: paused;
        }
        .tm-marquee-reverse {
          animation-name: tm-scroll-reverse;
        }

        @keyframes tm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tm-scroll-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .tm-marquee-track,
          .tm-marquee-reverse {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
}

export default function TestimonialMarquee({
    testimonials,
    cardWidth = 340,
    speed = 55,
    singleRow = false,
}: TestimonialMarqueeProps) {
    const mid = Math.ceil(testimonials.length / 2);
    const row1 = singleRow ? testimonials : testimonials.slice(0, mid);
    const row2 = singleRow ? [] : testimonials.slice(mid);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Row
                testimonials={row1}
                speed={speed}
                cardWidth={cardWidth}
            />
            {!singleRow && row2.length > 0 && (
                <Row
                    testimonials={row2}
                    reverse
                    speed={speed + 12}
                    cardWidth={cardWidth}
                />
            )}
        </div>
    );
}