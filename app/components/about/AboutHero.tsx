// components/AboutHero.tsx
"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function AboutHero() {
    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);
    const blob3Ref = useRef(null);
    const sceneRef = useRef(null);

    useGSAP(() => {
        // Floating blobs — slow morphing
        gsap.to(blob1Ref.current, {
            scale: 1.08,
            x: '+=30',
            y: '-=20',
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(blob2Ref.current, {
            scale: 1.12,
            rotation: 8,
            x: '-=40',
            y: '+=25',
            duration: 22,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 3
        });

        gsap.to(blob3Ref.current, {
            scale: 1.06,
            rotation: -6,
            x: '+=25',
            y: '-=15',
            duration: 26,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 6
        });

        // Gentle parallax drift on whole scene
        gsap.to(sceneRef.current, {
            x: '+=60',
            duration: 120,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center">
            {/* Animated background gradient + floating elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-teal-200/70 to-aqua-100/60 z-0">
                {/* Floating animated elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-3xl sm:text-5xl opacity-60"
                            initial={{ y: "100vh", opacity: 0 }}
                            animate={{
                                y: "-20vh",
                                opacity: [0, 0.7, 0],
                                rotate: [0, 15, -15, 0],
                                scale: [0.8, 1.1, 0.9]
                            }}
                            transition={{
                                duration: 18 + (i * 2) % 12,
                                repeat: Infinity,
                                delay: i * 1.8,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: `${(i * 15 + 10) % 90}%`,
                                top: `${(i * 25 + 5) % 80 - 10}%`,
                            }}
                        >
                            {['⭐', '❤️', '🌈', '⚽', '🎈', '✨', '🫧', '🍭'][i % 8]}
                        </motion.div>
                    ))}
                </div>

                {/* Organic morphing blobs */}
                <div ref={sceneRef} className="absolute inset-0">
                    <div
                        ref={blob1Ref}
                        className="absolute w-[90vw] h-[90vw] sm:w-[70vw] sm:h-[70vw] -left-20 -top-40 bg-gradient-to-br from-blue-300/40 to-teal-300/30 rounded-[48%_52%_51%_49%_/_42%_44%_56%_58%] blur-3xl"
                    />
                    <div
                        ref={blob2Ref}
                        className="absolute w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] -right-32 bottom-0 bg-gradient-to-tl from-aqua-400/30 via-teal-200/40 to-blue-200/20 rounded-[39%_61%_47%_53%_/_58%_42%_38%_62%] blur-2xl"
                    />
                    <div
                        ref={blob3Ref}
                        className="absolute w-[100vw] h-[60vw] left-0 bottom-[-15%] bg-gradient-to-r from-sky-200/50 to-transparent rounded-[60%_40%_70%_30%_/_100%_0%_100%_0%] blur-xl"
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

                    {/* LEFT – Text column */}
                    <div className="space-y-8 md:space-y-10 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, staggerChildren: 0.15 }}
                        >
                            <motion.h1
                                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight"
                                style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}
                            >
                                <motion.span
                                    className="text-sky-700 block"
                                    variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    About
                                </motion.span>
                                <motion.span
                                    className="text-orange-500 inline-block"
                                    variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    JUS JUMPIN
                                </motion.span>
                                <motion.span
                                    className="text-sky-700 block"
                                    variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    Adventures
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                className="text-xl sm:text-2xl text-slate-800/90 leading-relaxed font-light pt-6 max-w-prose"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 1 }}
                            >
                                A safe, colorful world where every bounce tells a story, every laugh builds confidence, and every family moment becomes a memory to treasure.
                            </motion.p>

                            <motion.div
                                className="pt-10"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.1, duration: 0.8, type: "spring", stiffness: 120 }}
                            >
                                <motion.button
                                    className="px-12 py-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-2xl md:text-3xl font-bold rounded-full shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 border-4 border-white/30 relative overflow-hidden group"
                                    whileHover={{ scale: 1.08, y: -6 }}
                                    whileTap={{ scale: 0.96 }}
                                    animate={{
                                        boxShadow: [
                                            "0 25px 50px -12px rgb(249 115 22 / 0.4)",
                                            "0 25px 50px -12px rgb(249 115 22 / 0.25)",
                                            "0 25px 50px -12px rgb(249 115 22 / 0.4)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                >
                                    <span className="relative z-10">Discover Our Story</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/20 to-orange-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT – Animated scene placeholder (would contain cartoon characters / trampoline / playground) */}
                    <div className="relative hidden lg:block h-[80vh] perspective-1000">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Placeholder for cartoon playground scene */}
                            {/* You would typically place an animated SVG / Lottie / multiple layered motion.div elements here */}
                            <div className="text-center text-white/80 text-2xl font-light italic">
                                [ Animated cartoon kids jumping, sliding, laughing — layered parallax motion ]
                                <br /><br />
                                Trampoline • Foam pit • Climbing wall • Ball pit
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Animated cloud-wave bottom separator */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none overflow-hidden z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent" />
                <div className="absolute bottom-0 w-[200%] h-full">
                    <svg
                        viewBox="0 0 2880 320"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#f0f9ff" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            fill="url(#cloudGrad)"
                            initial={{ x: "0%" }}
                            animate={{ x: "-50%" }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            d="M0,160L80,186.7C160,213,320,267,480,266.7C640,267,800,213,960,192C1120,171,1280,181,1440,197.3C1600,213,1760,235,1920,224C2080,213,2240,171,2400,165.3C2560,160,2720,192,2880,197.3L2880,320L0,320Z"
                        />
                        <motion.path
                            fill="#ffffff"
                            initial={{ x: "0%" }}
                            animate={{ x: "-50%" }}
                            transition={{ duration: 80, repeat: Infinity, ease: "linear", delay: 5 }}
                            d="M0,224L120,234.7C240,245,480,267,720,245.3C960,224,1200,160,1440,149.3C1680,139,1920,181,2160,197.3C2400,213,2640,203,2880,192L2880,320L0,320Z"
                            opacity="0.7"
                        />
                    </svg>
                </div>
            </div>

            {/* Font import */}
        </section>
    );
}