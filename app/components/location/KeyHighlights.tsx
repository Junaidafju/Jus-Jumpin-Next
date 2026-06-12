'use client';

import { useState } from 'react';
import { Highlight } from '@/types/location';
import styles from './KeyHighlights.module.css';

interface KeyHighlightsProps {
    highlights: [Highlight, Highlight, Highlight, Highlight];
    accentColor: string;
    isKids: boolean;
}

// Map key highlight indices to premium illustration assets

export default function KeyHighlights({ highlights, accentColor, isKids }: KeyHighlightsProps) {
    const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const bg = isKids ? '#1a1030' : '#0a0a0a';
    const textColor = '#ffffff';
    const subtitleColor = 'rgba(255, 255, 255, 0.75)';
    const footerTextColor = 'rgba(255, 255, 255, 0.65)';
    const waveFill = isKids ? '#fef9f0' : '#111820';

    // Ambient floating blob colors mapping
    const blob1Color = isKids ? '#f67edd' : '#ff661a';
    const blob2Color = isKids ? '#00b9e3' : '#4facfe';
    const blob3Color = isKids ? '#ff5da0' : '#8869d2';

    const handleCardClick = (index: number) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <section className={styles.highlightsSection} style={{ backgroundColor: bg }}>
            {/* GPU Ambient Floating Blobs */}
            <div className={`${styles.blob} ${styles.blob1}`} style={{ '--blob-color-1': blob1Color } as React.CSSProperties} />
            <div className={`${styles.blob} ${styles.blob2}`} style={{ '--blob-color-2': blob2Color } as React.CSSProperties} />
            <div className={`${styles.blob} ${styles.blob3}`} style={{ '--blob-color-3': blob3Color } as React.CSSProperties} />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title} style={{ color: textColor }}>
                        What Makes Us <span style={{ color: accentColor }}>Special</span>
                    </h2>
                    <p className={styles.subtitle} style={{ color: subtitleColor }}>
                        Jus Jumpin features an infinity trampoline, foam pits, thrilling basket ball area, wall climbing, basketball zone, and a dedicated kids' play zone.
                    </p>
                </div>

                {/* 4 Flip Cards Grid */}
                <div className={styles.grid}>
                    {highlights.map((h, i) => {
                        const isFlipped = !!flippedCards[i];
                        const hasImageError = !!imageErrors[i];
                        const cardImage = h.image;

                        return (
                            <div
                                key={i}
                                className={styles.cardContainer}
                                onClick={() => handleCardClick(i)}
                            >
                                <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
                                    {/* Front side: Background image with title */}
                                    <div className={styles.cardFront}>
                                        {hasImageError ? (
                                            <div
                                                className={styles.cardBgImage}
                                                style={{ background: h.gradient }}
                                            />
                                        ) : (
                                            <img
                                                src={cardImage}
                                                alt={h.title}
                                                className={styles.cardBgImage}
                                                onError={() => setImageErrors(prev => ({ ...prev, [i]: true }))}
                                                loading="lazy"
                                            />
                                        )}
                                        <div className={styles.cardOverlay} />
                                        <div className={styles.frontContent}>
                                            <span className={styles.cardEmoji}>{h.emoji}</span>
                                            <h3 className={styles.cardTitle}>{h.title}</h3>
                                        </div>
                                    </div>

                                    {/* Back side: Glassmorphism details */}
                                    <div className={styles.cardBack}>
                                        <p className={styles.backParagraph} style={{ color: textColor }}>
                                            {h.paragraph}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer / Closing Paragraph */}
                <p className={styles.footerText} style={{ color: footerTextColor }}>
                    Dedicated party area perfect for hosting amazing birthday parties and corporate events in Kolkata. The venue features an awesome in-house DJ and a designated cafe with beverages.
                </p>
            </div>

            {/* Bottom Wave Divider */}
            <div className={styles.waveWrapper}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={styles.waveSvg}>
                    <path
                        d="M0,60 C120,20 240,80 360,40 C480,0 600,60 720,30 C840,0 960,50 1080,20 C1200,0 1320,50 1440,30 L1440,80 L0,80 Z"
                        fill={waveFill}
                    />
                </svg>
            </div>
        </section>
    );
}
