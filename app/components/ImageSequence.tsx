// app/components/ImageSequence.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const images = [
    {
        id: 1,
        src: "/image/family-jumping.jpg",
        alt: "Happy family jumping together on trampoline at Jus Jumpin",
        title: "Family Fun Time",
        description: "Create unforgettable memories with your loved ones",
        color: "#FF6B35", // Orange
        icon: "👨‍👩‍👧‍👦",
        badge: "Most Popular"
    },
    {
        id: 2,
        src: "/image/foam-pit.jpg",
        alt: "Kids playing in colorful foam pit at Jus Jumpin",
        title: "Safe Soft Play",
        description: "Soft landing zones for worry-free fun",
        color: "#00B2FF", // Blue
        icon: "🧱",
        badge: "Kids' Favorite"
    },
    {
        id: 3,
        src: "/image/basketball-dunk.jpg",
        alt: "Teenager performing basketball dunk on trampoline",
        title: "Slam Dunk Zone",
        description: "Feel like a pro with our basketball hoops",
        color: "#06D6A0", // Green
        icon: "🏀",
        badge: "Adrenaline Rush"
    },
    {
        id: 4,
        src: "/image/group-celebration.jpg",
        alt: "Group of friends celebrating birthday at trampoline park",
        title: "Group Celebrations",
        description: "Perfect for birthdays and special occasions",
        color: "#9D4EDD", // Purple
        icon: "🎉",
        badge: "Party Ready"
    }
];

export default function ImageSequence() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

    // Auto-rotate images
    useEffect(() => {
        if (!isHovering) {
            timeoutRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 4000);
        }

        return () => {
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
            }
        };
    }, [isHovering]);

    // GSAP animations on image change
    useEffect(() => {
        if (!containerRef.current) return;

        // Exit animation for current image
        if (imageRefs.current[currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1]) {
            gsap.to(imageRefs.current[currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1], {
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: "power2.inOut"
            });
        }

        // Enter animation for new image
        if (imageRefs.current[currentIndex]) {
            gsap.fromTo(
                imageRefs.current[currentIndex],
                {
                    opacity: 0,
                    scale: 1.05,
                    y: 20
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    onComplete: () => {
                        // Badge animation
                        if (badgeRefs.current[currentIndex]) {
                            gsap.fromTo(
                                badgeRefs.current[currentIndex],
                                {
                                    scale: 0,
                                    rotate: -20,
                                    opacity: 0
                                },
                                {
                                    scale: 1,
                                    rotate: 0,
                                    opacity: 1,
                                    duration: 0.6,
                                    ease: "back.out(1.7)",
                                    delay: 0.2
                                }
                            );
                        }
                    }
                }
            );
        }

        // Indicator animation
        gsap.to(`.indicator-${currentIndex}`, {
            width: "100%",
            duration: 4,
            ease: "none"
        });

        // Reset other indicators
        images.forEach((_, index) => {
            if (index !== currentIndex) {
                gsap.set(`.indicator-${index}`, { width: "0%" });
            }
        });
    }, [currentIndex]);

    // Initial load animation
    useEffect(() => {
        if (isLoaded && containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                }
            );
        }
    }, [isLoaded]);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleMouseEnter = (index: number) => {
        setIsHovering(true);
        setCurrentIndex(index);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                {/* Images Stack */}
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        ref={(el) => { imageRefs.current[index] = el; }}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        {/* Image */}
                        <div className="relative w-full h-full">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                priority={index === 0}
                                onLoad={index === 0 ? handleImageLoad : undefined}
                            />

                            {/* Gradient Overlay */}
                            <div
                                className="absolute inset-0 opacity-50"
                                style={{
                                    background: `linear-gradient(45deg, ${image.color}22, transparent)`
                                }}
                            />

                            {/* Dark Overlay for text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform transition-transform duration-500 group-hover:translateY(-4)">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-3xl">{image.icon}</span>
                                            <h3 className="text-2xl md:text-3xl font-bold font-['Fredoka_One']">
                                                {image.title}
                                            </h3>
                                        </div>
                                        <p className="text-lg md:text-xl opacity-90 font-['Nunito']">
                                            {image.description}
                                        </p>
                                    </div>

                                    {/* Badge */}
                                    <div
                                        ref={(el) => { badgeRefs.current[index] = el; }}
                                        className="hidden md:block"
                                    >
                                        <div
                                            className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg transform rotate-3"
                                            style={{ backgroundColor: image.color }}
                                        >
                                            {image.badge}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hotspots (for desktop) */}
                        <div className="hidden lg:block">
                            {index === currentIndex && (
                                <>
                                    <div className="absolute top-1/4 left-1/4 animate-pulse">
                                        <div className="relative">
                                            <div className="w-4 h-4 bg-white rounded-full"></div>
                                            <div className="absolute inset-0 animate-ping bg-white/40 rounded-full"></div>
                                            <div className="absolute -top-8 -left-8 bg-black/70 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Jump Zone
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-1/3 right-1/4 animate-pulse">
                                        <div className="relative">
                                            <div className="w-4 h-4 bg-white rounded-full"></div>
                                            <div className="absolute inset-0 animate-ping bg-white/40 rounded-full"></div>
                                            <div className="absolute -top-8 -right-8 bg-black/70 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Fun Area
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#06D6A0]/10 to-[#FF6B35]/10">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-[#06D6A0] border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-600 font-['Nunito']">Loading amazing moments...</p>
                        </div>
                    </div>
                )}

                {/* Navigation Arrows */}
                <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white"
                    aria-label="Previous image"
                >
                    <span className="text-2xl">←</span>
                </button>

                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white"
                    aria-label="Next image"
                >
                    <span className="text-2xl">→</span>
                </button>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className="relative w-16 h-1.5 bg-white/30 rounded-full overflow-hidden group/indicator"
                            aria-label={`Go to image ${index + 1}`}
                        >
                            <div className={`indicator-${index} absolute left-0 top-0 h-full rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                                }`} />
                            <div className="absolute inset-0 bg-transparent group-hover/indicator:bg-white/20 transition-colors" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="flex justify-center gap-4 mt-6">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => setCurrentIndex(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${index === currentIndex
                            ? 'ring-4 scale-105'
                            : 'ring-2 ring-gray-200 hover:scale-105 hover:ring-[#06D6A0]'
                            }`}
                        style={{
                            '--tw-ring-color': index === currentIndex ? image.color : 'transparent'
                        } as React.CSSProperties}
                        aria-label={`View ${image.title}`}
                    >
                        <div className="relative w-20 h-16 md:w-24 md:h-20">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 80px, 96px"
                                className="object-cover"
                            />
                            <div className={`absolute inset-0 transition-opacity duration-300 ${index === currentIndex ? 'opacity-0' : 'opacity-50'
                                }`}
                                style={{ backgroundColor: image.color }}
                            />

                            {/* Active indicator */}
                            {index === currentIndex && (
                                <div className="absolute top-1 right-1">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                </div>
                            )}
                        </div>

                        {/* Hover label */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {image.title}
                        </div>
                    </button>
                ))}
            </div>

            {/* Instruction Text */}
            <div className="text-center mt-6 text-gray-600 font-['Nunito']">
                <p className="flex items-center justify-center gap-2">
                    <span className="animate-pulse">👆</span>
                    Hover over thumbnails or wait for auto-rotation
                    <span className="hidden md:inline"> • Click to select</span>
                </p>
            </div>
        </div>
    );
}