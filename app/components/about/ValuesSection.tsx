"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        title: "FUN FIRST 🎉",
        desc: "We believe in the power of play — it's how we grow, connect, and truly live."
    },
    {
        title: "SAFETY ALWAYS 🛡️",
        desc: "Every bounce, slide, and smile happens in a space designed with care and safety in mind."
    },
    {
        title: "TOGETHERNESS 🤝",
        desc: "We're all about shared laughter, teamwork, and moments that turn into cherished stories."
    },
    {
        title: "EXCELLENCE IN ENERGY ⚡",
        desc: "We bring passion to every jump, spark creativity in every corner, and deliver top-tier service with a smile."
    },
    {
        title: "INCLUSION & KINDNESS 💙",
        desc: "Everyone is welcome. Respect, kindness, and celebration of individuality are part of every experience here."
    }
];

const ValuesSection = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Section Title Animation
        gsap.fromTo(".values-title",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );

        // Cards Animation
        gsap.fromTo(".value-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: ".values-grid",
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="py-20 px-4 bg-gradient-to-br from-primary-teal to-teal-dark text-white relative overflow-hidden"
        >
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <h2 className="values-title font-fredoka text-5xl md:text-6xl mb-4 relative inline-block">
                    Our Values
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-accent-yellow rounded-full transform translate-y-3"></span>
                </h2>

                <p className="values-title text-xl text-white/90 max-w-3xl mt-8 mb-16 leading-relaxed">
                    Our core values guide everything we do at Jus Jumpin, from park design to customer interactions. These
                    principles shape our culture and ensure we deliver exceptional experiences to every guest.
                </p>

                <div className="values-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {VALUES.map((val, idx) => (
                        <div
                            key={idx}
                            className="value-card bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-white/20 hover:bg-white/15 hover:-translate-y-2 hover:border-accent-yellow transition-all duration-300"
                        >
                            <h4 className="font-fredoka text-2xl text-accent-yellow mb-4">{val.title}</h4>
                            <p className="text-lg leading-relaxed text-white/90">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuesSection;
