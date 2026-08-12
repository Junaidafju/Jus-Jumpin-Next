"use client";

import { useRef, useState } from "react";
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
  const [locationStatus, setLocationStatus] = useState<"idle" | "fetching" | "success" | "denied">("idle");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const handleFindNearestStore = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocationStatus("denied");
      return;
    }

    setLocationStatus("fetching");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;

        let minDist = Infinity;
        let closestSlug = "";
        const computedDistances: Record<string, number> = {};

        locations.forEach((loc) => {
          if (loc.lat && loc.lng) {
            const dist = getHaversineDistance(uLat, uLng, loc.lat, loc.lng);
            computedDistances[loc.slug] = dist;
            if (dist < minDist) {
              minDist = dist;
              closestSlug = loc.slug;
            }
          }
        });

        if (closestSlug) {
          setNearestSlug(closestSlug);
          setDistances(computedDistances);
          setLocationStatus("success");
          
          // Scroll nearest store into view
          const nearestIndex = locations.findIndex((l) => l.slug === closestSlug);
          if (nearestIndex !== -1 && scrollTrackRef.current) {
            setTimeout(() => {
              const track = scrollTrackRef.current;
              if (track) {
                const cardWidth = track.firstElementChild?.clientWidth || 320;
                track.scrollTo({ left: nearestIndex * (cardWidth + 24), behavior: "smooth" });
              }
            }, 100);
          }
        } else {
          setLocationStatus("denied");
        }
      },
      () => {
        setLocationStatus("denied");
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  };

  const handleScroll = () => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth || 320;
    const index = Math.round(track.scrollLeft / (cardWidth + 24));
    setCurrentScrollIndex(index);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth || 320;
    const scrollAmt = direction === "left" ? -(cardWidth + 24) : (cardWidth + 24);
    track.scrollBy({ left: scrollAmt, behavior: "smooth" });
  };

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

          {/* Location Request Panel (Hidden when nearest store is fetched) */}
          {!nearestLoc && (
            <div className="max-w-3xl mx-auto mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl">
              <span className="text-3xl mb-3 animate-pulse">📍</span>
              <p className="text-base sm:text-lg font-black text-white mb-4">
                Find your nearest store, give location access.
              </p>
              <div className="w-full border-t border-white/10 my-3" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
                <button
                  onClick={handleFindNearestStore}
                  disabled={locationStatus === "fetching"}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-full hover:scale-105 transition-all text-center shadow-lg uppercase tracking-wider cursor-pointer"
                >
                  {locationStatus === "fetching" ? "Locating..." : "Find nearest Store"}
                </button>
                <a
                  href="tel:+919830359999"
                  className="w-full sm:w-auto px-6 py-3 bg-white/10 border border-white/20 text-white font-bold text-xs rounded-full hover:bg-white/20 transition-colors text-center uppercase tracking-wider"
                >
                  Call Us
                </a>
              </div>
              {locationStatus === "denied" && (
                <p className="text-xs text-rose-400 font-semibold mt-3">
                  Location access was denied or unavailable. Please browse venues in the carousel below!
                </p>
              )}
            </div>
          )}

          {/* Nearest Store Matched Banner (Shown only when nearestLoc is active/fetched) */}
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

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={nearestLoc.mapsDirectionsUrl || `https://www.google.com/maps/search/?api=1&query=Jus+Jumpin+${encodeURIComponent(nearestLoc.mall)}+${encodeURIComponent(nearestLoc.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-full hover:scale-105 transition-transform text-center shadow-lg uppercase tracking-wider"
                >
                  Visit Venue
                </a>
                <a
                  href="https://jusjumpin.co.in/customer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-white/10 border border-white/20 text-white font-bold text-xs rounded-full hover:bg-white/20 transition-colors text-center uppercase tracking-wider"
                >
                  Book Tickets
                </a>
              </div>
            </div>
          )}

          {/* Carousel Layout with Controls */}
          <div className="relative group/carousel w-full">
            {/* Left navigation arrow */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-12 h-12 rounded-full bg-slate-950/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#6dc065] hover:text-slate-950 hover:border-[#6dc065] transition-all shadow-2xl cursor-pointer"
              aria-label="Previous Location"
            >
              <span className="text-xl font-black">←</span>
            </button>

            {/* Scrollable track */}
            <div
              ref={scrollTrackRef}
              onScroll={handleScroll}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth hide-scrollbar snap-x snap-mandatory"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
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
                          className="flex-1 px-3.5 py-2.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-xl hover:scale-105 transition-transform text-center shadow-md cursor-pointer"
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

            {/* Right navigation arrow */}
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-12 h-12 rounded-full bg-slate-950/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#6dc065] hover:text-slate-950 hover:border-[#6dc065] transition-all shadow-2xl cursor-pointer"
              aria-label="Next Location"
            >
              <span className="text-xl font-black">→</span>
            </button>
          </div>

          {/* Animated Dots Indicator */}
          <div className="flex justify-center flex-wrap items-center gap-1.5 mt-6 mb-2">
            {locations.map((loc, idx) => (
              <button
                key={`dot-${loc.slug}`}
                onClick={() => {
                  const track = scrollTrackRef.current;
                  if (!track) return;
                  const cardWidth = track.firstElementChild?.clientWidth || 320;
                  track.scrollTo({ left: idx * (cardWidth + 24), behavior: "smooth" });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentScrollIndex
                    ? "w-5 bg-[#6dc065] shadow-[0_0_8px_rgba(109,192,101,0.6)]"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Carousel Hint */}
          <div className="text-center mt-4 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
            <span>← Use arrows or swipe/scroll to explore all 20+ locations →</span>
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
