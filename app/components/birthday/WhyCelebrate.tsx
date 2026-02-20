// app/components/birthday-celebration/WhyCelebrate.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    Lock,
    Palette,
    Gamepad2,
    Utensils,
    MapPin,
    Camera,
    ArrowRight,
    CheckCircle2,
    RotateCcw,
    Sparkles,
    Cake,
    PartyPopper,
    Gift,
    Star,
    X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        id: 'exclusive',
        icon: Lock,
        title: 'Exclusive Access',
        desc: 'Private access to trampoline zones during your party',
        backText: 'Your guests get the whole arena to celebrate freely without interruptions.',
        image: '/image/birthday/exclusive-access.jpg',
        color: 'from-blue-500 to-cyan-400',
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
    },
    {
        id: 'themes',
        icon: Palette,
        title: 'Personalized Themes',
        desc: 'Custom themes for kids and adults',
        backText: 'From superheroes to unicorns, we bring your dream theme to life!',
        image: '/image/birthday/personalized-themes.jpg',
        color: 'from-purple-500 to-pink-400',
        iconColor: 'text-purple-500',
        bgColor: 'bg-purple-50',
    },
    {
        id: 'games',
        icon: Gamepad2,
        title: 'Fun Games',
        desc: 'Dedicated play areas with party games',
        backText: 'Arcade classics, trampoline challenges, and hosted activities included.',
        image: '/image/birthday/fun-games.jpg',
        color: 'from-green-500 to-emerald-400',
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50',
    },
    {
        id: 'food',
        icon: Utensils,
        title: 'Delectable Food',
        desc: 'Catered menus for all tastes',
        backText: 'Pizza, snacks, cakes, and dietary options handled by our kitchen.',
        image: '/image/birthday/delectable-food.jpg',
        color: 'from-orange-500 to-amber-400',
        iconColor: 'text-orange-500',
        bgColor: 'bg-orange-50',
    },
    {
        id: 'zones',
        icon: MapPin,
        title: 'Dedicated Zones',
        desc: 'Private party areas for your group',
        backText: 'Your own decorated space with seating, music, and dedicated service.',
        image: '/image/birthday/dedicated-zones.jpg',
        color: 'from-red-500 to-rose-400',
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50',
    },
    {
        id: 'photos',
        icon: Camera,
        title: 'Photo Moments',
        desc: 'Picture-perfect memories everywhere',
        backText: 'Instagram-worthy backdrops and optional professional photography.',
        image: '/image/birthday/photo-moments.jpg',
        color: 'from-yellow-500 to-amber-400',
        iconColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
    },
];

const floatingItems = [
    { Icon: Cake, color: 'text-pink-400', size: 'w-12 h-12 md:w-16 md:h-16', startX: -10, endX: 110, y: '10%', speed: 1, mobileY: '5%' },
    { Icon: PartyPopper, color: 'text-blue-400', size: 'w-10 h-10 md:w-12 md:h-12', startX: 110, endX: -10, y: '25%', speed: 1.2, mobileY: '15%' },
    { Icon: Gift, color: 'text-purple-400', size: 'w-12 h-12 md:w-14 md:h-14', startX: -5, endX: 105, y: '60%', speed: 0.8, mobileY: '45%' },
    { Icon: Star, color: 'text-yellow-400', size: 'w-8 h-8 md:w-10 md:h-10', startX: 105, endX: -5, y: '80%', speed: 1.5, mobileY: '75%' },
    { Icon: Cake, color: 'text-orange-400', size: 'w-16 h-16 md:w-20 md:h-20', startX: -15, endX: 115, y: '45%', speed: 0.9, mobileY: '35%' },
];

export default function WhyCelebrate() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flippedCard, setFlippedCard] = useState<string | null>(null);

    // Device detection
    useEffect(() => {
        const checkDevice = () => {
            const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setIsMobile(mobile);
            setPrefersReducedMotion(reducedMotion);
            setIsLoaded(true);
        };

        checkDevice();

        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkDevice, 250);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    // GSAP Animations
    useEffect(() => {
        if (!isLoaded) return;

        const ctx = gsap.context(() => {
            if (!prefersReducedMotion) {
                // Heading animation
                gsap.fromTo(
                    headingRef.current,
                    isMobile ? { y: 30, opacity: 0 } : { y: 50, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: isMobile ? 0.6 : 1,
                        ease: isMobile ? 'power2.out' : 'elastic.out(1, 0.5)',
                        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
                    }
                );

                // Floating elements animation
                if (!isMobile && !prefersReducedMotion && floatingRef.current) {
                    const items = floatingRef.current.querySelectorAll('.floater');
                    items.forEach((item) => {
                        const start = item.getAttribute('data-start');
                        const end = item.getAttribute('data-end');
                        const speed = parseFloat(item.getAttribute('data-speed') || '1');

                        gsap.fromTo(item,
                            { x: `${start}vw`, willChange: 'transform' },
                            {
                                x: `${end}vw`,
                                rotation: 360,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: sectionRef.current,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: speed,
                                    onLeave: () => gsap.set(item, { willChange: 'auto' }),
                                    onEnterBack: () => gsap.set(item, { willChange: 'transform' }),
                                }
                            }
                        );

                        gsap.to(item, {
                            y: '+=20',
                            duration: 2 + Math.random(),
                            yoyo: true,
                            repeat: -1,
                            ease: 'sine.inOut',
                        });
                    });
                }

                // Cards stagger animation
                const cards = cardsRef.current?.querySelectorAll('.flip-card') || [];
                gsap.fromTo(
                    cards,
                    isMobile ? { y: 40, opacity: 0 } : { y: 80, opacity: 0, rotationX: 30 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 0.6,
                        stagger: isMobile ? 0.08 : 0.12,
                        ease: isMobile ? 'power2.out' : 'back.out(1.2)',
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', once: true },
                    }
                );

                // Wave animations
                gsap.to(".wave-path-1", {
                    x: "-50%",
                    duration: 20,
                    repeat: -1,
                    ease: "none",
                });

                gsap.fromTo(".wave-path-2",
                    { x: "-50%" },
                    {
                        x: "0%",
                        duration: 15,
                        repeat: -1,
                        ease: "none",
                    }
                );

                gsap.to([".wave-path-1", ".wave-path-2"], {
                    y: "+=10",
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: 0.5
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile, prefersReducedMotion, isLoaded]);

    const handleCardClick = useCallback((id: string) => {
        if (isMobile) {
            setFlippedCard(flippedCard === id ? null : id);
        }
    }, [isMobile, flippedCard]);

    const handleCardHover = useCallback((id: string | null) => {
        if (!isMobile) {
            setFlippedCard(id);
        }
    }, [isMobile]);

    if (!isLoaded) {
        return <div className="min-h-[50vh] bg-gradient-to-b from-[#f0f7ff] via-white to-[#e6f4ff]" />;
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gradient-to-b from-[#f0f7ff] via-white to-[#e6f4ff] py-0 overflow-x-hidden"
        >
            {/* Floating Layer */}
            <div
                ref={floatingRef}
                className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${isMobile ? 'opacity-30' : 'opacity-60'}`}
                aria-hidden="true"
            >
                {floatingItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={`floater absolute ${item.color} drop-shadow-lg ${isMobile ? 'static-floater' : ''}`}
                        style={{ top: isMobile ? item.mobileY : item.y, left: isMobile ? `${(idx * 20) + 5}%` : undefined }}
                        data-start={item.startX}
                        data-end={item.endX}
                        data-speed={item.speed}
                    >
                        <item.Icon className={`${item.size} ${isMobile ? '' : 'animate-pulse'}`} strokeWidth={1.5} />
                    </div>
                ))}

                {!isMobile && (
                    <>
                        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
                        <div className="absolute top-40 right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
                        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
                    </>
                )}
            </div>

            {/* Top Wave Separator */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10 h-[60px] md:h-[120px]">
                <svg
                    className="relative block w-[200%] h-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    {/* Wave 1: Back Wave */}
                    <path
                        className="wave-path-1"
                        d="M0,120V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120Z"
                        fill="url(#waveGradient)"
                        opacity="0.6"
                    />
                    {/* Wave 2: Front Wave */}
                    <path
                        className="wave-path-2"
                        d="M0,120V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,105,20.34,35.79,11.46,71.15,24,108.37,31.32,49.08,9.66,100.26,9.39,149.12-3.32,14.32-3.72,28.6-8.24,42.71-13.27,65.71-23.44,134.11-51.43,203.2-49.13,31.06,1,61,10.1,86.52,24.11V120Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-24 md:pt-32 pb-16 md:pb-20 relative z-20">
                {/* Content Padding Container */}
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    {/* Heading Area */}
                    <div ref={headingRef} className="text-center max-w-4xl mx-auto pt-24 md:pt-32 mb-16 md:mb-20">
                        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white shadow-md border-2 border-blue-200 mb-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                            <span className="text-blue-600 font-bold tracking-wider uppercase text-xs md:text-sm">
                                Make It Perfect
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
                            Everything You Need <br className="md:hidden" />
                            <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    For the perfect birthday
                                </span>
                                <svg className="absolute w-full h-3 md:h-4 -bottom-1 md:-bottom-2 left-0 text-blue-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h2>

                        <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium px-2">
                            We've thought of every detail so you don't have to. Just show up and celebrate!
                        </p>
                    </div>
                </div>

                {/* Flip Cards Grid - Edge to edge with padding */}
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <div
                        ref={cardsRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-16 md:mb-24 w-full"
                    >
                        {features.map((feature) => {
                            const IconComponent = feature.icon;
                            const isFlipped = flippedCard === feature.id;

                            return (
                                <div
                                    key={feature.id}
                                    className="flip-card group w-full h-96 md:h-[28rem] cursor-pointer perspective-1000"
                                    onClick={() => handleCardClick(feature.id)}
                                    onMouseEnter={() => handleCardHover(feature.id)}
                                    onMouseLeave={() => handleCardHover(null)}
                                >
                                    <div
                                        className={`relative w-full h-full transition-transform duration-700 ease-out ${isFlipped ? '[transform:rotateY(180deg)]' : ''
                                            }`}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        {/* FRONT OF CARD */}
                                        <div
                                            className={`absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl ${feature.bgColor} border-2 border-white/80 shadow-lg p-6 md:p-8 flex flex-col justify-between backface-hidden hover:shadow-2xl transition-shadow duration-300`}
                                            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                                        >
                                            {/* Animated background blob */}
                                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out" />

                                            <div className="relative flex-1">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-slate-600 text-lg leading-relaxed">
                                                    {feature.desc}
                                                </p>
                                            </div>

                                            <div className="relative flex items-center justify-between mt-6 pt-6 border-t border-slate-200/60">
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span>Included</span>
                                                </div>
                                                {isMobile && (
                                                    <span className="text-xs text-slate-400 font-medium bg-white px-3 py-1.5 rounded-full shadow-sm">
                                                        Tap to flip
                                                    </span>
                                                )}
                                            </div>

                                            {/* Floating icon */}
                                            <div className="absolute bottom-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Gift className="w-8 h-8" />
                                            </div>
                                        </div>

                                        {/* BACK OF CARD - With Image */}
                                        <div
                                            className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl backface-hidden"
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)',
                                            }}
                                        >
                                            {/* Background Image */}
                                            <div className="absolute inset-0">
                                                <Image
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={feature.id === 'exclusive' || feature.id === 'themes'}
                                                />
                                                {/* Gradient overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} from-30% to-transparent opacity-60`} />
                                            </div>

                                            {/* Content Overlay */}
                                            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">
                                                <div className="mb-auto pt-4 flex justify-between items-start">
                                                    <IconComponent className="w-10 h-10 text-white/80" />
                                                    {isMobile && (
                                                        <button
                                                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setFlippedCard(null);
                                                            }}
                                                        >
                                                            <RotateCcw className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>

                                                <h3 className="text-2xl md:text-3xl font-black mb-3">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-white/90 text-lg leading-relaxed font-medium">
                                                    {feature.backText}
                                                </p>

                                                <div className="mt-6 flex items-center gap-2">
                                                    <div className="h-1 flex-1 bg-white/30 rounded-full" />
                                                    <span className="text-sm font-bold text-white/80">
                                                        {isMobile ? 'Tap to return' : 'Hover to return'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Block */}
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-16 md:pb-24">
                    <div className="relative w-full bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-slate-100 overflow-hidden">
                        {/* Decorative background blobs */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-50 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-50 blur-3xl pointer-events-none" />

                        {/* Floating icons */}
                        <div className="absolute top-4 right-4 opacity-10">
                            <PartyPopper className="w-12 h-12 text-blue-500" />
                        </div>
                        <div className="absolute bottom-4 left-4 opacity-10">
                            <Cake className="w-12 h-12 text-pink-500" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                                    Start Planning Your Party
                                </h3>
                                <p className="text-slate-600 text-lg">
                                    Ready to create unforgettable memories? Let's get started.
                                </p>
                            </div>
                            <button className="group relative px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95 overflow-hidden shrink-0">
                                <span className="relative z-10 flex items-center gap-3">
                                    View Gallery
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 h-[60px] md:h-[120px]">
                <svg
                    className="relative block w-[200%] h-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    style={{ marginLeft: '-50%' }}
                >
                    <defs>
                        <linearGradient id="bottomWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f0f7ff" />
                            <stop offset="50%" stopColor="#e6f4ff" />
                            <stop offset="100%" stopColor="#f0f7ff" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        fill="url(#bottomWaveGradient)"
                    />
                </svg>
            </div>

            {/* Styles */}
            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .perspective-1000 { perspective: 1000px; }
                .backface-hidden { 
                    backface-visibility: hidden; 
                    -webkit-backface-visibility: hidden; 
                }
                .static-floater { 
                    animation: gentle-float 4s ease-in-out infinite; 
                    opacity: 0.4; 
                }
                @keyframes gentle-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .touch-manipulation { touch-action: manipulation; }
                @media (prefers-reduced-motion: reduce) {
                    .animate-blob, .static-floater, .wave-path-1, .wave-path-2 {
                        animation: none !important;
                    }
                }
            `}</style>
        </section>
    );
}