"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { locations } from "@/lib/locations/data";
import { LocationData } from "@/types/location";
import BirthdayBookingModal from "./birthday/BirthdayBookingModal";
import { motion, AnimatePresence } from "framer-motion";

function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
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

  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "adults-kids" | "kids">("all");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const uniqueStates = ["All", ...Array.from(new Set(locations.map(loc => loc.stateName)))].filter(Boolean);

  const filteredLocations = useMemo(() => {
    let filtered = locations.filter((loc) => {
      const matchesState = selectedState === "All" || loc.stateName.toLowerCase() === selectedState.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        loc.city.toLowerCase().includes(query) ||
        loc.mall.toLowerCase().includes(query) ||
        loc.stateName.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query);
      const matchesType = selectedType === "all" || loc.type === selectedType;
      return matchesState && matchesSearch && matchesType;
    });

    if (userLocation && Object.keys(distances).length > 0) {
      filtered = filtered.sort((a, b) => {
        const distA = distances[a.slug] ?? Infinity;
        const distB = distances[b.slug] ?? Infinity;
        return distA - distB;
      });
    }

    return filtered;
  }, [locations, selectedState, searchQuery, selectedType, userLocation, distances]);

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

        setUserLocation({ lat: uLat, lng: uLng });

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
          setSelectedState("All");
          setSearchQuery("");
          setSelectedType("all");

          setTimeout(() => {
            const track = scrollTrackRef.current;
            if (track) {
              track.scrollTo({ left: 0, behavior: "smooth" });
            }
          }, 300);
        } else {
          setLocationStatus("denied");
        }
      },
      () => {
        setLocationStatus("denied");
        setUserLocation(null);
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

  // Fun emoji for buttons
  const ArrowButton = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.15,
        rotate: direction === "left" ? -10 : 10,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.85 }}
      animate={{
        y: [0, -3, 0],
        transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
      }}
      className={`absolute ${direction === "left" ? "left-0 -translate-x-2 md:-translate-x-4" : "right-0 translate-x-2 md:translate-x-4"} top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#6dc065] to-[#b2d235] shadow-[0_8px_25px_rgba(109,192,101,0.5)] hover:shadow-[0_12px_35px_rgba(109,192,101,0.7)] flex items-center justify-center transition-all cursor-pointer border-3 border-white/30`}
    >
      <span className="text-3xl md:text-4xl font-black text-slate-950 leading-none">
        {direction === "left" ? "<" : ">"}
      </span>
      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
    </motion.button>
  );

  return (
    <>
      <section
        id="locations"
        className="relative w-full bg-[#0a0a14] py-16 md:py-24 overflow-hidden border-t border-white/10 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#6dc065]/5 via-transparent to-purple-900/10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black text-[#6dc065] uppercase tracking-widest mb-4 backdrop-blur-md"
            >
              📍 Find Your Nearest Arena
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] to-[#b2d235]">20+ Play Parks</span> Across India
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base mt-3 font-medium"
            >
              Locate the happiest trampoline & soft play zone near you and jump straight into action!
            </motion.p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col gap-4 max-w-4xl mx-auto mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center w-full">
              <div className="relative w-full md:flex-1">
                <input
                  type="text"
                  placeholder="🔍 Search by city, mall, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#6dc065] focus:ring-2 focus:ring-[#6dc065]/30 transition-all text-sm font-medium backdrop-blur-md shadow-inner"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              <motion.button
                onClick={handleFindNearestStore}
                disabled={locationStatus === "fetching"}
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-2xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg uppercase tracking-wider cursor-pointer whitespace-nowrap"
              >
                <span className="text-xl">🎯</span>
                <span>{locationStatus === "fetching" ? "Locating..." : "Detect Location"}</span>
              </motion.button>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Filter:
              </span>
              {[
                { id: "all", label: "🏟️ All Arenas" },
                { id: "adults-kids", label: "🚀 Adults & Kids" },
                { id: "kids", label: "🧸 Kids Only" },
              ].map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setSelectedType(type.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${selectedType === type.id
                    ? "bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 border-[#6dc065] shadow-lg"
                    : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                >
                  {type.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Status Messages */}
          {locationStatus === "denied" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto mb-6 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-semibold text-center"
            >
              ⚠️ Location access was denied or unavailable. Please browse venues below!
            </motion.div>
          )}

          {userLocation && locationStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto mb-4 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2"
            >
              <span>📍</span>
              <span>Showing arenas sorted by distance from your location</span>
            </motion.div>
          )}

          {/* State Filter Chips */}
          <div className="flex gap-2.5 overflow-x-auto pb-4 mb-10 hide-scrollbar justify-start md:justify-center px-2 scroll-smooth">
            {uniqueStates.map((state) => (
              <motion.button
                key={state}
                onClick={() => setSelectedState(state)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border ${selectedState === state
                  ? "bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 border-[#6dc065] shadow-[0_4px_12px_rgba(109,192,101,0.25)]"
                  : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
              >
                {state}
              </motion.button>
            ))}
          </div>

          {/* Nearest Store Banner */}
          {nearestLoc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto mb-10 p-5 rounded-3xl bg-gradient-to-r from-[#6dc065]/10 via-[#b2d235]/5 to-transparent border border-[#6dc065]/35 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <span className="text-3xl animate-bounce">📍</span>
                <div>
                  <div className="text-xs text-[#6dc065] font-black uppercase tracking-wider">
                    Nearest Park Detected ({distances[nearestLoc.slug]} km away)
                  </div>
                  <div className="text-lg font-black text-white">
                    {nearestLoc.city} — {nearestLoc.mall}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <motion.a
                  href={nearestLoc.mapsDirectionsUrl || `https://www.google.com/maps/search/?api=1&query=Jus+Jumpin+${encodeURIComponent(nearestLoc.mall)}+${encodeURIComponent(nearestLoc.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-xl hover:scale-105 transition-transform text-center shadow-lg uppercase tracking-wider"
                >
                  Visit Venue
                </motion.a>
                <motion.a
                  href="https://jusjumpin.co.in/customer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-white/10 border border-white/20 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-colors text-center uppercase tracking-wider flex items-center justify-center"
                >
                  Book Tickets
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* Carousel */}
          {filteredLocations.length > 0 ? (
            <div className="relative group/carousel w-full">
              {/* Fun Arrow Buttons */}
              <ArrowButton direction="left" onClick={() => scrollCarousel("left")} />
              <ArrowButton direction="right" onClick={() => scrollCarousel("right")} />

              {/* Scrollable track */}
              <div
                ref={scrollTrackRef}
                onScroll={handleScroll}
                className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-8 md:px-12 scroll-smooth hide-scrollbar snap-x snap-mandatory"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {filteredLocations.map((loc, idx) => {
                  const isNearest = loc.slug === nearestSlug;
                  const dist = distances[loc.slug];
                  const cardImage =
                    loc.flipCardImage || loc.heroImages?.[0] || "/image/locations/kolkata-abc/hero-1.jpg";

                  return (
                    <motion.div
                      key={loc.slug}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className={`snap-center shrink-0 w-[270px] sm:w-[320px] rounded-3xl overflow-hidden bg-white/5 border transition-all duration-300 flex flex-col justify-between group ${isNearest
                        ? "border-2 border-[#6dc065] shadow-[0_0_25px_rgba(109,192,101,0.4)] bg-gradient-to-b from-emerald-950/40 to-white/5 scale-[1.02]"
                        : "border-white/10 hover:border-white/30 hover:bg-white/10"
                        }`}
                    >
                      {/* Card Image */}
                      <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-slate-900">
                        <Image
                          src={cardImage}
                          alt={`${loc.city} - ${loc.mall}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 270px, 320px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-80" />

                        {isNearest && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#6dc065] text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                            You Are Here
                          </div>
                        )}

                        {dist !== undefined && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                            📍 {dist} km away
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 text-xs font-black text-[#6dc065] bg-slate-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                          {loc.type === "adults-kids" ? "Adults & Kids Arena 🚀" : "Kids Play Zone 🧸"}
                        </div>
                      </div>

                      {/* Card Content */}
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

                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                          <motion.a
                            href="https://jusjumpin.co.in/customer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 px-3.5 py-2.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs rounded-xl hover:scale-105 transition-transform text-center shadow-md flex items-center justify-center cursor-pointer"
                          >
                            Book Tickets
                          </motion.a>
                          <Link
                            href={`/${loc.slug}`}
                            className="px-3.5 py-2.5 bg-white/10 border border-white/20 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-colors text-center"
                          >
                            Explore →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center py-12 px-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center"
            >
              <span className="text-5xl mb-4">🏟️</span>
              <h3 className="text-lg font-black text-white">No Arenas Found</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                We couldn't find any play zones matching your selected region or search term.
              </p>
              <motion.button
                onClick={() => {
                  setSelectedState("All");
                  setSearchQuery("");
                  setSelectedType("all");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-5 py-2.5 bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white text-xs font-black rounded-full uppercase tracking-wider cursor-pointer"
              >
                Reset Search
              </motion.button>
            </motion.div>
          )}

          {/* Dot Indicators */}
          {filteredLocations.length > 0 && (
            <div className="flex justify-center flex-wrap items-center gap-1.5 mt-6 mb-2">
              {filteredLocations.map((loc, idx) => (
                <motion.button
                  key={`dot-${loc.slug}`}
                  onClick={() => {
                    const track = scrollTrackRef.current;
                    if (!track) return;
                    const cardWidth = track.firstElementChild?.clientWidth || 320;
                    track.scrollTo({ left: idx * (cardWidth + 24), behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.3 }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentScrollIndex
                    ? "w-5 bg-[#6dc065] shadow-[0_0_8px_rgba(109,192,101,0.6)]"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Carousel Hint */}
          {filteredLocations.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4 text-xs text-slate-400 font-medium flex items-center justify-center gap-2"
            >
              <span>← Swipe or scroll to explore all {filteredLocations.length} match{filteredLocations.length === 1 ? '' : 'es'} →</span>
            </motion.div>
          )}
        </div>
      </section>

      <BirthdayBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}