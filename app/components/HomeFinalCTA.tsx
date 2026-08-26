"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useAnimationControls, Variants } from "framer-motion";
import {
  Ticket,
  Cake,
  MapPin,
  Sparkles,
  ArrowRight,
  Star,
  PartyPopper,
  Users,
  Clock
} from "lucide-react";
import BirthdayBookingModal from "./birthday/BirthdayBookingModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const floatingElements = [
  { icon: "🎈", delay: 0, x: "5%", y: "15%" },
  { icon: "🎪", delay: 0.5, x: "15%", y: "65%" },
  { icon: "🎠", delay: 1, x: "85%", y: "20%" },
  { icon: "🎡", delay: 1.5, x: "90%", y: "70%" },
  { icon: "🎢", delay: 2, x: "50%", y: "10%" },
  { icon: "🎭", delay: 2.5, x: "30%", y: "80%" },
];

export default function HomeFinalCTA() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimationControls();
  const [isMounted, setIsMounted] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  const ctaVideo = process.env.NEXT_PUBLIC_CLOUDINARY_CTA_VIDEO || "samples/sea-turtle";

  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${ctaVideo}.mp4`;
  const posterUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_1/${ctaVideo}.jpg`;

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      controls.start("visible");
      // Auto-play video when in view
      if (videoRef.current) {
        videoRef.current.play().catch(() => { });
      }
    } else if (!isInView && isMounted) {
      // Pause video when out of view
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isInView, controls, isMounted]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  const handleScrollToLocations = (e: React.MouseEvent) => {
    e.preventDefault();
    const locSection = document.getElementById("locations");
    if (locSection) {
      locSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[600px] sm:min-h-[650px] lg:min-h-[700px] overflow-hidden bg-[#0a0a14] flex items-center justify-center text-white border-t border-white/10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Full-Bleed Background Video - Enhanced Visibility */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover"
            style={{
              opacity: isVideoLoaded ? 0.65 : 0,
              transition: "opacity 1s ease",
              filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
            }}
          />

          {/* Enhanced Gradient Overlays - Better balance between video and content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/30 to-[#0a0a14]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/50 via-transparent to-[#0a0a14]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a14]/60" />

          {/* Radial spotlight effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(109, 192, 101, 0.1) 0%, transparent 50%)`,
              transition: "background 0.3s ease",
            }}
          />

          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          {/* Animated particles - More visible */}
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl sm:text-5xl lg:text-6xl"
              style={{ left: element.x, top: element.y }}
              animate={{
                y: [0, -40, 0],
                x: [0, 15, -15, 0],
                rotate: [0, 8, -8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
            >
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay,
                }}
                className="drop-shadow-2xl"
              >
                {element.icon}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Content Box - Glassmorphism for better readability */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center max-w-5xl">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-xs font-black text-[#6dc065] uppercase tracking-widest mb-6 shadow-2xl shadow-emerald-500/30">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="drop-shadow-lg">Ready for the Ultimate Bounce?</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-6 drop-shadow-2xl"
          >
            Reserve Your Fun Today &{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235] animate-gradient-x drop-shadow-lg">
              Create Unforgettable Memories!
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-slate-100 text-base sm:text-xl lg:text-2xl mt-6 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg"
          >
            Join thousands of happy kids and families at Jus Jumpin.
            Book your tickets online or host a grand birthday party today!
          </motion.p>

          {/* Quick Stats - Glassmorphism cards */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm sm:text-base font-bold text-white">4.9/5 Rating</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#6dc065]" />
              <span className="text-sm sm:text-base font-bold text-white">10,000+ Happy Kids</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#8fc93a]" />
              <span className="text-sm sm:text-base font-bold text-white">Open 7 Days</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full max-w-3xl mx-auto"
          >
            <motion.a
              href="https://jusjumpin.co.in/customer/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-sm sm:text-base lg:text-lg rounded-full shadow-[0_10px_30px_rgba(109,192,101,0.5)] overflow-hidden transition-all"
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                Book Tickets Now
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.button
              onClick={() => setIsBookingModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/20 backdrop-blur-xl border-2 border-white/40 text-white font-black text-sm sm:text-base lg:text-lg rounded-full overflow-hidden transition-all hover:border-[#6dc065] hover:bg-white/30 shadow-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Cake className="w-4 h-4 sm:w-5 sm:h-5" />
                Book Birthday Party
                <PartyPopper className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
              </span>
            </motion.button>

            <motion.a
              href="#locations"
              onClick={handleScrollToLocations}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-black/40 backdrop-blur-xl border border-white/30 text-slate-100 font-bold text-sm sm:text-base lg:text-lg rounded-full transition-all hover:border-[#6dc065] hover:text-white overflow-hidden shadow-xl"
            >
              <span className="absolute inset-0 bg-[#6dc065]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                Find Nearest Location
              </span>
            </motion.a>
          </motion.div>

          {/* Trust Badge - Enhanced */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-12 flex items-center justify-center gap-3"
          >
            <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                  </motion.span>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-slate-200 font-medium">
                Trusted by parents across India
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6dc065]/50 to-transparent" />
      </motion.section>

      {/* Booking Modal */}
      <BirthdayBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}