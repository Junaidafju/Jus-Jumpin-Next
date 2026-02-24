// components/school-trips/SchoolTripsHero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ArrowRight, School, Users, Shield } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    { icon: School, value: 500, suffix: "+", label: "Schools" },
    { icon: Users, value: 15000, suffix: "+", label: "Students" },
    { icon: Shield, value: 100, suffix: "%", label: "Safety" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const end = value;
                    const duration = 2000;
                    const increment = end / (duration / 16);

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export default function SchoolTripsHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    // Split text for animation
    const headlineWords = ["School", "Trips", "&", "Educational", "Outings"];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-[#0a1628] overflow-hidden flex items-center justify-center pt-24 lg:pt-0"
        >
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1b3a5c] to-[#0a1628]" />
                <motion.div
                    className="absolute w-[800px] h-[800px] rounded-full blur-[120px] bg-[#3080c0]/30"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ top: "10%", left: "20%" }}
                />
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-[#FE5000]/20"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ bottom: "10%", right: "10%" }}
                />
            </div>

            {/* Floating Hero Image - Desktop Only (Hidden on mobile) */}
            <motion.div
                className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block z-20"
                style={{ y, scale }}
            >
                <motion.div
                    className="relative w-[500px] h-[500px]"
                    animate={{
                        y: [0, -20, 0, 20, 0],
                        rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5, 0.75, 1]
                    }}
                >
                    {/* Main Image - No borders, just pure image with shadow */}
                    <Image
                        src="/image/school/school-hero.png"
                        alt="School trip adventures at Jus Jumpin"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        priority
                        style={{
                            filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.4))',
                        }}
                    />

                    {/* Floating emoji badges - with updated text colors */}
                    <motion.div
                        className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 font-bold text-sm whitespace-nowrap"
                        style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <span className="text-[#FE5000] text-base mr-1">🎓</span>
                        <span style={{ color: '#172B44' }}>Learning Fun</span>
                    </motion.div>

                    <motion.div
                        className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 font-bold text-sm whitespace-nowrap"
                        style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                        animate={{ y: [0, 8, 0], rotate: [0, 3, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                    >
                        <span style={{ color: '#172B44' }}>Safe & Secure</span>
                        <span className="text-[#3080c0] text-base ml-1">🛡️</span>
                    </motion.div>

                    {/* Floating stars around the image */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-2xl"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                                x: Math.random() * 200 - 100,
                                y: Math.random() * 200 - 100,
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 4,
                                delay: i * 0.5,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 2,
                            }}
                            style={{
                                left: '50%',
                                top: '50%',
                            }}
                        >
                            ⭐
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left w-full"
                style={{ opacity }}
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">

                    {/* Left Column - Text Content */}
                    <div className="flex-1 w-full">
                        {/* Badge - Now with proper spacing from navbar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
                        >
                            <GraduationCap className="w-5 h-5 text-[#FE5000]" />
                            <span className="text-white font-semibold text-sm">Educational Excellence 🎓</span>
                        </motion.div>

                        {/* Heading with word stagger */}
                        <h1 className="font-['Fredoka_One'] text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight mb-6">
                            {headlineWords.map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.2 + index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className={`inline-block mr-4 ${word === "Educational" ? "text-[#FE5000]" :
                                        word === "Outings" ? "block mt-2" : ""
                                        }`}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        {/* Mobile Hero Image - Appears after H1 on mobile */}
                        <motion.div
                            className="lg:hidden w-full flex justify-center my-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                                <Image
                                    src="/image/school/school-hero.png"
                                    alt="School trip adventures at Jus Jumpin"
                                    width={400}
                                    height={400}
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                    priority
                                />

                                {/* Mobile floating badges */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 font-bold text-xs whitespace-nowrap"
                                    style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-[#FE5000] mr-1">🎓</span>
                                    <span style={{ color: '#172B44' }}>Learning Fun</span>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 font-bold text-xs whitespace-nowrap"
                                    style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                                >
                                    <span style={{ color: '#172B44' }}>Safe & Secure</span>
                                    <span className="text-[#3080c0] ml-1">🛡️</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-['Nunito'] leading-relaxed"
                        >
                            Creating memorable, curriculum-aligned experiences where
                            learning comes alive through active play and discovery.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-[#FE5000] text-white font-bold text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                                style={{ boxShadow: '6px 6px 0 #1b3a5c' }}
                            >
                                View Packages
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border-2 border-white/50 transition-all duration-300"
                            >
                                Request Quote
                            </motion.button>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
                        >
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="text-center group"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className="w-5 h-5 text-[#FE5000]" />
                                            <div className="text-3xl font-['Fredoka_One'] text-[#FE5000]">
                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Right Column - Empty for balance on desktop */}
                    <div className="flex-1 lg:block hidden" />
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div
                        className="w-1 h-2 bg-white/50 rounded-full"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>

            {/* Decorative small dots */}
            <motion.div
                className="absolute top-32 left-1/4 w-2 h-2 bg-[#FE5000] rounded-full z-30"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-40 right-1/3 w-3 h-3 bg-[#3080c0] rounded-full z-30"
                animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
        </section>
    );
}