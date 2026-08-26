'use client';

import { useState, useEffect } from 'react';
import { Activity, LocationType } from '@/types/location';
import styles from './ActivitiesSection.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivitiesSectionProps {
    activities: Activity[];
    type: LocationType;
    accentColor: string;
}

// Floating icons configuration
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

export default function ActivitiesSection({ activities, type, accentColor }: ActivitiesSectionProps) {
    const isKids = type === 'kids';

    // Lightbox state
    const [selectedImage, setSelectedImage] = useState<Activity | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isZoomed, setIsZoomed] = useState(false);

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

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateImage('prev');
                    break;
                case 'ArrowRight':
                    navigateImage('next');
                    break;
                case 'z':
                case 'Z':
                    setIsZoomed(prev => !prev);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentImageIndex]);

    const openLightbox = (activity: Activity, index: number) => {
        setSelectedImage(activity);
        setCurrentImageIndex(index);
        setIsZoomed(false);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        setIsZoomed(false);
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (!activities.length) return;

        let newIndex: number;
        if (direction === 'prev') {
            newIndex = (currentImageIndex - 1 + activities.length) % activities.length;
        } else {
            newIndex = (currentImageIndex + 1) % activities.length;
        }

        setCurrentImageIndex(newIndex);
        setSelectedImage(activities[newIndex]);
        setIsZoomed(false);
    };

    return (
        <>
            <section
                id="activities"
                className={styles.activitiesSection}
                style={{
                    backgroundColor: sectionBg,
                    '--blob-color-1': blob1Color,
                    '--blob-color-2': blob2Color,
                    '--blob-color-3': blob3Color,
                    position: 'relative',
                    overflow: 'hidden'
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
                                opacity: isKids ? 0.15 : 0.1,
                                filter: 'blur(0.5px)',
                            }}
                            animate={{
                                y: [0, -30, 0, 30, 0],
                                x: [0, 15, -15, 0, 15],
                                rotate: [0, 8, -8, 5, -5, 0],
                                scale: [1, 1.1, 1, 0.95, 1],
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

                {/* GPU Ambient Floating Background Blobs */}
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
                            Our <span style={{ color: accentColor }}>Activities</span>
                        </h2>
                        <p className={styles.subtitle} style={{ color: mutedColor }}>
                            Discover all the amazing zones waiting for you at this venue. Click any image to view it larger!
                        </p>
                    </div>

                    {/* 4 Cards Grid (Desktop: 4, Tab: 2, Mobile: 1) */}
                    <div className={styles.grid}>
                        {activities.map((activity, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`${styles.card} group`}
                                style={{
                                    backgroundColor: cardBg,
                                    borderColor: borderColor,
                                    '--hover-color': activity.color,
                                    '--hover-shadow': `0 20px 40px ${activity.color}33`,
                                    color: textColor,
                                    cursor: activity.image ? 'pointer' : 'default',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative'
                                } as React.CSSProperties}
                                onClick={() => activity.image && openLightbox(activity, i)}
                                whileHover={{ y: -5 }}
                            >
                                {activity.image ? (
                                    <div className={styles.cardImageWrapper} style={{ position: 'relative', overflow: 'hidden' }}>
                                        <img
                                            src={activity.image}
                                            alt={activity.name}
                                            className={styles.cardImage}
                                            loading="lazy"
                                            style={{
                                                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                        />
                                        <span className={styles.imageEmoji}>{activity.emoji}</span>

                                        {/* Hover overlay with zoom icon */}
                                        <div
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center"
                                            style={{
                                                background: 'rgba(0, 0, 0, 0.4)',
                                                backdropFilter: 'blur(2px)'
                                            }}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <ZoomIn className="w-8 h-8 text-white" />
                                                <span className="text-white text-xs font-semibold">View Larger</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className={styles.emoji}>{activity.emoji}</span>
                                )}
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
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Zigzag separator */}
                <div className={styles.dividerWrapper} style={{ position: 'relative', zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={styles.dividerSvg}>
                        <polygon
                            points="0,0 60,60 120,0 180,60 240,0 300,60 360,0 420,60 480,0 540,60 600,0 660,60 720,0 780,60 840,0 900,60 960,0 1020,60 1080,0 1140,60 1200,0 1260,60 1320,0 1380,60 1440,0 1440,60 0,60"
                            fill={dividerFill}
                        />
                    </svg>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center"
                        style={{
                            background: 'rgba(0, 0, 0, 0.95)',
                            backdropFilter: 'blur(8px)'
                        }}
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Zoom toggle */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(!isZoomed);
                            }}
                            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Toggle zoom"
                        >
                            <Maximize2 className="w-5 h-5 text-white" />
                        </button>

                        {/* Image counter */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
                            {currentImageIndex + 1} / {activities.length}
                        </div>

                        {/* Navigation buttons */}
                        {activities.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('prev');
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('next');
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                            </>
                        )}

                        {/* Image container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full h-full max-w-5xl max-h-[90vh] p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <motion.img
                                    key={selectedImage.name}
                                    src={selectedImage.image}
                                    alt={selectedImage.name}
                                    className={`object-contain w-full h-full rounded-lg ${isZoomed ? 'cursor-zoom-out scale-150' : 'cursor-zoom-in'
                                        }`}
                                    style={{
                                        transition: 'transform 0.3s ease',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsZoomed(!isZoomed);
                                    }}
                                />
                            </div>

                            {/* Image info */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-center max-w-[90%]">
                                <h3 className="text-white font-bold text-lg">{selectedImage.name}</h3>
                                <p className="text-white/70 text-sm mt-1">{selectedImage.description}</p>
                                <span
                                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
                                    style={{
                                        backgroundColor: `${selectedImage.color}20`,
                                        color: selectedImage.color
                                    }}
                                >
                                    {selectedImage.ageGroup}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}