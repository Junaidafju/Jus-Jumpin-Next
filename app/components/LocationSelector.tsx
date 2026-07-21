"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { locations } from "@/lib/locations/data";
import { LocationData } from "@/types/location";
import BirthdayBookingModal from "./birthday/BirthdayBookingModal";

function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function LocationSelector() {
  const [nearestSlug, setNearestSlug] = useState<string | null>(null);
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [userCity, setUserCity] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // 1. Silent Geolocation Request on Mount
  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) return;

    // Run after first paint to prevent blocking
    const timer = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const uLat = pos.coords.latitude;
          const uLng = pos.coords.longitude;

          let minDist = Infinity;
          let closestSlug = "";
          let closestCity = "";
          const computedDistances: Record<string, number> = {};

          locations.forEach((loc) => {
            if (loc.lat && loc.lng) {
              const dist = getHaversineDistance(uLat, uLng, loc.lat, loc.lng);
              computedDistances[loc.slug] = dist;
              if (dist < minDist) {
                minDist = dist;
                closestSlug = loc.slug;
                closestCity = loc.city;
              }
            }
          });

          if (closestSlug) {
            setNearestSlug(closestSlug);
            setUserCity(closestCity);
            setDistances(computedDistances);
          }
        },
        () => {
          // Permission denied or unavailable — silent fallback, do nothing
        },
        { timeout: 8000, maximumAge: 60000 }
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 2. Pure RAF Auto-Scroll Loop for Carousel
  const startAutoScroll = useCallback(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const scrollSpeed = 0.6; // pixels per frame

    const step = () => {
      if (!isPausedRef.current && track) {
        track.scrollLeft += scrollSpeed;
        // Continuous loop wrap
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 5) {
          track.scrollLeft = 0;
        }
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [startAutoScroll]);

  const nearestLoc = locations.find((l) => l.slug === nearestSlug);

  return (
    <>
      <section
        id="locations"
        className="relative w-full bg-[#0a0a14] py-16 md:py-24 overflow-hidden border-t border-white/10 text-white"
      >
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6dc065]/5 via-transparent to-purple-900/10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black text-[#6dc065] uppercase tracking-widest mb-4 backdrop-blur-md">
              📍 Find Your Nearest Arena
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] to-[#b2d235]">20+ Play Parks</span> Across India
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 font-medium">
              Locate the happiest trampoline & soft play zone near you and jump straight into action!
            </p>
          </div>

          {/* 3. Compact Geolocation Matched Banner */}
          {nearestLoc && (
            <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-gradient-to-r from-[#6dc065]/20 via-emerald-900/30 to-[#b2d235]/20 border-2 border-[#6dc065]/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <span className="text-3xl animate-bounce">📍</span>
                <div>
                  <div className="text-xs text-[#6dc065] font-black uppercase tracking-wider">
                    Nearest Park Detected ({distances[nearestLoc.slug]} km away)
                  </div>
                  <div className="text-base sm:text-lg font-black text-white">
                    {nearestLoc.city} — {nearestLoc.mall}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/${nearestLoc.slug}`}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-full hover:scale-105 transition-transform text-center shadow-lg"
                >
                  Visit Venue →
                </Link>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 border border-white/20 text-white font-bold text-xs rounded-full hover:bg-white/20 transition-colors text-center"
                >
                  Book Tickets
                </button>
              </div>
            </div>
          )}

          {/* 4. Native CSS Scroll-Snap Carousel */}
          <div
            ref={scrollTrackRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
            }}
            onTouchStart={() => {
              isPausedRef.current = true;
            }}
            onTouchEnd={() => {
              setTimeout(() => {
                isPausedRef.current = false;
              }, 2000);
            }}
          >
            {locations.map((loc) => {
              const isNearest = loc.slug === nearestSlug;
              const dist = distances[loc.slug];
              const cardImage =
                loc.flipCardImage || loc.heroImages?.[0] || "/image/locations/kolkata-abc/hero-1.jpg";

              return (
                <div
                  key={loc.slug}
                  className={`snap-center shrink-0 w-[270px] sm:w-[320px] rounded-3xl overflow-hidden bg-white/5 border transition-all duration-300 flex flex-col justify-between group ${
                    isNearest
                      ? "border-2 border-[#6dc065] shadow-[0_0_25px_rgba(109,192,101,0.4)] bg-gradient-to-b from-emerald-950/40 to-white/5 scale-[1.02]"
                      : "border-white/10 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {/* Card Image Header */}
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-slate-900">
                    <Image
                      src={cardImage}
                      alt={`${loc.city} - ${loc.mall}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 270px, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-80" />

                    {/* "You are here" Pill */}
                    {isNearest && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#6dc065] text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                        You Are Here
                      </div>
                    )}

                    {/* Distance Tag */}
                    {dist !== undefined && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                        📍 {dist} km away
                      </div>
                    )}

                    {/* Location Badge */}
                    <div className="absolute bottom-3 left-3 text-xs font-black text-[#6dc065] bg-slate-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                      {loc.type === "adults-kids" ? "Adults & Kids Arena 🚀" : "Kids Play Zone 🧸"}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white group-hover:text-[#6dc065] transition-colors leading-tight">
                        {loc.city}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium mt-1 line-clamp-1">
                        {loc.mall}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {loc.address}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                      <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="flex-1 px-3.5 py-2.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-xl hover:scale-105 transition-transform text-center shadow-md"
                      >
                        Book Tickets
                      </button>
                      <Link
                        href={`/${loc.slug}`}
                        className="px-3.5 py-2.5 bg-white/10 border border-white/20 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-colors text-center"
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Hint */}
          <div className="text-center mt-4 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
            <span>← Swipe or scroll to explore all 20+ locations →</span>
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
