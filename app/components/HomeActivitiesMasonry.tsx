"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BirthdayBookingModal from "./birthday/BirthdayBookingModal";

gsap.registerPlugin(ScrollTrigger);

const ACTIVITIES = [
  {
    title: "Interconnected Trampolines",
    category: "High Action",
    emoji: "🤸",
    size: "col-span-1 md:col-span-2 md:row-span-2",
    height: "h-72 md:h-full min-h-[320px]",
    image: "/image/birthday/photos.jpg",
    description: "Soar, flip, and bounce across interconnected wall-to-wall trampolines.",
  },
  {
    title: "Ninja Warrior Course",
    category: "Agility & Challenge",
    emoji: "🥷",
    size: "col-span-1 md:col-span-1 md:row-span-1",
    height: "h-64",
    image: "/image/birthday/kids-adult.jpg",
    description: "Test your speed and balance through obstacle courses.",
  },
  {
    title: "Giant Foam Pit",
    category: "Freestyle Landings",
    emoji: "🟦",
    size: "col-span-1 md:col-span-1 md:row-span-1",
    height: "h-64",
    image: "/image/birthday/dedicated-zones.jpg",
    description: "Launch off trampolines into thousands of soft foam cubes.",
  },
  {
    title: "Soft Play Wonderland",
    category: "Toddler Zone (1-6 yrs)",
    emoji: "🧸",
    size: "col-span-1 md:col-span-1 md:row-span-2",
    height: "h-72 md:h-full min-h-[320px]",
    image: "/image/birthday/delectable-food.jpg",
    description: "Safe, cushioned mazes and slides designed for little ones.",
  },
  {
    title: "Basketball Slam Dunk",
    category: "Sports Action",
    emoji: "🏀",
    size: "col-span-1 md:col-span-2 md:row-span-1",
    height: "h-64",
    image: "/image/birthday/photos.jpg",
    description: "Bounce sky-high and slam dunk like a pro player.",
  },
  {
    title: "Wall Climbing Arena",
    category: "Adventure Climb",
    emoji: "🧗",
    size: "col-span-1 md:col-span-1 md:row-span-1",
    height: "h-64",
    image: "/image/birthday/kids-adult.jpg",
    description: "Climb colorful wall grips with automated harness safety.",
  },
  {
    title: "Dodgeball Arena",
    category: "Team Challenge",
    emoji: "🏐",
    size: "col-span-1 md:col-span-1 md:row-span-1",
    height: "h-64",
    image: "/image/birthday/dedicated-zones.jpg",
    description: "High-flying trampoline dodgeball matches with friends.",
  },
  {
    title: "Spiral Racing Slides",
    category: "Multi-Lane Thrill",
    emoji: "🛝",
    size: "col-span-1 md:col-span-2 md:row-span-1",
    height: "h-64",
    image: "/image/birthday/delectable-food.jpg",
    description: "Race down multi-lane spiral slides for endless giggles.",
  },
  {
    title: "Giant Ball Pool",
    category: "Sensory Fun",
    emoji: "🟡",
    size: "col-span-1 md:col-span-1 md:row-span-1",
    height: "h-64",
    image: "/image/birthday/photos.jpg",
    description: "Dive into a ocean of colorful play balls.",
  },
];

export default function HomeActivitiesMasonry() {
  const containerRef = useRef<HTMLElement>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Efficient Batch Entrance Animation using ScrollTrigger.batch
      ScrollTrigger.batch(".activity-masonry-card", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        },
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="activities"
        ref={containerRef}
        className="relative w-full bg-gradient-to-b from-[#0a0a14] via-slate-950 to-[#0a0a14] py-20 md:py-28 overflow-hidden text-white border-t border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black text-[#6dc065] uppercase tracking-widest mb-4 backdrop-blur-md">
              🎮 15+ World-Class Attractions
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235]">Action-Packed Zones</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 font-medium">
              From high-flying trampoline courts to toddler soft play mazes — discover non-stop excitement.
            </p>
          </div>

          {/* Masonry CSS Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[240px]">
            {ACTIVITIES.map((act, index) => (
              <div
                key={index}
                className={`activity-masonry-card group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/15 shadow-xl transition-all duration-300 ${act.size} ${act.height}`}
              >
                {/* Background Image with Pure CSS Hover Zoom */}
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 500px"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:via-slate-950/70 transition-colors duration-300" />

                {/* Emoji & Category Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md flex items-center justify-center text-lg border border-white/20">
                    {act.emoji}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-black text-[#6dc065] uppercase tracking-wider">
                    {act.category}
                  </span>
                </div>

                {/* Card Bottom Content & Hover Slide-Up Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#6dc065] transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Pure CSS Hover Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transform sm:translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-xl hover:scale-105 transition-transform text-center shadow-md"
                    >
                      Book Zone
                    </button>
                    <Link
                      href="/our-activities"
                      className="px-3.5 py-2 bg-white/15 border border-white/20 text-white font-bold text-xs rounded-xl hover:bg-white/30 transition-colors text-center"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/our-activities"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-sm rounded-full hover:scale-105 transition-transform shadow-xl"
            >
              Explore All 15+ Activities & Rides →
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BirthdayBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
