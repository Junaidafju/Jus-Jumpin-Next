'use client';

import { Activity, LocationType } from '@/types/location';
import styles from './ActivitiesSection.module.css';

interface ActivitiesSectionProps {
    activities: Activity[];
    type: LocationType;
    accentColor: string;
}

export default function ActivitiesSection({ activities, type, accentColor }: ActivitiesSectionProps) {
    const isKids = type === 'kids';
    
    // Background and color themes
    const sectionBg = isKids ? '#fef9f0' : '#111820';
    const cardBg = isKids ? '#ffffff' : '#152030';
    const textColor = isKids ? '#2d2d2d' : '#ffffff';
    const mutedColor = isKids ? '#666666' : 'rgba(255, 255, 255, 0.65)';
    const borderColor = isKids ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)';
    const badgeText = isKids ? '🧒 Kids Activities' : '👨‍👩‍👧 Adults + Kids Activities';
    const dividerFill = isKids ? '#f8f6ff' : '#0d1520';

    // Ambient floating blob colors mapping
    const blob1Color = isKids ? '#f67edd' : '#ff661a';
    const blob2Color = isKids ? '#00b9e3' : '#4facfe';
    const blob3Color = isKids ? '#ff5da0' : '#8869d2';

    return (
        <section 
            id="activities" 
            className={styles.activitiesSection} 
            style={{ 
                backgroundColor: sectionBg,
                '--blob-color-1': blob1Color,
                '--blob-color-2': blob2Color,
                '--blob-color-3': blob3Color
            } as React.CSSProperties}
        >
            {/* GPU Ambient Floating Background Blobs */}
            <div className={`${styles.blob} ${styles.blob1} ${isKids ? styles.kidsBlob : styles.adultsBlob}`} />
            <div className={`${styles.blob} ${styles.blob2} ${isKids ? styles.kidsBlob : styles.adultsBlob}`} />
            <div className={`${styles.blob} ${styles.blob3} ${isKids ? styles.kidsBlob : styles.adultsBlob}`} />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span 
                        className={styles.badge} 
                        style={{ backgroundColor: accentColor }}
                    >
                        {badgeText}
                    </span>
                    <h2 className={styles.title} style={{ color: textColor }}>
                        Our <span style={{ color: accentColor }}>Activities</span>
                    </h2>
                    <p className={styles.subtitle} style={{ color: mutedColor }}>
                        Discover all the amazing zones waiting for you at this venue.
                    </p>
                </div>

                {/* 4 Cards Grid (Desktop: 4, Tab: 2, Mobile: 1) */}
                <div className={styles.grid}>
                    {activities.map((activity, i) => (
                        <div
                            key={i}
                            className={styles.card}
                            style={{
                                backgroundColor: cardBg,
                                borderColor: borderColor,
                                '--hover-color': activity.color,
                                '--hover-shadow': `0 20px 40px ${activity.color}33`,
                                color: textColor
                            } as React.CSSProperties}
                        >
                            <span className={styles.emoji}>{activity.emoji}</span>
                            <h3 className={styles.cardTitle} style={{ color: textColor }}>{activity.name}</h3>
                            <p className={styles.cardDescription} style={{ color: mutedColor }}>{activity.description}</p>
                            <span 
                                className={styles.ageBadge} 
                                style={{ 
                                    backgroundColor: `${activity.color}15`, 
                                    color: activity.color 
                                }}
                            >
                                {activity.ageGroup}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Zigzag separator */}
            <div className={styles.dividerWrapper}>
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={styles.dividerSvg}>
                    <polygon 
                        points="0,0 60,60 120,0 180,60 240,0 300,60 360,0 420,60 480,0 540,60 600,0 660,60 720,0 780,60 840,0 900,60 960,0 1020,60 1080,0 1140,60 1200,0 1260,60 1320,0 1380,60 1440,0 1440,60 0,60" 
                        fill={dividerFill} 
                    />
                </svg>
            </div>
        </section>
    );
}
