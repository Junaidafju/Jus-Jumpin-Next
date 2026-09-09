"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "../../lib/utils";

const ACTIVITIES = [
  {
    title: "Interconnected Trampolines",
    image: "/image/birthday/photos.jpg",
    description: "Soar, flip, and bounce across interconnected wall-to-wall trampolines.",
    category: "Bounce & Fly",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Ninja Warrior Course",
    image: "/image/intro/activity-ninja.webp",
    description: "Test your speed and balance through obstacle courses.",
    category: "Challenge",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Giant Foam Pit",
    image: "/image/foam-pit.jpg",
    description: "Launch off trampolines into thousands of soft foam cubes.",
    category: "Adventure",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Soft Play Wonderland",
    image: "/image/intro/activity-softplay.webp",
    description: "Safe, cushioned mazes and slides designed for little ones.",
    category: "Kids Zone",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Basketball Slam Dunk",
    image: "/image/intro/Basketball-Slam-Dunk.webp",
    description: "Bounce sky-high and slam dunk like a pro player.",
    category: "Sports",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    title: "Wall Climbing Arena",
    image: "/image/intro/Wall-climb.webp",
    description: "Climb colorful wall grips with automated harness safety.",
    category: "Challenge",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Dodgeball Arena",
    image: "/image/intro/activity-dodgeball.webp",
    description: "High-flying trampoline dodgeball matches with friends.",
    category: "Sports",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    title: "Spiral Racing Slides",
    image: "/image/intro/spiral-slide.webp",
    description: "Race down multi-lane spiral slides for endless giggles.",
    category: "Adventure",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Giant Ball Pool",
    image: "/image/intro/giant-ball-pool.webp",
    description: "Dive into an ocean of colorful play balls.",
    category: "Kids Zone",
    color: "from-indigo-500/20 to-purple-500/20",
  },
];

export default function PremiumGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateYSpring = useSpring(rotateY, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 15;
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -15;

    rotateY.set(rotateYValue);
    rotateX.set(rotateXValue);
  }, [rotateY, rotateX]);

  const handleMouseLeave = useCallback(() => {
    rotateY.set(0);
    rotateX.set(0);
  }, [rotateY, rotateX]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % ACTIVITIES.length);
    setIsZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + ACTIVITIES.length) % ACTIVITIES.length);
    setIsZoomed(false);
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setIsAutoPlaying(false);
  }, []);

  const handleDragEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false);
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  }, [dragStartX, handleNext, handlePrev]);

  useEffect(() => {
    if (isAutoPlaying && !isLightboxOpen) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % ACTIVITIES.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isLightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsLightboxOpen(false);
          setIsZoomed(false);
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'z':
        case 'Z':
          setIsZoomed(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev]);

  const currentActivity = ACTIVITIES[activeIndex];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow effects */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)',
            'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)',
            'radial-gradient(circle, rgba(34,197,94,0.3), transparent 70%)',
            'radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Premium Experience Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-6 tracking-tight">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Wonderland
            </span>
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-2">
            Immerse yourself in a world of adventure, excitement, and unforgettable memories
          </p>
        </motion.div>

        {/* Main Gallery */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 sm:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 sm:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Main display */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            className={cn(
              "relative cursor-grab active:cursor-grabbing select-none",
              isDragging && "cursor-grabbing"
            )}
          >
            <motion.div
              style={{ rotateX: rotateXSpring, rotateY: rotateYSpring }}
              className="relative perspective-1000"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  {/* Image */}
                  <Image
                    src={currentActivity.image}
                    alt={currentActivity.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      isZoomed ? "scale-150" : "scale-100 group-hover:scale-105 sm:group-hover:scale-110"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1400px"
                    priority
                  />

                  {/* Gradient overlay - concentrated lower on mobile for maximum image clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-35% to-transparent sm:from-black/85 sm:via-black/25 sm:via-45%" />

                  {/* Content overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 md:mb-3">
                      <span className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-emerald-500/30 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs md:text-sm font-semibold text-white tracking-wide">
                        {currentActivity.category}
                      </span>
                      <span className="text-[11px] sm:text-xs md:text-sm font-medium text-white/80">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(ACTIVITIES.length).padStart(2, '0')}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2 md:mb-3 leading-tight tracking-tight drop-shadow-md">
                      {currentActivity.title}
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200/90 sm:text-slate-300 max-w-2xl line-clamp-2 sm:line-clamp-none leading-relaxed">
                      {currentActivity.description}
                    </p>
                  </motion.div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      className="p-1.5 sm:p-2 rounded-lg bg-black/40 sm:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                      aria-label="Open lightbox"
                    >
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 sm:mt-6 lg:mt-8 flex sm:grid sm:grid-cols-9 gap-2 sm:gap-2.5 lg:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory sm:snap-none justify-start sm:justify-center px-1">
            {ACTIVITIES.map((activity, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsZoomed(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex-shrink-0 w-14 h-14 sm:w-auto sm:h-auto aspect-square rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 snap-center",
                  index === activeIndex
                    ? "ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/30 scale-105 sm:scale-100"
                    : "opacity-50 hover:opacity-75"
                )}
              >
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 60px, 120px"
                />
                {index === activeIndex && (
                  <div className="absolute inset-0 bg-emerald-500/20" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-center gap-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-xs sm:text-sm font-semibold text-white shadow-sm"
            >
              {isAutoPlaying ? 'Pause Auto Play' : 'Start Auto Play'}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4"
            onClick={() => {
              setIsLightboxOpen(false);
              setIsZoomed(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] p-2 sm:p-4 flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentActivity.image}
                  alt={currentActivity.title}
                  fill
                  className={cn(
                    "object-contain transition-transform duration-500",
                    isZoomed ? "scale-150" : "scale-100"
                  )}
                  sizes="100vw"
                  quality={100}
                />

                {/* Lightbox controls */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2 z-20">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 sm:p-3 rounded-full bg-black/50 sm:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                    aria-label="Toggle zoom"
                  >
                    {isZoomed ? (
                      <ZoomOut className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsLightboxOpen(false);
                      setIsZoomed(false);
                    }}
                    className="p-2 sm:p-3 rounded-full bg-black/50 sm:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                    aria-label="Close lightbox"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </button>
                </div>

                {/* Lightbox navigation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 sm:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors z-20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 sm:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors z-20"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>

                {/* Bottom title in lightbox on mobile */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 text-center pointer-events-none">
                  <p className="text-xs sm:text-base font-semibold text-white/90 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block">
                    {currentActivity.title} ({activeIndex + 1}/{ACTIVITIES.length})
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}