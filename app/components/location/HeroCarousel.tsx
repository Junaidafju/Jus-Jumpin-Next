'use client';

import { useState, useEffect, useCallback } from 'react';
import { LocationData } from '@/types/location';
import styles from './HeroCarousel.module.css';

interface HeroCarouselProps {
    data: LocationData;
}

const MARQUEE_TEXT = '✦ WOW ZONE ✦ STAY ACTIVE ✦ PLAY HARD ✦ JUMP HIGHER ✦ JUS JUMPIN ✦ ';

export default function HeroCarousel({ data }: HeroCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    // Client-side image preloading to prevent visual lag on transition
    useEffect(() => {
        if (typeof window !== 'undefined' && data?.heroImages) {
            data.heroImages.forEach((imgSrc) => {
                const img = new Image();
                img.src = imgSrc;
            });
        }
    }, [data?.heroImages]);

    // Dynamic layout/style helpers
    const isKids = data.type === 'kids';
    const typeBadgeText = isKids ? 'Kids Paradise 🧸' : 'Family Adventure 🤸';
    const typeBadgeBg = isKids ? 'rgba(246, 126, 221, 0.2)' : 'rgba(255, 102, 26, 0.2)';
    const typeBadgeBorder = isKids ? 'rgba(246, 126, 221, 0.45)' : 'rgba(255, 102, 26, 0.45)';

    const changeSlide = useCallback((nextIdx: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(nextIdx);
        setTimeout(() => {
            setIsTransitioning(false);
        }, 800); // Lock interaction during 0.8s CSS transition
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        changeSlide((currentSlide + 1) % 3);
    }, [currentSlide, changeSlide]);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentSlide) return;
        changeSlide(index);
    }, [isTransitioning, currentSlide, changeSlide]);

    // Auto-rotation every 4 seconds. Cleared and reset automatically on slide change
    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 4000);
        return () => clearTimeout(timer);
    }, [currentSlide, nextSlide]);

    return (
        <section className={styles.heroCarousel}>
            {/* Load Playfair and Inter fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Combo&family=Rum+Raisin&display=swap"
                rel="stylesheet"
            />

            {/* Background Slides */}
            <div className={styles.slidesContainer}>
                {data.heroImages.map((img, i) => (
                    <div
                        key={i}
                        className={`${styles.slideContainer} ${currentSlide === i ? styles.active : ''}`}
                    >
                        {imageErrors[i] ? (
                            <div className={styles.slideFallbackBg} />
                        ) : (
                            <img
                                src={img}
                                alt={`${data.city} hero slide ${i + 1}`}
                                className={styles.slideImage}
                                onError={() => setImageErrors((prev) => ({ ...prev, [i]: true }))}
                                loading={i === 0 ? 'eager' : 'lazy'}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Premium Deep Overlays */}
            <div className={styles.gradientOverlay} />

            {/* Left Column: Glassmorphism Location Badges */}
            <div className={styles.contentLeft}>
                <div className={styles.glassBadge}>
                    <span className={styles.badgeIcon}>📍</span>
                    <span>{data.city}</span>
                </div>
                <div className={styles.glassBadge}>
                    <span className={styles.badgeIcon}>🏢</span>
                    <span>{data.mall}</span>
                </div>
            </div>

            {/* Bottom Left: Headline & Underline */}
            <div className={styles.contentBottomLeft}>
                <div className={styles.h1Container}>
                    <h1 className={styles.heroH1}>{data.h1}</h1>
                    <div className={styles.h1Underline} style={{ background: data.accentColor }} />
                </div>
                <p className={styles.heroSubtitle}>{data.subtitle}</p>
                <div className={styles.heroActions}>
                    <div className={styles.typeBadge} style={{ background: typeBadgeBg, borderColor: typeBadgeBorder }}>
                        {typeBadgeText}
                    </div>
                    <a
                        href="#booking"
                        className={styles.ctaButton}
                        style={{
                            background: data.accentColor,
                            boxShadow: `0 4px 14px ${data.accentColor}40`,
                        }}
                    >
                        Book Now 🎟️
                    </a>
                </div>
            </div>

            {/* Bottom Center: Glassmorphism Infinite Marquee */}
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeWrapper}>
                    <div className={styles.marqueeContent}>
                        {MARQUEE_TEXT.repeat(10)}
                    </div>
                    <div className={`${styles.marqueeContent}`} aria-hidden="true">
                        {MARQUEE_TEXT.repeat(10)}
                    </div>
                </div>
            </div>

            {/* Bottom Right: Responsive Dot Navigation with 44px hitboxes */}
            <div className={styles.contentBottomRight}>
                {[0, 1, 2].map((i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={styles.dotTrigger}
                        aria-label={`Go to slide ${i + 1}`}
                    >
                        <span className={`${styles.dotVisual} ${currentSlide === i ? styles.active : ''}`} />
                    </button>
                ))}
            </div>

            {/* Dynamic Wave Path Separator */}
            <div className={styles.waveSeparator}>
                <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                    <path
                        d="M0,50 C320,95 640,10 960,80 C1200,100 1360,65 1440,55 L1440,100 L0,100 Z"
                        fill={isKids ? '#fff5f9' : '#0f1923'}
                    />
                </svg>
            </div>

            {/* Compositor-only Animated Progress Bar */}
            <div className={styles.progressBarContainer}>
                <div
                    key={currentSlide}
                    className={styles.progressBarFill}
                    style={{
                        background: `linear-gradient(90deg, ${data.accentColor}bb, ${data.accentColor})`,
                        boxShadow: `0 0 10px ${data.accentColor}, 0 0 4px ${data.accentColor}`,
                    }}
                />
            </div>
        </section>
    );
}
