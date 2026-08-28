'use client';

import { Activity, LocationType } from '@/types/location';
import styles from './ActivitiesSection.module.css';
import { motion } from 'framer-motion';
import {
    Waves,
    Sprout,
    Smile,
    Mountain,
    Zap,
    Sparkles,
    Dribbble,
    Route,
    RotateCw,
    HelpCircle
} from 'lucide-react';

interface ActivitiesSectionProps {
    activities: Activity[];
    type: LocationType;
    accentColor: string;
}

// Floating edge emoji configurations
const floatingIcons = [
    { icon: '🎈', size: 'text-5xl', top: '10%', left: '5%', delay: 0, duration: 6 },
    { icon: '🏀', size: 'text-4xl', top: '20%', left: '15%', delay: 1, duration: 7 },
    { icon: '🎪', size: 'text-6xl', top: '15%', left: '85%', delay: 0.5, duration: 8 },
    { icon: '🧸', size: 'text-4xl', top: '30%', left: '90%', delay: 1.5, duration: 6 },
    { icon: '🎯', size: 'text-3xl', top: '40%', left: '8%', delay: 2, duration: 7 },
    { icon: '🎠', size: 'text-5xl', top: '50%', left: '92%', delay: 0.8, duration: 9 },
    { icon: '🏰', size: 'text-4xl', top: '60%', left: '5%', delay: 1.2, duration: 7 },
    { icon: '🤸', size: 'text-5xl', top: '65%', left: '88%', delay: 0.3, duration: 8 },
    { icon: '🎨', size: 'text-4xl', top: '75%', left: '10%', delay: 1.8, duration: 6 },
    { icon: '🚀', size: 'text-5xl', top: '80%', left: '85%', delay: 0.7, duration: 7 },
    { icon: '🎳', size: 'text-3xl', top: '85%', left: '15%', delay: 2.2, duration: 8 },
    { icon: '🎮', size: 'text-4xl', top: '90%', left: '90%', delay: 1.4, duration: 6 },
    { icon: '🧩', size: 'text-5xl', top: '5%', left: '50%', delay: 0.9, duration: 7 },
    { icon: '🎪', size: 'text-4xl', top: '45%', left: '95%', delay: 1.6, duration: 8 },
    { icon: '🎡', size: 'text-6xl', top: '70%', left: '50%', delay: 0.4, duration: 9 },
];

// Helper to resolve relevant Lucide outline icons based on activity keywords
const getActivityIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('slide') || n.includes('donut') || n.includes('wave')) return Waves;
    if (n.includes('sand') || n.includes('pit')) return Sprout;
    if (n.includes('soft play') || n.includes('toddler') || n.includes('kids area') || n.includes('toy')) return Smile;
    if (n.includes('climb') || n.includes('wall')) return Mountain;
    if (n.includes('ninja') || n.includes('warrior') || n.includes('bridge') || n.includes('war') || n.includes('dodger')) return Zap;
    if (n.includes('trampoline') || n.includes('arena') || n.includes('jump') || n.includes('stepper')) return Sparkles;
    if (n.includes('ball') || n.includes('pool') || n.includes('basket') || n.includes('dodge') || n.includes('dodgeball')) return Dribbble;
    if (n.includes('path') || n.includes('maze') || n.includes('pathway') || n.includes('pathways')) return Route;
    if (n.includes('merry') || n.includes('round') || n.includes('spin')) return RotateCw;
    return HelpCircle;
};

export default function ActivitiesSection({ activities, type, accentColor }: ActivitiesSectionProps) {
    const isKids = type === 'kids';

    // Background and color themes matching TimingPricingMap layout
    const sectionBg = isKids ? '#fef9f0' : '#090514';
    const cardBg = isKids ? '#ffffff' : 'rgba(20, 14, 43, 0.85)';
    const textColor = isKids ? '#1e1b4b' : '#ffffff';
    const mutedColor = isKids ? '#525c76' : 'rgba(255, 255, 255, 0.65)';
    const borderColor = isKids ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)';
    const badgeText = isKids ? '🧒 Kids Activities' : '👨‍👩‍👧 Adults + Kids Activities';
    const dividerFill = isKids ? '#f5f0ff' : '#04020b'; // Matches next section timings pricing map wave transition

    // Ambient floating glow blob colors
    const blob1Color = isKids ? 'rgba(246, 126, 221, 0.06)' : 'rgba(255, 102, 26, 0.08)';
    const blob2Color = isKids ? 'rgba(0, 185, 227, 0.06)' : 'rgba(79, 172, 254, 0.08)';
    const blob3Color = isKids ? 'rgba(255, 93, 160, 0.06)' : 'rgba(136, 105, 210, 0.08)';

    return (
        <>
            {/* Global Parallel Wave ClipMask defined once */}
            <svg width="0" height="0" className="absolute pointer-events-none">
                <defs>
                    <clipPath id="card-wave-clip" clipPathUnits="objectBoundingBox">
                        <path d="M0,0 L1,0 L1,0.9 C0.7,0.96 0.3,0.84 0,0.9 Z" />
                    </clipPath>
                </defs>
            </svg>

            <section
                id="activities"
                className={styles.activitiesSection}
                style={{
                    backgroundColor: sectionBg,
                    '--blob-color-1': blob1Color,
                    '--blob-color-2': blob2Color,
                    '--blob-color-3': blob3Color,
                    position: 'relative',
                    overflow: 'hidden',
                    scrollMarginTop: '100px'
                } as React.CSSProperties}
            >
                {/* Floating Activity Icons */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                    {floatingIcons.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`absolute ${item.size} select-none`}
                            style={{
                                top: item.top,
                                left: item.left,
                                opacity: isKids ? 0.15 : 0.08,
                                filter: 'blur(0.5px)',
                            }}
                            animate={{
                                y: [0, -30, 0, 30, 0],
                                x: [0, 15, -15, 0, 15],
                                rotate: [0, 8, -8, 5, -5, 0],
                                scale: [1, 1.08, 1, 0.95, 1],
                            }}
                            transition={{
                                duration: item.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay,
                            }}
                        >
                            <motion.span
                                animate={{
                                    opacity: [0.6, 1, 0.8, 1, 0.6],
                                }}
                                transition={{
                                    duration: item.duration * 0.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: item.delay,
                                }}
                                className="drop-shadow-lg inline-block"
                            >
                                {item.icon}
                            </motion.span>
                        </motion.div>
                    ))}
                </div>

                {/* Ambient Background Glows */}
                <div className={`${styles.blob} ${styles.blob1} ${isKids ? styles.kidsBlob : styles.adultsBlob}`} style={{ zIndex: 1 }} />
                <div className={`${styles.blob} ${styles.blob2} ${isKids ? styles.kidsBlob : styles.adultsBlob}`} style={{ zIndex: 1 }} />
                <div className={`${styles.blob} ${styles.blob3} ${isKids ? styles.kidsBlob : styles.adultsBlob}`} style={{ zIndex: 1 }} />

                <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
                    {/* Header */}
                    <div className={styles.header}>
                        <span
                            className={styles.badge}
                            style={{ backgroundColor: accentColor }}
                        >
                            {badgeText}
                        </span>
                        <h2 className={styles.title} style={{ color: textColor }}>
                            Our <span style={{
                                background: `linear-gradient(to right, ${accentColor}, #ff3645)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}>Activities</span>
                        </h2>
                        <p className={styles.subtitle} style={{ color: mutedColor }}>
                            Discover all the amazing zones waiting for you at this venue.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className={styles.grid}>
                        {activities.map((activity, i) => {
                            const Icon = getActivityIcon(activity.name);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 55, rotate: i % 2 === 0 ? -4 : 4, scale: 0.94 }}
                                    whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                                    viewport={{ once: true, margin: "0px 0px -55px 0px" }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.06 }}
                                    className={`${styles.card} group`}
                                    style={{
                                        backgroundColor: cardBg,
                                        borderColor: borderColor,
                                        '--hover-color': activity.color || accentColor,
                                        '--hover-shadow': `0 20px 40px ${(activity.color || accentColor)}33`,
                                        '--card-bg': cardBg,
                                        color: textColor,
                                    } as React.CSSProperties}
                                >
                                    {/* Image with Wave Clip Mask */}
                                    {activity.image ? (
                                        <div className={styles.cardImageWrapper}>
                                            {/* Masked Image */}
                                            <div
                                                className="w-full h-full object-cover overflow-hidden"
                                                style={{ clipPath: 'url(#card-wave-clip)' }}
                                            >
                                                <img
                                                    src={activity.image}
                                                    alt={activity.name}
                                                    className={styles.cardImage}
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Wave Border Outline Separator */}
                                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
                                                <path
                                                    d="M 0,90 C 30,84 70,96 100,90"
                                                    fill="none"
                                                    stroke={activity.color || accentColor}
                                                    strokeWidth="3"
                                                />
                                            </svg>

                                            {/* Circular Overlapping Icon Container */}
                                            <div
                                                className={styles.iconContainer}
                                                style={{
                                                    backgroundColor: activity.color || accentColor,
                                                }}
                                            >
                                                <Icon className="text-white" size={20} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative w-full pt-10 pb-4 flex justify-center">
                                            <span className={styles.emoji}>{activity.emoji}</span>
                                        </div>
                                    )}

                                    {/* Text Content Block */}
                                    <div className={styles.cardContent}>
                                        {/* Card Title */}
                                        <h3 className={styles.cardTitle} style={{ color: textColor }}>
                                            {activity.name}
                                        </h3>

                                        {/* Card Description */}
                                        <p
                                            className={styles.cardDescription}
                                            style={{ color: mutedColor }}
                                        >
                                            {activity.description}
                                        </p>

                                        {/* Card Age Badge */}
                                        <span
                                            className={styles.ageBadge}
                                            style={{
                                                backgroundColor: `${activity.color || accentColor}15`,
                                                color: activity.color || accentColor
                                            }}
                                        >
                                            {activity.ageGroup}
                                        </span>

                                        {/* Dot grid in bottom-right matching the color scheme */}
                                        <div className={styles.dotGrid} style={{ color: activity.color || accentColor }}>
                                            <svg width="24" height="16" viewBox="0 0 24 16" fill="currentColor">
                                                <circle cx="2" cy="2" r="1.5" />
                                                <circle cx="8" cy="2" r="1.5" />
                                                <circle cx="14" cy="2" r="1.5" />
                                                <circle cx="20" cy="2" r="1.5" />
                                                <circle cx="2" cy="8" r="1.5" />
                                                <circle cx="8" cy="8" r="1.5" />
                                                <circle cx="14" cy="8" r="1.5" />
                                                <circle cx="20" cy="8" r="1.5" />
                                                <circle cx="2" cy="14" r="1.5" />
                                                <circle cx="8" cy="14" r="1.5" />
                                                <circle cx="14" cy="14" r="1.5" />
                                                <circle cx="20" cy="14" r="1.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Divider separated bottom vector block */}
                <div className={styles.dividerWrapper} style={{ position: 'relative', zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={styles.dividerSvg}>
                        <polygon
                            points="0,0 60,60 120,0 180,60 240,0 300,60 360,0 420,60 480,0 540,60 600,0 660,60 720,0 780,60 840,0 900,60 960,0 1020,60 1080,0 1140,60 1200,0 1260,60 1320,0 1380,60 1440,0 1440,60 0,60"
                            fill={dividerFill}
                        />
                    </svg>
                </div>
            </section>
        </>
    );
}