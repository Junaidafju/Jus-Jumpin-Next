'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CTASection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.fromTo(containerRef.current.children,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: containerRef });

    const handleConfetti = () => {
        // Dynamically import canvas-confetti to avoid SSR issues
        import('canvas-confetti').then((confetti) => {
            confetti.default({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.7 },
                colors: ['#FF6B35', '#0066CC', '#FFD700']
            });
        });
    };

    return (
        <section ref={containerRef} className="max-w-4xl mx-auto pb-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6B35] via-[#FB6C1F] to-[#0066CC] p-1 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                <div className="relative bg-white rounded-[calc(1.5rem-4px)] p-8 md:p-12">
                    <div className="text-center space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4">
                                <span className="text-[#0066CC]">
                                    ✨ Ready to Celebrate? 🎉
                                </span>
                            </h2>
                            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                                Book your unforgettable birthday party today and create magical memories
                                that will last a lifetime!
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
                            {/* Book Now Button */}
                            <button
                                ref={buttonRef}
                                onClick={handleConfetti}
                                onMouseEnter={handleConfetti}
                                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FB6C1F] text-white font-bold text-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8655] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center justify-center space-x-3">
                                    <span className="text-2xl">🎂</span>
                                    <span>Book Now</span>
                                </div>
                            </button>

                            {/* Call Us Button */}
                            <a
                                href="tel:+919830359999"
                                className="group px-8 py-4 rounded-full border-2 border-[#0066CC] text-[#0066CC] font-bold text-xl transition-all duration-300 hover:bg-[#0066CC]/5 hover:shadow-lg"
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    <span className="text-2xl">📞</span>
                                    <span>Call Us</span>
                                </div>
                            </a>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-100">
                            {[
                                { icon: '⏰', text: 'Flexible Timing' },
                                { icon: '👨‍👩‍👧‍👦', text: 'All Ages' },
                                { icon: '🎨', text: 'Custom Themes' },
                                { icon: '🍽️', text: 'Food Included' }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center p-4 rounded-xl bg-[#F0F7FF] border border-[#0066CC]/10 hover:border-[#0066CC]/30 transition-colors"
                                >
                                    <span className="text-2xl mb-2">{feature.icon}</span>
                                    <span className="text-sm font-bold text-gray-700">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
        </section>
    );
};

export default CTASection;