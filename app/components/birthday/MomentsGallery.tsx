'use client';

import { useEffect, useState } from 'react';

const MomentsGallery = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Sample images - replace with your actual images
    const images = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        src: `https://images.unsplash.com/photo-${153000 + i}?w=800&h=600&fit=crop&crop=faces&auto=format`,
        alt: `Birthday celebration moment ${i + 1}`
    }));

    if (!isClient) return null; // Prevent SSR

    return (
        <section className="max-w-7xl mx-auto py-12 md:py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                    <span className="bg-gradient-to-r from-[#0066CC] to-[#FF6B35] bg-clip-text text-transparent">
                        ✨Happiest Moments✨
                    </span>
                </h2>
                <p className="text-xl text-gray-600">Captured at our birthday celebrations</p>
            </div>

            {/* First Row - Slides Left */}
            <div className="mb-8 overflow-hidden">
                <div className="flex animate-marquee-left">
                    {[...images, ...images].map((img, index) => (
                        <div
                            key={`row1-${index}`}
                            className="flex-shrink-0 w-64 h-48 mx-4 rounded-2xl overflow-hidden shadow-lg group border-2 border-white"
                        >
                            <div className="relative w-full h-full">
                                {/* Placeholder - replace with actual images */}
                                <div className="w-full h-full bg-gradient-to-br from-[#0066CC]/20 via-[#FF6B35]/20 to-[#0066CC]/20 flex items-center justify-center">
                                    <span className="text-[#FF6B35] text-4xl">🎉</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B35]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-bold">Happy Birthday!</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Row - Slides Right */}
            <div className="overflow-hidden">
                <div className="flex animate-marquee-right">
                    {[...images.reverse(), ...images.reverse()].map((img, index) => (
                        <div
                            key={`row2-${index}`}
                            className="flex-shrink-0 w-64 h-48 mx-4 rounded-2xl overflow-hidden shadow-lg group border-2 border-white"
                        >
                            <div className="relative w-full h-full">
                                {/* Placeholder - replace with actual images */}
                                <div className="w-full h-full bg-gradient-to-br from-[#FF6B35]/20 via-[#0066CC]/20 to-[#FF6B35]/20 flex items-center justify-center">
                                    <span className="text-[#0066CC] text-4xl">🥳</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-bold">Memories Forever!</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};

export default MomentsGallery;