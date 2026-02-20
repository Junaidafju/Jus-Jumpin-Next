'use client';

import { useState, useRef } from 'react';

const BirthdayVideoSection = () => {
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
    const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);

    const videos = [
        {
            id: 1,
            title: 'Kids Birthday Party',
            youtubeId: 'dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=450&fit=crop'
        },
        {
            id: 2,
            title: 'Adult Celebration',
            youtubeId: 'dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=450&fit=crop'
        },
        {
            id: 3,
            title: 'Family Fun',
            youtubeId: 'dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=450&fit=crop'
        }
    ];

    const handleMouseEnter = (index: number) => {
        setHoveredVideo(index);
    };

    const handleMouseLeave = () => {
        setHoveredVideo(null);
    };

    // Fixed ref callback
    const setVideoRef = (index: number) => (el: HTMLIFrameElement | null) => {
        videoRefs.current[index] = el;
    };

    return (
        <section className="max-w-6xl mx-auto py-12 md:py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                    <span className="bg-gradient-to-r from-[#FF6B35] to-[#FB6C1F] bg-clip-text text-transparent">
                        Relive the Joy
                    </span>
                </h2>
                <p className="text-xl text-gray-600">
                    Experience the excitement captured at our birthday celebrations
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                    <div
                        key={video.id}
                        className="group relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={() => handleMouseEnter(index)}
                        onTouchEnd={handleMouseLeave}
                    >
                        <div className="aspect-video relative">
                            {hoveredVideo === index ? (
                                <iframe
                                    ref={setVideoRef(index)}
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0">
                                    {/* Thumbnail */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FB6C1F] flex items-center justify-center shadow-lg">
                                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                            <h3 className="text-xl font-bold text-white">{video.title}</h3>
                            <div className="mt-2 text-sm text-white/80">
                                {hoveredVideo === index ? 'Now Playing...' : 'Hover to play'}
                            </div>
                        </div>

                        {/* Hover Indicator */}
                        {hoveredVideo === index && (
                            <div className="absolute top-4 right-4 pointer-events-none">
                                <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
                                    <span className="text-xs text-white font-medium">LIVE</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Hover over any video to autoplay • Click to watch on YouTube
                </p>
            </div>
        </section>
    );
};

export default BirthdayVideoSection;