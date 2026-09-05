// components/AnimatedHeaders.tsx - COMPACT GLASSMORPHISM + ACTIVE ROUTE HIGHLIGHTING

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

// Location data
const locationGroups = [
  {
    state: "West Bengal",
    color: "#f67edd",
    venues: [
      { name: "Kolkata - ABC Square Building", slug: "/kolkata-abc-square-building-best-adult-trampoline-park/" },
      { name: "Kolkata - Avani Mall", slug: "/kolkata-avani-mall/" },
      { name: "Kolkata - Axis Mall", slug: "/kolkata-axis-mall/" },
      { name: "Kolkata - City Centre 2", slug: "/kolkata-city-centre-2/" },
      { name: "Siliguri - City Centre", slug: "/siliguri-city-centre/" },
      { name: "Durgapur - Junction Mall", slug: "/durgapur-junction-mall/" },
    ],
  },
  {
    state: "Karnataka",
    color: "#00b9e3",
    venues: [
      { name: "Bengaluru - M5 Ecity Mall", slug: "/bengaluru-m5-ecity-mall/" },
      { name: "Bengaluru - Meenakshi Mall", slug: "/bengaluru-meenakshi-mall/" },
    ],
  },
  {
    state: "Jharkhand",
    color: "#6dc065",
    venues: [
      { name: "Dhanbad - Prabhatam Mall", slug: "/dhanbad-prabhatam-mall/" },
      { name: "Jamshedpur - P&M Mall", slug: "/jamshedpur-pm-mall/" },
      { name: "Ranchi - Nucleus Mall", slug: "/ranchi-nucleus-mall/" },
    ],
  },
  {
    state: "Uttar Pradesh",
    color: "#ffc60b",
    venues: [
      { name: "Noida - GIP Mall", slug: "/noida-gip-mall/" },
      { name: "Noida - Spectrum Mall", slug: "/noida-spectrum-mall/" },
    ],
  },
  {
    state: "Maharashtra",
    color: "#ff661a",
    venues: [
      { name: "Thane - R Mall", slug: "/thane-r-mall/" },
      { name: "Nagpur - VR Mall", slug: "/nagpur-vr-mall/" },
      { name: "Pune - Seasons Mall", slug: "/pune-season-mall/" },
      { name: "Nashik - City Centre", slug: "/nashik-city-centre/" },
      { name: "Ghatkopar - R City Mall", slug: "/ghatkopar-rcity-mall/" },
    ],
  },
  {
    state: "Chhattisgarh",
    color: "#ff5da0",
    venues: [{ name: "Raipur - Zora Mall", slug: "/raipur-zora-mall/" }],
  },
  {
    state: "Gujarat",
    color: "#8869d2",
    venues: [{ name: "Surat - VR Mall", slug: "/surat-vr-mall/" }],
  },
  {
    state: "Telangana",
    color: "#00d9a6",
    venues: [
      { name: "Hyderabad - Sarath City Capital Mall", slug: "/hyderabad-sarath-city-capital-mall/" },
      { name: "Hyderabad - DSL Virtue Mall", slug: "/hyderabad-dsl-virtue-mall/" },
    ],
  },
];

// Navigation items
const leftNavItems = [
  { label: "Home", href: "/" },
  { label: "Birthday", href: "/birthday-celebration/" },
  { label: "School Trips", href: "/school-trips/" },
  { label: "Activities", href: "/our-activities/" },
];

const rightNavItems = [
  { label: "About", href: "/about/" },
  // { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact/" },
];

// Normalize a path by stripping a trailing slash (except root) so
// "/about" and "/about/" are treated as the same route.
const normalizePath = (path: string) => {
  if (!path) return "/";
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
};

export const AnimatedHeader = memo(function AnimatedHeader() {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const navPillRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bookButtonRef = useRef<HTMLButtonElement>(null);
  const locationsDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const menuAnimation = useRef<gsap.core.Timeline | null>(null);

  const isActive = useCallback(
    (href: string) => normalizePath(pathname) === normalizePath(href),
    [pathname]
  );

  const isLocationsActive = locationGroups.some((group) =>
    group.venues.some((v) => normalizePath(v.slug) === normalizePath(pathname))
  );

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP entrance animations on mount — kept minimal so the pill reads as light, not heavy
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        duration: 0.9,
        y: -60,
        opacity: 0,
        ease: "power3.out",
      });

      gsap.from(logoRef.current, {
        duration: 1,
        scale: 0.6,
        opacity: 0,
        delay: 0.25,
        ease: "back.out(1.7)",
      });

      gsap.from(bookButtonRef.current, {
        duration: 0.6,
        x: 30,
        opacity: 0,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.to(bookButtonRef.current, {
        duration: 2,
        boxShadow: "0 0 18px rgba(109, 192, 101, 0.45)",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.2,
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "max",
        onUpdate: (self) => setScrolled(self.progress > 0.03),
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Update pill glass intensity on scroll
  useEffect(() => {
    if (navPillRef.current) {
      gsap.to(navPillRef.current, {
        duration: 0.3,
        backgroundColor: scrolled ? "rgba(20, 12, 4, 0.55)" : "rgba(20, 12, 4, 0.32)",
        boxShadow: scrolled
          ? "0 8px 24px rgba(0,0,0,0.25)"
          : "0 4px 16px rgba(0,0,0,0.12)",
        ease: "power2.out",
      });
    }
  }, [scrolled]);

  const toggleMobileMenu = useCallback(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setMobileMenuOpen(true);

      if (menuAnimation.current) menuAnimation.current.kill();
      menuAnimation.current = gsap.timeline().fromTo(
        ".mobile-menu-item",
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "";
      if (menuAnimation.current) menuAnimation.current.kill();
      menuAnimation.current = gsap
        .timeline()
        .to(".mobile-menu-item", { y: -16, opacity: 0, duration: 0.18, stagger: 0.02, ease: "power2.in" })
        .call(() => setMobileMenuOpen(false), undefined, 0.18);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = "";
    }
  }, [isMobile, mobileMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLocationsHover = useCallback(
    (open: boolean) => {
      if (isMobile) return;
      setIsLocationsOpen(open);
      if (open && locationsDropdownRef.current) {
        gsap.from(".location-item", {
          y: 16,
          opacity: 0,
          duration: 0.25,
          stagger: 0.03,
          ease: "power2.out",
        });
      }
    },
    [isMobile]
  );

  const handleBookTicket = useCallback(() => {
    gsap.to(bookButtonRef.current, {
      keyframes: [
        { scale: 0.95, duration: 0.1 },
        { scale: 1.08, duration: 0.1 },
        { scale: 1, duration: 0.15 },
      ],
      onComplete: () => {
        window.open("https://book.jusjumpin.com", "_blank");
      },
    });
  }, []);

  const filteredLocations = locationGroups
    .map((group) => ({
      ...group,
      venues: group.venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.state.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.venues.length > 0);

  // Shared classes for a nav link, active vs. inactive
  const navLinkClass = (active: boolean) =>
    `relative font-medium py-2 px-3.5 rounded-full text-[13px] xl:text-sm transition-colors duration-200 ${active
      ? "text-neutral-900 bg-gradient-to-r from-[#6dc065] to-[#b2d235] shadow-sm shadow-black/20"
      : "text-white/85 hover:text-white hover:bg-white/10"
    }`;

  return (
    <header className="relative z-50">
      {/* Floating, content-hugging glass pill — no longer stretches full width */}
      <div ref={headerRef} className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3">
        <div
          ref={navPillRef}
          className="relative inline-flex items-center gap-1 sm:gap-1.5 lg:gap-2 rounded-full border border-white/15 backdrop-blur-xl overflow-visible max-w-[96vw]"
          style={{ backgroundColor: "rgba(20, 12, 4, 0.32)" }}
        >
          {/* Soft white glow above the pill */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-3 sm:-top-4 -translate-x-1/2 w-[70%] h-4 sm:h-5 rounded-full bg-white/50 blur-lg opacity-70"
          />
          {/* Soft white glow below the pill */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-3 sm:-bottom-4 -translate-x-1/2 w-[70%] h-4 sm:h-5 rounded-full bg-white/30 blur-lg opacity-60"
          />
          {/* Inner top edge shine — a thin bright line hugging the glass rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
          />
          {/* Inner bottom edge — faint mirrored shine for depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          <nav className="relative flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 py-1.5 sm:px-2.5 sm:py-2 lg:px-3 lg:py-2">
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {leftNavItems.map((item) => (
                <Link key={item.label} href={item.href} className={navLinkClass(isActive(item.href))}>
                  <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link href="/" className="mx-1 lg:mx-2 shrink-0">
              <motion.div
                ref={logoRef}
                className="p-1 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/image/Jus-Jumpin-Logo.webp"
                  alt="Jus Jumpin logo"
                  width={150}
                  height={36}
                  className="h-6 sm:h-7 lg:h-8 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {/* Locations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleLocationsHover(true)}
                onMouseLeave={() => handleLocationsHover(false)}
              >
                <motion.button
                  className={`flex items-center gap-1.5 ${navLinkClass(isLocationsActive)}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span>Locations</span>
                  <motion.span
                    animate={{ rotate: isLocationsOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px]"
                  >
                    ▼
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isLocationsOpen && (
                    <motion.div
                      ref={locationsDropdownRef}
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      data-lenis-prevent="true"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                 w-[320px] sm:w-[420px] md:w-[500px] lg:w-[560px] xl:w-[620px]
                                 bg-neutral-950/90 backdrop-blur-2xl
                                 rounded-2xl border border-white/10
                                 shadow-2xl shadow-black/40 overflow-hidden z-[9999]
                                 max-h-[75vh] flex flex-col overscroll-contain"
                      style={{ willChange: "transform", pointerEvents: "auto" }}
                      onWheel={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 border-b border-white/10 shrink-0">
                        <input
                          type="text"
                          placeholder="Search locations..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6dc065] focus:border-transparent text-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      <div 
                        data-lenis-prevent="true"
                        className="p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-h-[380px] overflow-y-auto overscroll-contain"
                        onWheel={(e) => e.stopPropagation()}
                      >
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((group) => (
                            <div key={group.state} className="location-item">
                              <div className="flex items-center gap-2 mb-2.5">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.color }} />
                                <h3 className="font-semibold text-white text-sm">{group.state}</h3>
                              </div>
                              <div className="space-y-1.5">
                                {group.venues.map((venue) => {
                                  const active = normalizePath(venue.slug) === normalizePath(pathname);
                                  return (
                                    <motion.a
                                      key={venue.slug}
                                      href={venue.slug}
                                      className={`block px-3 py-1.5 rounded-lg transition-colors text-xs md:text-[13px] ${active
                                          ? "bg-[#6dc065]/20 text-white"
                                          : "text-white/70 hover:text-white hover:bg-white/5"
                                        }`}
                                      whileHover={{ x: 4 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsLocationsOpen(false);
                                      }}
                                    >
                                      {venue.name}
                                    </motion.a>
                                  );
                                })}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-1 sm:col-span-2 md:col-span-3 py-8 text-center text-white/60 text-sm">
                            No locations found matching &quot;{searchQuery}&quot;
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {rightNavItems.map((item) => (
                <Link key={item.label} href={item.href} className={navLinkClass(isActive(item.href))}>
                  <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    {item.label}
                  </motion.span>
                </Link>
              ))}

              {/* Book Ticket Button */}
              <motion.button
                ref={bookButtonRef}
                onClick={handleBookTicket}
                className="ml-1 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full font-semibold text-white relative overflow-hidden text-[13px] xl:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ background: "linear-gradient(135deg, #6dc065 0%, #b2d235 100%)" }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Book Ticket</span>
                  <motion.svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </motion.svg>
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-1.5 rounded-full bg-white/10 border border-white/15 ml-1"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{ open: { rotate: 45, y: 5 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-0.5 bg-white mb-1"
              />
              <motion.span
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-0.5 bg-white mb-1"
              />
              <motion.span
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{ open: { rotate: -45, y: -5 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-0.5 bg-white"
              />
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />

            <motion.div
              ref={mobileMenuRef}
              data-lenis-prevent="true"
              className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm z-[9999] overflow-y-auto border-l border-white/10 overscroll-contain"
              style={{
                background: "rgba(20, 12, 4, 0.7)",
                backdropFilter: "blur(24px)",
                boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Brand accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#f67edd] via-[#ffc60b] to-[#6dc065]" />

              <div className="p-6 h-full overflow-y-auto overscroll-contain" data-lenis-prevent="true">
                <div className="flex justify-between items-center mb-6">
                  <Image
                    src="/image/Jus-Jumpin-Logo.webp"
                    alt="Jus Jumpin logo"
                    width={140}
                    height={34}
                    className="h-7 w-auto"
                    priority
                  />
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-1.5 mb-6">
                  {leftNavItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`mobile-menu-item flex items-center justify-between px-4 py-3 rounded-xl text-base transition-colors ${active
                            ? "bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-neutral-900 font-semibold"
                            : "text-white/85 hover:text-white hover:bg-white/5"
                          }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />}
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mb-6">
                  <div className="px-4 py-2">
                    <h3 className="font-semibold text-white text-base mb-3">Locations</h3>
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-[#6dc065] focus:border-transparent text-sm"
                    />
                    <div 
                      data-lenis-prevent="true"
                      className="space-y-3 max-h-[280px] overflow-y-auto pr-2 overscroll-contain"
                      onWheel={(e) => e.stopPropagation()}
                    >
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((group) => (
                          <div key={group.state} className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.color }} />
                              <h4 className="font-medium text-white text-sm">{group.state}</h4>
                            </div>
                            <div className="ml-4 space-y-1">
                              {group.venues.map((venue) => {
                                const active = normalizePath(venue.slug) === normalizePath(pathname);
                                return (
                                  <a
                                    key={venue.slug}
                                    href={venue.slug}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block py-1.5 text-sm transition-all border-l pl-3 ${active
                                        ? "text-white border-[#6dc065] font-medium"
                                        : "text-white/70 hover:text-white hover:pl-4 border-white/10 hover:border-[#6dc065]"
                                      }`}
                                  >
                                    {venue.name}
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-white/60 py-4 text-sm">
                          No locations found matching &quot;{searchQuery}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mb-6">
                  {rightNavItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`mobile-menu-item flex items-center justify-between px-4 py-3 rounded-xl text-base transition-colors ${active
                            ? "bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-neutral-900 font-semibold"
                            : "text-white/85 hover:text-white hover:bg-white/5"
                          }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />}
                      </motion.a>
                    );
                  })}
                </div>

                <motion.button
                  onClick={() => {
                    handleBookTicket();
                    setMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item w-full px-6 py-4 rounded-full font-semibold text-white relative overflow-hidden text-base"
                  style={{ background: "linear-gradient(135deg, #6dc065 0%, #b2d235 100%)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Book Ticket</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
});