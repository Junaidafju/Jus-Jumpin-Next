"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    id: 1,
    title: "1. Safety First, Always",
    subtitle: "Zero-Compromise Child Security",
    description: "Every single pillar, mat, and wall is lined with multi-layer high-density foam. Certified safety captains supervise every zone 24/7.",
    icon: "🛡️",
    badge: "100% Padded & Sanitized",
    image: "/image/safety_officer.png",
  },
  {
    id: 2,
    title: "2. Unforgettable Birthdays",
    subtitle: "Hassle-Free Party Suites",
    description: "Private celebration suites, dedicated party hosts, custom balloon decor, and delicious catering so parents can sit back and enjoy.",
    icon: "🎂",
    badge: "5,000+ Parties Hosted",
    image: "/image/birthday/photos.jpg",
  },
  {
    id: 3,
    title: "3. Family Friendly Zones",
    subtitle: "Fun for Toddlers to Adults",
    description: "Separate soft-play zones for toddlers aged 1–5, and high-energy trampoline arenas for teens and adults to jump together.",
    icon: "👨‍👩‍👧‍👦",
    badge: "All Ages Welcome",
    image: "/image/birthday/photo-moments.jpg",
  },
  {
    id: 4,
    title: "4. In-House Refuel Cafe",
    subtitle: "Delicious Snacks & Drinks",
    description: "Recharge with fresh pizzas, burgers, fries, milkshakes, and hot coffees while watching your kids play from our lounge.",
    icon: "🍕",
    badge: "Fresh & Hygienic Food",
    image: "/image/Indian Kids Eating at Jus Jumpin.webp",
  },
  {
    id: 5,
    title: "5. 100% Air-Conditioned",
    subtitle: "All-Weather Indoor Comfort",
    description: "Rain or shine, heatwave or monsoons — our climate-controlled parks stay at a pleasant 22°C year round.",
    icon: "❄️",
    badge: "Climate Controlled",
    image: "/image/birthday/exclusive-access.jpg",
  },
  {
    id: 6,
    title: "6. Unmatched Variety",
    subtitle: "15+ Activities At Each Store",
    description: "Our dynamic roster of attractions & themed events guarantees a unique and thrilling experience with every return.",
    icon: "🏅",
    badge: "European Standard",
    image: "/image/international_safety.png",
  },
  {
    id: 7,
    title: "7. India's Largest Play Parks",
    subtitle: "Sprawling Indoor Arenas",
    description: "Massive venues reaching up to 15,000+ sq. ft. packed with multi-level mazes, high ropes, and warrior obstacle courses.",
    icon: "🏰",
    badge: "Up to 15,000 Sq. Ft.",
    image: "/image/largest_play_area.png",
  },
  {
    id: 8,
    title: "8. Flexible Hours",
    subtitle: "Extended Timings",
    description: "Jump In Whenever the Moment Strikes! We're here for your spontaneous fun and planned play, 7 days a week.",
    icon: "⏰",
    badge: "Open Late",
    image: "/image/Flexible Timing.png",
  },
];

export default function WhyJusJumpinSticky() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !textColumnRef.current || !stickyRef.current || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger pinning guarantees fixed image position across the text runway
      ScrollTrigger.create({
        trigger: textColumnRef.current,
        start: "top top+=112",
        end: "bottom bottom+=20",
        pin: stickyRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // 2. Track scroll thresholds of each text block to trigger image crossfades
      REASONS.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `#why-reason-block-${index}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-jus-jumpin"
      ref={containerRef}
      className="relative w-full bg-[#0a0a14] py-20 md:py-28 text-white border-t border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black text-[#6dc065] uppercase tracking-widest mb-4 backdrop-blur-md">
            ✨ The Jus Jumpin Advantage
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Why We Are India&apos;s <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235]">
              #1 Preferred Play Destination
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4 font-medium">
            Discover the 8 pillars that make every visit safe, exhilarating, and unforgettable.
          </p>
        </div>

        {/* 
          Desktop Pinned Layout (>= 768px)
          - Shared Grid Row with `items-start`
          - Single sticky image element (`stickyRef`) pinned by GSAP at top-28
          - Single text column container (`textColumnRef`) holding all 8 text blocks
        */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start relative w-full">

          {/* SINGLE Sticky Image Column (Col 5) */}
          <div
            ref={stickyRef}
            className="md:col-span-5 sticky top-28 h-[520px] rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] bg-slate-900 z-10"
          >
            {/* Top Emergence Mask Overlay */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0a0a14]/90 via-[#0a0a14]/30 to-transparent z-20 pointer-events-none" />

            {/* 8 Image Crossfade Layers */}
            {REASONS.map((reason, idx) => (
              <div
                key={reason.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === activeIndex
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
                  }`}
              >
                <Image
                  src={reason.image}
                  alt={reason.title}
                  fill
                  className="object-cover"
                  sizes="500px"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/50 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {/* SINGLE Scrollable Text Column Container (Col 7) */}
          <div ref={textColumnRef} className="md:col-span-7 flex flex-col gap-24 py-2">
            {REASONS.map((reason, index) => (
              <div
                key={reason.id}
                id={`why-reason-block-${index}`}
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
                className={`min-h-[480px] flex flex-col justify-center p-8 sm:p-10 rounded-3xl transition-all duration-500 ${index === activeIndex
                  ? "bg-white/[0.08] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_25px_60px_rgba(0,0,0,0.6)] opacity-100 scale-[1.02]"
                  : "bg-white/[0.05] border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.5)] opacity-50 hover:opacity-80 scale-100"
                  }`}
              >
                {/* Pillar Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{reason.icon}</span>
                  <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-[#6dc065]/20 border border-[#6dc065]/40 text-[#6dc065] uppercase tracking-wider">
                    {reason.badge}
                  </span>
                </div>

                {/* Pillar Heading & Subheading */}
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {reason.title}
                </h3>
                <h4 className="text-base sm:text-lg font-bold text-[#6dc065] mt-1.5">
                  {reason.subtitle}
                </h4>

                {/* Pillar Body Text */}
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-4 font-medium">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile Stacked Cards Fallback (< 768px) */}
        <div className="grid md:hidden grid-cols-1 gap-6">
          {REASONS.map((reason) => (
            <div
              key={reason.id}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              className="bg-white/[0.06] border border-white/15 rounded-3xl overflow-hidden p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-white/10">
                <Image
                  src={reason.image}
                  alt={reason.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-black text-[#6dc065]">
                  {reason.badge}
                </div>
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-2xl">{reason.icon}</span>
                <h3 className="text-lg font-black text-white">
                  {reason.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 font-medium leading-relaxed mt-1">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
