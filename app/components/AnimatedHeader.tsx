// components/AnimatedHeaders.tsx - FIXED WITH CORRECT MOBILE MENU

"use client";

import Link from "next/link";
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
];

export const AnimatedHeader = memo(function AnimatedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bookButtonRef = useRef<HTMLButtonElement>(null);
  const locationsDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const menuAnimation = useRef<gsap.core.Timeline | null>(null);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar entrance animation
      gsap.from(headerRef.current, {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "power3.out"
      });

      // Logo animation
      gsap.from(logoRef.current, {
        duration: 1.2,
        scale: 0.5,
        opacity: 0,
        delay: 0.3,
        ease: "back.out(1.7)"
      });

      // Book button animation
      gsap.from(bookButtonRef.current, {
        duration: 0.8,
        x: 50,
        opacity: 0,
        delay: 0.8,
        ease: "power3.out"
      });

      // Continuous pulse animation for book button
      gsap.to(bookButtonRef.current, {
        duration: 2,
        boxShadow: "0 0 20px rgba(109, 192, 101, 0.5)",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.5
      });

      // Scroll animation
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          setScrolled(self.progress > 0.05);
        }
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Update navbar style on scroll
  useEffect(() => {
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        duration: 0.3,
        backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.7)",
        boxShadow: scrolled ? "0 10px 30px rgba(0, 0, 0, 0.3)" : "none",
        ease: "power2.out"
      });
    }
  }, [scrolled]);

  // Handle mobile menu toggle with animations
  const toggleMobileMenu = useCallback(() => {
    if (!mobileMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      setMobileMenuOpen(true);

      // Animate in
      if (menuAnimation.current) menuAnimation.current.kill();

      menuAnimation.current = gsap.timeline()
        .fromTo(".mobile-menu-item",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }
        );
    } else {
      // Restore body scroll
      document.body.style.overflow = '';

      // Animate out
      if (menuAnimation.current) menuAnimation.current.kill();

      menuAnimation.current = gsap.timeline()
        .to(".mobile-menu-item",
          { y: -20, opacity: 0, duration: 0.2, stagger: 0.02, ease: "power2.in" }
        )
        .call(() => setMobileMenuOpen(false), undefined, 0.2);
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [isMobile, mobileMenuOpen]);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle locations dropdown
  const handleLocationsHover = useCallback((open: boolean) => {
    if (isMobile) return; // Don't open dropdown on mobile
    setIsLocationsOpen(open);
    if (open && locationsDropdownRef.current) {
      gsap.from(".location-item", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out"
      });
    }
  }, [isMobile]);

  // Handle book ticket click
  const handleBookTicket = useCallback(() => {
    // Click animation
    gsap.to(bookButtonRef.current, {
      keyframes: [
        { scale: 0.95, duration: 0.1 },
        { scale: 1.1, duration: 0.1 },
        { scale: 1, duration: 0.2 }
      ],
      onComplete: () => {
        window.open("https://book.jusjumpin.com", "_blank");
      }
    });
  }, []);

  // Filter locations
  const filteredLocations = locationGroups
    .map((group) => ({
      ...group,
      venues: group.venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.state.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.venues.length > 0);

  // Navigation items data
  const leftNavItems = [
    { label: "Home", href: "/" },
    { label: "Birthday", href: "/birthday-celebration/" },
    { label: "School Trips", href: "/school-trips/" },
    { label: "Activities", href: "/our-activities/" },
  ];

  const rightNavItems = [
    { label: "About", href: "/about/" },
    // { label: "Blogs", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ];

  return (
    <header className="relative z-50">
      {/* Desktop Header - FIXED: Mobile menu removed from here */}
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
        {/* Border Container */}
        <div className="relative mx-auto max-w-7xl px-4 py-4">
          <div
            ref={navbarRef}
            className="relative bg-black/70 backdrop-blur-lg rounded-3xl border border-white/10 overflow-visible"
          >
            {/* Animated border elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {/* Top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Bottom border */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />

              {/* Corner dots */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner, i) => (
                <motion.div
                  key={corner}
                  className={`absolute w-2 h-2 bg-white/40 rounded-full ${corner === "top-left" ? "top-2 left-2" :
                    corner === "top-right" ? "top-2 right-2" :
                      corner === "bottom-left" ? "bottom-2 left-2" :
                        "bottom-2 right-2"
                    }`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
            </div>

            {/* Navigation Content - RESPONSIVE LAYOUT */}
            <nav className="relative px-4 sm:px-6 py-4 flex items-center justify-between">
              {/* Left Navigation - Desktop */}
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                {leftNavItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="relative text-white/80 hover:text-white font-medium transition-colors py-2 px-3 rounded-lg text-sm xl:text-base"
                    whileHover={{
                      y: -2,
                      backgroundColor: "rgba(255,255,255,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Centered Logo */}
              <div className="flex-1 flex justify-center">
                <Link href="/">
                  <motion.div
                    className="p-2 rounded-xl bg-gradient-to-br from-white/5 to-transparent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="/image/Jus-Jumpin-Logo.webp"
                      alt="Jus Jumpin logo"
                      width={180}
                      height={44}
                      className="h-8 lg:h-10 w-auto"
                      priority
                    />
                  </motion.div>
                </Link>
              </div>

              {/* Right Navigation - Desktop */}
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                {/* Locations Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleLocationsHover(true)}
                  onMouseLeave={() => handleLocationsHover(false)}
                >
                  <motion.button
                    className="flex items-center space-x-2 text-white/80 hover:text-white font-medium py-2 px-3 rounded-lg text-sm xl:text-base"
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Locations</span>
                    <motion.span
                      animate={{ rotate: isLocationsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs"
                    >
                      ▼
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {isLocationsOpen && (
                      <motion.div
                        ref={locationsDropdownRef}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full
                                   left-1/2 -translate-x-1/2
                                   mt-3
                                  w-[320px] sm:w-[420px] md:w-[520px] lg:w-[580px] xl:w-[640px]
                                bg-black/95 backdrop-blur-xl
                                   rounded-2xl
                                  border border-white/10
                                  shadow-2xl shadow-black/40
                                  overflow-hidden
                                  z-[9999]
                                  max-h-[70vh] overflow-y-auto"
                        style={{
                          willChange: 'transform',
                          pointerEvents: 'auto'
                        }}
                      >
                        {/* Search Bar */}
                        <div className="p-4 border-b border-white/10">
                          <input
                            type="text"
                            placeholder="Search locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6dc065] focus:border-transparent text-sm md:text-base"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        {/* Locations Grid - RESPONSIVE */}
                        <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-h-[400px] overflow-y-auto">
                          {filteredLocations.length > 0 ? (
                            filteredLocations.map((group) => (
                              <div key={group.state} className="location-item">
                                <div className="flex items-center space-x-3 mb-3">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: group.color }}
                                  />
                                  <h3 className="font-semibold text-white text-sm md:text-base">{group.state}</h3>
                                </div>
                                <div className="space-y-2">
                                  {group.venues.map((venue) => (
                                    <motion.a
                                      key={venue.slug}
                                      href={venue.slug}
                                      className="block px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors text-xs md:text-sm"
                                      whileHover={{ x: 5 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsLocationsOpen(false);
                                      }}
                                    >
                                      {venue.name}
                                    </motion.a>
                                  ))}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-1 sm:col-span-2 md:col-span-3 py-8 text-center text-white/60 text-sm md:text-base">
                              No locations found matching "{searchQuery}"
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Blogs & Contact */}
                {rightNavItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="relative text-white/80 hover:text-white font-medium transition-colors py-2 px-3 rounded-lg text-sm xl:text-base"
                    whileHover={{
                      y: -2,
                      backgroundColor: "rgba(255,255,255,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}

                {/* Book Ticket Button */}
                <motion.button
                  ref={bookButtonRef}
                  onClick={handleBookTicket}
                  className="px-4 py-2 lg:px-6 lg:py-3 rounded-full font-semibold text-white relative overflow-hidden text-sm lg:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "linear-gradient(135deg, #6dc065 0%, #b2d235 100%)"
                  }}
                >
                  {/* Animated shine effect */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 flex items-center space-x-1 lg:space-x-2">
                    <span>Book Ticket</span>
                    <motion.svg
                      className="w-3 h-3 lg:w-4 lg:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </motion.svg>
                  </span>
                </motion.button>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 ml-auto"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 45, y: 6 },
                    closed: { rotate: 0, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="block w-6 h-0.5 bg-white mb-1.5"
                />
                <motion.span
                  animate={mobileMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { opacity: 0 },
                    closed: { opacity: 1 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="block w-6 h-0.5 bg-white mb-1.5"
                />
                <motion.span
                  animate={mobileMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: -45, y: -6 },
                    closed: { rotate: 0, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="block w-6 h-0.5 bg-white"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu - RENDERED OUTSIDE THE HEADER CONTAINER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/10 z-[9999] overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)"
              }}
            >
              <div className="p-6 h-full overflow-y-auto">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Logo */}
                <div className="mb-8">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/image/Jus-Jumpin-Logo.webp"
                        alt="Jus Jumpin logo"
                        width={180}
                        height={44}
                        className="h-8 lg:h-10 w-auto"
                        priority
                      />
                    </div>
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2 mb-8">
                  {leftNavItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="mobile-menu-item block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors text-lg"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Locations Section */}
                <div className="mb-8">
                  <div className="px-4 py-2">
                    <h3 className="font-semibold text-white text-lg mb-3">Locations</h3>
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-[#6dc065] focus:border-transparent"
                    />
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((group) => (
                          <div key={group.state} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: group.color }}
                              />
                              <h4 className="font-medium text-white text-base">{group.state}</h4>
                            </div>
                            <div className="ml-4 space-y-1">
                              {group.venues.map((venue) => (
                                <a
                                  key={venue.slug}
                                  href={venue.slug}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-2 text-sm text-white/70 hover:text-white hover:pl-2 transition-all border-l border-white/10 hover:border-[#6dc065]"
                                >
                                  {venue.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-white/60 py-4 text-sm">
                          No locations found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Blogs & Contact */}
                <div className="space-y-2 mb-8">
                  {rightNavItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="mobile-menu-item block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors text-lg"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Book Ticket Button */}
                <motion.button
                  onClick={() => {
                    handleBookTicket();
                    setMobileMenuOpen(false);
                  }}
                  className="mobile-menu-item w-full mt-8 px-6 py-4 rounded-full font-semibold text-white relative overflow-hidden text-lg"
                  style={{
                    background: "linear-gradient(135deg, #6dc065 0%, #b2d235 100%)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Book Ticket</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
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