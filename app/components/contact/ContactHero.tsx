'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mesh gradient background SVG
const MeshBg = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
                <radialGradient id="g1" cx="20%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="g2" cx="80%" cy="70%" r="55%">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="g3" cx="55%" cy="10%" r="50%">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="g4" cx="10%" cy="85%" r="45%">
                    <stop offset="0%" stopColor="#15803d" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g1)" />
            <rect width="100%" height="100%" fill="url(#g2)" />
            <rect width="100%" height="100%" fill="url(#g3)" />
            <rect width="100%" height="100%" fill="url(#g4)" />
        </svg>
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
        }} />
    </div>
);

export function ContactHero() {
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-float');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative min-h-[80vh] overflow-visible" style={{
            background: 'linear-gradient(135deg,#052e16 0%,#14532d 35%,#166534 60%,#15803d 100%)',
        }}>
            <MeshBg />

            {/* Decorative circles */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full" style={{ background: 'rgba(74,222,128,0.07)' }} />
            <div className="absolute bottom-10 right-[5%] w-48 h-48 rounded-full" style={{ background: 'rgba(34,197,94,0.08)' }} />
            <div className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full" style={{ background: 'rgba(74,222,128,0.1)' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-full px-4 py-2 text-xs sm:text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            📍 We'd Love to Hear from You
                        </span>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                            <span className="text-white">Let's </span>
                            <span className="bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
                                Connect
                            </span>
                            <span className="text-white"> &amp; Jump Together!</span>
                        </h1>

                        <p className="text-green-200 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8">
                            Reach out for bookings, birthday bashes, corporate events, or just a friendly chat.
                            We're open daily and ready to make your experience extraordinary.
                        </p>

                        {/* Quick stat pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                            {[
                                { label: 'Open Daily', value: '10AM–9PM' },
                                { label: 'Response', value: '< 24 hrs' },
                                { label: 'Locations', value: 'Pan India' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-center"
                                >
                                    <div className="font-display font-bold text-green-300 text-lg">{stat.value}</div>
                                    <div className="text-green-200/80 text-xs uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link
                                href="/book"
                                className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    📞 Book Now
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </Link>
                            <Link
                                href="/locations"
                                className="group bg-white/10 backdrop-blur-sm border-2 border-green-400/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    📍 Find Location
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Image - No Background */}
                    <div ref={imageRef} className="flex-1 relative flex justify-center items-end">
                        {/* Glow effect behind image */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-green-400/20 to-green-600/20 blur-3xl" />

                        <div className="relative z-10 w-full max-w-md lg:max-w-lg">
                            <Image
                                src="/image/kids-Conthero.svg"
                                alt="Jus Jumpin trampoline fun"
                                width={500}
                                height={500}
                                className="w-full h-auto object-contain drop-shadow-2xl"
                                priority
                                onError={(e) => {
                                    // Fallback image if the custom image doesn't exist
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://www.jusjumpin.com/wp-content/themes/newjusjumpin/assets/img/kids-Conthero.svg';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Visit CTA - Overlapping Card */}
            <QuickVisitCTA />
        </section>
    );
}

// QuickVisitCTA Component - Overlaps the hero section
function QuickVisitCTA() {
    return (
        <div className="absolute -bottom-16 left-0 right-0 z-20 flex justify-center px-4">
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-4xl w-full border border-green-200/50 backdrop-blur-sm">
                {/* Call Us */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-2xl">
                        📞
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-green-600 uppercase tracking-wider">Call Us Now</div>
                        <a href="tel:+919830359999" className="font-display font-bold text-gray-800 text-lg hover:text-green-600 transition">
                            +91 98303 59999
                        </a>
                    </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-green-200" />

                {/* Visit Us */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-2xl">
                        📍
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-green-600 uppercase tracking-wider">Visit Us</div>
                        <div className="font-display font-bold text-gray-800">Newtown, Rajarhat</div>
                    </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-green-200" />

                {/* Hours */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-2xl">
                        ⏰
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-green-600 uppercase tracking-wider">Hours</div>
                        <div className="font-display font-bold text-gray-800">10 AM – 9 PM Daily</div>
                    </div>
                </div>

                {/* CTA Button */}
                <Link
                    href="tel:+919830359999"
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-display font-bold text-sm hover:shadow-lg hover:shadow-green-600/30 transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                    Book a Session →
                </Link>
            </div>
        </div>
    );
}