// components/school-trips/VideoGallery.tsx
"use client";

import { motion } from "framer-motion";
import { Play, Clapperboard, Film, Popcorn, Candy, Sparkles } from "lucide-react";
import { useState } from "react";

// YouTube video data
const videos = [
    {
        id: "kpGvSi05UXY",
        title: "🎬 Jump & Learn",
        description: "Students bouncing with joy while learning physics!",
        duration: "0:45",
        color: "#FE5000",
        bgColor: "#FFF1E6",
        emoji: "🦘"
    },
    {
        id: "z876WIsNd9Y",
        title: "🎪 Active Fun",
        description: "Physical education meets pure excitement",
        duration: "0:38",
        color: "#3080c0",
        bgColor: "#E8F0F8",
        emoji: "🤸"
    },
    {
        id: "X0cpODhIfTY",
        title: "🤝 Team Games",
        description: "Building friendships through group activities",
        duration: "0:52",
        color: "#6BCB77",
        bgColor: "#EAF6EC",
        emoji: "🎯"
    },
    {
        id: "UWt2J4e94p8",
        title: "🛡️ Safe Fun",
        description: "Professional staff ensuring secure environment",
        duration: "0:41",
        color: "#FE5000",
        bgColor: "#FFF1E6",
        emoji: "🦸"
    },
    {
        id: "eFyYeGLfDow",
        title: "📸 Best Day Ever",
        description: "Unforgettable moments with friends",
        duration: "0:49",
        color: "#3080c0",
        bgColor: "#E8F0F8",
        emoji: "🎉"
    },
];

// Cartoon Cloud Background
const CartoonCloud = ({ delay, size, top, left, speed = 20 }: { delay: number; size: number; top: string; left: string; speed?: number }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ top, left, width: size, height: size * 0.6 }}
        animate={{
            x: [0, 50, 0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
            duration: speed,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        <svg viewBox="0 0 100 60" className="w-full h-full fill-white/20">
            <path d="M20,30 Q30,15 45,20 Q55,10 70,20 Q85,15 90,30 Q95,45 70,50 Q50,55 30,50 Q10,45 20,30" />
        </svg>
    </motion.div>
);

// Bouncing Ball Decoration
const BouncingBall = ({ delay, left, color }: { delay: number; left: string; color: string }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left, bottom: "10%" }}
        animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
        }}
        transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        <div className={`w-8 h-8 rounded-full`} style={{ backgroundColor: color, opacity: 0.2 }} />
    </motion.div>
);

// Floating Popcorn and Candy
const FloatingSnacks = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
            { icon: "🍿", left: "2%", top: "15%", delay: 0, rotate: true },
            { icon: "🍬", left: "95%", top: "30%", delay: 1, rotate: true },
            { icon: "🎪", left: "10%", top: "80%", delay: 2, rotate: false },
            { icon: "🎈", left: "90%", top: "70%", delay: 3, rotate: true },
            { icon: "🍭", left: "5%", top: "40%", delay: 4, rotate: false },
            { icon: "🎨", left: "85%", top: "20%", delay: 5, rotate: true },
        ].map((item, i) => (
            <motion.div
                key={i}
                className="absolute text-3xl md:text-4xl opacity-30"
                style={{ left: item.left, top: item.top }}
                animate={{
                    y: [0, -20, 0],
                    rotate: item.rotate ? [0, 10, -10, 0] : 0,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 6,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {item.icon}
            </motion.div>
        ))}
    </div>
);

// Cartoon Video Card
const VideoCard = ({ video, index }: { video: typeof videos[0]; index: number }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [thumbnailError, setThumbnailError] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -1 : 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
            whileHover={{
                y: -8,
                rotate: index % 2 === 0 ? 0.5 : -0.5,
                transition: { type: "spring", stiffness: 300 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Cartoon Frame */}
            <div
                className="relative bg-white rounded-3xl p-2 shadow-xl"
                style={{
                    border: `4px solid ${video.color}`,
                    boxShadow: `8px 8px 0 ${video.color}`,
                }}
            >
                {/* Corner Decorations */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#FE5000] z-10">
                    <span className="text-lg">{index === 0 ? "🎬" : index === 1 ? "🎪" : index === 2 ? "🎯" : index === 3 ? "🎨" : "📸"}</span>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#3080c0] z-10">
                    <span className="text-lg">⭐</span>
                </div>

                {/* Video Container */}
                <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                    {!isPlaying ? (
                        <>
                            {/* Thumbnail */}
                            <img
                                src={thumbnailError
                                    ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                                    : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
                                }
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={() => setThumbnailError(true)}
                            />

                            {/* Play Button Overlay */}
                            <motion.button
                                onClick={handlePlay}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 w-full h-full"
                                whileHover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white"
                                    animate={isHovered ? {
                                        scale: 1.1,
                                        rotate: [0, 5, -5, 0]
                                    } : { scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Play className="w-8 h-8 text-[#FE5000] ml-1" fill="currentColor" />
                                </motion.div>
                            </motion.button>

                            {/* Duration Badge */}
                            <div className="absolute top-3 right-3 px-3 py-1 bg-white rounded-full shadow-md border-2 border-[#FE5000]">
                                <span className="text-xs font-bold text-[#172B44]">{video.duration}</span>
                            </div>

                            {/* Cartoon Popcorn Icon */}
                            <motion.div
                                className="absolute bottom-3 left-3 text-2xl"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                🍿
                            </motion.div>

                            {/* Cute Face when hover */}
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                                >
                                    👀
                                </motion.div>
                            )}
                        </>
                    ) : (
                        // YouTube Iframe - Plays directly in card
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                            title={video.title}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </div>

                {/* Video Info */}
                <div className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xl">{video.emoji}</span>
                        <h3
                            className="text-base font-bold text-[#172B44]"
                            style={{ fontFamily: '"Fredoka One", cursive' }}
                        >
                            {video.title}
                        </h3>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                        {video.description}
                    </p>
                </div>

                {/* Film Strip Decoration */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 flex gap-1">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex-1 h-full bg-[#172B44]/20 rounded-full" />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function VideoGallery() {
    return (
        <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#fbfdff] to-[#ffffff]">
            {/* Cartoon Clouds Background */}
            <CartoonCloud delay={0} size={200} top="5%" left="-5%" speed={25} />
            <CartoonCloud delay={5} size={150} top="15%" left="80%" speed={20} />
            <CartoonCloud delay={2} size={180} top="60%" left="90%" speed={22} />
            <CartoonCloud delay={7} size={120} top="75%" left="5%" speed={18} />

            {/* Bouncing Balls */}
            <BouncingBall delay={0} left="10%" color="#FE5000" />
            <BouncingBall delay={1} left="30%" color="#3080c0" />
            <BouncingBall delay={2} left="50%" color="#6BCB77" />
            <BouncingBall delay={3} left="70%" color="#FE5000" />
            <BouncingBall delay={4} left="90%" color="#3080c0" />

            {/* Floating Snacks */}
            <FloatingSnacks />

            {/* Top Wave with gradient matching previous section */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative block w-full h-16 md:h-24"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="url(#topWaveGradient)"
                    />
                    <defs>
                        <linearGradient id="topWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#fbfdff" />
                            <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header - Clean & Proper */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    {/* Fun Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md mb-6 border border-gray-200"
                        whileHover={{ y: -2 }}
                    >
                        <Clapperboard className="w-5 h-5 text-[#FE5000]" />
                        <span className="text-sm font-bold text-[#172B44]">School Moments in Action</span>
                        <Film className="w-5 h-5 text-[#3080c0]" />
                    </motion.div>

                    {/* Main Heading - Clean Typography */}
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        <span className="text-[#172B44]">School Trip</span>
                        <br />
                        <span className="text-[#FE5000]">Video Highlights</span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Watch the fun, laughter, and learning in action!
                    </p>
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
                    {videos.map((video, index) => (
                        <VideoCard key={video.id} video={video} index={index} />
                    ))}
                </div>

                {/* Fun CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <motion.button
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-4 bg-gradient-to-r from-[#FE5000] to-[#3080c0] text-white text-lg font-bold rounded-full shadow-xl inline-flex items-center gap-3 border-b-4 border-[#172B44] active:border-b-0 active:translate-y-1"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        <span className="text-2xl">🎪</span>
                        Plan Your School Visit
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                    <p className="text-sm text-gray-500 mt-3">
                        Bring your students for an unforgettable experience
                    </p>
                </motion.div>
            </div>

            {/* Bottom Wave with same gradient */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg
                    className="relative block w-full h-16 md:h-24"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="url(#bottomWaveGradient)"
                    />
                    <defs>
                        <linearGradient id="bottomWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#fbfdff" />
                            <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
                
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