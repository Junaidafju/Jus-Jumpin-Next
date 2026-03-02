// components/activities/ActivitiesSection.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { activities, Activity, colors } from "./activitiesData";

const ITEMS = activities; // all 15 activities
const COUNT = ITEMS.length;
// How many vh each activity "step" occupies in the scroll canvas.
// Lower = snappier transitions; higher = more breathing room per step.
const VH_PER_STEP = 40;


const GRADIENTS = [
    "linear-gradient(227deg, #1400c7, #00bbff)",
    "linear-gradient(227deg, #28dc28, #00bbff)",
    "linear-gradient(227deg, #1400c7, #b800b1)",
    "linear-gradient(227deg, #b800b1, #f50000)",
    "linear-gradient(227deg, #ff661a, #ffc60b)",
    "linear-gradient(227deg, #f67edd, #8869d2)",
    "linear-gradient(227deg, #00b9e3, #6dc065)",
    "linear-gradient(227deg, #ff3645, #ff5da0)",
    "linear-gradient(227deg, #6dc065, #ffc60b)",
    "linear-gradient(227deg, #00b9e3, #8869d2)",
];

// ─── Left content panel ───────────────────────────────────────────────────────
function ContentPanel({ activity, index, direction }: { activity: Activity; index: number; direction: number }) {
    const words = activity.title.split(" ");
    const gradient = GRADIENTS[index % GRADIENTS.length];

    return (
        <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 lg:px-14"
        >
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <span
                    className="text-4xl lg:text-5xl font-black opacity-10 select-none"
                    style={{ fontFamily: '"Fredoka One", cursive', color: activity.color }}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px opacity-20" style={{ background: activity.color }} />
                <span
                    className="px-3 lg:px-4 py-1 rounded-full text-xs font-bold text-white capitalize"
                    style={{ background: activity.color }}
                >
                    {activity.category}
                </span>
            </div>

            <h2
                className="text-3xl lg:text-5xl xl:text-6xl font-black mb-3 lg:mb-5 leading-tight text-gray-900"
                style={{ fontFamily: '"Fredoka One", cursive' }}
            >
                {words.map((word, i) =>
                    i === words.length - 1 ? (
                        <span key={i} style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            {" "}{word}
                        </span>
                    ) : (
                        <span key={i}> {word}</span>
                    )
                )}
            </h2>

            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-5 lg:mb-7 max-w-md">
                {activity.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm mb-5 lg:mb-7">
                {[
                    { icon: "👶", label: "Age", value: activity.ageRange },
                    { icon: "⏱️", label: "Duration", value: activity.duration },
                    { icon: "⚡", label: "Intensity", value: activity.intensity },
                ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2">
                        <span className="text-xl">{icon}</span>
                        <div>
                            <div className="text-xs text-gray-400">{label}</div>
                            <div className="font-semibold text-gray-700 capitalize">{value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                {activity.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="px-2 lg:px-3 py-1 rounded-xl text-xs font-semibold"
                        style={{ background: `${activity.color}18`, color: activity.color }}>
                        {f}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Right image with curved arc exit ────────────────────────────────────────
function ImageCard({ activity, index, direction }: { activity: Activity; index: number; direction: number }) {
    return (
        <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: direction > 0 ? "70%" : "-70%", x: direction > 0 ? "10%" : "-10%", scale: 0.85, rotate: direction > 0 ? 5 : -5 }}
            animate={{ opacity: 1, y: "0%", x: "0%", scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? "-70%" : "70%", x: direction > 0 ? "-10%" : "10%", scale: 0.82, rotate: direction > 0 ? -6 : 6 }}
            transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl"
            style={{ willChange: "transform, opacity" }}
        >
            <Image src={activity.image} alt={activity.title} fill className="object-cover" sizes="(max-width: 768px) 90vw, 50vw" priority={index < 2} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6 flex items-end justify-between">
                <h3 className="text-white text-lg lg:text-xl font-black" style={{ fontFamily: '"Fredoka One", cursive' }}>
                    {activity.shortTitle}
                </h3>
                <span className="px-2 lg:px-3 py-1 rounded-full text-xs font-bold text-white capitalize" style={{ background: activity.color }}>
                    {activity.intensity}
                </span>
            </div>
        </motion.div>
    );
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressDots({ total, current }: { total: number; current: number }) {
    return (
        <div className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
            {Array.from({ length: total }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ scale: i === current ? 1.5 : 1, opacity: i === current ? 1 : 0.3 }}
                    transition={{ duration: 0.25 }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: i === current ? ITEMS[i].color : "#9CA3AF" }}
                />
            ))}
        </div>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ActivitiesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isActive, setIsActive] = useState(false);

    const handleScroll = useCallback(() => {
        const el = sectionRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const scrolledInto = -rect.top;
        const scrollable = rect.height - window.innerHeight;

        const active = rect.top <= 0 && rect.bottom >= window.innerHeight;
        setIsActive(active);

        if (scrollable <= 0) return;

        const progress = Math.max(0, Math.min(1, scrolledInto / scrollable));
        const next = Math.min(Math.floor(progress * COUNT), COUNT - 1);

        setActiveIndex(prev => {
            if (next !== prev) {
                setDirection(next > prev ? 1 : -1);
                return next;
            }
            return prev;
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const current = ITEMS[activeIndex];

    return (
        <>
            {/* ── Scroll canvas: provides the scrollable height ── */}
            <div
                ref={sectionRef}
                style={{ height: `${COUNT * VH_PER_STEP}vh` }}
                className="relative"
            >
                {/* FIXED panel — stays glued to the viewport while the canvas scrolls */}
                <div
                    className="fixed inset-0 z-10 transition-opacity duration-300"
                    style={{
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                    }}
                >
                    {/* Animated colour blob background */}
                    <div className="absolute inset-0 bg-white -z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                                style={{
                                    background: `
                                        radial-gradient(ellipse at 25% 50%, ${current.color}22 0%, transparent 60%),
                                        radial-gradient(ellipse at 80% 55%, ${current.color}12 0%, transparent 50%)
                                    `,
                                }}
                            />
                        </AnimatePresence>
                        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: colors.pink }} />
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ background: colors.cyan }} />
                    </div>

                    {/* Two-column grid - stacks on mobile, side-by-side on desktop */}
                    <div className="h-full grid grid-cols-1 lg:grid-cols-2 overflow-y-auto lg:overflow-visible">
                        {/* LEFT — text content (full width on mobile) */}
                        <div className="relative overflow-hidden flex items-center min-h-[50vh] lg:min-h-full">
                            <AnimatePresence mode="wait">
                                <ContentPanel
                                    key={current.id}
                                    activity={current}
                                    index={activeIndex}
                                    direction={direction}
                                />
                            </AnimatePresence>
                        </div>

                        {/* RIGHT — image (visible on mobile too) */}
                        <div className="relative flex items-center justify-center p-4 lg:p-10 lg:pr-14 min-h-[40vh] lg:min-h-full">
                            <div className="relative w-full max-w-sm lg:max-w-md aspect-square mx-auto">
                                <AnimatePresence mode="wait">
                                    <ImageCard
                                        key={current.id}
                                        activity={current}
                                        index={activeIndex}
                                        direction={direction}
                                    />
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Progress dots - hidden on mobile */}
                    <div className="hidden lg:block">
                        <ProgressDots total={COUNT} current={activeIndex} />
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-10 flex items-center gap-2 text-xs lg:text-sm text-gray-400">
                        <span className="text-xl lg:text-2xl font-black" style={{ color: current.color, fontFamily: '"Fredoka One", cursive' }}>
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span>/ {String(COUNT).padStart(2, "0")}</span>
                        <span className="ml-2 opacity-30 hidden lg:inline">|</span>
                        <span className="ml-1 capitalize hidden lg:inline">{current.category}</span>
                    </div>

                    {/* Scroll hint - hidden on mobile */}
                    <AnimatePresence>
                        {activeIndex === 0 && isActive && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-8 right-14 flex-col items-center gap-1 text-gray-400 text-xs hidden lg:flex"
                            >
                                <span>Scroll to explore</span>
                                <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile fallback - completely removed since we now show both content and image in the fixed panel */}
        </>
    );
}