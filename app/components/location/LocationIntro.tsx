'use client';

import { useState } from 'react';
import { LocationData } from '@/types/location';
import styles from './LocationIntro.module.css';

interface LocationIntroProps {
    data: LocationData;
}

export default function LocationIntro({ data }: LocationIntroProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const isKids = data.type === 'kids';

    // Theme colors mapping
    const bg = isKids ? '#fff5f9' : '#0f1923';
    const textColor = isKids ? '#2d2d2d' : '#ffffff';
    const mutedColor = isKids ? '#555555' : 'rgba(255, 255, 255, 0.75)';
    const bulletBorderColor = isKids ? '#f0e0eb' : 'rgba(255, 255, 255, 0.1)';
    const backBg = isKids ? '#ffffff' : '#1a2d3f';
    const waveFill = isKids ? '#1a1030' : '#0a0a0a';

    const handleCardClick = () => {
        setIsFlipped(prev => !prev);
    };

    return (
        <section className={styles.introSection} style={{ backgroundColor: bg }}>
            <div className={styles.gridContainer}>
                {/* Left Side: Intro text & CTAs */}
                <div className={styles.contentLeft}>
                    <h2 className={styles.introTitle} style={{ color: data.accentColor }}>
                        {data.introHeading}
                    </h2>
                    <p className={styles.introParagraph} style={{ color: mutedColor }}>
                        {data.introText}
                    </p>
                    <div className={styles.ctaContainer}>
                        <a
                            href={`tel:${data.phone}`}
                            className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
                            style={{ background: data.accentColor }}
                        >
                            📞 Call Now
                        </a>
                        <a
                            href="#activities"
                            className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
                            style={{ color: data.accentColor, borderColor: data.accentColor }}
                        >
                            🎯 View Activities
                        </a>
                        <a
                            href="#booking"
                            className={`${styles.ctaBtn} ${styles.ctaBtnAccent}`}
                            style={{ background: isKids ? '#ffc60b' : '#4facfe' }}
                        >
                            🎟️ Book Tickets
                        </a>
                    </div>
                </div>

                {/* Right Side: Responsive Flip Card */}
                <div className={styles.contentRight}>
                    <div
                        className={styles.flipCardContainer}
                        onClick={handleCardClick}
                    >
                        <div className={`${styles.flipCardInner} ${isFlipped ? styles.flipped : ''}`}>
                            {/* Front Image View */}
                            <div className={styles.flipCardFront}>
                                <img
                                    src={data.flipCardImage}
                                    alt={`${data.city} highlight view`}
                                    className={styles.flipCardImage}
                                    loading="lazy"
                                />
                            </div>

                            {/* Back Details View */}
                            <div className={styles.flipCardBack} style={{ backgroundColor: backBg }}>
                                <ul className={styles.bulletsList}>
                                    {data.flipCardBullets.map((bullet, i) => (
                                        <li
                                            key={i}
                                            className={styles.bulletItem}
                                            style={{ color: textColor, borderBottomColor: bulletBorderColor }}
                                        >
                                            <span className={styles.bulletCheck} style={{ color: data.accentColor }}>
                                                ✓
                                            </span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className={styles.flipBackNote} style={{ color: data.accentColor }}>
                                    Jump into the fun! 🎉
                                </p>
                                <a
                                    href="#booking"
                                    className={styles.flipBackBtn}
                                    style={{ background: data.accentColor }}
                                    onClick={(e) => e.stopPropagation()} // Prevent double flip trigger
                                >
                                    🎟️ Book Tickets
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Divider */}
            <div className={styles.waveWrapper}>
                <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={styles.waveSvg}>
                    <path
                        d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,40 L1440,100 L0,100 Z"
                        fill={waveFill}
                    />
                </svg>
            </div>
        </section>
    );
}
