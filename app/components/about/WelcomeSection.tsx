"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface MilestoneItem {
    id: number;
    year: string;
    title: string;
    emoji: string;
    gradient: string;
}

interface FlipCardProps {
    frontImage: string;
    frontAlt: string;
    backTitle: string;
    backContent: string;
    funFact: string;
}

const WelcomeSection: React.FC = () => {
    // Refs
    const sectionRef = useRef<HTMLElement>(null);
    const flipCardRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);

    // State
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Data
    const flipCardData: FlipCardProps = {
        frontImage: "https://static.vecteezy.com/system/resources/previews/047/352/345/non_2x/donald-duck-cartoon-character-with-a-sailor-hat-isolated-from-background-free-png.png",
        frontAlt: "Donald Duck having fun at our trampoline park",
        backTitle: "Fun Facts!",
        backContent: "Did you know our mascot Donald has visited every Jus Jumpin location? He loves the foam pit the most!",
        funFact: "Official mascot since 2019"
    };

    const milestones: MilestoneItem[] = [
        { id: 1, year: "2017", title: "First park opens in metro mall", emoji: "🎉", gradient: "from-blue-400 to-cyan-400" },
        { id: 2, year: "2019", title: "8 new locations across 5 states", emoji: "🚀", gradient: "from-emerald-400 to-teal-400" },
        { id: 3, year: "2021", title: "Toddler zones & party packages", emoji: "🎂", gradient: "from-amber-400 to-orange-400" },
        { id: 4, year: "2023", title: "1.5M happy jumpers & safety app", emoji: "📱", gradient: "from-violet-400 to-purple-400" },
        { id: 5, year: "2025", title: "25+ parks nationwide", emoji: "🏆", gradient: "from-rose-400 to-pink-400" },
    ];

    // Check mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // GSAP Animations
    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Levitation animation for flip card - disable on mobile
            if (!isMobile) {
                gsap.to(flipCardRef.current, {
                    y: -20,
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            // Floating emoji particles
            gsap.to(".floating-emoji", {
                y: (i: number) => (i % 2 === 0 ? -15 : 15),
                x: (i: number) => (i % 3 === 0 ? -10 : 10),
                rotation: gsap.utils.random(-10, 10),
                duration: gsap.utils.random(2, 3),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5,
            });

            // Background shapes drift
            gsap.to(".floating-bg-shape", {
                x: gsap.utils.random(-30, 30),
                y: gsap.utils.random(-20, 20),
                rotation: gsap.utils.random(-5, 5),
                duration: gsap.utils.random(20, 30),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.3,
            });

            // Text reveal animations
            gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((element, i) => {
                gsap.fromTo(element,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        delay: i * 0.2,
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Milestone timeline animations
            if (timelineRef.current && progressLineRef.current) {
                // Progress line animation
                gsap.to(progressLineRef.current, {
                    scaleX: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 70%",
                        end: "bottom 30%",
                        scrub: 1,
                    },
                });

                // Staggered card animations
                const cards = gsap.utils.toArray<HTMLElement>('.milestone-card');
                cards.forEach((card, i) => {
                    gsap.fromTo(card,
                        { scale: 0.8, y: 60, opacity: 0 },
                        {
                            scale: 1,
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                            delay: i * 0.15,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                });
            }

            // Section header animation
            gsap.fromTo(".section-header",
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".section-header",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    // Handle flip animation
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        if (flipCardRef.current) {
            gsap.to(flipCardRef.current, {
                rotationY: isFlipped ? 0 : 180,
                duration: 0.8,
                ease: "power3.inOut",
                transformStyle: "preserve-3d",
            });
        }
    };

    // Handle milestone hover
    const handleMilestoneHover = (id: number, isHovering: boolean) => {
        if (isMobile) return; // Disable hover effects on mobile
        const card = document.querySelector(`.milestone-card-${id}`);
        if (card) {
            gsap.to(card, {
                scale: isHovering ? 1.05 : 1,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-amber-50/10 py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36"
            aria-labelledby="story-heading"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="floating-bg-shape absolute top-[10%] left-[5%] w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-200/10 to-cyan-200/5 rounded-full blur-3xl" />
                <div className="floating-bg-shape absolute top-[60%] right-[8%] w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-tr from-amber-200/10 to-orange-200/5 rounded-[60%_40%_55%_45%] blur-3xl" />
                <div className="floating-bg-shape absolute bottom-[15%] left-[25%] w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-r from-emerald-200/10 to-teal-200/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-32">
                    <h1
                        id="story-heading"
                        className="section-header text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6"
                    >
                        <span className="block text-sky-700 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Our Journey</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            of Smiles
                        </span>
                    </h1>
                    <p className="reveal-text text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed sm:leading-relaxed px-2 xs:px-0">
                        From a single bounce to nationwide joy — crafting unforgettable childhood moments
                    </p>
                </div>

                {/* Two-Column Layout - Fixed stacking issue */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32">

                    {/* Left Column: Interactive Flip Card - Mobile first, then desktop order */}
                    <div className="relative perspective-1000 order-1 lg:order-1 w-full mb-8 sm:mb-10 md:mb-0">
                        <div className="lg:sticky lg:top-24">
                            <div className="flex justify-center w-full">
                                <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto">
                                    {/* Flip Card Container with proper height */}
                                    <div className="relative w-full aspect-square mb-6">
                                        <div
                                            ref={flipCardRef}
                                            className="relative w-full h-full cursor-pointer"
                                            onClick={handleFlip}
                                            role="button"
                                            tabIndex={0}
                                            aria-label="Flip card to reveal fun facts"
                                            onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform',
                                            }}
                                        >
                                            {/* Front Side */}
                                            <div
                                                className="absolute inset-0 w-full h-full rounded-2xl xs:rounded-3xl sm:rounded-[2.5rem] overflow-hidden backface-hidden"
                                                style={{ backfaceVisibility: 'hidden' }}
                                                aria-hidden={isFlipped}
                                            >
                                                {/* Gradient glow background */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-sky-200/30 via-amber-100/20 to-orange-100/10 rounded-2xl xs:rounded-3xl sm:rounded-[2.5rem]" />

                                                {/* Image container */}
                                                <div className="relative w-full h-full p-4 xs:p-6 sm:p-8">
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={flipCardData.frontImage}
                                                            alt={flipCardData.frontAlt}
                                                            fill
                                                            className="object-contain drop-shadow-xl sm:drop-shadow-2xl"
                                                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 50vw"
                                                            priority
                                                        />
                                                    </div>
                                                </div>

                                                {/* Floating emojis - smaller on mobile */}
                                                <div className="floating-emoji absolute top-4 xs:top-6 sm:top-8 right-4 xs:right-6 sm:right-8 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg sm:shadow-xl flex items-center justify-center">
                                                    <span className="text-lg xs:text-xl sm:text-2xl">⭐</span>
                                                </div>
                                                <div className="floating-emoji absolute bottom-8 xs:bottom-10 sm:bottom-12 left-6 xs:left-8 sm:left-10 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 shadow-lg sm:shadow-xl flex items-center justify-center">
                                                    <span className="text-base xs:text-lg sm:text-xl">😊</span>
                                                </div>
                                                <div className="floating-emoji absolute top-1/2 left-4 xs:left-6 sm:left-8 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg sm:shadow-xl flex items-center justify-center">
                                                    <span className="text-base xs:text-lg sm:text-lg">✨</span>
                                                </div>
                                            </div>

                                            {/* Back Side */}
                                            <div
                                                className="absolute inset-0 w-full h-full rounded-2xl xs:rounded-3xl sm:rounded-[2.5rem] overflow-hidden backface-hidden bg-gradient-to-br from-amber-100 to-orange-100"
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    transform: 'rotateY(180deg)',
                                                }}
                                                aria-hidden={!isFlipped}
                                            >
                                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 xs:p-8 sm:p-10 text-center">
                                                    <div className="text-3xl xs:text-4xl sm:text-5xl mb-4 xs:mb-5 sm:mb-6">🎯</div>
                                                    <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-slate-800 mb-3 xs:mb-4">
                                                        {flipCardData.backTitle}
                                                    </h3>
                                                    <p className="text-sm xs:text-base sm:text-lg text-slate-700 mb-4 xs:mb-5 sm:mb-6 leading-relaxed px-2 xs:px-0">
                                                        {flipCardData.backContent}
                                                    </p>
                                                    <div className="px-3 xs:px-4 py-1 xs:py-2 bg-gradient-to-r from-sky-100 to-blue-100 rounded-full">
                                                        <span className="text-xs xs:text-sm font-medium text-sky-700">
                                                            {flipCardData.funFact}
                                                        </span>
                                                    </div>
                                                    <div className="mt-6 xs:mt-8 text-slate-600 text-xs xs:text-sm">
                                                        👈 Tap to flip back!
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Flip hint badge */}
                                    <div className="flex justify-center">
                                        <div className="px-3 xs:px-4 py-1 xs:py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md sm:shadow-lg">
                                            <div className="flex items-center gap-1 xs:gap-2 text-xs xs:text-sm font-medium text-sky-700">
                                                <span className="animate-pulse">👆</span>
                                                <span>Tap to flip!</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content Module - Mobile second, desktop order-2 */}
                    <div className="order-2 lg:order-2 space-y-8 sm:space-y-10 md:space-y-12">
                        {/* Section 1 */}
                        <div className="reveal-text">
                            <div className="inline-flex items-center gap-2 xs:gap-3 px-4 xs:px-5 py-2 xs:py-3 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 mb-4 xs:mb-5 sm:mb-6">
                                <div className="w-2 h-2 xs:w-3 xs:h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" />
                                <span className="font-bold text-sky-700 text-sm xs:text-base sm:text-lg">THE BEGINNING</span>
                            </div>
                            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-slate-800/90 leading-relaxed font-light">
                                It all started with a simple vision in 2017: create a magical space where kids could be kids — free to jump, laugh, and play without limits.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="reveal-text">
                            <div className="inline-flex items-center gap-2 xs:gap-3 px-4 xs:px-5 py-2 xs:py-3 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 mb-4 xs:mb-5 sm:mb-6">
                                <div className="w-2 h-2 xs:w-3 xs:h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />
                                <span className="font-bold text-amber-700 text-sm xs:text-base sm:text-lg">OUR GROWTH</span>
                            </div>
                            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-slate-800/90 leading-relaxed font-light">
                                From one vibrant trampoline park, we&apos;ve grown into India&apos;s most loved indoor adventure brand, with every location designed for maximum fun and safety.
                            </p>
                        </div>

                        {/* Highlight Card */}
                        <div className="reveal-text">
                            <div
                                className="p-6 xs:p-8 sm:p-10 rounded-xl xs:rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-white to-sky-50/70 border-2 border-sky-100/50 shadow-lg sm:shadow-xl md:shadow-2xl shadow-sky-100/30 backdrop-blur-sm hover:shadow-sky-200/40 transition-shadow duration-300"
                                role="complementary"
                                aria-label="Our Promise"
                            >
                                <div className="flex flex-col sm:flex-row items-start gap-4 xs:gap-5 sm:gap-6">
                                    <div className="text-4xl xs:text-5xl sm:text-5xl text-amber-500 flex-shrink-0" aria-hidden="true">
                                        ✨
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl xs:text-2xl sm:text-3xl text-sky-800 mb-3 xs:mb-4">
                                            Our Promise
                                        </h3>
                                        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-slate-700/90 italic leading-relaxed">
                                            &quot;We don&apos;t just build trampoline parks. We build childhood memories — one giant bounce at a time.&quot;
                                        </p>
                                        <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-sky-100">
                                            <div className="text-base xs:text-lg text-slate-600 font-medium">
                                                — Jus Jumpin Team
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Milestone Timeline */}
                <div className="mt-24 sm:mt-28 md:mt-32 lg:mt-40">
                    <div className="text-center mb-12 sm:mb-16 md:mb-20">
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">Milestone</span> Moments
                        </h2>
                        <p className="text-base xs:text-lg sm:text-xl text-slate-600/90 max-w-2xl mx-auto px-2 xs:px-0">
                            A journey marked by smiles, growth, and endless fun
                        </p>
                    </div>

                    <div ref={timelineRef} className="relative">
                        {/* Progress Line - Hidden on mobile, visible on md+ */}
                        <div className="hidden md:block absolute top-20 left-0 right-0 h-2 bg-gradient-to-r from-sky-100/50 via-teal-100/50 to-amber-100/50 rounded-full overflow-hidden">
                            <div
                                ref={progressLineRef}
                                className="h-full w-full bg-gradient-to-r from-sky-400 via-teal-400 to-amber-400 rounded-full origin-left scale-x-0"
                                aria-hidden="true"
                            />
                        </div>

                        {/* Timeline Items */}
                        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-6 relative">
                            {milestones.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`milestone-card milestone-card-${item.id} relative flex flex-col items-center text-center ${isMobile ? 'pt-0' : 'md:pt-24'
                                        }`}
                                    onMouseEnter={() => handleMilestoneHover(item.id, true)}
                                    onMouseLeave={() => handleMilestoneHover(item.id, false)}
                                    role="article"
                                    aria-label={`Milestone ${item.year}: ${item.title}`}
                                >
                                    {/* Icon Container */}
                                    <div className="relative z-10 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white to-sky-50 border-4 border-white shadow-lg sm:shadow-xl md:shadow-2xl shadow-sky-200/50 flex items-center justify-center group transition-all duration-300">
                                        {/* Gradient ring */}
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />

                                        {/* Rotating ring on hover */}
                                        <div className="absolute -inset-3 xs:-inset-4 rounded-full border-4 border-transparent border-t-sky-400 border-r-teal-400 opacity-0 group-hover:opacity-100 group-hover:animate-[spin_8s_linear_infinite] transition-opacity duration-300" />

                                        {/* Icon and Year */}
                                        <div className="relative">
                                            <div className="text-2xl xs:text-3xl sm:text-4xl mb-1 transition-transform duration-300 group-hover:scale-110">
                                                {item.emoji}
                                            </div>
                                            <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-sky-800">
                                                {item.year}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile connecting line */}
                                    {isMobile && index < milestones.length - 1 && (
                                        <div className="w-1 h-8 xs:h-10 sm:h-12 bg-gradient-to-b from-sky-300/50 to-teal-300/50 my-4 xs:my-5 sm:my-6 rounded-full" />
                                    )}

                                    {/* Content Card */}
                                    <div className="mt-4 xs:mt-5 sm:mt-6 p-4 xs:p-5 sm:p-6 rounded-xl xs:rounded-2xl bg-white/90 backdrop-blur-sm border border-white/80 shadow-lg sm:shadow-xl group-hover:shadow-2xl transition-all duration-300 max-w-xs mx-auto relative overflow-hidden">
                                        {/* Shine effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                        <p className="text-sm xs:text-base sm:text-lg font-medium text-slate-700 relative z-10">
                                            {item.title}
                                        </p>

                                        {/* Animated dots on hover */}
                                        <div className="absolute -bottom-2 xs:-bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 animate-pulse"
                                                    style={{ animationDelay: `${i * 0.2}s` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 sm:mt-28 md:mt-32 lg:mt-40 text-center">
                    <div
                        className="inline-block px-6 xs:px-8 py-3 xs:py-4 rounded-full bg-gradient-to-r from-sky-100/80 to-teal-100/80 backdrop-blur-sm border border-white/50 mb-8 sm:mb-10"
                        role="region"
                        aria-label="Call to action"
                    >
                        <div className="flex items-center gap-3 xs:gap-4">
                            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 animate-pulse" />
                            <span className="font-bold text-sky-700 text-base xs:text-lg">READY TO JOIN THE FUN?</span>
                            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 animate-pulse" />
                        </div>
                    </div>

                    <button
                        className="px-8 xs:px-10 sm:px-12 py-4 xs:py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg xs:text-xl font-bold rounded-full shadow-xl hover:shadow-orange-500/40 transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-orange-300"
                        aria-label="Find a park near you"
                    >
                        <span className="relative z-10">Find a Park Near You →</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/30 to-orange-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                </div>
            </div>

            {/* Wave separator */}
            <div className="absolute bottom-0 left-0 right-0 h-24 xs:h-28 sm:h-32 md:h-40 lg:h-48 pointer-events-none overflow-hidden">
                <svg
                    viewBox="0 0 2880 320"
                    className="absolute bottom-0 w-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f0f9ff" />
                            <stop offset="50%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#fef3c7" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#waveGradient)"
                        fillOpacity="0.9"
                        d="M0,224L80,192C160,160,320,96,480,74.7C640,53,800,75,960,106.7C1120,139,1280,181,1440,181.3C1600,181,1760,139,1920,122.7C2080,107,2240,117,2400,149.3C2560,181,2720,235,2880,245.3L2880,320L0,320Z"
                    />
                </svg>
            </div>

            {/* Add custom animations to global styles */}
            <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Focus styles */
        *:focus {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
        </section>
    );
};

export default WelcomeSection;