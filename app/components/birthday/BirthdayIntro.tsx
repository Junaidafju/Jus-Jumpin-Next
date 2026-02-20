// app/components/birthday-celebration/BirthdayInro.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    Users, Lock, Palette, Utensils, Gamepad2, Camera,
    Sparkles, CalendarCheck, Cake, PartyPopper, Gift, Star, X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: 500, suffix: '+', label: 'Birthday Parties' },
    { number: 10, suffix: 'k+', label: 'Happy Kids' },
    { number: 50, suffix: '+', label: 'Themes' },
    { number: 100, suffix: '%', label: 'Memories' },
];

const features = [
    {
        icon: Users,
        color: 'text-orange-500',
        title: 'For Kids & Adults',
        desc: 'Fun tailored for every age group.',
        image: '/image/birthday/kids-adult.jpg',
        imageAlt: 'Kids and adults celebrating together'
    },
    {
        icon: Lock,
        color: 'text-blue-500',
        title: 'Exclusive Access',
        desc: 'Private party zones just for you.',
        image: '/image/birthday/private-zone.jpg',
        imageAlt: 'Private party zone'
    },
    {
        icon: Palette,
        color: 'text-purple-500',
        title: 'Personalized Themes',
        desc: 'Customize the vibe to match your dream.',
        image: '/image/birthday/themes.jpg',
        imageAlt: 'Themed birthday decoration'
    },
    {
        icon: Utensils,
        color: 'text-pink-500',
        title: 'Delectable Food',
        desc: 'Catering that delights every palate.',
        image: '/image/birthday/food.jpg',
        imageAlt: 'Delicious party food'
    },
    {
        icon: Gamepad2,
        color: 'text-green-500',
        title: 'Fun Games Zone',
        desc: 'Arcade, trampolines, and more.',
        image: '/image/birthday/games.jpg',
        imageAlt: 'Fun games and activities'
    },
    {
        icon: Camera,
        color: 'text-yellow-500',
        title: 'Photo Memories',
        desc: 'Capture moments that last forever.',
        image: '/image/birthday/photos.jpg',
        imageAlt: 'Photo memories'
    },
];

const floatingItems = [
    { Icon: Cake, color: 'text-pink-400', size: 'w-12 h-12 md:w-16 md:h-16', startX: -10, endX: 110, y: '10%', speed: 1, mobileY: '5%' },
    { Icon: PartyPopper, color: 'text-blue-400', size: 'w-10 h-10 md:w-12 md:h-12', startX: 110, endX: -10, y: '25%', speed: 1.2, mobileY: '15%' },
    { Icon: Gift, color: 'text-purple-400', size: 'w-12 h-12 md:w-14 md:h-14', startX: -5, endX: 105, y: '60%', speed: 0.8, mobileY: '45%' },
    { Icon: Star, color: 'text-yellow-400', size: 'w-8 h-8 md:w-10 md:h-10', startX: 105, endX: -5, y: '80%', speed: 1.5, mobileY: '75%' },
    { Icon: Cake, color: 'text-orange-400', size: 'w-16 h-16 md:w-20 md:h-20', startX: -15, endX: 115, y: '45%', speed: 0.9, mobileY: '35%' },
];

export default function BirthdayIntro() {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = useCallback((e: React.MouseEvent, index: number) => {
        if (isMobile) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setActiveCard(index);
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        setActiveCard(null);
    }, []);

    const handleCardClick = useCallback((index: number) => {
        if (isMobile) {
            setActiveCard(activeCard === index ? null : index);
        }
    }, [isMobile, activeCard]);

    useEffect(() => {
        if (!isLoaded) return;

        const ctx = gsap.context(() => {
            if (!prefersReducedMotion) {
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
            }

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

            const statItems = statsRef.current?.querySelectorAll('.stat-item');
            statItems?.forEach((item, index) => {
                const numEl = item.querySelector('.stat-number');
                const target = parseInt(numEl?.getAttribute('data-value') || '0');

                if (!prefersReducedMotion) {
                    gsap.fromTo(item,
                        isMobile ? { y: 20, opacity: 0 } : { scale: 0.8, opacity: 0, y: 20, rotation: -10 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotation: 0,
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: isMobile ? 'power2.out' : 'back.out(1.4)',
                            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
                        }
                    );
                }

                if (!prefersReducedMotion) {
                    gsap.fromTo(numEl,
                        { innerText: 0 },
                        {
                            innerText: target,
                            duration: isMobile ? 1.5 : 2,
                            ease: 'power1.out',
                            snap: { innerText: 1 },
                            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
                        }
                    );
                }
            });

            const cards = cardsRef.current?.querySelectorAll('.feature-card');
            if (!prefersReducedMotion && cards) {
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
            }
            if (!prefersReducedMotion) {
                // Wave 1 movement
                gsap.to(".wave-path-1", {
                    x: "-50%", // Move half the 200% width
                    duration: 20,
                    repeat: -1,
                    ease: "none",
                });

                // Wave 2 movement (Different speed/offset for depth)
                gsap.fromTo(".wave-path-2",
                    { x: "-50%" },
                    {
                        x: "0%",
                        duration: 15,
                        repeat: -1,
                        ease: "none",
                    }
                );

                // Optional: Subtle vertical "bobbing" to make it feel like water
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

    if (!isLoaded) {
        return <div className="min-h-[50vh] bg-gradient-to-b from-orange-50 to-blue-50" />;
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gradient-to-b from-orange-50 via-pink-50/30 to-blue-50 py-0 overflow-hidden min-h-screen"
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

            {/* --- TOP SEPARATOR - ANIMATED OCEAN WAVES --- */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10 h-[60px] md:h-[120px]">
                <svg
                    className="relative block w-[200%] h-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    {/* Wave 1: Back Wave (Inverted to fill bottom) */}
                    <path
                        className="wave-path-1"
                        d="M0,120V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120Z"
                        fill="#FC791B"
                        opacity="0.6"
                    />
                    {/* Wave 2: Front Wave (Inverted to fill bottom) */}
                    <path
                        className="wave-path-2"
                        d="M0,120V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,105,20.34,35.79,11.46,71.15,24,108.37,31.32,49.08,9.66,100.26,9.39,149.12-3.32,14.32-3.72,28.6-8.24,42.71-13.27,65.71-23.44,134.11-51.43,203.2-49.13,31.06,1,61,10.1,86.52,24.11V120Z"
                        fill="#FC791B"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 pt-24 md:pt-32 pb-16 md:pb-20 relative z-20">

                {/* Heading */}
                <div ref={headingRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white shadow-md border-2 border-orange-200 mb-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                        <PartyPopper className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-xs md:text-sm">Why Celebrate With Us</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
                        Why Celebrate at <br className="md:hidden" />
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">Jus Jumpin?</span>
                            <svg className="absolute w-full h-3 md:h-4 -bottom-1 md:-bottom-2 left-0 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </h2>

                    <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium px-2">
                        Turn your birthday into an unforgettable memory!
                        <span className="block mt-2 text-pink-500 font-bold text-sm md:text-base">🎂 Cakes, 🎈 Balloons, and 🎉 Endless Fun!</span>
                    </p>
                </div>

                {/* Stats Section Redesign */}
                <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-20 md:mb-32">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="stat-item group relative perspective-1000"
                        >
                            {/* Background Decorative Blob - Animates on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                            {/* Main Card */}
                            <div className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(252,121,27,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center">

                                {/* Animated Icon Ring */}
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out" />

                                <div className="relative mb-4">
                                    <div className="flex items-baseline justify-center">
                                        <h3
                                            className="stat-number text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
                                            data-value={stat.number}
                                        >
                                            {prefersReducedMotion ? stat.number : 0}
                                        </h3>
                                        <span className="text-2xl md:text-3xl font-black text-orange-500 ml-1">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    {/* Animated Underline */}
                                    <div className="h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full transition-all duration-500 mt-1" />
                                </div>

                                <p className="relative text-slate-500 font-bold text-xs md:text-sm uppercase tracking-[0.2em]">
                                    {stat.label}
                                </p>

                                {/* Floating "Sparkle" Icon */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Grid with Hover Images */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-24 perspective-1000">
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        const isActive = activeCard === idx;

                        return (
                            <div
                                key={idx}
                                className="feature-card group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border-2 border-slate-50 hover:border-orange-200 transition-all duration-300 hover:shadow-xl active:scale-95 touch-manipulation overflow-visible"
                                onMouseMove={(e) => handleMouseMove(e, idx)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleCardClick(idx)}
                            >
                                {/* Hover Image Popup */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                                x: isMobile ? 0 : mousePosition.x - 100,
                                            }}
                                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            className={`absolute z-50 pointer-events-none ${isMobile ? 'left-1/2 -translate-x-1/2 -top-32' : ''}`}
                                            style={!isMobile ? {
                                                left: mousePosition.x,
                                                top: mousePosition.y - 120,
                                                transform: 'translate(-50%, -50%)'
                                            } : {}}
                                        >
                                            <div className="relative w-48 h-32 md:w-56 md:h-40 rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                                                <Image
                                                    src={feature.image}
                                                    alt={feature.imageAlt}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 192px, 224px"
                                                    priority={idx < 3}
                                                />
                                                {isMobile && (
                                                    <button
                                                        className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-md"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveCard(null);
                                                        }}
                                                    >
                                                        <X className="w-4 h-4 text-slate-700" />
                                                    </button>
                                                )}
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Card Content */}
                                <div className="absolute -top-4 left-6 md:-top-6 md:left-8 z-10">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className={`w-6 h-6 md:w-8 md:h-8 ${feature.color}`} />
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-8 relative z-10">
                                    <h4 className="text-lg md:text-xl font-black text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
                                        {feature.title}
                                    </h4>
                                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                        {feature.desc}
                                    </p>

                                    <p className="text-xs text-orange-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {isMobile ? 'Tap to see preview' : 'Hover to preview'}
                                    </p>
                                </div>

                                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Gift className="w-8 h-8 md:w-12 md:h-12" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center relative px-4">
                    <div className="inline-flex flex-col items-center gap-3 md:gap-4">
                        <button className="group relative px-6 py-3 md:px-10 md:py-5 bg-slate-900 text-white rounded-full font-black text-base md:text-xl shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95 active:translate-y-0 overflow-hidden border-2 md:border-4 border-white w-full sm:w-auto">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Book Your Party Now <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 animate-spin-slow" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <div className="flex items-center gap-2 bg-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-md border border-orange-100">
                            <CalendarCheck className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                            <span className="text-slate-600 font-bold text-xs md:text-sm">Limited Weekend Slots!</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
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
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .perspective-1000 { perspective: 1000px; }
        .static-floater { animation: gentle-float 4s ease-in-out infinite; opacity: 0.4; }
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .touch-manipulation { touch-action: manipulation; }
      `}</style>
        </section>
    );
}