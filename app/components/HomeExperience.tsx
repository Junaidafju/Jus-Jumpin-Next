// app/components/HomeExperience.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ImageSequence from "./ImageSequence";
gsap.registerPlugin(ScrollTrigger);

export default function HomeExperience() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLHeadingElement>(null);
    const paragraph1Ref = useRef<HTMLParagraphElement>(null);
    const paragraph2Ref = useRef<HTMLParagraphElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate elements on scroll
        gsap.fromTo(
            headingRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1,
                }
            }
        );

        gsap.fromTo(
            subheadingRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: subheadingRef.current,
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1,
                }
            }
        );

        // Paragraph animations with staggered effect
        const paragraphs = [paragraph1Ref.current, paragraph2Ref.current];
        gsap.fromTo(
            paragraphs,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: paragraph1Ref.current,
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1,
                }
            }
        );

        // Quote animation with emphasis
        gsap.fromTo(
            quoteRef.current,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: quoteRef.current,
                    start: "top 85%",
                    end: "top 60%",
                    scrub: 1,
                }
            }
        );

        // CTA button animation with bounce
        gsap.fromTo(
            ctaRef.current,
            { y: 20, opacity: 0, scale: 0.8 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 90%",
                    end: "top 70%",
                    scrub: 1,
                },
                onComplete: () => {
                    // Add hover animation
                    if (ctaRef.current) {
                        ctaRef.current.addEventListener("mouseenter", () => {
                            gsap.to(ctaRef.current, {
                                scale: 1.05,
                                duration: 0.3,
                                ease: "power2.out",
                            });
                        });
                        ctaRef.current.addEventListener("mouseleave", () => {
                            gsap.to(ctaRef.current, {
                                scale: 1,
                                duration: 0.3,
                                ease: "power2.out",
                            });
                        });
                    }
                }
            }
        );

        // Image/illustration animation
        gsap.fromTo(
            imageRef.current,
            { x: -100, opacity: 0, rotateY: -20 },
            {
                x: 0,
                opacity: 1,
                rotateY: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1,
                }
            }
        );

        // Floating animation for decorative elements
        const floatingElements = gsap.utils.toArray(".floating-element");
        floatingElements.forEach((el: any, i) => {
            gsap.to(el, {
                y: i % 2 === 0 ? -10 : 10,
                duration: 2 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2,
            });
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden px-4 py-20 md:py-32"
        >
            {/* Background with teal green gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10"></div>

                {/* Decorative floating elements */}
                <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-teal-300/20 rounded-full blur-xl"></div>
                <div className="floating-element absolute bottom-20 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl"></div>
                <div className="floating-element absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-300/20 rounded-full blur-xl"></div>

                {/* Geometric pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTIgMS0zIDMtMyAxNyAwIDI0IDExIDI0IDI5IDAgMi0xIDMtMyAzLTE3IDAtMjQtMTEtMjQtMjl6IiBzdHJva2U9IiMwMEZGRkYiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')]"></div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1
                                ref={headingRef}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                            >
                                India's Most Exciting Trampoline Experience
                            </h1>

                            <h2
                                ref={subheadingRef}
                                className="text-xl md:text-2xl font-semibold text-teal-700"
                            >
                                Where Fun, Fitness, and Family Come Together
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-700">
                            <p
                                ref={paragraph1Ref}
                                className="text-lg md:text-xl leading-relaxed"
                            >
                                Since 2017, Jus Jumpin has reimagined playtime with vibrant parks across India. We're committed to safety, cleanliness, and high-energy experiences that spark joy for every age.
                            </p>

                            <p
                                ref={paragraph2Ref}
                                className="text-lg md:text-xl leading-relaxed"
                            >
                                At Jus Jumpin, every bounce takes you higher — into fun, freedom, and pure joy. With over 15 rides and gaming activities, we continue to offer a perfect day out destination where memories are brewed and stress goes out of the window.
                            </p>
                        </div>

                        {/* Quote Section */}
                        <div
                            ref={quoteRef}
                            className="relative bg-gradient-to-r from-teal-500 to-emerald-600 p-6 md:p-8 rounded-2xl shadow-2xl"
                        >
                            <div className="absolute -top-4 left-8 bg-white text-teal-600 px-4 py-1 rounded-full text-sm font-bold">
                                ✨ LIMITED SLOTS
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                "Reserve your slot today and bounce into endless excitement!"
                            </p>
                            <div className="absolute -bottom-3 right-8 text-white text-5xl">🎯</div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <a
                                ref={ctaRef}
                                href="/booking" // Update with your actual booking page
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-700 rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
                            >
                                <span className="mr-3">🎫</span>
                                Book Ticket Now
                                <span className="ml-3 animate-pulse">→</span>
                            </a>
                            <p className="mt-3 text-sm text-gray-600">
                                🏆 Over 50,000+ happy jumpers • ⭐ 4.8/5 Rating • 🔒 Safe & Secure Booking
                            </p>
                        </div>
                    </div>

                    {/* Image/Illustration Section */}
                    <div ref={imageRef} className="relative">
                        <div className="relative">
                            {/* Image Sequence Component */}
                            <ImageSequence />

                            {/* Stats badges positioned around the image sequence */}
                            {/* Top Left Badge - 1rem up, 1rem left */}
                            <div className="absolute -top-4 -left-4 hidden lg:block">
                                <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFD166] text-white p-4 rounded-2xl shadow-xl transform rotate-3 animate-float-badge">
                                    <div className="text-2xl font-bold">25+</div>
                                    <div className="text-sm font-semibold">Activities</div>
                                </div>
                            </div>

                            {/* Top Right Badge - 4rems down from top (inside container) */}
                            <div className="absolute -top-10 -right-4 hidden lg:block">
                                <div className="bg-gradient-to-r from-[#00B2FF] to-[#9D4EDD] text-white p-4 rounded-2xl shadow-xl transform -rotate-3 animate-float-badge" style={{ animationDelay: '0.5s' }}>
                                    <div className="text-2xl font-bold">2M+</div>
                                    <div className="text-sm font-semibold">Happy Jumpers</div>
                                </div>
                            </div>

                            {/* Bottom Right Badge - 1rem up from bottom */}
                            <div className="absolute bottom-24 -right-4 hidden lg:block">
                                <div className="bg-gradient-to-r from-[#06D6A0] to-[#00B2FF] text-white p-4 rounded-2xl shadow-xl transform rotate-3 animate-float-badge" style={{ animationDelay: '1s' }}>
                                    <div className="text-2xl font-bold">2017</div>
                                    <div className="text-sm font-semibold">Founded</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </section>
    );
}