"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Reveal Animation
        gsap.fromTo(".founder-reveal",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="founder-reveal font-fredoka text-5xl md:text-6xl text-primary-teal mb-16 relative inline-block">
                    Our Founder
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-accent-yellow rounded-full transform translate-y-3"></span>
                </h2>

                <div className="founder-reveal bg-gradient-to-br from-bg-cream to-white p-8 md:p-12 rounded-[40px] shadow-2xl grid md:grid-cols-2 gap-12 items-center">

                    {/* Founder Image Placeholder */}
                    <div className="relative group">
                        <div className="aspect-[3/4] w-full max-w-sm mx-auto bg-gradient-to-br from-teal-light to-primary-teal rounded-[30px] shadow-2xl flex items-center justify-center text-8xl text-white transform group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">

                            {/* Replace with actual image when available */}
                            👨‍💼
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-accent-yellow/20 rounded-[30px] transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                    </div>

                    {/* Founder Content */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-fredoka text-4xl text-primary-teal mb-2">Sumit Bathwal</h3>
                            <p className="text-xl font-bold text-accent-orange">Founder & CEO</p>
                        </div>

                        <p className="text-lg text-text-dark leading-relaxed">
                            Sumit Bathwal is the Founder & CEO of Jus Jumpin, India&apos;s leading indoor trampoline park brand. A
                            serial entrepreneur with a strong background in finance (FCA, CS, CWA), Sumit combines business
                            acumen with creative vision to build high-energy entertainment experiences for families across
                            India.
                        </p>

                        <p className="text-lg text-text-dark leading-relaxed">
                            Previously with KPMG (Taxation), he is an alumnus of St. Xavier&apos;s College, Kolkata. Under Sumit&apos;s
                            leadership, Jus Jumpin has grown from a single location to 25+ parks across India, touching the
                            lives of over 2 million customers.
                        </p>

                        <div className="relative bg-primary-teal text-white p-8 rounded-2xl border-l-8 border-accent-yellow mt-8 italic text-lg leading-relaxed shadow-lg">
                            <span className="absolute -top-6 left-6 text-8xl text-white/20 font-serif leading-none">&quot;</span>
                            Our goal has always been to create more than just entertainment venues - we&apos;re building communities
                            where families create lasting memories while staying active and healthy.
                            <div className="mt-4 not-italic font-bold text-right">- Sumit Bathwal</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FounderSection;
