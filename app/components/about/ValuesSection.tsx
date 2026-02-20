"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        title: "FUN FIRST 🎉",
        desc: "We believe in the power of play — it's how we grow, connect, and truly live.",
        gradient: "from-yellow-400 via-amber-500 to-orange-500",
        bgColor: "bg-gradient-to-br from-yellow-50/20 to-amber-50/10"
    },
    {
        title: "SAFETY ALWAYS 🛡️",
        desc: "Every bounce, slide, and smile happens in a space designed with care and safety in mind.",
        gradient: "from-sky-400 via-blue-500 to-cyan-500",
        bgColor: "bg-gradient-to-br from-sky-50/20 to-blue-50/10"
    },
    {
        title: "TOGETHERNESS 🤝",
        desc: "We're all about shared laughter, teamwork, and moments that turn into cherished stories.",
        gradient: "from-emerald-400 via-teal-500 to-green-500",
        bgColor: "bg-gradient-to-br from-emerald-50/20 to-teal-50/10"
    },
    {
        title: "EXCELLENCE IN ENERGY ⚡",
        desc: "We bring passion to every jump, spark creativity in every corner, and deliver top-tier service with a smile.",
        gradient: "from-purple-400 via-violet-500 to-fuchsia-500",
        bgColor: "bg-gradient-to-br from-purple-50/20 to-violet-50/10"
    },
    {
        title: "INCLUSION & KINDNESS 💙",
        desc: "Everyone is welcome. Respect, kindness, and celebration of individuality are part of every experience here.",
        gradient: "from-rose-400 via-pink-500 to-red-500",
        bgColor: "bg-gradient-to-br from-rose-50/20 to-pink-50/10"
    }
];

const ValuesSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const topDividerRef = useRef<SVGSVGElement>(null);
    const wavePathRef = useRef<SVGPathElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Animated top divider wave - only on desktop
        if (!isMobile && topDividerRef.current && wavePathRef.current) {
            // Continuous wave animation
            gsap.to(topDividerRef.current, {
                x: -100,
                duration: 25,
                repeat: -1,
                ease: "linear",
            });

            // Wave path reveal animation
            gsap.fromTo(wavePathRef.current,
                {
                    opacity: 0,
                    scaleY: 0.8,
                    transformOrigin: "center bottom"
                },
                {
                    opacity: 1,
                    scaleY: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 95%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }

        // Section Title Animation
        gsap.fromTo(".values-title",
            {
                y: 60,
                opacity: 0,
                scale: 0.95
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        // Cards Animation with stagger
        const cards = gsap.utils.toArray('.value-card');
        cards.forEach((card: any, index) => {
            gsap.fromTo(card,
                {
                    y: 80,
                    opacity: 0,
                    scale: 0.9,
                    rotationY: index % 2 === 0 ? -5 : 5
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    delay: index * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

        // Floating background elements
        if (!isMobile) {
            gsap.to('.floating-value-element', {
                y: (i) => (i % 2 === 0 ? -30 : 30),
                x: (i) => (i % 3 === 0 ? -20 : 20),
                rotation: gsap.utils.random(-8, 8),
                duration: gsap.utils.random(3, 6),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.3
            });
        }

    }, { scope: containerRef, dependencies: [isMobile] });

    return (
        <>
            {/* Animated Top Divider - Mobile responsive */}
            <div className="relative w-full h-24 md:h-32 lg:h-40 pointer-events-none overflow-hidden">
                {/* For mobile: Simple solid divider with overflow prevention */}
                {isMobile ? (
                    <div className="absolute inset-0 w-screen bg-gradient-to-br from-emerald-50 to-teal-50">
                        <div className="relative w-full h-full">
                            {/* Mobile wave SVG - simplified */}
                            <svg
                                className="absolute bottom-0 left-0 w-full h-full"
                                viewBox="0 0 375 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient id="mobileTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="100%" stopColor="#dcfce7" />
                                    </linearGradient>
                                </defs>
                                <path
                                    fill="url(#mobileTopGradient)"
                                    fillOpacity="0.98"
                                    d="M0,20C60,40,120,60,180,70C240,80,300,70,360,60C420,50,480,30,540,20C600,10,660,0,720,0C780,0,840,0,900,0C960,0,1020,0,1080,0C1140,0,1200,0,1260,0C1320,0,1380,0,1440,0L1440,100L0,100Z"
                                    transform="translate(0, 0)"
                                />
                            </svg>

                            {/* Mobile decorative dots */}
                            <div className="absolute top-4 left-1/4 w-3 h-3 rounded-full bg-emerald-300/40 animate-pulse" />
                            <div className="absolute top-8 right-1/3 w-2 h-2 rounded-full bg-amber-300/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute top-12 left-2/3 w-4 h-4 rounded-full bg-sky-300/40 animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>
                ) : (
                    // Desktop: Animated SVG
                    <svg
                        ref={topDividerRef}
                        className="absolute top-0 left-0 w-[120%] h-full"
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="valuesTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="30%" stopColor="#f0f9ff" />
                                <stop offset="70%" stopColor="#dcfce7" />
                                <stop offset="100%" stopColor="#bbf7d0" />
                            </linearGradient>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#10b981" floodOpacity="0.2" />
                            </filter>
                        </defs>

                        {/* Main wave path */}
                        <path
                            ref={wavePathRef}
                            fill="url(#valuesTopGradient)"
                            fillOpacity="0.98"
                            filter="url(#shadow)"
                            d="M0,32L60,53.3C120,75,240,117,360,128C480,139,600,117,720,96C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,120L0,120Z"
                        />

                        {/* Secondary wave for depth */}
                        <path
                            className="values-wave"
                            fill="url(#valuesTopGradient)"
                            fillOpacity="0.7"
                            d="M0,48L60,69.3C120,91,240,133,360,133.3C480,133,600,91,720,85.3C840,80,960,112,1080,117.3C1200,123,1320,101,1380,90.7L1440,80L1440,120L0,120Z"
                        />
                    </svg>
                )}
            </div>

            {/* Main Section */}
            <section
                ref={containerRef}
                className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50/30 via-teal-50/20 to-green-50/10"
                aria-labelledby="values-heading"
            >
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="floating-value-element absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-emerald-200/15 to-teal-200/10 blur-3xl" />
                    <div className="floating-value-element absolute top-1/2 right-[15%] w-80 h-80 rounded-full bg-gradient-to-tr from-amber-200/15 to-yellow-200/10 blur-3xl" />
                    <div className="floating-value-element absolute bottom-1/4 left-[40%] w-56 h-56 rounded-full bg-gradient-to-r from-sky-200/15 to-blue-200/10 blur-3xl" />
                </div>

                {/* Floating Icons */}
                {!isMobile && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                        {["🎉", "🛡️", "🤝", "⚡", "💙"].map((emoji, i) => (
                            <div
                                key={i}
                                className="floating-value-element absolute text-3xl opacity-30"
                                style={{
                                    left: `${(i * 20 + 10) % 90}%`,
                                    top: `${(i * 18 + 15) % 85}%`,
                                }}
                            >
                                {emoji}
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-20 lg:mb-24">
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-6 md:mb-8">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
                            <span className="font-bold text-emerald-700 text-sm md:text-base lg:text-lg">OUR GUIDING PRINCIPLES</span>
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />
                        </div>

                        <h2
                            id="values-heading"
                            className="values-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-4 md:mb-6"
                        >
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                Our Core
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 mt-1 md:mt-2">
                                Values
                            </span>
                        </h2>

                        <p className="values-title text-lg sm:text-xl md:text-2xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                            The principles that guide every decision, every interaction, and every moment of joy we create
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                        {VALUES.map((value, index) => (
                            <div
                                key={index}
                                className="value-card group relative"
                            >
                                <div className={`relative h-full rounded-2xl sm:rounded-3xl ${value.bgColor} backdrop-blur-sm border-2 border-white/50 shadow-lg sm:shadow-xl md:shadow-2xl shadow-emerald-100/20 hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                    {/* Content */}
                                    <div className="relative p-6 sm:p-8">
                                        {/* Icon/Title */}
                                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-md sm:shadow-lg`}>
                                                <div className="text-xl sm:text-2xl text-white">
                                                    {value.title.split(' ')[value.title.split(' ').length - 1]}
                                                </div>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}>
                                                {value.title.split(' ').slice(0, -1).join(' ')}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-base sm:text-lg text-slate-700/90 leading-relaxed">
                                            {value.desc}
                                        </p>

                                        {/* Gradient underline */}
                                        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/50">
                                            <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r ${value.gradient} rounded-full transition-all duration-300 group-hover:w-24 sm:group-hover:w-28`} />
                                        </div>
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-t-3 sm:border-t-4 border-r-3 sm:border-r-4 rounded-tr-2xl sm:rounded-tr-3xl border-emerald-300/50" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Closing Statement */}
                    <div className="mt-12 md:mt-20 lg:mt-28 text-center">
                        <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 to-emerald-50/30 backdrop-blur-sm border-2 border-white/50 shadow-lg sm:shadow-xl lg:shadow-2xl shadow-emerald-100/20">
                            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                                <div className="px-4 py-1 sm:px-6 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                                    <span className="text-white font-bold text-sm sm:text-base">THE HEART OF OUR CULTURE</span>
                                </div>
                            </div>

                            <div className="text-4xl sm:text-5xl text-emerald-200 mb-4 sm:mb-6">"</div>

                            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl italic text-slate-700/90 leading-relaxed font-light mb-6 sm:mb-8">
                                Our values aren't just words on a wall — they're the living, breathing essence of every interaction,
                                every smile, and every unforgettable memory we create together.
                            </blockquote>

                            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-emerald-100">
                                <div className="w-8 sm:w-10 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                                <div className="text-2xl sm:text-3xl text-amber-500">💫</div>
                                <div className="w-8 sm:w-10 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Font import */}

        </>
    );
};

export default ValuesSection;