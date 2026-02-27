// components/school-trips/VideoGallery.tsx
"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, GraduationCap, BookOpen, Star } from "lucide-react";
import { useState } from "react";

// YouTube video data
const videos = [
    {
        id: "kpGvSi05UXY",
        title: "School Trip Fun at Jus Jumpin'",
        description: "Students jumping, laughing, and learning through play",
        duration: "0:45",
    },
    {
        id: "z876WIsNd9Y",
        title: "Active Learning in Action",
        description: "Physical education meets pure joy",
        duration: "0:38",
    },
    {
        id: "X0cpODhIfTY",
        title: "Team Building Adventures",
        description: "Collaborative games and group activities",
        duration: "0:52",
    },
    {
        id: "UWt2J4e94p8",
        title: "Safe & Supervised Fun",
        description: "Professional staff ensuring a secure environment",
        duration: "0:41",
    },
    {
        id: "eFyYeGLfDow",
        title: "Unforgettable School Moments",
        description: "Memories that last a lifetime",
        duration: "0:49",
    },
];

// Floating background icons
const FloatingIcon = ({
    icon: Icon,
    delay,
    left,
    top,
    size = 24
}: {
    icon: any;
    delay: number;
    left: string;
    top: string;
    size?: number;
}) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left, top }}
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.03, 0.06, 0.03],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
        }}
        transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        <Icon size={size} className="text-[#172B44]" strokeWidth={1.5} />
    </motion.div>
);

// Individual Video Card Component
const VideoCard = ({ video, index }: { video: typeof videos[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const embedUrl = `https://www.youtube.com/embed/${video.id}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 15 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Card Container */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 hover:shadow-xl transition-shadow duration-300">
                {/* Video Container */}
                <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Loading Placeholder */}
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-[#3080c0]/20 border-t-[#3080c0] rounded-full animate-spin" />
                        </div>
                    )}

                    {/* YouTube Iframe */}
                    <iframe
                        src={embedUrl}
                        title={video.title}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                        allowFullScreen
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        onLoad={() => setIsLoaded(true)}
                    />

                    {/* Play Overlay - Only shows when video not playing */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        animate={{ opacity: isHovered ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-[#3080c0] ml-1" fill="currentColor" />
                        </div>
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {video.duration}
                    </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                    <h3 className="font-bold text-[#172B44] mb-1 line-clamp-1"
                        style={{ fontFamily: '"Fredoka One", cursive' }}>
                        {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {video.description}
                    </p>

                    {/* Hover Accent */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{
                            background: "linear-gradient(90deg, #3080c0, #6BCB77, #FE5000)"
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default function VideoGallery() {
    return (
        <section className="relative w-full py-20 md:py-28 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #f0f7ff 40%, #ffffff 100%)"
                }}
            />

            {/* Floating Background Icons */}
            <FloatingIcon icon={GraduationCap} delay={0} left="5%" top="15%" size={32} />
            <FloatingIcon icon={BookOpen} delay={2} left="92%" top="25%" size={28} />
            <FloatingIcon icon={Star} delay={4} left="8%" top="75%" size={24} />
            <FloatingIcon icon={GraduationCap} delay={1} left="88%" top="80%" size={36} />
            <FloatingIcon icon={BookOpen} delay={3} left="12%" top="45%" size={30} />
            <FloatingIcon icon={Sparkles} delay={5} left="95%" top="60%" size={26} />

            {/* Soft Glow Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-[#3080c0]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#6BCB77]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FE5000]/5 rounded-full blur-3xl" />
            </div>

            {/* Top Wave Separator */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                <svg
                    className="relative block w-full h-12 md:h-20"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6 border border-[#3080c0]/20"
                    >
                        <Play className="w-4 h-4 text-[#FE5000]" />
                        <span className="text-sm font-bold text-[#172B44]">Real School Moments</span>
                        <Sparkles className="w-4 h-4 text-[#3080c0]" />
                    </motion.div>

                    {/* Main Heading */}
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        School Trip{" "}
                        <span className="bg-gradient-to-r from-[#3080c0] via-[#6BCB77] to-[#FE5000] bg-clip-text text-transparent">
                            Highlights
                        </span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Watch how students experience joy, adventure, and active learning at Jus Jumpin.
                    </p>
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                    {videos.map((video, index) => (
                        <VideoCard key={video.id} video={video} index={index} />
                    ))}
                </div>

                {/* Optional CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <motion.button
                        whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(48,128,192,0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gradient-to-r from-[#3080c0] to-[#6BCB77] text-white text-lg font-bold rounded-full shadow-lg inline-flex items-center gap-2"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        <Play className="w-5 h-5" />
                        Plan Your School Visit
                    </motion.button>
                    <p className="text-sm text-gray-500 mt-3">
                        Bring your students for an unforgettable experience
                    </p>
                </motion.div>
            </div>

            {/* Bottom Wave Separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none">
                <svg
                    className="relative block w-full h-12 md:h-20"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
                
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}