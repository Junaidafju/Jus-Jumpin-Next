"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MissionVision = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const missionContentRef = useRef<HTMLDivElement>(null);
    const visionContentRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Header animation
        gsap.fromTo('.section-header',
            {
                y: 80,
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
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        // Mission content animation
        if (missionContentRef.current) {
            const missionItems = missionContentRef.current.querySelectorAll('.mission-item');
            gsap.fromTo(missionItems,
                {
                    x: isMobile ? 0 : -100,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: missionContentRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }

        // Vision content animation
        if (visionContentRef.current) {
            const visionItems = visionContentRef.current.querySelectorAll('.vision-item');
            gsap.fromTo(visionItems,
                {
                    x: isMobile ? 0 : 100,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: visionContentRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }

        // Floating background shapes
        if (!isMobile) {
            gsap.to('.floating-shape', {
                y: (i) => (i % 2 === 0 ? -40 : 40),
                x: (i) => (i % 3 === 0 ? -30 : 30),
                rotation: gsap.utils.random(-5, 5),
                duration: gsap.utils.random(20, 30),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });
        }

    }, { scope: sectionRef, dependencies: [isMobile] });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full bg-gradient-to-b from-white via-sky-50/10 to-amber-50/5 overflow-hidden"
            aria-labelledby="mission-vision-heading"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Floating Background Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="floating-shape absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-sky-200/10 to-blue-100/5 blur-3xl" />
                <div className="floating-shape absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-200/10 to-orange-100/5 blur-3xl" />
                <div className="floating-shape absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-teal-200/10 to-emerald-100/5 blur-3xl" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
                {/* Header */}
                <div className="section-header text-center mb-16 md:mb-24 lg:mb-32">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 mb-8">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 animate-pulse" />
                        <span className="font-bold text-sky-700 text-lg">OUR CORE BELIEFS</span>
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />
                    </div>

                    <h1
                        id="mission-vision-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6"
                    >
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
                            Why We Do
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mt-2">
                            What We Do
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
                        The driving force behind every smile, every bounce, and every memory we create
                    </p>
                </div>

                {/* Mission Section - Horizontal Layout */}
                <div ref={missionContentRef} className="mb-20 md:mb-32">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        {/* Image - Left side */}
                        <div className="mission-item lg:w-1/2 w-full">
                            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-sky-200/30 bg-gradient-to-br from-sky-50 to-blue-50">
                                {/* Mission Image - Responsive object fit */}
                                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/image/mission-logo.webp"
                                            alt="Our Mission - Creating joyful family experiences"
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Logo badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-sky-100 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" />
                                            <span className="font-bold text-sky-700 text-sm">Mission</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content - Right side */}
                        <div className="mission-item lg:w-1/2 w-full">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    {/* Mission Logo Icon */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-100 flex items-center justify-center shadow-sm flex-shrink-0">
                                        <div className="w-8 h-8 relative">
                                            <Image
                                                src="/image/mission-logo.webp"
                                                alt="Mission Icon"
                                                fill
                                                className="object-contain"
                                                sizes="32px"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Mission</h2>
                                        <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full mt-2" />
                                    </div>
                                </div>

                                <p className="text-xl md:text-2xl text-slate-700/90 leading-relaxed font-light">
                                    To create joyful, safe, and high-energy experiences that bring families and friends together through active play, laughter, and unforgettable memories.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                    {[
                                        { icon: "🛡️", text: "Safe & Supervised Play" },
                                        { icon: "👨‍👩‍👧‍👦", text: "Family Bonding Focus" },
                                        { icon: "✨", text: "Unforgettable Memories" },
                                        { icon: "🏙️", text: "Community Building" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-sky-50/50 to-blue-50/30 border border-sky-100/50">
                                            <div className="text-2xl flex-shrink-0">{item.icon}</div>
                                            <span className="font-medium text-slate-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative my-16 md:my-24">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-sky-200/50" />
                    </div>
                    <div className="relative flex justify-center">
                        <div className="px-6 py-3 bg-gradient-to-r from-sky-100 to-amber-100 rounded-full border border-white/50 backdrop-blur-sm">
                            <span className="font-bold text-sky-700 text-lg">AND</span>
                        </div>
                    </div>
                </div>

                {/* Vision Section - Reversed Horizontal Layout */}
                <div ref={visionContentRef} className="mb-20 md:mb-32">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        {/* Content - Left side */}
                        <div className="vision-item lg:w-1/2 w-full lg:order-1 order-2">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    {/* Vision Logo Icon */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-100 flex items-center justify-center shadow-sm flex-shrink-0">
                                        <div className="w-8 h-8 relative">
                                            <Image
                                                src="/image/vision-logo.webp"
                                                alt="Vision Icon"
                                                fill
                                                className="object-contain"
                                                sizes="32px"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Vision</h2>
                                        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2" />
                                    </div>
                                </div>

                                <p className="text-xl md:text-2xl text-slate-700/90 leading-relaxed font-light">
                                    To be the happiest place in every city – where imaginations soar, bodies move and hearts smile. We envision a world where every child grows up with magical childhood memories.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                    {[
                                        { icon: "🏙️", text: "City-Wide Happiness" },
                                        { icon: "🚀", text: "Imagination Soaring" },
                                        { icon: "😊", text: "Heartfelt Smiles" },
                                        { icon: "🌱", text: "Sustainable Joy" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-50/50 to-orange-50/30 border border-amber-100/50">
                                            <div className="text-2xl flex-shrink-0">{item.icon}</div>
                                            <span className="font-medium text-slate-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Image - Right side */}
                        <div className="vision-item lg:w-1/2 w-full lg:order-2 order-1">
                            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-amber-200/30 bg-gradient-to-br from-amber-50 to-orange-50">
                                {/* Vision Image - Responsive object fit */}
                                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/image/vision-logo.webp"
                                            alt="Our Vision - Creating happy childhood memories"
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Logo badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-100 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                                            <span className="font-bold text-orange-700 text-sm">Vision</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="max-w-3xl mx-auto text-center">
                    <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/80 to-sky-50/30 backdrop-blur-sm border-2 border-white/50 shadow-xl shadow-sky-100/20">
                        <div className="text-5xl text-sky-200 mb-6">"</div>

                        <blockquote className="text-2xl md:text-3xl italic text-slate-700/90 leading-relaxed font-light mb-8">
                            Together, our mission and vision create a world where every child's laughter echoes in memories that last forever.
                        </blockquote>

                        {/* Decorative closing */}
                        <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-sky-100">
                            <div className="w-10 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full" />
                            <div className="text-3xl text-amber-500">✨</div>
                            <div className="w-10 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Font import */}

        </section>
    );
};

export default MissionVision;