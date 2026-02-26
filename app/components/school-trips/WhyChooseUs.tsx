// components/school-trips/WhyChooseUs.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Star, Smile, Heart, Zap, Award, Shield, BookOpen, Users, Trophy, GraduationCap, School, Rocket } from "lucide-react";
import Image from "next/image";

const features = [
    {
        id: "curriculum",
        title: "Curriculum Aligned",
        short: "Learning Through Play",
        description: "Every bounce, jump and slide connects to PE, Science & PSHE objectives. Learning has never been this fun!",
        points: ["PE & Science focused", "Motor skill development", "Team building games"],
        color: "#FE5000",
        image: "/image/school/curriculum.jpg",
        fallbackEmoji: "🎓"
    },
    {
        id: "safety",
        title: "Safety Superheroes",
        short: "100% Secure Fun",
        description: "Our trained safety superheroes ensure every child is safe while having the time of their lives.",
        points: ["Enhanced DBS checked", "First aid trained", "Risk assessed zones"],
        color: "#3080c0",
        image: "/image/school/safety.jpg",
        fallbackEmoji: "🦸"
    },
    {
        id: "group",
        title: "Group Friendly",
        short: "Any Size, Any Day",
        description: "From intimate classes to whole year groups - we've got the perfect setup for your school.",
        points: ["20-200+ students", "Dedicated party host", "Flexible scheduling"],
        color: "#FE5000",
        image: "/image/school/group.jpg",
        fallbackEmoji: "👨‍👩‍👧‍👦"
    },
    {
        id: "value",
        title: "Best Value",
        short: "More Fun, Less Spend",
        description: "Amazing rates with free teacher places and group discounts. No hidden costs, just pure fun!",
        points: ["Free teacher places", "Group discounts", "All inclusive pricing"],
        color: "#3080c0",
        image: "/image/school/value.jpg",
        fallbackEmoji: "💰"
    },
    {
        id: "catering",
        title: "Yummy Catering",
        short: "Healthy & Tasty",
        description: "Nutritious meals that kids actually love! Dietary requirements? We've got you covered.",
        points: ["Healthy options", "Allergies catered", "Flexible meal plans"],
        color: "#FE5000",
        image: "/image/school/catering.jpg",
        fallbackEmoji: "🥗"
    },
    {
        id: "booking",
        title: "Easy Peasy Booking",
        short: "Book in a Snap",
        description: "Our super simple booking system means less paperwork and more party planning!",
        points: ["Online in 2 minutes", "Instant confirmation", "Free date changes"],
        color: "#3080c0",
        image: "/image/school/booking.jpg",
        fallbackEmoji: "⭐"
    }
];

// 4D Holographic Card Component (unchanged - keep as is)
const HolographicCard4D = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [imageError, setImageError] = useState(false);
    const cardInView = useInView(cardRef, { once: true, margin: "-50px" });

    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current || !isHovering) return;

            const rect = cardRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            setMousePosition({ x, y });

            const rotX = (y - 50) * 0.16;
            const rotY = (x - 50) * -0.16;

            setRotation({ x: rotX, y: rotY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHovering]);

    const distFromCenter = Math.sqrt(
        Math.pow((mousePosition.x - 50) / 50, 2) +
        Math.pow((mousePosition.y - 50) / 50, 2)
    );

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative h-[340px] sm:h-[360px] cursor-pointer group px-3"
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setRotation({ x: 0, y: 0 });
                setMousePosition({ x: 50, y: 50 });
            }}
            style={{ perspective: 1200 }}
        >
            <motion.div
                className="relative w-full h-full card-4d"
                animate={{
                    rotateY: isFlipped ? 180 : rotation.y,
                    rotateX: isFlipped ? 0 : rotation.x,
                }}
                transition={{
                    rotateY: { duration: isFlipped ? 0.6 : 0.1, type: "spring", stiffness: 200 },
                    rotateX: { duration: 0.1 }
                }}
                style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    "--mx": `${mousePosition.x}%`,
                    "--my": `${mousePosition.y}%`,
                    "--posx": `${mousePosition.x}%`,
                    "--posy": `${mousePosition.y}%`,
                    "--hyp": distFromCenter,
                    "--o": isHovering ? 1 : 0,
                } as React.CSSProperties}
            >
                {/* Front of Card - with image */}
                <div
                    className="absolute inset-0 rounded-2xl p-0 flex flex-col items-center justify-end text-center backface-hidden overflow-hidden card__front"
                    style={{
                        backfaceVisibility: "hidden",
                        backgroundColor: "#ffffff",
                        border: `4px solid ${feature.color}`,
                        boxShadow: `12px 12px 0 ${feature.color}`,
                        transform: "translateZ(20px)",
                    }}
                >
                    <div className="absolute inset-0 w-full h-full">
                        {!imageError ? (
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={() => setImageError(true)}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <span className="text-7xl">{feature.fallbackEmoji}</span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(
                                    135deg,
                                    rgba(255, 255, 255, 0.8) 0px,
                                    rgba(255, 215, 0, 0.6) 2px,
                                    rgba(255, 255, 255, 0.8) 4px,
                                    rgba(255, 215, 0, 0.6) 6px,
                                    rgba(255, 255, 255, 0.8) 8px
                                ),
                                repeating-linear-gradient(
                                    45deg,
                                    rgba(255, 100, 100, 0.3) 0px,
                                    rgba(100, 255, 100, 0.3) 10px,
                                    rgba(100, 100, 255, 0.3) 20px,
                                    rgba(255, 255, 100, 0.3) 30px
                                ),
                                radial-gradient(
                                    circle at var(--mx) var(--my),
                                    rgba(255, 255, 255, 0.9) 0%,
                                    rgba(255, 215, 0, 0.4) 25%,
                                    rgba(255, 255, 255, 0.2) 50%,
                                    transparent 80%
                                )
                            `,
                            backgroundBlendMode: "overlay, color-dodge, screen",
                            backgroundSize: "400% 400%, 300% 300%, 200% 200%",
                            backgroundPosition: `${mousePosition.x * 4}% ${mousePosition.y * 4}%, ${mousePosition.x * 3}% ${mousePosition.y * 3}%, center`,
                            mixBlendMode: "soft-light",
                            zIndex: 5,
                        }}
                    />

                    <div className="relative z-10 p-5 sm:p-6 text-white w-full transform translateZ(30px)">
                        <h3
                            className="text-xl sm:text-2xl font-bold mb-1"
                            style={{
                                fontFamily: '"Fredoka One", cursive',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                            }}
                        >
                            {feature.title}
                        </h3>

                        <p className="font-bold text-sm sm:text-base mb-2 text-white/90">
                            {feature.short}
                        </p>

                        <motion.div
                            className="flex justify-center"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm text-white border border-white/50">
                                👆 Tap to flip
                            </span>
                        </motion.div>
                    </div>

                    <div className="absolute top-2 left-2 text-white/50 text-lg z-10 animate-pulse">✨</div>
                    <div className="absolute top-2 right-2 text-white/50 text-lg z-10 animate-pulse">✨</div>
                    <div className="absolute bottom-20 left-2 text-white/50 text-lg z-10 animate-pulse delay-100">✨</div>
                    <div className="absolute bottom-20 right-2 text-white/50 text-lg z-10 animate-pulse delay-100">✨</div>
                </div>

                {/* Back of Card */}
                <div
                    className="absolute inset-0 rounded-2xl p-5 sm:p-6 flex flex-col justify-center backface-hidden overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translateZ(20px)",
                        backgroundColor: feature.color,
                        border: `4px solid white`,
                        boxShadow: `12px 12px 0 ${feature.color}`,
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(
                                    -45deg,
                                    rgba(255, 255, 255, 0.6) 0px,
                                    rgba(255, 215, 0, 0.3) 4px,
                                    rgba(255, 255, 255, 0.6) 8px
                                ),
                                radial-gradient(
                                    circle at var(--mx) var(--my),
                                    rgba(255, 255, 255, 0.9) 0%,
                                    transparent 70%
                                )
                            `,
                            backgroundBlendMode: "overlay",
                            backgroundSize: "200% 200%, 200% 200%",
                            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%, center`,
                            mixBlendMode: "soft-light",
                        }}
                    />

                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    <h3
                        className="text-xl sm:text-2xl font-bold text-white mb-3 text-center relative z-10"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        {feature.title}
                    </h3>

                    <p className="text-white/90 text-sm sm:text-base mb-4 text-center leading-relaxed relative z-10">
                        {feature.description}
                    </p>

                    <ul className="space-y-2 max-w-xs mx-auto relative z-10">
                        {feature.points.map((point, i) => (
                            <motion.li
                                key={i}
                                className="flex items-center gap-2 text-white text-xs sm:text-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <span className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-green-500 text-xs">✓</span>
                                </span>
                                {point}
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div
                        className="absolute bottom-3 left-0 right-0 flex justify-center z-10"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm text-white border border-white/50">
                            👆 Tap to go back
                        </span>
                    </motion.div>

                    <div className="absolute bottom-2 right-2 text-white/30 text-xl animate-pulse">⭐</div>
                    <div className="absolute top-2 left-2 text-white/30 text-xl animate-pulse delay-150">⭐</div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Floating Elements for Header
const FloatingElement = ({ children, delay = 0, duration = 3, className = "" }) => (
    <motion.div
        className={`absolute ${className}`}
        initial={{ y: 0 }}
        animate={{
            y: [0, -10, 0, 10, 0],
            rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);

// Bouncing Element for extra fun
const BouncingElement = ({ children, delay = 0, className = "" }) => (
    <motion.div
        className={`absolute ${className}`}
        animate={{
            y: [0, -15, 0, -8, 0],
            scale: [1, 1.1, 1, 1.05, 1],
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);

export default function WhyChooseUs() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const [underlineWidth, setUnderlineWidth] = useState(0);
    const [subtitleUnderlineWidth, setSubtitleUnderlineWidth] = useState(0);

    useEffect(() => {
        if (titleRef.current) {
            const textWidth = titleRef.current.offsetWidth;
            setUnderlineWidth(textWidth * 0.9); // 90% of title width
        }
        if (subtitleRef.current) {
            const textWidth = subtitleRef.current.offsetWidth;
            setSubtitleUnderlineWidth(textWidth * 0.8); // 80% of subtitle width
        }
    }, []);

    return (
        <section className="relative py-16 sm:py-20 md:py-32 bg-white overflow-hidden">
            {/* Background Pattern - Professional Cartoon Style */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Polka Dots Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 15px 15px, #FE5000 3px, transparent 3px)`,
                    backgroundSize: '40px 40px'
                }} />

                {/* Plus Signs Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L30 50 M10 30 L50 30' stroke='%233080c0' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }} />

                {/* Gradient Orbs - More vibrant */}
                <div className="absolute top-10 left-20 w-96 h-96 bg-[#FE5000]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#3080c0]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ffbb00ff]/5 rounded-full blur-3xl" />
            </div>

            {/* Floating Cartoon Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <BouncingElement delay={0} className="left-[5%] top-[15%]">
                    <div className="w-12 h-12 bg-[#FE5000]/10 rounded-2xl rotate-12 border-2 border-[#FE5000]/20 backdrop-blur-sm flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-[#FE5000]/40" />
                    </div>
                </BouncingElement>

                <FloatingElement delay={1} duration={4} className="right-[8%] top-[25%]">
                    <div className="w-10 h-10 bg-[#3080c0]/10 rounded-full border-2 border-[#3080c0]/20 backdrop-blur-sm flex items-center justify-center">
                        <Star className="w-5 h-5 text-[#3080c0]/40 fill-[#3080c0]/20" />
                    </div>
                </FloatingElement>

                <FloatingElement delay={2} duration={5} className="left-[12%] bottom-[20%]">
                    <div className="w-14 h-14 bg-[#ffbb00ff]/10 rounded-3xl -rotate-6 border-2 border-[#ffbb00ff]/20 backdrop-blur-sm flex items-center justify-center">
                        <Rocket className="w-7 h-7 text-[#ffbb00ff]/40" />
                    </div>
                </FloatingElement>

                <BouncingElement delay={1.5} className="right-[15%] bottom-[30%]">
                    <div className="w-8 h-8 bg-[#FE5000]/10 rounded-full border-2 border-[#FE5000]/20 backdrop-blur-sm flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[#FE5000]/40" />
                    </div>
                </BouncingElement>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Professional Cartoon Header */}
                <div className="text-center mb-16 sm:mb-20">

                    {/* BADGE - Professional Cartoon Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            {/* Background Glow */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#FE5000] to-[#3080c0] rounded-full blur-xl opacity-30"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Main Badge */}
                            <div className="relative px-8 py-3 bg-white rounded-full border-2 border-[#FE5000] shadow-[4px_4px_0_#3080c0] flex items-center gap-3">
                                {/* Animated Stars */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    <Star className="w-4 h-4 text-[#FE5000] fill-[#FE5000]" />
                                </motion.div>

                                <span className="text-sm font-bold tracking-wide" style={{
                                    color: '#172B44',
                                    fontFamily: '"Fredoka One", cursive'
                                }}>
                                    WHY SCHOOLS TRUST US
                                </span>

                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    <Star className="w-4 h-4 text-[#3080c0] fill-[#3080c0]" />
                                </motion.div>

                                {/* Floating Sparkles */}
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <Sparkles className="w-4 h-4 text-[#FE5000]" />
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-2 -left-2"
                                    animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                >
                                    <Sparkles className="w-4 h-4 text-[#3080c0]" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Title - Why Choose Us? with Animated Underline */}
                    <div className="relative inline-block mb-4">
                        <motion.h2
                            ref={titleRef}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black relative z-10 px-4"
                            style={{
                                fontFamily: '"Fredoka One", cursive',
                                lineHeight: 1.1,
                                color: '#172B44'
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Why Choose Us?
                        </motion.h2>

                        {/* Animated Underline - Appears on scroll */}
                        <motion.div
                            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-[#FE5000] via-[#3080c0] to-[#ffbb00ff] rounded-full"
                            style={{ width: underlineWidth }}
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: underlineWidth, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                        />

                        {/* Decorative Circles on Underline Ends */}
                        <motion.div
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
                            style={{ marginLeft: -underlineWidth / 2 - 8 }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2, duration: 0.4 }}
                        >
                            <div className="w-3 h-3 bg-[#FE5000] rounded-full" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
                            style={{ marginLeft: underlineWidth / 2 + 5 }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2, duration: 0.4 }}
                        >
                            <div className="w-3 h-3 bg-[#3080c0] rounded-full" />
                        </motion.div>
                    </div>

                    {/* Subtitle with Animated Underline */}
                    <div className="relative inline-block mb-8">
                        <motion.p
                            ref={subtitleRef}
                            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4 font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            Where learning meets adventure in the most magical way!
                        </motion.p>

                        {/* Animated Subtitle Underline */}
                        <motion.div
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#FE5000]/50 via-[#3080c0]/50 to-[#ffbb00ff]/50 rounded-full"
                            style={{ width: subtitleUnderlineWidth }}
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: subtitleUnderlineWidth, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                        />
                    </div>

                    {/* Trust Indicators - Cartoon Style */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 sm:gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        {[
                            { icon: Award, label: "Award Winning", color: "#FE5000", bgColor: "#FE5000/10" },
                            { icon: Shield, label: "Fully Insured", color: "#3080c0", bgColor: "#3080c0/10" },
                            { icon: Users, label: "10K+ Students", color: "#ffbb00ff", bgColor: "#ffbb00ff/10" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="relative group"
                                whileHover={{ y: -5, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border-2 border-gray-200 shadow-[3px_3px_0_#172B44]">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: item.bgColor }}>
                                        <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                                    </div>
                                    <span className="text-xs font-bold" style={{ color: '#172B44' }}>{item.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <HolographicCard4D key={feature.id} feature={feature} index={index} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .card-4d {
                    transform-style: preserve-3d;
                }
                .card__front {
                    backface-visibility: hidden;
                }
                .delay-100 {
                    animation-delay: 100ms;
                }
                .delay-150 {
                    animation-delay: 150ms;
                }
            `}</style>
        </section>
    );
}