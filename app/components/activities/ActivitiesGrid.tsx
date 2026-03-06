"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Clock, Users, Zap, ArrowRight, X } from "lucide-react";
import { activities, categories, Activity, colors } from "./activitiesData";

// ─── Per-card holo config ─────────────────────────────────────────────────────
const HOLO_CONFIGS: Record<string, { c1: string; c2: string; c3?: string; c4?: string; c5?: string }> = {
    pink: { c1: "#f67edd", c2: "#ff5da0" },
    orange: { c1: "#ff661a", c2: "#ffc60b" },
    cyan: { c1: "#00b9e3", c2: "#4facfe" },
    green: { c1: "#6dc065", c2: "#b2d235" },
    purple: { c1: "#8869d2", c2: "#f67edd", c3: "#00b9e3", c4: "#6dc065", c5: "#ffc60b" },
    red: { c1: "#ff3645", c2: "#ff5da0" },
    yellow: { c1: "#ffc60b", c2: "#b2d235" },
    blue: { c1: "#4facfe", c2: "#00b9e3" },
    lime: { c1: "#b2d235", c2: "#6dc065" },
    rose: { c1: "#ff5da0", c2: "#f67edd" },
};

function getHoloConfig(color: string) {
    const key = Object.entries(colors).find(([, v]) => v === color)?.[0] || "orange";
    return HOLO_CONFIGS[key] || HOLO_CONFIGS.orange;
}

// ─── Single Holo Card ─────────────────────────────────────────────────────────
interface HoloCardProps {
    activity: Activity;
    index: number;
}

function HoloCard({ activity, index }: HoloCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [transform, setTransform] = useState("");
    const [gradPos, setGradPos] = useState("50% 50%");
    const [sparkPos, setSparkPos] = useState("50% 50%");
    const [glareOpc, setGlareOpc] = useState(0.4);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimated, setIsAnimated] = useState(true);

    const holo = getHoloConfig(activity.color);

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (isFlipped) return;
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const l = e.clientX - rect.left;
        const t = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        const px = Math.abs(Math.floor((100 / w) * l) - 100);
        const py = Math.abs(Math.floor((100 / h) * t) - 100);
        const pa = (50 - px) + (50 - py);

        const lp = 50 + (px - 50) / 1.5;
        const tp = 50 + (py - 50) / 1.5;
        const pxSpark = 50 + (px - 50) / 7;
        const pySpark = 50 + (py - 50) / 7;
        const pOpc = 20 + Math.abs(pa) * 1.5;

        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * 0.5;

        setTransform(`rotateX(${ty}deg) rotateY(${tx}deg)`);
        setGradPos(`${lp}% ${tp}%`);
        setSparkPos(`${pxSpark}% ${pySpark}%`);
        setGlareOpc(pOpc / 100);
        setIsHovered(true);
        setIsAnimated(false);

        if (timerRef.current) clearTimeout(timerRef.current);
    }, [isFlipped]);

    const handlePointerLeave = useCallback(() => {
        if (isFlipped) return;
        setTransform("");
        setIsHovered(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setIsAnimated(true), 2500);
    }, [isFlipped]);

    const handleClick = useCallback(() => {
        setIsFlipped((f) => !f);
        setTransform("");
        setIsHovered(false);
        setIsAnimated(false);
    }, []);

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    const rainbowGradient = holo.c3
        ? `linear-gradient(115deg, transparent 20%, ${holo.c1} 36%, ${holo.c2} 43%, ${holo.c3} 50%, ${holo.c4} 57%, ${holo.c5} 64%, transparent 80%)`
        : `linear-gradient(110deg, transparent 25%, ${holo.c1} 48%, ${holo.c2} 52%, transparent 75%)`;

    const ambientGradient = `linear-gradient(115deg,
    transparent 0%, ${holo.c1} 25%,
    transparent 47%, transparent 53%,
    ${holo.c2} 75%, transparent 100%)`;

    const c1 = holo.c1;
    const c2 = holo.c2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            style={{ perspective: "750px" }}
            className="relative"
        >
            {/* Card wrapper — handles tilt transform */}
            <div
                ref={cardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onClick={handleClick}
                className={`holo-card ${isAnimated ? "animated" : ""} ${isHovered ? "hovered" : ""}`}
                style={{
                    transform: isFlipped
                        ? "rotateY(180deg)"
                        : isHovered
                            ? transform
                            : undefined,
                    "--c1": c1,
                    "--c2": c2,
                    "--grad-pos": gradPos,
                    "--spark-pos": sparkPos,
                    "--glare-opc": glareOpc,
                    "--rainbow": rainbowGradient,
                    "--ambient": ambientGradient,
                    "--activity-color": activity.color,
                } as React.CSSProperties}
            >
                {/* ── FRONT ── */}
                <div className="card-face card-front">
                    <div className="card-image-wrap">
                        <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="card-img"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                            priority={index < 4}
                        />
                        <div className="card-image-overlay" />
                    </div>

                    {/* Category pill */}
                    <div className="card-category" style={{ background: activity.color }}>
                        <span>{activity.icon}</span>
                        <span>{activity.category}</span>
                    </div>

                    {/* Flip hint sparkle */}
                    <div className="card-flip-hint">✦</div>

                    {/* Bottom info */}
                    <div className="card-front-footer">
                        <h3 className="card-title">{activity.shortTitle}</h3>
                        <p className="card-desc">{activity.description}</p>
                        <div className="card-meta">
                            <span><Users size={11} /> {activity.ageRange}</span>
                            <span><Clock size={11} /> {activity.duration}</span>
                        </div>
                        <div className="card-tap-hint">
                            <span>Tap to explore</span>
                            <ArrowRight size={12} />
                        </div>
                    </div>

                    {/* Holo gradient layer */}
                    <div className="holo-gradient" />
                    {/* Sparkle + holo overlay */}
                    <div className="holo-sparkle" />
                    {/* Glare */}
                    <div className="holo-glare" style={{ opacity: isHovered ? glareOpc : undefined }} />
                </div>

                {/* ── BACK ── */}
                <div className="card-face card-back">
                    <button
                        className="card-close-btn"
                        onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                    >
                        <X size={14} />
                    </button>

                    {/* Header strip */}
                    <div className="card-back-header" style={{ background: `linear-gradient(135deg, ${activity.color}22, ${activity.color}08)`, borderBottom: `2px solid ${activity.color}30` }}>
                        <div className="card-back-icon" style={{ background: `${activity.color}18`, border: `1.5px solid ${activity.color}40` }}>
                            <span>{activity.icon}</span>
                        </div>
                        <div>
                            <div className="card-back-cat" style={{ color: activity.color }}>{activity.category}</div>
                            <h3 className="card-back-title" style={{ color: activity.color }}>{activity.title}</h3>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="card-back-body">
                        <p className="card-back-desc">{activity.fullDescription}</p>

                        {/* Stats */}
                        <div className="card-stats">
                            {[
                                { icon: <Users size={14} />, label: "Age", value: activity.ageRange },
                                { icon: <Clock size={14} />, label: "Time", value: activity.duration },
                                { icon: <Zap size={14} />, label: "Level", value: activity.intensity },
                            ].map(({ icon, label, value }) => (
                                <div key={label} className="card-stat-item" style={{ borderColor: `${activity.color}25` }}>
                                    <div style={{ color: activity.color }}>{icon}</div>
                                    <div className="card-stat-label">{label}</div>
                                    <div className="card-stat-value">{value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Features */}
                        <div className="card-features">
                            {activity.features.slice(0, 4).map((f, i) => (
                                <span key={i} className="card-feature-tag" style={{ background: `${activity.color}12`, color: activity.color, border: `1px solid ${activity.color}25` }}>
                                    {f}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <button className="card-book-btn" style={{ background: `linear-gradient(135deg, ${activity.color}, ${holo.c2})` }}>
                            Book This Activity
                            <ArrowRight size={15} />
                        </button>
                    </div>

                    {/* Subtle back holo shimmer */}
                    <div className="back-shimmer" style={{ background: `radial-gradient(ellipse at 60% 30%, ${activity.color}10 0%, transparent 70%)` }} />
                </div>
            </div>

            {/* Card name label beneath */}
            <div className="card-label-below" style={{ color: activity.color }}>
                {activity.shortTitle}
            </div>
        </motion.div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ActivitiesGrid() {
    const [selectedCat, setSelectedCat] = useState("all");

    const filtered = selectedCat === "all"
        ? activities
        : activities.filter((a) => a.category === selectedCat);

    return (
        <section className="activities-grid-section">
            <style>{STYLES}</style>

            {/* Section header */}
            <div className="grid-header">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-eyebrow">✦ Our Collection ✦</div>
                    <h2 className="section-title">
                        All <span style={{ color: colors.orange }}>Activities</span>
                    </h2>
                    <p className="section-sub">
                        Hover each card to reveal the holo shimmer — tap to flip for details
                    </p>
                </motion.div>

                {/* Category filters */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="filter-bar"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCat(cat.id)}
                            className={`filter-btn ${selectedCat === cat.id ? "active" : ""}`}
                            style={selectedCat === cat.id ? { background: cat.color, borderColor: cat.color, color: "#fff" } : {}}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Grid */}
            <motion.div layout className="cards-grid">
                <AnimatePresence mode="popLayout">
                    {filtered.map((activity, i) => (
                        <HoloCard key={activity.id} activity={activity} index={i} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');

  .activities-grid-section {
    padding: 80px 20px 100px;
    background: linear-gradient(180deg, #ffffff 0%, #fdf9ff 50%, #fff8f5 100%);
    position: relative;
    overflow: hidden;
  }

  .activities-grid-section::before {
    content: '';
    position: absolute;
    top: -200px;
    left: -200px;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, #f67edd12 0%, transparent 70%);
    pointer-events: none;
  }
  .activities-grid-section::after {
    content: '';
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, #00b9e310 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Header ── */
  .grid-header {
    max-width: 1200px;
    margin: 0 auto 56px;
    text-align: center;
  }
  .section-eyebrow {
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #ff661a;
    margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(36px, 5vw, 56px);
    color: #1a1a2e;
    margin-bottom: 10px;
    line-height: 1.1;
  }
  .section-sub {
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    color: #888;
    margin-bottom: 32px;
  }

  /* ── Filter bar ── */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 100px;
    border: 2px solid #e8e0f0;
    background: white;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #555;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .filter-btn:hover {
    border-color: #ccc;
    transform: translateY(-1px);
  }

  /* ── Cards grid ── */
  .cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px 28px;
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 500px) {
  .cards-grid { grid-template-columns: repeat(1, 1fr); gap: 28px 16px; }
}

  /* ── Holo Card Shell ── */
  .holo-card {
    width: 100%;
    aspect-ratio: 2.5 / 3.5;
    position: relative;
    transform-style: preserve-3d;
    cursor: pointer;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s ease;
    border-radius: 12px;

    box-shadow:
      -4px -4px 6px -4px var(--c1, #ff661a),
      4px 4px 6px -4px var(--c2, #ffc60b),
      0 20px 30px -12px rgba(0,0,0,0.15);
  }
  .holo-card:hover {
    box-shadow:
      -14px -14px 22px -18px var(--c1, #ff661a),
      14px 14px 22px -18px var(--c2, #ffc60b),
      -5px -5px 8px -4px var(--c1, #ff661a),
      5px 5px 8px -4px var(--c2, #ffc60b),
      0 0 10px 2px rgba(255,255,255,0.4),
      0 30px 24px -15px rgba(0,0,0,0.18);
  }
  .holo-card.animated {
    animation: holoCard 12s ease 0s infinite;
  }

  /* ── Card faces ── */
  .card-face {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    backface-visibility: hidden;
    overflow: hidden;
  }
  .card-back {
    transform: rotateY(180deg);
    background: white;
    display: flex;
    flex-direction: column;
  }

  /* ── Front face ── */
  .card-front {
    background: #040712;
  }
  .card-image-wrap {
    position: absolute;
    inset: 0;
  }
  .card-img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .holo-card:hover .card-img {
    transform: scale(1.06);
  }
  .card-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
  }

  /* Category pill */
  .card-category {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 100px;
    font-family: 'Nunito', sans-serif;
    font-size: 10px;
    font-weight: 800;
    color: white;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    z-index: 3;
    backdrop-filter: blur(4px);
  }

  .card-flip-hint {
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: 16px;
    color: rgba(255,255,255,0.5);
    z-index: 3;
    animation: spin 4s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* Bottom info */
  .card-front-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px 13px 13px;
    z-index: 3;
  }
  .card-title {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(14px, 2vw, 17px);
    color: white;
    margin-bottom: 4px;
    line-height: 1.2;
  }
  .card-desc {
    font-family: 'Nunito', sans-serif;
    font-size: 10px;
    color: rgba(255,255,255,0.7);
    line-height: 1.4;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-meta {
    display: flex;
    gap: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 9px;
    color: rgba(255,255,255,0.55);
    margin-bottom: 7px;
  }
  .card-meta span {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .card-tap-hint {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: 'Nunito', sans-serif;
    font-size: 9px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  /* ── Holo effects ── */
  .holo-gradient,
.holo-sparkle,
.holo-glare {
  position: absolute;
  inset: 0;
  clip-path: inset(58% 0 0 0);
    border-radius: 12px;
    pointer-events: none;
    mix-blend-mode: color-dodge;
    transition: opacity 0.33s ease, background-position 0.33s ease;
  }

  .holo-gradient {
    background-image: var(--ambient,
      linear-gradient(115deg, transparent 0%, #f67edd 25%, transparent 47%, transparent 53%, #ff661a 75%, transparent 100%));
    background-size: 300% 300%;
    background-position: 50% 50%;
    opacity: 0.45;
    filter: brightness(0.55) contrast(1);
    z-index: 4;
  }
  .holo-card.hovered .holo-gradient {
    background-image: var(--rainbow);
    background-position: var(--grad-pos, 50% 50%);
    background-size: 250% 250%;
    opacity: 0.85;
    filter: brightness(0.65) contrast(1.3);
  }

  .holo-sparkle {
    background-image:
      url("https://assets.codepen.io/13471/sparkles.gif"),
      url("https://assets.codepen.io/13471/holo.png"),
      linear-gradient(125deg, #ff008448 15%, #fca40038 30%, #ffff0028 40%, #00ff8a18 60%, #00cfff38 70%, #cc4cfa48 85%);
    background-position: var(--spark-pos, 50% 50%);
    background-size: 160%;
    background-blend-mode: overlay;
    opacity: 0.7;
    filter: brightness(1) contrast(1);
    z-index: 5;
  }
  .holo-card.hovered .holo-sparkle {
    opacity: var(--glare-opc, 0.7);
    background-position: var(--spark-pos, 50% 50%);
  }

  .holo-glare {
    background: radial-gradient(ellipse at var(--grad-pos, 50% 50%), rgba(255,255,255,0.35) 0%, transparent 65%);
    opacity: 0;
    mix-blend-mode: overlay;
    z-index: 6;
    transition: opacity 0.2s ease;
  }
  .holo-card.hovered .holo-glare {
    opacity: var(--glare-opc, 0.3);
  }

  /* ── Holo animations ── */
  .holo-card.animated .holo-gradient {
    animation: holoGrad 12s ease 0s infinite;
  }
  .holo-card.animated .holo-sparkle {
    animation: holoSpark 12s ease 0s infinite;
  }

  @keyframes holoGrad {
    0%,100%{ background-position:50% 50%; opacity:.4; filter:brightness(.5) contrast(1); }
    5%,9%  { background-position:100% 100%; opacity:.9; filter:brightness(.7) contrast(1.2); }
    13%,17%{ background-position:0% 0%; opacity:.8; }
    35%,39%{ background-position:100% 100%; opacity:.9; filter:brightness(.5) contrast(1); }
    55%    { background-position:0% 0%; opacity:.9; filter:brightness(.7) contrast(1.2); }
  }
  @keyframes holoSpark {
    0%,100%{ opacity:.65; background-position:50% 50%; filter:brightness(1.1) contrast(1.2); }
    5%,8%  { opacity:.9;  background-position:40% 40%; filter:brightness(.8) contrast(1.2); }
    13%,16%{ opacity:.4;  background-position:50% 50%; filter:brightness(1.1) contrast(.8); }
    35%,38%{ opacity:.9;  background-position:60% 60%; filter:brightness(1) contrast(1); }
    55%    { opacity:.3;  background-position:45% 45%; filter:brightness(1.1) contrast(1.2); }
  }
  @keyframes holoCard {
    0%,100%{ transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg); }
    5%,8%  { transform: rotateZ(0deg) rotateX(5deg) rotateY(-16deg); }
    13%,16%{ transform: rotateZ(0deg) rotateX(-7deg) rotateY(24deg); }
    35%,38%{ transform: rotateZ(2deg) rotateX(9deg) rotateY(16deg); }
    55%    { transform: rotateZ(-2deg) rotateX(-9deg) rotateY(-20deg); }
  }

  /* ── Back face ── */
  .card-back-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 13px 12px;
    flex-shrink: 0;
  }
  .card-back-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .card-back-cat {
    font-family: 'Nunito', sans-serif;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.8;
    margin-bottom: 2px;
  }
  .card-back-title {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(14px, 2vw, 16px);
    line-height: 1.2;
  }

  .card-back-body {
    padding: 10px 13px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    overflow: hidden;
  }
  .card-back-desc {
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    color: #555;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  .card-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 4px;
    border-radius: 8px;
    background: #fafafa;
    border: 1.5px solid #eee;
    text-align: center;
  }
  .card-stat-label {
    font-family: 'Nunito', sans-serif;
    font-size: 8px;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .card-stat-value {
    font-family: 'Nunito', sans-serif;
    font-size: 9px;
    font-weight: 800;
    color: #333;
    text-transform: capitalize;
  }

  .card-features {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .card-feature-tag {
    font-family: 'Nunito', sans-serif;
    font-size: 9px;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 100px;
  }

  .card-book-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 10px;
    border-radius: 100px;
    border: none;
    color: white;
    font-family: 'Fredoka One', cursive;
    font-size: 13px;
    cursor: pointer;
    margin-top: auto;
    transition: transform 0.15s ease, filter 0.15s ease;
  }
  .card-book-btn:hover {
    transform: scale(1.02);
    filter: brightness(1.08);
  }

  .card-close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: none;
    background: rgba(0,0,0,0.07);
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .card-close-btn:hover { background: rgba(0,0,0,0.13); }

  .back-shimmer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 12px;
  }

  /* ── Label below card ── */
  .card-label-below {
    text-align: center;
    font-family: 'Fredoka One', cursive;
    font-size: 12px;
    letter-spacing: 0.5px;
    margin-top: 8px;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .holo-card:hover + .card-label-below,
  .holo-card:focus + .card-label-below {
    opacity: 1;
  }
`;