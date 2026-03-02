"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import { Sparkles, Clock, Users, Zap, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { Activity } from "./activitiesData";

interface ActivityCardProps {
    activity: Activity;
    index: number;
}

export default function ActivityCard({ activity, index }: ActivityCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, margin: "-20% 0px -20% 0px" });

    // Scroll-based animation
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Entrance animation based on direction
    const getEntranceVariants = (): Variants => {
        const directions = {
            top: { y: -200, x: 0, opacity: 0, scale: 0.8 },
            bottom: { y: 200, x: 0, opacity: 0, scale: 0.8 },
            left: { x: -200, y: 0, opacity: 0, scale: 0.8, rotate: -10 },
            right: { x: 200, y: 0, opacity: 0, scale: 0.8, rotate: 10 },
            center: { scale: 0, opacity: 0, rotate: 5 }
        };

        return {
            hidden: directions[activity.enterDirection],
            visible: {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.05
                }
            },
            exit: {
                y: -300,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 }
            }
        };
    };

    // 3D flip styles
    const flipStyles = {
        perspective: "1000px",
        transformStyle: "preserve-3d" as const,
    };

    const frontBackCommon = {
        backfaceVisibility: "hidden" as const,
        position: "absolute" as const,
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
    };

    return (
        <motion.div
            ref={cardRef}
            initial="hidden"
            animate={isInView ? "visible" : "exit"}
            variants={getEntranceVariants()}
            className="relative w-full aspect-[4/5] cursor-pointer group"
            style={flipStyles}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* 3D Flip Container */}
            <motion.div
                className="relative w-full h-full"
                animate={{
                    rotateY: isFlipped && activity.flipDirection === "horizontal" ? 180 : 0,
                    rotateX: isFlipped && activity.flipDirection === "vertical" ? 180 : 0,
                }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT OF CARD */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
                    style={{
                        ...frontBackCommon,
                        boxShadow: `0 20px 40px -15px ${activity.color}40`,
                        background: activity.bgGradient,
                    }}
                >
                    {/* Image */}
                    <div className="relative h-3/5 w-full overflow-hidden">
                        <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Category badge */}
                        <div
                            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md"
                            style={{ background: activity.color }}
                        >
                            {activity.category}
                        </div>

                        {/* Flip hint */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3
                            className="text-xl md:text-2xl font-black text-white mb-2 leading-tight"
                            style={{ fontFamily: '"Fredoka One", cursive' }}
                        >
                            {activity.shortTitle}
                        </h3>
                        <p className="text-white/80 text-sm line-clamp-2 mb-3">
                            {activity.description}
                        </p>

                        {/* Quick stats */}
                        <div className="flex items-center gap-4 text-white/70 text-xs">
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {activity.ageRange}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {activity.duration}
                            </span>
                        </div>

                        {/* Tap to flip indicator */}
                        <div className="mt-4 flex items-center gap-2 text-white/60 text-xs">
                            <span>Tap to explore</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Decorative corner */}
                    <div
                        className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-20"
                        style={{ background: activity.color }}
                    />
                </div>

                {/* BACK OF CARD */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg"
                    style={{
                        ...frontBackCommon,
                        transform: activity.flipDirection === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)",
                        background: "white",
                        boxShadow: `0 20px 40px -15px ${activity.color}40`,
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                        }}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <div className="h-full flex flex-col p-6">
                        {/* Header */}
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                            style={{ background: activity.bgGradient }}
                        >
                            {activity.category === "trampoline" && "🤸"}
                            {activity.category === "adventure" && "🧗"}
                            {activity.category === "sports" && "⚽"}
                            {activity.category === "games" && "🎮"}
                            {activity.category === "kids" && "🧸"}
                        </div>

                        <h3
                            className="text-xl font-black text-gray-800 mb-3"
                            style={{ fontFamily: '"Fredoka One", cursive', color: activity.color }}
                        >
                            {activity.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                            {activity.fullDescription}
                        </p>

                        {/* Features list */}
                        <div className="mb-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Features</h4>
                            <div className="flex flex-wrap gap-2">
                                {activity.features.slice(0, 3).map((feature, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded-lg text-xs font-medium"
                                        style={{ background: `${activity.color}15`, color: activity.color }}
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-2xl bg-gray-50">
                            <div className="text-center">
                                <Users className="w-4 h-4 mx-auto mb-1" style={{ color: activity.color }} />
                                <span className="text-xs text-gray-600">{activity.ageRange}</span>
                            </div>
                            <div className="text-center">
                                <Clock className="w-4 h-4 mx-auto mb-1" style={{ color: activity.color }} />
                                <span className="text-xs text-gray-600">{activity.duration}</span>
                            </div>
                            <div className="text-center">
                                <Zap className="w-4 h-4 mx-auto mb-1" style={{ color: activity.color }} />
                                <span className="text-xs text-gray-600 capitalize">{activity.intensity}</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                            style={{ background: activity.color }}
                        >
                            Book This Activity
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}