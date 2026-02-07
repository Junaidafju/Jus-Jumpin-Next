"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.mv-card');

        gsap.fromTo(cards,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

                {/* Mission Card */}
                <div className="mv-card bg-white p-10 rounded-[30px] shadow-2xl border-l-[8px] border-accent-orange hover:translate-x-2 transition-transform duration-300">
                    <div className="text-6xl mb-6">🎯</div>
                    <h3 className="font-fredoka text-4xl text-primary-teal mb-4">Our Mission</h3>
                    <p className="text-xl text-text-dark leading-relaxed">
                        To create joyful, safe, and high-energy experiences that bring families and friends together through
                        active play, laughter, and unforgettable memories.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="mv-card bg-white p-10 rounded-[30px] shadow-2xl border-l-[8px] border-accent-yellow hover:translate-x-2 transition-transform duration-300">
                    <div className="text-6xl mb-6">🌟</div>
                    <h3 className="font-fredoka text-4xl text-primary-teal mb-4">Our Vision</h3>
                    <p className="text-xl text-text-dark leading-relaxed">
                        To be the happiest place in every city – where imaginations soar, bodies move and hearts smile.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default MissionVision;
