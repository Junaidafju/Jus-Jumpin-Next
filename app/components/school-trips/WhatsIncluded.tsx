// components/school-trips/WhatsIncluded.tsx
"use client";

import { motion } from "framer-motion";
import {
    ClipboardList,
    Headset,
    Building2,
    Shield,
    Camera,
    Bus,
    GraduationCap,
    BookOpen,
    Sparkles,
    CheckCircle
} from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: ClipboardList,
        title: "Pre-Visit Planning Pack",
        description: "Risk assessments, teacher briefings & curriculum guides sent in advance",
        color: "#3080c0",
        bgGradient: "from-blue-50 to-white"
    },
    {
        icon: Headset,
        title: "Dedicated Coordinator",
        description: "Single point of contact from booking through to departure",
        color: "#FE5000",
        bgGradient: "from-orange-50 to-white"
    },
    {
        icon: Building2,
        title: "Private Group Facilities",
        description: "Exclusive areas, changing spaces & secure storage for your group",
        color: "#6BCB77",
        bgGradient: "from-green-50 to-white"
    },
    {
        icon: Shield,
        title: "On-Site Safety Team",
        description: "Certified first aiders with emergency-ready protocols",
        color: "#3080c0",
        bgGradient: "from-blue-50 to-white"
    },
    {
        icon: Camera,
        title: "Photo & Memory Zones",
        description: "Branded backdrops & certificate presentations to capture the day",
        color: "#FE5000",
        bgGradient: "from-orange-50 to-white"
    },
    {
        icon: Bus,
        title: "Coach Parking & Access",
        description: "Reserved bays & smooth entry process for hassle-free arrival",
        color: "#6BCB77",
        bgGradient: "from-green-50 to-white"
    }
];

// Floating decorative elements
interface FloatingElementProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

const FloatingElement = ({ children, delay = 0, duration = 8, className = "" }: FloatingElementProps) => (
    <motion.div
        className={`absolute pointer-events-none ${className}`}
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.15, 0.25, 0.15],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
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

export default function WhatsIncluded() {
    return (

        <section className="relative w-full py-24 md:py-32 overflow-hidden">
            {/* Top Wave SVG Separator */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 rotate-180">
                <svg
                    className="relative block w-full h-[60px] md:h-[80px] lg:h-[100px] scale-y-[-1]"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    {/* First wave layer - white */}
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="#ffffff"
                        opacity="1"
                        transform="translate(0, 0)"
                    />
                    {/* Second wave layer - very subtle blue */}
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="#dfe1e2ff"
                        opacity="0.2"
                        transform="translate(0, 0)"
                    />
                </svg>
            </div>
            {/* Full-width Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Background Image - Optimized */}
                <Image
                    src="/image/school/educational-bg1.jpg" // Add your background image path
                    alt="Educational background"
                    fill
                    className="object-cover scale-105" // Slight scale for subtle movement
                    priority
                    quality={85}
                />

                {/* Multi-layer Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/50 to-[#0a1628]/70" />

                {/* Soft Blue Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3080c0]/20 via-transparent to-[#6BCB77]/20 mix-blend-overlay" />

                {/* Subtle Blur Effect */}
                <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>

            {/* Floating Decorative Elements */}
            <FloatingElement delay={0} duration={10} className="top-20 left-[10%] text-white/5">
                <GraduationCap size={80} />
            </FloatingElement>
            <FloatingElement delay={2} duration={12} className="bottom-40 right-[15%] text-white/5">
                <BookOpen size={100} />
            </FloatingElement>
            <FloatingElement delay={4} duration={8} className="top-60 right-[20%] text-white/5">
                <Sparkles size={60} />
            </FloatingElement>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    {/* Small Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
                    >
                        <CheckCircle className="w-4 h-4 text-[#6BCB77]" />
                        <span className="text-white font-semibold text-sm tracking-wide">
                            Included in Every School Visit
                        </span>
                        <CheckCircle className="w-4 h-4 text-[#FE5000]" />
                    </motion.div>

                    {/* Main Heading */}
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
                        style={{ fontFamily: '"Fredoka One", cursive' }}
                    >
                        <span className="text-white">Everything You Need,</span>
                        <br />
                        <span className="bg-gradient-to-r from-[#6BCB77] via-[#FE5000] to-[#3080c0] bg-clip-text text-transparent">
                            Already Covered
                        </span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-medium">
                        We've taken care of every detail so teachers can focus on what matters most —
                        creating unforgettable learning experiences.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{
                                    y: -8,
                                    transition: { type: "spring", stiffness: 400, damping: 10 }
                                }}
                                className="group"
                            >
                                <div
                                    className={`h-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl hover:bg-white`}
                                >
                                    {/* Icon Container */}
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                                        style={{
                                            background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}05)`,
                                            border: `1px solid ${feature.color}30`
                                        }}
                                    >
                                        <Icon
                                            className="w-7 h-7"
                                            style={{ color: feature.color }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-xl font-bold mb-2 text-[#172B44]"
                                        style={{ fontFamily: '"Fredoka One", cursive' }}
                                    >
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Decorative Corner Accent */}
                                    <motion.div
                                        className="absolute bottom-3 right-3 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={{ rotate: 0 }}
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: feature.color }}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Micro Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-[#6BCB77]" />
                            <CheckCircle className="w-4 h-4 text-[#FE5000]" />
                            <CheckCircle className="w-4 h-4 text-[#3080c0]" />
                        </div>
                        <span className="text-white font-medium text-sm">
                            All included · No hidden costs · Every booking
                        </span>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-[#3080c0]" />
                            <CheckCircle className="w-4 h-4 text-[#FE5000]" />
                            <CheckCircle className="w-4 h-4 text-[#6BCB77]" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent z-10" />

            {/* Responsive Styles */}
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        
        @media (max-width: 768px) {
          section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
          
          /* Reduce background intensity on mobile */
          .backdrop-blur-\\[2px\\] {
            backdrop-filter: blur(1px);
          }
        }
      `}</style>
        </section>
    );
}