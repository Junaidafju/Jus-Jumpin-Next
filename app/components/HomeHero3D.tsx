"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BirthdayBookingModal from "@/app/components/birthday/BirthdayBookingModal";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_PLAYBACK_ID = "IjEtGAmg2JVHRFyN98vVpLFF4H4YtkncunpK1SG6dGs";
const MOBILE_PLAYBACK_ID = "zW2qnAxjGm8wdNM8LgV4W2YHuiF402t188gu3Iy53trI";

const PARTICLE_POSITIONS = [
  { left: "15%", top: "20%", size: "4px", opacity: 0.25 },
  { left: "35%", top: "65%", size: "3px", opacity: 0.35 },
  { left: "70%", top: "15%", size: "5px", opacity: 0.20 },
  { left: "85%", top: "50%", size: "4px", opacity: 0.30 },
  { left: "25%", top: "80%", size: "3px", opacity: 0.22 },
  { left: "60%", top: "85%", size: "4px", opacity: 0.28 },
  { left: "45%", top: "30%", size: "5px", opacity: 0.18 },
  { left: "10%", top: "45%", size: "3px", opacity: 0.32 },
  { left: "90%", top: "80%", size: "4px", opacity: 0.24 },
  { left: "55%", top: "10%", size: "3px", opacity: 0.30 },
  { left: "78%", top: "70%", size: "5px", opacity: 0.20 },
  { left: "40%", top: "90%", size: "4px", opacity: 0.26 },
  { left: "20%", top: "35%", size: "3px", opacity: 0.22 },
  { left: "65%", top: "40%", size: "4px", opacity: 0.34 },
  { left: "80%", top: "30%", size: "3px", opacity: 0.25 },
  { left: "30%", top: "15%", size: "5px", opacity: 0.19 },
  { left: "50%", top: "75%", size: "4px", opacity: 0.27 },
  { left: "95%", top: "20%", size: "3px", opacity: 0.31 },
];

interface HomeHero3DProps {
  onBookClick?: () => void;
}

export default function HomeHero3D({ onBookClick }: HomeHero3DProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.08]);
  const y = useTransform(scrollY, [0, 500], [0, -40]);

  // Handle device detection
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Title entrance
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      // Subtitle entrance
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }

      // CTA Buttons stagger
      if (ctaRef.current?.children) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 0.8,
          }
        );
      }

      // Stats stagger
      if (statsRef.current?.children) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 1.0,
          }
        );
      }

      // Floating ambient particles animation
      if (particlesRef.current?.children) {
        gsap.to(particlesRef.current.children, {
          y: "random(-80, 80)",
          x: "random(-40, 40)",
          opacity: 0.4,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            amount: 2,
            from: "random",
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Video Load and Switch Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setVideoLoaded(false);
    setVideoError(false);

    const handleLoadedData = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay policy fallback
        setVideoLoaded(true);
      });
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    // Trigger load when source changes
    video.load();

    if (video.readyState >= 3) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, [isMobile]);

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      setIsBookingModalOpen(true);
    }
  };

  // Mux Video URLs for Desktop vs Mobile
  const currentPlaybackId = isMobile ? MOBILE_PLAYBACK_ID : DESKTOP_PLAYBACK_ID;
  const mp4Url = `https://stream.mux.com/${currentPlaybackId}/high.mp4`;
  const m3u8Url = `https://stream.mux.com/${currentPlaybackId}.m3u8`;
  const posterUrl = `https://image.mux.com/${currentPlaybackId}/thumbnail.jpg?time=1`;

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[580px] sm:min-h-[680px] max-h-[1080px] overflow-hidden bg-[#0a0a14] flex flex-col justify-center items-center"
      >
        {/* Background Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6dc065]/10 via-transparent to-[#b2d235]/10 z-0 pointer-events-none" />

        {/* Video Fullscreen Background Container */}
        <motion.div
          style={{ opacity, scale, y }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="relative w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"
                }`}
              poster={posterUrl}
              playsInline
              muted
              loop
              autoPlay
              preload="auto"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                transform: "scale(1.03)",
              }}
            >
              <source src={m3u8Url} type="application/x-mpegURL" />
              <source src={mp4Url} type="video/mp4" />
            </video>

            {/* Poster / Fallback Background Image */}
            {(!videoLoaded || videoError) && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
                style={{
                  backgroundImage: `url(${posterUrl})`,
                  backgroundColor: "#0a0a14",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14]/40 via-[#0a0a14]/60 to-[#0a0a14]" />
              </div>
            )}

            {/* Dark gradient overlays for crisp readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/50 to-[#0a0a14]/30 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/60 via-transparent to-[#0a0a14]/60" />
          </div>
        </motion.div>

        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {PARTICLE_POSITIONS.map((p, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-[#6dc065] to-[#b2d235] rounded-full shadow-[0_0_8px_#6dc065]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto pt-10 sm:pt-16 pb-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg"
          >
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6dc065] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#6dc065]" />
            </span>
            <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider sm:tracking-widest">
              INDIA&apos;S #1 TRAMPOLINE PARK 🎪
            </span>
          </motion.div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="max-w-5xl text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.12] sm:leading-[1.05] tracking-tight text-white drop-shadow-2xl"
          >
            Jump into the <br />
            <span className="bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235] bg-clip-text text-transparent">
              Extraordinary!
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="max-w-2xl mt-3 sm:mt-6 text-xs xs:text-sm sm:text-lg md:text-xl text-slate-200 leading-normal sm:leading-relaxed font-medium drop-shadow px-2"
          >
            Experience the ultimate thrill of defying gravity at India&apos;s happiest
            trampoline & play park. Endless excitement for kids, teens, and families!
          </p>

          {/* CTA Buttons - Side by Side in same line */}
          <div
            ref={ctaRef}
            className="flex flex-row items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-8 w-full px-2"
          >
            <button
              onClick={handleBookClick}
              className="group relative px-3.5 py-2.5 sm:px-8 sm:py-3.5 text-[11px] xs:text-xs sm:text-base font-black text-slate-900 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(109,192,101,0.35)] shrink-0 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #6dc065 0%, #8fc93a 50%, #b2d235 100%)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                🎂 Book Tickets
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            <a
              href="#explore"
              className="px-3.5 py-2.5 sm:px-7 sm:py-3.5 text-[11px] xs:text-xs sm:text-base font-bold text-white border border-white/30 hover:border-white/70 rounded-full backdrop-blur-md bg-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-md text-center shrink-0 whitespace-nowrap"
            >
              Explore 👇
            </a>
          </div>

          {/* Trust Stats Bar */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-8 mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-white/15 w-full max-w-4xl px-2 sm:px-0"
          >
            {[
              { label: "Happy Jumpers", value: "10,000+", icon: "😊" },
              { label: "Park Locations", value: "20+", icon: "📍" },
              { label: "Years of Joy", value: "10+", icon: "🏆" },
              { label: "Parent Rating", value: "4.9 ★", icon: "⭐" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center hover:bg-white/20 transition-colors"
              >
                <div className="text-base sm:text-xl mb-0.5">{stat.icon}</div>
                <div className="text-sm xs:text-base sm:text-2xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-xs text-slate-300 font-bold mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.a
          href="#explore"
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors cursor-pointer"
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-black">
            Scroll to Explore
          </span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#6dc065]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.a>

        {/* Bottom Section Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </section>

      {/* Embedded Booking Modal */}
      <BirthdayBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}