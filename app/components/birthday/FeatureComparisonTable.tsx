// app/components/birthday-celebration/FeatureComparisonTable.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Building2,
    Rocket,
    Sparkles,
    Utensils,
    Shield,
    Camera,
    Sofa,
    Frown,
    Brush,
    ShoppingCart,
    Waves,
    Star,
    ArrowRight,
    PartyPopper,
    Crown,
    Ghost,
    CheckCircle2,
    CalendarCheck,
    Gift,
    Cake
} from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
    {
        feature: 'Venue',
        jusIcon: Building2,
        jusText: 'Massive Indoor Play Arena',
        homeIcon: Sofa,
        homeText: 'Boring Living Room',
    },
    {
        feature: 'Activities',
        jusIcon: Rocket,
        jusText: '25+ Attractions & Games',
        homeIcon: Frown,
        homeText: 'You Have to Plan',
    },
    {
        feature: 'Setup & Cleanup',
        jusIcon: Sparkles,
        jusText: 'We Handle Everything',
        homeIcon: Brush,
        homeText: 'DIY Decorations & Mess',
    },
    {
        feature: 'Food & Drinks',
        jusIcon: Utensils,
        jusText: 'Catered Party Menu',
        homeIcon: ShoppingCart,
        homeText: 'You Have to Prepare',
    },
    {
        feature: 'Supervision',
        jusIcon: Shield,
        jusText: 'Professional Party Hosts',
        homeIcon: Brush,
        homeText: 'Constant Parental Supervision',
    },
    {
        feature: 'Memories',
        jusIcon: Camera,
        jusText: 'Photo-Worthy Moments',
        homeIcon: Ghost,
        homeText: 'Wishing You Booked Us',
    },
];

// Character images configuration
const Characters = {
    left: {
        src: '/image/birthday/birthday-boy.png',
        alt: 'Birthday Boy',
        width: 350,
        height: 450,
        offsetY: 0,
        fallback: '🎂',
        delay: 0.2
    },
    right: {
        src: '/image/birthday/party-girl.png',
        alt: 'Party Girl',
        width: 350,
        height: 450,
        offsetY: 0,
        fallback: '🎈',
        delay: 0.4
    },
};
interface FeatureComparisonTableProps {
    onBookNow?: () => void;
}

export default function FeatureComparisonTable({ onBookNow }: FeatureComparisonTableProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const leftCharsRef = useRef<HTMLDivElement>(null);
    const rightCharsRef = useRef<HTMLDivElement>(null);
    const topWaveRef = useRef<HTMLDivElement>(null);
    const bottomWaveRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (alt: string) => {
        setImageErrors(prev => ({ ...prev, [alt]: true }));
    };

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
            setIsLoaded(true);
        };
        checkDevice();

        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkDevice, 150);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const ctx = gsap.context(() => {
            // Heading bounce in
            gsap.fromTo(
                headingRef.current,
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
                }
            );

            // Wave animations
            if (topWaveRef.current && !isMobile) {
                gsap.to(topWaveRef.current, {
                    x: -50,
                    duration: 15,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }

            if (bottomWaveRef.current && !isMobile) {
                gsap.to(bottomWaveRef.current, {
                    x: 50,
                    duration: 18,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }

            // Left characters - 360 rotate entry
            const leftChars = leftCharsRef.current?.querySelectorAll('.cartoon-char');
            leftChars?.forEach((char, i) => {
                const charData = Characters.left;
                if (!charData) return;

                gsap.fromTo(char,
                    { x: -400, rotation: -720, opacity: 0, scale: 0.3 },
                    {
                        x: 0,
                        rotation: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        delay: charData.delay,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: { trigger: tableRef.current, start: 'top 80%', once: true },
                    }
                );

                // Gentle hover bobbing after entry
                gsap.to(char, {
                    y: '+=15',
                    rotation: '+=5',
                    duration: 3 + i * 0.3,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: 2 + i * 0.3,
                });
            });

            // Right characters - 360 rotate entry (opposite direction)
            const rightChars = rightCharsRef.current?.querySelectorAll('.cartoon-char');
            rightChars?.forEach((char, i) => {
                const charData = Characters.right;
                if (!charData) return;

                gsap.fromTo(char,
                    { x: 400, rotation: 720, opacity: 0, scale: 0.3 },
                    {
                        x: 0,
                        rotation: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        delay: charData.delay,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: { trigger: tableRef.current, start: 'top 50%', once: true },
                    }
                );

                // Gentle hover bobbing
                gsap.to(char, {
                    y: '-=15',
                    rotation: '-=5',
                    duration: 3 + i * 0.3,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: 2 + i * 0.3,
                });
            });

            // Table columns elastic reveal
            const columns = tableRef.current?.querySelectorAll('.compare-column');
            if (columns && columns.length > 0) {
                gsap.fromTo(
                    columns,
                    { y: 100, opacity: 0, scale: 0.8 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'elastic.out(1, 0.6)',
                        scrollTrigger: { trigger: tableRef.current, start: 'top 80%', once: true },
                    }
                );
            }

            // CTA section reveal
            gsap.fromTo(
                ctaRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isLoaded, isMobile]);

    if (!isLoaded) {
        return <section className="min-h-[60vh] bg-gradient-to-b from-[#e6f4ff] via-[#667eea] to-[#764ba2]" />;
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-0 overflow-hidden"
        >
            {/* OPTIMIZED TOP SECTION DIVIDER - e6f4ff color with wave animation */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 rotate-180">
                <div ref={topWaveRef} className="relative w-[120%] -left-[10%]">
                    <svg
                        className="block w-full h-[50px] md:h-[80px]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        style={{ transform: 'rotate(180deg)' }}
                    >
                        <defs>
                            <linearGradient id="topWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#e7f4ff" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#e7f4ff" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#e7f4ff" stopOpacity="0.9" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z"
                            fill="url(#topWaveGradient)"
                        />
                    </svg>
                </div>
            </div>

            {/* Main Content Background */}
            <div
                className="relative w-full py-20 md:py-28"
                style={{
                    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                }}
            >
                {/* Floating Background Blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 blur-2xl animate-pulse" />
                    <div className="absolute top-40 right-20 w-40 h-40 bg-pink-300 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-cyan-300 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-300 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                </div>

                {/* LEFT SINGLE LARGER CHARACTER IMAGE */}
                {!isMobile && (
                    <div
                        ref={leftCharsRef}
                        className="absolute left-5 top-280 -translate-y-1/2 z-30 hidden lg:block "
                        style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }}
                    >
                        {!imageErrors[Characters.left.alt] ? (
                            <div
                                className="cartoon-char relative transition-transform hover:scale-110"
                                style={{ width: Characters.left.width, height: Characters.left.height }}
                            >
                                <Image
                                    src={Characters.left.src}
                                    alt={Characters.left.alt}
                                    fill
                                    className="object-contain"
                                    sizes={`${Characters.left.width}px`}
                                    priority
                                    onError={() => handleImageError(Characters.left.alt)}
                                />
                            </div>
                        ) : (
                            <div
                                className="cartoon-char absolute flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl"
                                style={{ width: Characters.left.width, height: Characters.left.height }}
                            >
                                <span className="text-7xl animate-bounce">{Characters.left.fallback}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* RIGHT SINGLE LARGER CHARACTER IMAGE */}
                {!isMobile && (
                    <div
                        ref={rightCharsRef}
                        className="absolute right-5 top-295 -translate-y-1/2 z-30 hidden lg:block"
                        style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }}
                    >
                        {!imageErrors[Characters.right.alt] ? (
                            <div
                                className="cartoon-char relative transition-transform hover:scale-110"
                                style={{ width: Characters.right.width, height: Characters.right.height }}
                            >
                                <Image
                                    src={Characters.right.src}
                                    alt={Characters.right.alt}
                                    fill
                                    className="object-contain"
                                    sizes={`${Characters.right.width}px`}
                                    priority
                                    onError={() => handleImageError(Characters.right.alt)}
                                />
                            </div>
                        ) : (
                            <div
                                className="cartoon-char flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-2xl border-4 border-white"
                                style={{ width: Characters.right.width, height: Characters.right.height }}
                            >
                                <span className="text-7xl animate-bounce">{Characters.right.fallback}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* CONTAINER */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                    {/* Cartoon Heading */}
                    <div ref={headingRef} className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 text-white text-sm font-black tracking-wider mb-6 uppercase transform -rotate-2 hover:rotate-0 transition-transform">
                            <Crown className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                            Why We&apos;re Better
                            <PartyPopper className="w-5 h-5 text-pink-300 animate-bounce" />
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg">
                            <span className="block transform -rotate-1">A Hassle-Free,</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 transform rotate-1">
                                Action-Packed Party!
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-white/90 mt-6 font-bold bg-white/10 inline-block px-6 py-3 rounded-full backdrop-blur-sm border-2 border-white/20">
                            See why families choose us over hosting at home 🎪
                        </p>

                        {/* Decorative floating emojis */}
                        <div className="flex justify-center gap-4 mt-4 text-2xl opacity-50">
                            <span className="animate-bounce">🎈</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎂</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>✨</span>
                        </div>
                    </div>

                    {/* DESKTOP - Skewed Table with Logo */}
                    <div
                        ref={tableRef}
                        className="hidden md:block relative max-w-6xl mx-auto"
                    >
                        {/* Decorative connectors */}
                        <div className="absolute -top-8 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
                        <div className="absolute -top-6 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        <div className="absolute -bottom-4 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />

                        <div className="flex justify-center items-stretch relative" style={{ minHeight: '680px' }}>

                            {/* Feature Column */}
                            <div className="compare-column feature-column w-1/4 flex flex-col bg-gradient-to-b from-green-100 to-green-50 rounded-l-3xl border-4 border-green-400 border-r-0 overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 text-center min-h-[150px] flex flex-col items-center justify-center border-b-4 border-green-400">
                                    <Star className="w-8 h-8 text-yellow-300 mb-2 animate-spin-slow" />
                                    <span className="text-xl font-black uppercase tracking-wider drop-shadow-md">Feature</span>
                                </div>
                                {comparisonData.map((row, idx) => (
                                    <div
                                        key={idx}
                                        className="flex-1 flex items-center justify-center p-5 border-b-4 border-green-200/50 last:border-b-0 hover:bg-green-200/30 transition-all group"
                                    >
                                        <span className="text-green-800 font-black text-lg text-center group-hover:scale-110 transition-transform">
                                            {row.feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Jus Jumpin Column - SKEWED with LOGO */}
                            <div className="compare-column jj-column w-2/5 relative z-20 mx-[-15px]">
                                {/* Skewed Background */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-orange-100 via-white to-orange-50 border-[5px] border-[#FF6B35] rounded-3xl shadow-2xl overflow-hidden"
                                    style={{
                                        transform: 'skewY(-4deg)',
                                        boxShadow: '0 25px 50px rgba(255, 107, 53, 0.4), inset 0 0 60px rgba(255, 200, 150, 0.3)',
                                        top: '-40px',
                                        bottom: '-40px',
                                    }}
                                >
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: 'radial-gradient(#FF6B35 2px, transparent 2px)',
                                        backgroundSize: '20px 20px',
                                    }} />
                                </div>

                                {/* Content - Counter-skewed */}
                                <div
                                    className="relative z-10 flex flex-col h-full"
                                    style={{ transform: 'skewY(4deg)' }}
                                >
                                    {/* LOGO Header */}
                                    <div className="p-6 flex flex-col items-center justify-center min-h-[150px]" style={{ transform: 'skewY(-4deg)' }}>
                                        <div className="relative">
                                            <Crown className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 text-yellow-400 drop-shadow-lg animate-bounce" />
                                            <div className="bg-white rounded-2xl p-3 shadow-xl border-4 border-[#FF6B35] hover:scale-105 transition-transform">
                                                <div className="relative w-44 h-16">
                                                    <Image
                                                        src="/image/Jus-Jumpin-Logo.webp"
                                                        alt="Jus Jumpin Logo"
                                                        fill
                                                        className="object-contain"
                                                        sizes="176px"
                                                        priority
                                                    />
                                                </div>
                                            </div>
                                            <Sparkles className="absolute -right-8 top-0 w-8 h-8 text-yellow-300 animate-pulse" />
                                            <Star className="absolute -left-8 bottom-0 w-6 h-6 text-pink-400 animate-pulse" />
                                        </div>
                                    </div>

                                    {comparisonData.map((row, idx) => {
                                        const Icon = row.jusIcon;
                                        return (
                                            <div
                                                key={idx}
                                                className="flex-1 flex items-center gap-4 p-5 px-8 hover:scale-105 transition-all duration-300 group"
                                                style={{ transform: 'skewY(-4deg)' }}
                                            >
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-green-800 font-bold">
                                                    {row.jusText}
                                                </span>
                                                <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">🎉</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Home Column */}
                            <div className="compare-column home-column w-1/4 flex flex-col bg-gradient-to-b from-gray-100 to-gray-50 rounded-r-3xl border-4 border-gray-300 border-l-0 overflow-hidden shadow-xl opacity-80 hover:opacity-100 transition-opacity">
                                <div className="bg-gradient-to-br from-gray-400 to-gray-500 text-white p-6 text-center min-h-[150px] flex flex-col items-center justify-center border-b-4 border-gray-300 rounded-tr-2xl">
                                    <Frown className="w-8 h-8 text-gray-200 mb-2 animate-bounce" />
                                    <span className="text-xl font-black uppercase tracking-wider">Party at Home</span>
                                </div>
                                {comparisonData.map((row, idx) => {
                                    const Icon = row.homeIcon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex-1 flex items-center gap-3 p-5 border-b-4 border-gray-200/50 last:border-b-0 hover:bg-gray-200/30 transition-all group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center group-hover:scale-90 transition-transform">
                                                <Icon className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <span className="text-gray-500 font-medium text-sm leading-snug line-through decoration-gray-400">
                                                {row.homeText}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Winner Badge */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-black py-2 px-6 rounded-full text-lg shadow-xl border-4 border-white animate-bounce">
                            🏆 Jus Jumpin Wins! 🏆
                        </div>
                    </div>

                    {/* MOBILE - Cards */}
                    <div className="md:hidden space-y-4 max-w-lg mx-auto">
                        {comparisonData.map((row, idx) => {
                            const JusIcon = row.jusIcon;
                            const HomeIcon = row.homeIcon;

                            return (
                                <div
                                    key={idx}
                                    className="compare-column bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-[#FF6B35]/30 hover:scale-105 transition-transform"
                                >
                                    <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white p-3 flex items-center justify-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-200 fill-yellow-200" />
                                        <span className="font-black uppercase tracking-wider text-sm">{row.feature}</span>
                                        <Star className="w-5 h-5 text-yellow-200 fill-yellow-200" />
                                    </div>
                                    <div className="grid grid-cols-2 divide-x-2 divide-orange-100">
                                        <div className="p-4 bg-gradient-to-b from-green-50 to-white">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-md">
                                                    <JusIcon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-xs font-black text-green-600 uppercase">Jus Jumpin</span>
                                            </div>
                                            <p className="text-green-800 font-bold text-sm leading-tight">{row.jusText}</p>
                                        </div>
                                        <div className="p-4 bg-gradient-to-b from-gray-50 to-white opacity-70">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <HomeIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <span className="text-xs font-black text-gray-400 uppercase">Home</span>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-tight line-through">{row.homeText}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Mobile Logo */}
                        <div className="bg-white rounded-2xl p-4 text-center shadow-xl border-4 border-[#FF6B35] mt-6">
                            <div className="relative w-36 h-14 mx-auto">
                                <Image
                                    src="/image/Jus-Jumpin-Logo.webp"
                                    alt="Jus Jumpin Logo"
                                    fill
                                    className="object-contain"
                                    sizes="144px"
                                />
                            </div>
                            <p className="text-[#FF6B35] font-bold text-sm mt-2">The Ultimate Winner! 🏆</p>
                        </div>
                    </div>

                </div>

                {/* OPTIMIZED CTA SECTION */}
                <div
                    ref={ctaRef}
                    className="w-full mt-16 md:mt-24 py-16 md:py-20 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FFA94D 100%)',
                    }}
                >
                    {/* CTA Background Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(white 2px, transparent 2px)',
                        backgroundSize: '30px 30px',
                    }} />

                    {/* Floating decorations */}
                    <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-300/30 rounded-full blur-lg animate-bounce" />
                    <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-pink-300/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '0.5s' }} />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <PartyPopper className="w-8 h-8 text-white animate-bounce" />
                                <Cake className="w-8 h-8 text-yellow-200 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <Gift className="w-8 h-8 text-pink-200 animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>

                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-lg">
                                Ready to Party?
                            </h3>

                            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
                                Don&apos;t settle for boring! Book your ultimate birthday celebration at Jus Jumpin and create memories that last forever! 🎂🎈
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={onBookNow}
                                    className="group relative px-10 py-5 bg-white text-[#FE5000] rounded-full font-black text-xl shadow-2xl hover:shadow-orange-200 transition-all duration-300 hover:-translate-y-2 hover:scale-105 active:translate-y-0 active:scale-95 overflow-hidden border-4 border-white"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Book Birthday at Jus Jumpin
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/90">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-bold text-sm">Instant Confirmation</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-bold text-sm">Free Cancellation</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-bold text-sm">Best Price Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OPTIMIZED BOTTOM SECTION DIVIDER - e6f4ff color with wave animation */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
                <div ref={bottomWaveRef} className="relative w-[120%] -left-[10%]">
                    <svg
                        className="block w-full h-[50px] md:h-[80px]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="bottomWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#e6f4ff" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#b8d9ff" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#e6f4ff" stopOpacity="0.9" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            fill="url(#bottomWaveGradient)"
                        />
                    </svg>
                </div>
            </div>

            {/* Global Styles */}
            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-wave-slow, .animate-spin-slow, .animate-bounce, .animate-pulse {
                        animation: none !important;
                    }
                }
            `}</style>
        </section>
    );
}