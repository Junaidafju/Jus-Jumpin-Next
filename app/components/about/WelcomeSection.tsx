"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const OurStorySection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Text reveal on scroll
        gsap.utils.toArray('.reveal-on-scroll').forEach((el: any, i: number) => {
            gsap.fromTo(
                el,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 82%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Timeline dots & lines animation
        if (timelineRef.current) {
            const dots = timelineRef.current.querySelectorAll('.timeline-dot');
            const lines = timelineRef.current.querySelectorAll('.timeline-line');

            gsap.timeline({
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 70%",
                    end: "bottom 20%",
                    scrub: 0.6,
                }
            })
                .from(dots, {
                    scale: 0,
                    stagger: 0.4,
                    duration: 1.2,
                    ease: "back.out(1.4)",
                }, 0)
                .from(lines, {
                    scaleX: 0,
                    transformOrigin: "left center",
                    stagger: 0.4,
                    duration: 1.5,
                    ease: "power2.inOut",
                }, 0.3);
        }

        // Gentle floating background blobs
        gsap.to(".story-blob", {
            y: "-=25",
            rotation: 6,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 3,
        });

    }, { scope: sectionRef });

    const timelineEvents = [
        { year: "2017", text: "Jus Jumpin begins with our first flagship park in a major metro mall" },
        { year: "2019", text: "Rapid expansion — 8 new locations opened across 5 states" },
        { year: "2021", text: "Introduced toddler zones & premium birthday party packages" },
        { year: "2023", text: "Crossed 1.5 million happy jumpers & launched safety-first app" },
        { year: "2025", text: "25+ parks nationwide — becoming India’s favourite family bounce destination" },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50/40"
        >
            {/* Decorative floating blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="story-blob absolute top-[12%] left-[8%] w-64 h-64 bg-teal-200/30 rounded-full blur-3xl" />
                <div className="story-blob absolute top-[55%] right-[12%] w-96 h-96 bg-yellow-200/20 rounded-[60%_40%_55%_45%] blur-3xl" />
                <div className="story-blob absolute bottom-[18%] left-[18%] w-80 h-80 bg-orange-200/25 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                {/* Section Heading */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="font-fredoka text-5xl sm:text-6xl lg:text-7xl text-teal-700 mb-6 inline-block relative"
                    >
                        Our Bouncy Journey
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></span>
                    </motion.h2>
                </div>

                {/* Main story text */}
                <div className="space-y-10 md:space-y-14 text-lg md:text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto mb-20">
                    <p className="reveal-on-scroll">
                        It all started with a simple idea in 2017: create a place where kids could be kids — free to jump, laugh, flip, and play without limits, and where parents could relax knowing their children were safe and having the time of their lives.
                    </p>

                    <p className="reveal-on-scroll">
                        From one vibrant trampoline park in a bustling mall, Jus Jumpin has grown into India’s most loved indoor adventure brand — now with 25+ locations across the country. Every new park is thoughtfully designed with the latest international safety standards, age-appropriate zones, and joyful themes that spark imagination.
                    </p>

                    <p className="reveal-on-scroll font-medium text-teal-700 text-xl md:text-2xl italic">
                        We don’t just build trampoline parks. We build childhood memories — one giant bounce at a time.
                    </p>
                </div>

                {/* Horizontal Timeline */}
                <div ref={timelineRef} className="relative py-16 md:py-20">
                    {/* Desktop timeline line */}
                    <div className="hidden md:block absolute top-24 left-0 right-0 h-2 bg-teal-100 rounded-full overflow-hidden">
                        <div className="timeline-line h-full w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-yellow-300 origin-left"></div>
                    </div>

                    {/* Timeline items */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative">
                        {timelineEvents.map((event, idx) => (
                            <div
                                key={event.year}
                                className="relative flex flex-col items-center text-center md:pt-20 group"
                            >
                                {/* Year circle */}
                                <div className="timeline-dot relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-8 border-teal-400 shadow-xl flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                                    <span className="font-fredoka text-3xl md:text-4xl font-bold text-teal-700">
                                        {event.year}
                                    </span>
                                </div>

                                {/* Connecting line (mobile only) */}
                                {idx < timelineEvents.length - 1 && (
                                    <div className="md:hidden w-1 h-16 bg-teal-200 my-4 rounded-full timeline-line origin-top"></div>
                                )}

                                <p className="mt-6 text-base md:text-lg font-medium text-slate-700 max-w-xs">
                                    {event.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Soft cloud-wave bottom transition */}
            <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 pointer-events-none overflow-hidden z-0">
                <svg
                    viewBox="0 0 2880 320"
                    className="absolute bottom-0 w-full"
                    preserveAspectRatio="none"
                    fill="white"
                >
                    <path
                        fillOpacity="0.85"
                        d="M0,224L80,197.3C160,171,320,117,480,122.7C640,128,800,192,960,213.3C1120,235,1280,213,1440,197.3C1600,181,1760,171,1920,186.7C2080,203,2240,245,2400,245.3C2560,245,2720,203,2880,197.3L2880,320L0,320Z"
                    />
                </svg>
            </div>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap');

        .font-fredoka {
          font-family: 'Fredoka', system-ui, sans-serif;
        }
      `}</style>
        </section>
    );
};

export default OurStorySection;