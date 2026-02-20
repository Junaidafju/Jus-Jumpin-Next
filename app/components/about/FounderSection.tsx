"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const topDividerRef = useRef<SVGSVGElement>(null);
    const founderImageRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Animated top divider - only on desktop
        if (!isMobile && topDividerRef.current) {
            gsap.to(topDividerRef.current, {
                x: -80,
                duration: 20,
                repeat: -1,
                ease: "linear",
            });
        }

        // Header animation
        gsap.fromTo(".founder-title",
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

        // Founder image animation
        if (founderImageRef.current) {
            gsap.fromTo(founderImageRef.current,
                {
                    x: -80,
                    opacity: 0,
                    scale: 0.9,
                    rotationY: -10
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: founderImageRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }

        // Content animation
        gsap.fromTo(".founder-content",
            {
                x: 80,
                opacity: 0,
                scale: 0.95
            },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        // Quote animation
        gsap.fromTo(".founder-quote",
            {
                y: 40,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".founder-quote",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );

    }, { scope: containerRef, dependencies: [isMobile] });

    return (
        <>
            {/* Animated Top Divider */}
            <div className="relative w-full h-24 md:h-32 lg:h-40 pointer-events-none overflow-hidden">
                {isMobile ? (
                    <div className="absolute inset-0 w-screen bg-gradient-to-br from-teal-50 to-emerald-50">
                        <svg
                            className="absolute bottom-0 left-0 w-full h-full"
                            viewBox="0 0 375 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <defs>
                                <linearGradient id="founderMobileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="100%" stopColor="#ccfbf1" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#founderMobileGradient)"
                                fillOpacity="0.98"
                                d="M0,30C60,40,120,50,180,55C240,60,300,55,360,50C420,45,480,35,540,30C600,25,660,20,720,15C780,10,840,5,900,5C960,5,1020,10,1080,15C1140,20,1200,25,1260,25C1320,25,1380,20,1440,15L1440,100L0,100Z"
                            />
                        </svg>
                    </div>
                ) : (
                    <svg
                        ref={topDividerRef}
                        className="absolute top-0 left-0 w-[120%] h-full"
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="founderTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="30%" stopColor="#f0f9ff" />
                                <stop offset="70%" stopColor="#ccfbf1" />
                                <stop offset="100%" stopColor="#99f6e4" />
                            </linearGradient>
                            <filter id="founderShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0d9488" floodOpacity="0.2" />
                            </filter>
                        </defs>

                        <path
                            fill="url(#founderTopGradient)"
                            fillOpacity="0.98"
                            filter="url(#founderShadow)"
                            d="M0,48L60,58.7C120,69,240,91,360,101.3C480,112,600,112,720,106.7C840,101,960,91,1080,85.3C1200,80,1320,80,1380,80L1440,80L1440,120L0,120Z"
                        />

                        <path
                            className="founder-wave"
                            fill="url(#founderTopGradient)"
                            fillOpacity="0.7"
                            d="M0,64L60,69.3C120,75,240,85,360,85.3C480,85,600,75,720,69.3C840,64,960,64,1080,69.3C1200,75,1320,85,1380,90.7L1440,96L1440,120L0,120Z"
                        />
                    </svg>
                )}
            </div>

            {/* Main Section */}
            <section
                ref={containerRef}
                className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50/30 via-emerald-50/20 to-cyan-50/10"
                aria-labelledby="founder-heading"
            >
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-teal-200/15 to-emerald-200/10 blur-3xl" />
                    <div className="absolute top-1/2 right-[15%] w-80 h-80 rounded-full bg-gradient-to-tr from-amber-200/15 to-yellow-200/10 blur-3xl" />
                    <div className="absolute bottom-1/4 left-[40%] w-56 h-56 rounded-full bg-gradient-to-r from-cyan-200/15 to-blue-200/10 blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-20 lg:mb-24">
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 mb-6 md:mb-8">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 animate-pulse" />
                            <span className="font-bold text-teal-700 text-sm md:text-base lg:text-lg">THE VISIONARY LEADER</span>
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />
                        </div>

                        <h2
                            id="founder-heading"
                            className="founder-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-4 md:mb-6"
                        >
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                                Our Visionary
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 mt-1 md:mt-2">
                                Founder
                            </span>
                        </h2>

                        <p className="founder-title text-lg sm:text-xl md:text-2xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                            The driving force behind our journey from a single dream to nationwide smiles
                        </p>
                    </div>

                    {/* Founder Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
                        {/* Founder Image */}
                        <div ref={founderImageRef} className="relative group">
                            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-teal-200/30">
                                {/* Gradient background for placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                    <div className="text-8xl md:text-9xl text-white/90">👨‍💼</div>
                                </div>

                                {/* Replace with actual Image component */}
                                <Image
                                    src="/image/founder.jpg"
                                    alt="Sumit Bathwal - Founder & CEO of Jus Jumpin"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />

                                {/* Decorative border */}
                                <div className="absolute inset-0 rounded-3xl border-4 border-white/30 pointer-events-none" />

                                {/* Image badge */}
                                <div className="absolute bottom-6 left-6 z-20">
                                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-teal-100 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                                            <span className="font-bold text-teal-700 text-sm">Founder & CEO</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating decorative element */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl z-10">
                                <div className="text-4xl text-white">♕</div>
                            </div>
                        </div>
                        {/* Founder Content */}
                        <div className="founder-content space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}>
                                        Sumit Bathwal
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full" />
                                        <p className="text-xl font-bold text-amber-600">Founder & CEO</p>
                                    </div>
                                </div>

                                <p className="text-lg text-slate-700/90 leading-relaxed">
                                    Sumit Bathwal is the Founder & CEO of Jus Jumpin, India's leading indoor trampoline park brand. A
                                    serial entrepreneur with a strong background in finance (FCA, CS, CWA), Sumit combines business
                                    acumen with creative vision to build high-energy entertainment experiences for families across
                                    India.
                                </p>

                                <p className="text-lg text-slate-700/90 leading-relaxed">
                                    Previously with KPMG (Taxation), he is an alumnus of St. Xavier's College, Kolkata. Under Sumit's
                                    leadership, Jus Jumpin has grown from a single location to 25+ parks across India, touching the
                                    lives of over 2 million customers.
                                </p>
                            </div>

                            {/* Founder Quote */}
                            <div className="founder-quote relative mt-8">
                                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-white/50 shadow-xl shadow-teal-100/20">
                                    <div className="absolute -top-3 sm:-top-4 left-6">
                                        <div className="text-5xl sm:text-6xl text-teal-200">"</div>
                                    </div>

                                    <blockquote className="text-lg sm:text-xl md:text-2xl italic text-slate-700/90 leading-relaxed font-light pl-4">
                                        Our goal has always been to create more than just entertainment venues - we're building communities
                                        where families create lasting memories while staying active and healthy.
                                    </blockquote>

                                    <div className="mt-6 flex items-center justify-between pt-6 border-t border-teal-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">SB</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">Sumit Bathwal</div>
                                                <div className="text-slate-600 text-sm">Founder & CEO, Jus Jumpin</div>
                                            </div>
                                        </div>
                                        <div className="text-2xl text-amber-500">✨</div>
                                    </div>
                                </div>

                                {/* Corner accent */}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-20" />
                            </div>
                        </div>
                    </div>

                    {/* Founder Achievements */}
                    <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {[
                            { number: "25+", label: "Parks Nationwide", icon: "🏢" },
                            { number: "2M+", label: "Happy Customers", icon: "😊" },
                            { number: "8+ Years", label: "of Excellence", icon: "⏳" },
                            { number: "500+", label: "Team Members", icon: "👥" }
                        ].map((achievement, index) => (
                            <div key={index} className="group relative">
                                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/80 to-teal-50/30 backdrop-blur-sm border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="text-3xl">{achievement.icon}</div>
                                        <div>
                                            <div className="text-2xl md:text-3xl font-bold text-slate-900">{achievement.number}</div>
                                            <div className="text-sm md:text-base text-slate-600">{achievement.label}</div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400/50 to-emerald-500/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Font import */}

        </>
    );
};
export default FounderSection;