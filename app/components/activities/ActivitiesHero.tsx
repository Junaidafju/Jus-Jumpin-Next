// components/activities/ActivitiesHero.tsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowDown, Play } from "lucide-react";
import Image from "next/image";
import { colors } from "./activitiesData";

interface ActivitiesHeroProps {
    onExploreClick?: () => void;
}

export default function ActivitiesHero({ onExploreClick }: ActivitiesHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const floatingEmojis = [
        { emoji: "🤸", x: "10%", y: "20%", delay: 0 },
        { emoji: "🎯", x: "85%", y: "15%", delay: 0.5 },
        { emoji: "🎪", x: "15%", y: "70%", delay: 1 },
        { emoji: "🏀", x: "80%", y: "65%", delay: 1.5 },
        { emoji: "🧗", x: "5%", y: "45%", delay: 2 },
        { emoji: "🎮", x: "90%", y: "40%", delay: 2.5 },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#fff8f5] to-white"
        >
            {/* Animated background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${colors.pink} 0%, transparent 70%)`,
                        top: '10%',
                        left: '-10%',
                        y: useTransform(scrollYProgress, [0, 1], [0, -100])
                    }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${colors.cyan} 0%, transparent 70%)`,
                        top: '40%',
                        right: '-5%',
                        y: useTransform(scrollYProgress, [0, 1], [0, 100])
                    }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
                    style={{
                        background: `radial-gradient(circle, ${colors.yellow} 0%, transparent 70%)`,
                        bottom: '10%',
                        left: '30%'
                    }}
                />
            </div>

            {/* Floating emojis */}
            {floatingEmojis.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute text-4xl md:text-5xl opacity-10 pointer-events-none"
                    style={{ left: item.x, top: item.y }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 5,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {item.emoji}
                </motion.div>
            ))}

            {/* Main content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-6xl mx-auto px-6 text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm mb-8 shadow-lg"
                    style={{
                        background: `linear-gradient(90deg, ${colors.orange}, ${colors.pink}, ${colors.purple})`
                    }}
                >
                    <Sparkles className="w-4 h-4" />
                    25+ Amazing Activities
                    <motion.span
                        animate={{ rotate: [0, 20, -20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ✨
                    </motion.span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                    style={{ fontFamily: '"Fredoka One", cursive' }}
                >
                    <span className="text-gray-900">A Universe Of </span>
                    <br />
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: `linear-gradient(135deg, ${colors.pink}, ${colors.purple}, ${colors.cyan}, ${colors.green})`
                        }}
                    >
                        Adventures
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto"
                >
                    Discover <span className="font-bold text-[#ff661a]">25+ Exciting Activities</span> for All Ages
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-lg text-gray-500 max-w-2xl mx-auto mb-10"
                >
                    From thrilling trampolines to interactive games, explore endless fun at India's premier indoor entertainment destination!
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.a
                        href="#activities"
                        onClick={(e) => {
                            if (onExploreClick) {
                                e.preventDefault();
                                onExploreClick();
                            }
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-[#ff661a] to-[#ffc60b] text-white font-bold text-lg rounded-full shadow-xl flex items-center gap-2"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        Explore Activities
                        <ArrowDown className="w-5 h-5 animate-bounce" />
                    </motion.a>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-gray-800 font-bold text-lg rounded-full shadow-lg border-2 border-gray-200 hover:border-[#ff661a] transition-colors flex items-center gap-2"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        <Play className="w-5 h-5 text-[#ff661a]" fill="currentColor" />
                        Watch Video
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-wrap items-center justify-center gap-8 mt-16"
                >
                    {[
                        { icon: "🎪", value: "25+", label: "Activities" },
                        { icon: "👨‍👩‍👧‍👦", value: "All Ages", label: "Welcome" },
                        { icon: "🏆", value: "#1", label: "In India" },
                        { icon: "⭐", value: "4.9", label: "Rating" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl mb-1">{stat.icon}</div>
                            <div className="text-2xl font-black text-gray-800" style={{ fontFamily: '"Fredoka One", cursive' }}>{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
            >
                <span className="text-sm">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown className="w-6 h-6" />
                </motion.div>
            </motion.div>
        </section>
    );
}




