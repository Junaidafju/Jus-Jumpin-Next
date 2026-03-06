// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { activities, colors } from "./activitiesData";

// // Each activity occupies this many vh of scroll distance.
// // Higher = more scroll needed per step = harder to accidentally skip.
// const VH_PER_STEP = 50;
// const COUNT = activities.length;

// export default function ActivitiesShowcase() {
//     const canvasRef = useRef<HTMLDivElement>(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [direction, setDirection] = useState(1);
//     const [isActive, setIsActive] = useState(false);
//     const wasActive = useRef(false);
//     const [revealKey, setRevealKey] = useState(0);
//     // Track the raw index so we can clamp to ±1 per animation frame
//     const lastRawIndex = useRef(0);
//     const rafRef = useRef<number | null>(null);

//     const handleScroll = useCallback(() => {
//         // Throttle to one execution per animation frame
//         if (rafRef.current) return;
//         rafRef.current = requestAnimationFrame(() => {
//             rafRef.current = null;

//             const el = canvasRef.current;
//             if (!el) return;

//             const rect = el.getBoundingClientRect();
//             const active = rect.top <= 0 && rect.bottom > window.innerHeight;

//             if (active && !wasActive.current) {
//                 setRevealKey((k) => k + 1);
//                 setActiveIndex(0);
//                 lastRawIndex.current = 0;
//             }
//             wasActive.current = active;
//             setIsActive(active);

//             if (!active) return;

//             const scrolledInto = -rect.top;
//             const scrollable = rect.height - window.innerHeight;
//             if (scrollable <= 0) return;

//             const progress = Math.max(0, Math.min(1, scrolledInto / scrollable));
//             // Raw target based on current scroll position
//             const rawIndex = Math.min(Math.floor(progress * COUNT), COUNT - 1);

//             // ── Key fix: only allow ±1 step per frame regardless of scroll speed ──
//             const clamped = Math.max(
//                 lastRawIndex.current - 1,
//                 Math.min(lastRawIndex.current + 1, rawIndex)
//             );
//             lastRawIndex.current = clamped;

//             setActiveIndex((prev) => {
//                 if (clamped !== prev) {
//                     setDirection(clamped > prev ? 1 : -1);
//                     return clamped;
//                 }
//                 return prev;
//             });
//         });
//     }, []);

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll, { passive: true });
//         handleScroll();
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [handleScroll]);

//     const current = activities[activeIndex];
//     const nextActivity = activities[activeIndex + 1] || null;

//     return (
//         <div
//             id="activities"
//             ref={canvasRef}
//             style={{ height: `${COUNT * VH_PER_STEP}vh` }}
//             className="relative bg-white"
//         >
//             {/* ── Fixed panel ── */}
//             <div
//                 className="fixed inset-0 z-20"
//                 style={{
//                     opacity: isActive ? 1 : 0,
//                     visibility: isActive ? "visible" : "hidden",
//                     pointerEvents: isActive ? "auto" : "none",
//                     transition: "opacity 0.2s ease",
//                 }}
//             >
//                 {/* Animated background */}
//                 <div className="absolute inset-0 bg-white overflow-hidden">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={activeIndex}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.5 }}
//                             className="absolute inset-0"
//                             style={{
//                                 background: `
//                   radial-gradient(ellipse at 30% 50%, ${current.color}20 0%, transparent 55%),
//                   radial-gradient(ellipse at 75% 55%, ${current.color}10 0%, transparent 50%)
//                 `,
//                             }}
//                         />
//                     </AnimatePresence>
//                     <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: colors.pink }} />
//                     <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ background: colors.cyan }} />
//                 </div>

//                 {/* ═══════════════════════════════════
//             MOBILE  (<lg) — one full screen, no scroll
//             Structure:
//               [navbar gap]
//               [image  ~40vh]
//               [text   flex-1]
//               [progress bar ~60px]
//         ═══════════════════════════════════ */}
//                 <div className="lg:hidden absolute inset-0 flex flex-col overflow-hidden">

//                     {/* Navbar spacer — adjust this value to match your navbar height */}
//                     <div className="flex-shrink-0" style={{ height: "120px" }} />

//                     {/* Image block — fixed height so text always has room */}
//                     <div className="flex-shrink-0 px-4" style={{ height: "38vh" }}>
//                         <div className="relative w-full h-full rounded-2xl overflow-hidden">
//                             <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={`mob-img-${revealKey}-${current.id}`}
//                                     className="absolute inset-0"
//                                     initial={{ opacity: 0, scale: 0.94, y: direction > 0 ? 24 : -24 }}
//                                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                                     exit={{ opacity: 0, scale: 0.94, y: direction > 0 ? -24 : 24 }}
//                                     transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
//                                     style={{ boxShadow: `0 12px 32px -8px ${current.color}55` }}
//                                 >
//                                     <Image
//                                         src={current.image}
//                                         alt={current.title}
//                                         fill
//                                         className="object-cover"
//                                         sizes="100vw"
//                                         priority
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                                     {/* Top-left category badge */}
//                                     <div className="absolute top-3 left-3 z-10">
//                                         <span
//                                             className="px-2.5 py-1 rounded-full text-xs font-bold text-white capitalize"
//                                             style={{ background: current.color }}
//                                         >
//                                             {current.category}
//                                         </span>
//                                     </div>

//                                     {/* Bottom row */}
//                                     <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
//                                         <h3
//                                             className="text-white text-base font-black leading-tight"
//                                             style={{ fontFamily: '"Fredoka One", cursive' }}
//                                         >
//                                             {current.shortTitle}
//                                         </h3>
//                                         <span
//                                             className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white capitalize"
//                                             style={{ background: `${current.color}cc` }}
//                                         >
//                                             {current.intensity}
//                                         </span>
//                                     </div>
//                                 </motion.div>
//                             </AnimatePresence>
//                         </div>
//                     </div>

//                     {/* Text block — flex-1 fills the remaining space between image and progress */}
//                     <div className="flex-1 min-h-0 relative px-5 pt-3">
//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={`mob-txt-${revealKey}-${current.id}`}
//                                 className="absolute inset-0 px-5 pt-3 pb-1 flex flex-col gap-[10px]"
//                                 initial={{ opacity: 0, x: direction > 0 ? 36 : -36 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: direction > 0 ? -36 : 36 }}
//                                 transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
//                             >
//                                 {/* Top: number + title */}
//                                 <div>
//                                     <div className="flex items-center gap-2 mb-1">
//                                         <span
//                                             className="text-3xl font-black opacity-10 select-none leading-none"
//                                             style={{ fontFamily: '"Fredoka One", cursive', color: current.color }}
//                                         >
//                                             {String(activeIndex + 1).padStart(2, "0")}
//                                         </span>
//                                         <div className="flex-1 h-px opacity-15" style={{ background: current.color }} />
//                                     </div>

//                                     <h2
//                                         className="text-xl font-black leading-tight text-gray-900 mb-1.5"
//                                         style={{ fontFamily: '"Fredoka One", cursive' }}
//                                     >
//                                         {current.title.split(" ").map((word, i, arr) =>
//                                             i === arr.length - 1
//                                                 ? <span key={i} style={{ color: current.color }}> {word}</span>
//                                                 : <span key={i}> {word}</span>
//                                         )}
//                                     </h2>

//                                     {/* Description — 2 lines max */}
//                                     <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
//                                         {current.description}
//                                     </p>
//                                 </div>

//                                 {/* Middle: stats + tags */}
//                                 <div>
//                                     <div className="flex gap-3 mb-2">
//                                         {[
//                                             { icon: "👶", label: "Age", value: current.ageRange },
//                                             { icon: "⏱️", label: "Time", value: current.duration },
//                                             { icon: "⚡", label: "Level", value: current.intensity },
//                                         ].map(({ icon, label, value }) => (
//                                             <div key={label} className="flex items-center gap-1">
//                                                 <span className="text-sm">{icon}</span>
//                                                 <div>
//                                                     <div className="text-xs text-gray-400 uppercase leading-none" style={{ fontSize: "9px" }}>{label}</div>
//                                                     <div className="font-semibold text-gray-700 capitalize leading-tight" style={{ fontSize: "11px" }}>{value}</div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <div className="flex flex-wrap gap-1.5">
//                                         {current.features.slice(0, 3).map((f, i) => (
//                                             <span
//                                                 key={i}
//                                                 className="px-2 py-0.5 rounded-lg font-medium"
//                                                 style={{ background: `${current.color}15`, color: current.color, fontSize: "10px" }}
//                                             >
//                                                 {f}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Bottom: CTA */}
//                                 <motion.button
//                                     whileTap={{ scale: 0.95 }}
//                                     className="self-start px-5 py-2 rounded-full text-white font-bold shadow-md flex items-center gap-1.5"
//                                     style={{ background: current.color, fontFamily: '"Fredoka One", cursive', fontSize: "13px" }}
//                                 >
//                                     Book Now →
//                                 </motion.button>
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>

//                     {/* Progress bar — fixed height, always visible at bottom */}
//                     <div
//                         className="flex-shrink-0 px-5 pt-2"
//                         style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))", height: "52px" }}
//                     >
//                         <div className="flex items-center gap-3 mb-1.5">
//                             <span className="text-xs font-bold tabular-nums w-6" style={{ color: current.color }}>
//                                 {String(activeIndex + 1).padStart(2, "0")}
//                             </span>
//                             <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
//                                 <motion.div
//                                     className="h-full rounded-full"
//                                     animate={{ width: `${((activeIndex + 1) / COUNT) * 100}%` }}
//                                     transition={{ duration: 0.3 }}
//                                     style={{ background: current.color }}
//                                 />
//                             </div>
//                             <span className="text-xs font-bold text-gray-400 tabular-nums w-6 text-right">
//                                 {String(COUNT).padStart(2, "0")}
//                             </span>
//                         </div>
//                         <div className="flex justify-center gap-1">
//                             {activities.map((_, i) => (
//                                 <motion.div
//                                     key={i}
//                                     className="rounded-full"
//                                     animate={{
//                                         width: i === activeIndex ? 14 : 4,
//                                         height: 4,
//                                         backgroundColor: i === activeIndex ? current.color : "#e5e7eb",
//                                     }}
//                                     transition={{ duration: 0.2 }}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* ═══════════════════════════════════
//             DESKTOP  (>=lg) — side by side
//         ═══════════════════════════════════ */}
//                 <div className="hidden lg:grid h-full grid-cols-2 max-w-7xl mx-auto px-6 relative z-10">

//                     {/* LEFT — text */}
//                     <div className="flex flex-col justify-center relative">
//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={`desk-txt-${revealKey}-${current.id}`}
//                                 className="max-w-lg"
//                                 initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
//                                 transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
//                             >
//                                 <div className="flex items-center gap-4 mb-4">
//                                     <span
//                                         className="text-6xl font-black opacity-10 select-none"
//                                         style={{ fontFamily: '"Fredoka One", cursive', color: current.color }}
//                                     >
//                                         {String(activeIndex + 1).padStart(2, "0")}
//                                     </span>
//                                     <div className="flex-1 h-px opacity-20" style={{ background: current.color }} />
//                                     <span
//                                         className="px-4 py-1.5 rounded-full text-sm font-bold text-white capitalize"
//                                         style={{ background: current.color }}
//                                     >
//                                         {current.category}
//                                     </span>
//                                 </div>

//                                 <h2
//                                     className="text-5xl xl:text-6xl font-black mb-4 leading-tight text-gray-900"
//                                     style={{ fontFamily: '"Fredoka One", cursive' }}
//                                 >
//                                     {current.title.split(" ").map((word, i, arr) =>
//                                         i === arr.length - 1
//                                             ? <span key={i} style={{ color: current.color }}> {word}</span>
//                                             : <span key={i}> {word}</span>
//                                     )}
//                                 </h2>

//                                 <p className="text-lg text-gray-600 mb-6 leading-relaxed">{current.fullDescription}</p>

//                                 <div className="flex flex-wrap gap-6 mb-6">
//                                     {[
//                                         { icon: "👶", label: "Age", value: current.ageRange },
//                                         { icon: "⏱️", label: "Duration", value: current.duration },
//                                         { icon: "⚡", label: "Intensity", value: current.intensity },
//                                     ].map(({ icon, label, value }) => (
//                                         <div key={label} className="flex items-center gap-2">
//                                             <span className="text-2xl">{icon}</span>
//                                             <div>
//                                                 <div className="text-xs text-gray-400 uppercase">{label}</div>
//                                                 <div className="font-semibold text-gray-800 capitalize">{value}</div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="flex flex-wrap gap-2 mb-8">
//                                     {current.features.map((f, i) => (
//                                         <span
//                                             key={i}
//                                             className="px-3 py-1.5 rounded-xl text-sm font-medium"
//                                             style={{ background: `${current.color}18`, color: current.color }}
//                                         >
//                                             {f}
//                                         </span>
//                                     ))}
//                                 </div>

//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg flex items-center gap-2"
//                                     style={{ background: current.color, fontFamily: '"Fredoka One", cursive' }}
//                                 >
//                                     Book This Activity →
//                                 </motion.button>
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>

//                     {/* RIGHT — image */}
//                     <div className="flex items-center justify-center py-10 pr-10">
//                         <div className="relative w-full max-w-md aspect-square">
//                             <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={`desk-img-${revealKey}-${current.id}`}
//                                     className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
//                                     initial={{
//                                         opacity: 0,
//                                         y: direction > 0 ? "60%" : "-60%",
//                                         x: direction > 0 ? "8%" : "-8%",
//                                         scale: 0.85,
//                                         rotate: direction > 0 ? 5 : -5,
//                                     }}
//                                     animate={{ opacity: 1, y: "0%", x: "0%", scale: 1, rotate: 0 }}
//                                     exit={{
//                                         opacity: 0,
//                                         y: direction > 0 ? "-60%" : "60%",
//                                         x: direction > 0 ? "-8%" : "8%",
//                                         scale: 0.82,
//                                         rotate: direction > 0 ? -6 : 6,
//                                     }}
//                                     transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
//                                     style={{ boxShadow: `0 25px 50px -12px ${current.color}40` }}
//                                 >
//                                     <Image
//                                         src={current.image}
//                                         alt={current.title}
//                                         fill
//                                         className="object-cover"
//                                         sizes="50vw"
//                                         priority
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                                     <motion.div
//                                         initial={{ opacity: 0, y: 12 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: 0.3 }}
//                                         className="absolute bottom-5 left-5 right-5 flex items-end justify-between"
//                                     >
//                                         <h3 className="text-white text-xl font-black" style={{ fontFamily: '"Fredoka One", cursive' }}>
//                                             {current.shortTitle}
//                                         </h3>
//                                         <span
//                                             className="px-3 py-1 rounded-full text-xs font-bold text-white capitalize"
//                                             style={{ background: current.color }}
//                                         >
//                                             {current.intensity}
//                                         </span>
//                                     </motion.div>
//                                 </motion.div>
//                             </AnimatePresence>

//                             {nextActivity && (
//                                 <motion.div
//                                     key={`next-${nextActivity.id}`}
//                                     className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
//                                     animate={{ opacity: 0.12, scale: 0.82, y: 80, x: 30, rotate: 4 }}
//                                     transition={{ duration: 0.5 }}
//                                 >
//                                     <Image src={nextActivity.image} alt={nextActivity.title} fill className="object-cover" />
//                                 </motion.div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Desktop progress bar */}
//                 <div className="hidden lg:block absolute bottom-8 left-10 right-10 z-20">
//                     <div className="flex items-center gap-4 mb-3">
//                         <span className="text-sm font-bold text-gray-400 w-12 tabular-nums">
//                             {String(activeIndex + 1).padStart(2, "0")}
//                         </span>
//                         <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
//                             <motion.div
//                                 className="h-full rounded-full"
//                                 animate={{ width: `${((activeIndex + 1) / COUNT) * 100}%` }}
//                                 transition={{ duration: 0.3 }}
//                                 style={{ background: current.color }}
//                             />
//                         </div>
//                         <span className="text-sm font-bold text-gray-400 w-12 text-right tabular-nums">
//                             {String(COUNT).padStart(2, "0")}
//                         </span>
//                     </div>
//                     <div className="flex justify-center gap-1.5">
//                         {activities.map((_, i) => (
//                             <motion.div
//                                 key={i}
//                                 className="rounded-full"
//                                 animate={{
//                                     width: i === activeIndex ? 20 : 6,
//                                     height: 6,
//                                     backgroundColor: i === activeIndex ? current.color : "#e5e7eb",
//                                 }}
//                                 transition={{ duration: 0.25 }}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Desktop scroll hint */}
//                 <AnimatePresence>
//                     {activeIndex === 0 && isActive && (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             className="absolute bottom-9 right-14 hidden lg:flex flex-col items-center gap-1 text-gray-400 text-xs"
//                         >
//                             <span>Scroll to explore</span>
//                             <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.span>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }