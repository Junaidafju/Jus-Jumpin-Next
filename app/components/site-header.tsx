"use client";

// Reusable site header with Mac-style glass dock navigation.
// - Desktop: logo on the extreme left, animated dock on the right
// - Mobile: logo on the left, "Book" CTA + animated hamburger on the right
// - Shared: Locations mega menu fed from a central locationGroups config

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

// Central list of locations (state + venues) so we can reuse it
// across dropdowns or any future location UI.
const locationGroups = [
  {
    state: "West Bengal",
    color: "#f67edd",
    venues: [
      "Kolkata - ABC Square Building",
      "Kolkata - Avani Mall",
      "Kolkata - Axis Mall",
      "Kolkata - City Centre 2",
      "Siliguri - City Centre",
      "Durgapur - Junction Mall",
    ],
  },
  {
    state: "Karnataka",
    color: "#00b9e3",
    venues: ["Bengaluru - M5 Ecity Mall", "Bengaluru - Meenakshi Mall"],
  },
  {
    state: "Jharkhand",
    color: "#6dc065",
    venues: [
      "Dhanbad - Prabhatam Mall",
      "Jamshedpur - P&M Mall",
      "Ranchi - Nucleus Mall",
    ],
  },
  {
    state: "Uttar Pradesh",
    color: "#ffc60b",
    venues: ["Noida - GIP Mall", "Noida - Spectrum Mall"],
  },
  {
    state: "Maharashtra",
    color: "#ff661a",
    venues: [
      "Thane - R Mall",
      "Nagpur - VR Mall",
      "Pune - Seasons Mall",
      "Nashik - City Centre",
      "Ghatkopar - R City Mall",
    ],
  },
  {
    state: "Chhattisgarh",
    color: "#ff5da0",
    venues: ["Raipur - Zora Mall"],
  },
  {
    state: "Gujarat",
    color: "#8869d2",
    venues: ["Surat - VR Mall"],
  },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Animate logo and dock on initial load using GSAP,
  // similar to how a Mac dock "pops" in after the logo.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".jj-logo", {
        y: -24,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
      }).from(
        ".jj-dock",
        {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3",
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 border-b border-slate-800/70 bg-black/70 backdrop-blur-2xl"
    >
      <div className="jj-container py-2">
        {/* Mobile: logo left, Book CTA + hamburger on the right */}
        <div className="flex items-center justify-between md:hidden">
          <div className="jj-logo flex flex-1 items-center justify-start">
            <Image
              src="/image/Jus-Jumpin-Logo.webp"
              alt="Jus Jumpin logo"
              width={140}
              height={40}
              className="h-7 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
              priority
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-full bg-[#ff661a] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_10px_35px_rgba(255,102,26,0.8)]">
              Book
            </button>
            <motion.button
              type="button"
              aria-label="Open navigation"
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-600/70 bg-black/80 shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
              initial={false}
              animate={mobileMenuOpen ? "open" : "closed"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-slate-100"
                variants={{
                  closed: { rotate: 0, y: -4 },
                  open: { rotate: 45, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-slate-100"
                variants={{
                  closed: { opacity: 1, y: 0 },
                  open: { opacity: 0, y: 0 },
                }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-slate-100"
                variants={{
                  closed: { rotate: 0, y: 4 },
                  open: { rotate: -45, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Desktop: logo at extreme left, dock-style nav on the right */}
        <div className="jj-logo hidden items-center justify-between md:flex">
          {/* Logo left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/image/Jus-Jumpin-Logo.webp"
              alt="Jus Jumpin logo"
              width={180}
              height={44}
              className="h-9 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
              priority
            />
          </Link>

          {/* Dock nav on right */}
          <nav className="jj-dock flex items-end gap-3 rounded-[999px] border border-slate-500/40 bg-black/70 px-5 py-2 shadow-[0_22px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            {/* Each item is a small icon bubble + label, like macOS dock */}

            <DockItem href="/" label="Home" bubbleColor="bg-slate-800/80">
              H
            </DockItem>

            <DockItem
              href="/birthday-celebration"
              label="Birthdays"
              bubbleColor="bg-[#f67edd]/40"
            >
              B
            </DockItem>

            <DockItem
              href="/school-trips"
              label="School"
              bubbleColor="bg-[#00b9e3]/35"
            >
              S
            </DockItem>

            {/* Locations with mega menu */}
            <div className="group relative flex flex-col items-center px-2">
              <motion.button
                whileHover={{ scale: 1.15, y: -4 }}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#00b9e3]/35 text-[0.65rem]"
              >
                L
              </motion.button>
              <span className="mt-1 text-[0.7rem] font-medium text-slate-100/85">
                Locations
              </span>
              <LocationsMegaMenu />
            </div>

            <DockItem
              href="/activities"
              label="Activities"
              bubbleColor="bg-[#6dc065]/35"
            >
              A
            </DockItem>

            <DockItem
              href="/blogs"
              label="Blogs"
              bubbleColor="bg-[#ff5da0]/35"
            >
              Bl
            </DockItem>

            <DockItem
              href="/contact"
              label="Contact"
              bubbleColor="bg-[#00b9e3]/35"
            >
              C
            </DockItem>

            {/* Book tickets as a highlighted dock item */}
            <button
              type="button"
              className="flex flex-col items-center gap-1 px-2 text-[0.7rem] font-semibold text-slate-900"
            >
              <motion.span
                whileHover={{ scale: 1.15, y: -4 }}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#ff661a] text-[0.65rem] uppercase tracking-[0.18em] shadow-[0_15px_40px_rgba(255,102,26,0.9)]"
              >
                Book
              </motion.span>
              <span className="text-slate-100/90">Tickets</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile slide-out menu (reuses the same locationGroups data) */}
      <motion.div
        className="fixed inset-0 z-20 bg-black/60 md:hidden"
        initial={false}
        animate={
          mobileMenuOpen
            ? { opacity: 1, pointerEvents: "auto" }
            : { opacity: 0, pointerEvents: "none" }
        }
        transition={{ duration: 0.2 }}
        onClick={() => setMobileMenuOpen(false)}
      >
        <motion.aside
          className="absolute inset-y-2 left-2 right-16 rounded-3xl border border-slate-700/80 bg-black/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          initial={false}
          animate={mobileMenuOpen ? { x: 0 } : { x: "-100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Menu
          </div>
          <nav className="space-y-2 text-sm text-slate-100">
            <Link
              href="/"
              className="block w-full rounded-xl bg-slate-900/90 px-3 py-2 text-left"
            >
              Home
            </Link>
            <Link
              href="/birthday-celebration"
              className="block w-full rounded-xl bg-slate-900/90 px-3 py-2 text-left"
            >
              Birthday Parties
            </Link>
            <Link
              href="/school-trips"
              className="block w-full rounded-xl bg-slate-900/90 px-3 py-2 text-left"
            >
              School Trips
            </Link>
            <Link
              href="/activities"
              className="block w-full rounded-xl bg-slate-900/90 px-3 py-2 text-left"
            >
              Our Activities
            </Link>
            <Link
              href="/blogs"
              className="block w-full rounded-xl bg-slate-900/90 px-3 py-2 text-left"
            >
              Blogs
            </Link>
            <div className="pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Locations
            </div>
            <div className="mt-1 max-h-40 space-y-2 overflow-auto pr-1 text-[0.7rem]">
              {locationGroups.map((group) => (
                <div key={group.state} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <span className="font-semibold text-slate-100">
                      {group.state}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {group.venues.map((venue) => (
                      <button
                        key={venue}
                        className="block w-full rounded-lg bg-slate-900/90 px-3 py-1.5 text-left text-[0.68rem] text-slate-200 hover:bg-slate-800/90 hover:text-white"
                      >
                        {venue}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-full bg-[#ff661a] px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_18px_45px_rgba(255,102,26,0.8)]">
              Book Tickets
            </button>
          </nav>
        </motion.aside>
      </motion.div>
    </header>
  );
}

// Small reusable dock item component so we can add
// new items later (e.g. "Offers") with the same behaviour.
type DockItemProps = {
  href: string;
  label: string;
  bubbleColor: string;
  children: React.ReactNode;
};

function DockItem({ href, label, bubbleColor, children }: DockItemProps) {
  return (
    <a
      href={href}
      className="flex flex-col items-center gap-1 px-2 text-[0.7rem] font-medium text-slate-100/85"
    >
      <motion.span
        whileHover={{ scale: 1.15, y: -4 }}
        className={`flex h-9 w-9 items-center justify-center rounded-2xl ${bubbleColor} text-[0.65rem]`}
      >
        {children}
      </motion.span>
      <span>{label}</span>
    </a>
  );
}

// Mega menu for locations – isolated as its own component
// so we can drop it into any future nav or footer if needed.
function LocationsMegaMenu() {
  return (
    <div className="invisible absolute left-1/2 top-[115%] w-[640px] max-w-[95vw] -translate-x-1/2 rounded-3xl border border-slate-800/90 bg-slate-950/98 p-4 text-[0.7rem] text-slate-100 opacity-0 shadow-2xl shadow-black/70 transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
          Jus Jumpin across India
        </div>
        <span className="rounded-full bg-slate-900/90 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-300">
          7 states · 18+ venues
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {locationGroups.map((group) => (
          <div key={group.state} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-[0.7rem] font-semibold text-slate-100">
                {group.state}
              </span>
            </div>
            <div className="space-y-1">
              {group.venues.map((venue) => (
                <button
                  key={venue}
                  className="flex w-full items-center justify-between rounded-xl bg-slate-900/90 px-3 py-1.5 text-left text-[0.68rem] text-slate-200 hover:bg-slate-800/90 hover:text-white"
                >
                  <span>{venue}</span>
                  <span className="text-[0.58rem] uppercase tracking-[0.18em] text-[#00b9e3]">
                    Go
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


