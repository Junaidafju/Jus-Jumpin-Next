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
    const separatorRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!containerRef.current) return;

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

        // Separator animation
        if (separatorRef.current) {
            gsap.fromTo(separatorRef.current,
                {
                    scaleY: 0,
                    opacity: 0
                },
                {
                    scaleY: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: separatorRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }

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
            {/* Top Separator - Waves */}
            <div className="relative w-full h-32 md:h-40 pointer-events-none">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="valuesTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#f0f9ff" />
                            <stop offset="100%" stopColor="#dcfce7" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#valuesTopGradient)"
                        fillOpacity="0.95"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L0,120Z"
                    />
                </svg>
            </div>

            {/* Main Section */}
            <section
                ref={containerRef}
                className="relative py-20 md:py-32 bg-gradient-to-b from-emerald-50/30 via-teal-50/20 to-green-50/10 overflow-hidden"
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
                    <div className="text-center mb-16 md:mb-24">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-8">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
                            <span className="font-bold text-emerald-700 text-lg">OUR GUIDING PRINCIPLES</span>
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />
                        </div>

                        <h2
                            id="values-heading"
                            className="values-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6"
                        >
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                Our Core
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 mt-2">
                                Values
                            </span>
                        </h2>

                        <p className="values-title text-xl md:text-2xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
                            The principles that guide every decision, every interaction, and every moment of joy we create
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {VALUES.map((value, index) => (
                            <div
                                key={index}
                                className="value-card group relative"
                            >
                                <div className={`relative h-full rounded-3xl ${value.bgColor} backdrop-blur-sm border-2 border-white/50 shadow-xl shadow-emerald-100/20 hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                    {/* Content */}
                                    <div className="relative p-8">
                                        {/* Icon/Title */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg`}>
                                                <div className="text-2xl text-white">
                                                    {value.title.split(' ')[value.title.split(' ').length - 1]}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}>
                                                {value.title.split(' ').slice(0, -1).join(' ')}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-lg text-slate-700/90 leading-relaxed">
                                            {value.desc}
                                        </p>

                                        {/* Gradient underline */}
                                        <div className="mt-8 pt-6 border-t border-white/50">
                                            <div className={`w-20 h-1 bg-gradient-to-r ${value.gradient} rounded-full transition-all duration-300 group-hover:w-28`} />
                                        </div>
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 rounded-tr-3xl border-emerald-300/50" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center Separator */}
                    <div ref={separatorRef} className="relative my-16 md:my-24">
                        <div className="flex items-center justify-center">
                            <div className="relative w-full max-w-md mx-auto">
                                {/* Dotted line */}
                                <div className="absolute left-0 right-0 top-1/2 h-px border-t-2 border-dashed border-emerald-200/50 transform -translate-y-1/2" />

                                {/* Center emblem */}
                                <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-white to-emerald-50 border-4 border-white shadow-xl flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 animate-pulse" />
                                    <div className="text-3xl text-emerald-600">✨</div>

                                    {/* Rotating ring */}
                                    <div className="absolute -inset-2 rounded-full border-4 border-transparent border-t-emerald-400 border-r-teal-400 opacity-0 group-hover:opacity-100 animate-spin" style={{ animationDuration: '10s' }} />
                                </div>

                                {/* Side circles */}
                                <div className="absolute left-0 top-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-white shadow-lg transform -translate-y-1/2 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                                </div>
                                <div className="absolute right-0 top-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-white shadow-lg transform -translate-y-1/2 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Closing Statement */}
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/80 to-emerald-50/30 backdrop-blur-sm border-2 border-white/50 shadow-xl shadow-emerald-100/20">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <div className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                                    <span className="text-white font-bold">THE HEART OF OUR CULTURE</span>
                                </div>
                            </div>

                            <div className="text-5xl text-emerald-200 mb-6">"</div>

                            <blockquote className="text-2xl md:text-3xl italic text-slate-700/90 leading-relaxed font-light mb-8">
                                Our values aren't just words on a wall — they're the living, breathing essence of every interaction,
                                every smile, and every unforgettable memory we create together.
                            </blockquote>

                            <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-emerald-100">
                                <div className="w-10 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                                <div className="text-3xl text-amber-500">💫</div>
                                <div className="w-10 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Separator - Curved */}
            <div className="relative w-full h-32 md:h-40 pointer-events-none">
                <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="valuesBottomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#dcfce7" />
                            <stop offset="50%" stopColor="#f0f9ff" />
                            <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#valuesBottomGradient)"
                        fillOpacity="0.95"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L0,120Z"
                    />
                </svg>
            </div>

            {/* Font import */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700;800&display=swap');
            `}</style>
        </>
    );
};

export default ValuesSection;