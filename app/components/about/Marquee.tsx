"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Marquee = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const hashtags = [
        '#JusJumpin', '#FeelYoung', '#WowZone', '#JumpHigher', '#StayActive',
        '#JusJumpin', '#FeelYoung', '#WowZone', '#JumpHigher', '#StayActive'
    ];

    useGSAP(() => {
        if (contentRef.current && containerRef.current) {
            const contentWidth = contentRef.current.offsetWidth;

            // Create a seamless loop
            gsap.to(contentRef.current, {
                x: -contentWidth / 2, // Move by half since we duplicate content
                duration: 20,
                repeat: -1,
                ease: "none",
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % (contentWidth / 2))
                }
            });
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-accent-orange py-6 overflow-hidden relative z-20">
            <div ref={contentRef} className="flex gap-10 whitespace-nowrap w-max px-4">
                {/* Render sufficient copies for smooth loop on large screens */}
                {[...hashtags, ...hashtags, ...hashtags].map((tag, i) => (
                    <span key={i} className="font-fredoka text-2xl md:text-3xl font-semibold text-white drop-shadow-md">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
