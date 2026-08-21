"use client";

import { useRef, useEffect } from "react";
import LottieIcon from "./LottieIcon";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function HomeIntroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFrontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 2-3 Layer Parallax with scrub: true
      if (layerBackRef.current) {
        gsap.to(layerBackRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (layerMidRef.current) {
        gsap.to(layerMidRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (layerFrontRef.current) {
        gsap.to(layerFrontRef.current, {
          y: -110,
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-br from-emerald-950 via-[#0a0a14] to-slate-950 py-20 md:py-32 overflow-hidden border-t border-white/10 text-white"
    >
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#6dc065]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Left */}
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-black text-[#6dc065] uppercase tracking-widest backdrop-blur-md">
              🎈 Welcome to Jus Jumpin
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              Reimagining Playtime for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235]">
                Kids, Teens & Families
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Established in 2017, Jus Jumpin has transformed indoor entertainment across India.
              Our state-of-the-art play parks combine high-flying trampoline arenas, custom soft play zones,
              and interactive gaming, creating a vibrant sanctuary where fun meets fitness.
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Whether hosting unforgettable birthday parties, school outings, or family weekend adventures,
              every zone is built to international safety standards with 100% padded surfaces and certified supervisors.
            </p>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6dc065]/20 flex items-center justify-center text-xl">
                  🤸
                </div>
                <div>
                  <div className="text-sm font-black text-white">15+ Activities</div>
                  <div className="text-xs text-slate-400">Under One Roof</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">
                  🛡️
                </div>
                <div>
                  <div className="text-sm font-black text-white">100% Hygienic</div>
                  <div className="text-xs text-slate-400">Padded & Sanitized</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-row items-center gap-3">
              <Link
                href="/about"
                className="px-4 py-2.5 whitespace-nowrap bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-sm rounded-full hover:scale-105 transition-transform shadow-lg"
              >
                Learn Our Story →
              </Link>
              <Link
                href="#why-jus-jumpin"
                className="px-4 py-2.5 whitespace-nowrap bg-white/10 border border-white/20 text-white font-bold text-sm rounded-full hover:bg-white/20 transition-colors"
              >
                Why Choose Us 👇
              </Link>
            </div>
          </div>

          {/* Multi-Layer Parallax Illustration Right */}
          <div className="relative w-full flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]">
            {/* Layer 1: Back (Soft shapes / blobs) */}
            <div
              ref={layerBackRef}
              className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-[#6dc065]/20 via-emerald-600/10 to-purple-600/20 blur-2xl pointer-events-none"
            />

            {/* Layer 2: Mid (Activity Lottie Animation) */}
            <div
              ref={layerMidRef}
              className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] flex items-center justify-center"
            >
              <LottieIcon
                src="/json/gifimage2.json"
                alt="Jus Jumpin Park Experience Animation"
                className="w-full h-full"
              />
            </div>

            {/* Layer 3: Front (Floating Stats Card) */}
            <div
              ref={layerFrontRef}
              className="relative lg:absolute lg:bottom-6 lg:right-6 z-20 mt-2 lg:mt-0 bg-slate-900/90 border-2 border-[#6dc065] backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl max-w-[240px]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <div className="text-xs font-black text-[#6dc065] uppercase tracking-wide">
                    Non-Stop Joy
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">
                    Over 50,000+ Happy Bounces Daily!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
