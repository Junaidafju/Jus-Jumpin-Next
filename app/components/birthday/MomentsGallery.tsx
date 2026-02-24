"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

/* ─── gallery data ─────────────────────────────────────────── */
const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop", tag: "Cake Time 🎂", color: "#FFD6E0" },
  { src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=200&h=200&fit=crop", tag: "Celebrate! 🥳", color: "#D6F0FF" },
  { src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&h=200&fit=crop", tag: "Jump High 🚀", color: "#E8FFD6" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", tag: "Best Pals 👯", color: "#FFF3D6" },
  { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&h=200&fit=crop", tag: "Balloons! 🎈", color: "#F0D6FF" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop", tag: "Dance Off 🎵", color: "#FFE8D6" },
  { src: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=200&h=200&fit=crop", tag: "Sweets! 🍭", color: "#D6FFF0" },
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200&h=200&fit=crop", tag: "Sparkle ✨", color: "#FFFBD6" },
  { src: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=200&h=200&fit=crop", tag: "Party! 🎊", color: "#FFD6D6" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=900&fit=crop", thumb: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=200&fit=crop", tag: "Neon Fun 🌈", color: "#D6E8FF" },
];

/* ─── CSS ──────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&display=swap');

/* ── section shell ── */
.mgv-root {
  position: relative;
  width: 100%;
  background: #e7f4ff;
  padding: 80px 0 90px;
  overflow: hidden;
  font-family: 'Nunito', sans-serif;
}

/* bg blobs */
.mgv-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.38;
}

/* ── header ── */
.mgv-header {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 44px;
  padding: 0 20px;
}
.mgv-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #fff;
  border: 2.5px solid #b4dbff;
  color: #3080c0;
  font-family: 'Fredoka One', cursive;
  font-size: 0.88rem;
  letter-spacing: 1px;
  padding: 7px 22px;
  border-radius: 60px;
  margin-bottom: 16px;
  box-shadow: 0 4px 0 #b4dbff, 0 6px 18px rgba(48,128,192,0.10);
}
.mgv-h2 {
  font-family: 'Fredoka One', cursive;
  font-size: clamp(2rem, 5vw, 3.6rem);
  font-weight: 400;
  color: #1b3a5c;
  line-height: 1.1;
  margin: 0 0 10px;
}
.mgv-h2 .o { color: #FE5000; }
.mgv-h2 .b { color: #3080c0; }
.mgv-sub {
  font-size: 1rem;
  color: #5a80a0;
  font-weight: 700;
  margin: 0;
}

/* ── big cartoon frame ── */
.mgv-frame-wrap {
  position: relative;
  z-index: 5;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}

.mgv-cartoon-frame {
  position: relative;
  border-radius: 32px;
  border: 5px solid #1b3a5c;
  box-shadow:
    8px 8px 0 0 #1b3a5c,
    0 20px 60px rgba(27,58,92,0.18);
  background: #fff;
  overflow: hidden;
}

/* top bar of frame like a TV/polaroid */
.mgv-frame-topbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 44px;
  background: #1b3a5c;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-radius: 26px 26px 0 0;
}
.mgv-frame-dots {
  display: flex;
  gap: 7px;
}
.mgv-frame-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.mgv-frame-title {
  font-family: 'Fredoka One', cursive;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.75);
  letter-spacing: 1px;
}
.mgv-frame-counter {
  font-family: 'Fredoka One', cursive;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
}

/* main image area */
.mgv-main-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  margin-top: 44px; /* below topbar */
  overflow: hidden;
  background: #0a1628;
  cursor: pointer;
}

.mgv-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.42s ease, transform 0.42s ease;
  user-select: none;
  -webkit-user-drag: none;
}
.mgv-main-img.fading {
  opacity: 0;
  transform: scale(1.04);
}

/* tag badge over main image */
.mgv-main-tag {
  position: absolute;
  top: 18px;
  left: 18px;
  font-family: 'Fredoka One', cursive;
  font-size: 1.05rem;
  color: #1b3a5c;
  background: var(--tag-bg, #fff);
  border: 2.5px solid rgba(255,255,255,0.9);
  border-radius: 40px;
  padding: 7px 20px;
  box-shadow: 4px 4px 0 rgba(27,58,92,0.15);
  letter-spacing: 0.3px;
  transition: opacity 0.3s ease;
  z-index: 5;
}

/* arrow nav buttons on main image */
.mgv-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid #1b3a5c;
  background: #fff;
  box-shadow: 4px 4px 0 #1b3a5c;
  color: #1b3a5c;
  font-size: 1.4rem;
  font-family: 'Fredoka One', cursive;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease, background 0.18s;
  line-height: 1;
}
.mgv-arrow:hover {
  background: #FE5000;
  border-color: #FE5000;
  color: #fff;
  box-shadow: 5px 5px 0 #c03a00;
  transform: translateY(-50%) scale(1.12);
}
.mgv-arrow-left  { left: 16px; }
.mgv-arrow-right { right: 16px; }

/* bottom caption bar */
.mgv-caption-bar {
  background: #1b3a5c;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.mgv-caption-text {
  font-family: 'Fredoka One', cursive;
  font-size: 1.1rem;
  color: #fff;
  letter-spacing: 0.3px;
}
.mgv-like-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2.5px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
  line-height: 1;
}
.mgv-like-btn:hover { transform: scale(1.25); background: rgba(255,255,255,0.2); }
.mgv-like-btn.liked {
  background: #ffe0eb;
  border-color: #ff8aaa;
  color: #e0003c;
  animation: mgv-pop 0.38s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes mgv-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.55); }
  100% { transform: scale(1); }
}

/* ── filmstrip ── */
.mgv-strip-wrap {
  position: relative;
  z-index: 5;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 18px;
}

/* cartoon outer border same as frame */
.mgv-strip-frame {
  border: 5px solid #1b3a5c;
  border-radius: 22px;
  box-shadow: 6px 6px 0 #1b3a5c;
  background: #1b3a5c;
  overflow: hidden;
  position: relative;
}

/* film holes top & bottom */
.mgv-strip-holes {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 6px 16px;
}
.mgv-hole {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.25);
  flex-shrink: 0;
}

/* thumbnails row */
.mgv-thumbs-overflow {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
  background: #0a1628;
}
.mgv-thumbs-overflow::-webkit-scrollbar { display: none; }
.mgv-thumbs-overflow.grabbing { cursor: grabbing; }

.mgv-thumbs-row {
  display: flex;
  gap: 10px;
  padding: 10px 14px;
  width: max-content;
}

/* single thumb */
.mgv-thumb {
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  border: 3.5px solid transparent;
  box-shadow: 0 2px 0 rgba(255,255,255,0.08);
  cursor: pointer;
  flex-shrink: 0;
  transition:
    border-color 0.22s ease,
    transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
    box-shadow 0.22s ease;
  background: #1e2e44;
}
.mgv-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  -webkit-user-drag: none;
  transition: transform 0.4s ease;
  filter: brightness(0.72) saturate(0.8);
}
.mgv-thumb:hover img {
  transform: scale(1.1);
  filter: brightness(0.9) saturate(1);
}
.mgv-thumb:hover {
  transform: translateY(-5px) scale(1.08);
  box-shadow: 0 8px 0 rgba(255,255,255,0.08);
}
.mgv-thumb.active {
  border-color: #FE5000;
  box-shadow: 0 0 0 2px #FE5000, 4px 6px 0 #c03a00;
  transform: translateY(-6px) scale(1.1);
}
.mgv-thumb.active img {
  filter: brightness(1) saturate(1.1);
}
/* number badge on thumb */
.mgv-thumb-num {
  position: absolute;
  bottom: 5px;
  right: 7px;
  font-family: 'Fredoka One', cursive;
  font-size: 0.62rem;
  color: rgba(255,255,255,0.7);
  line-height: 1;
  pointer-events: none;
}
/* active indicator dot */
.mgv-thumb-dot {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #FE5000;
  border: 1.5px solid #fff;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  pointer-events: none;
}
.mgv-thumb.active .mgv-thumb-dot {
  opacity: 1;
  transform: scale(1);
}

/* ── CTA ── */
.mgv-cta {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-top: 52px;
}
.mgv-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Fredoka One', cursive;
  font-size: 1.15rem;
  color: #fff;
  background: #FE5000;
  border: 3px solid #1b3a5c;
  border-radius: 60px;
  padding: 16px 48px;
  text-decoration: none;
  box-shadow: 5px 5px 0 #1b3a5c, 0 8px 24px rgba(254,80,0,0.30);
  cursor: pointer;
  transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
  letter-spacing: 0.3px;
}
.mgv-cta-btn:hover {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 7px 9px 0 #1b3a5c, 0 14px 36px rgba(254,80,0,0.38);
}
.mgv-cta-btn:active {
  transform: translateY(2px);
  box-shadow: 2px 2px 0 #1b3a5c;
}
.mgv-cta p {
  margin-top: 14px;
  font-size: 0.88rem;
  color: #5a80a0;
  font-weight: 700;
}

/* ── slide progress dots ── */
.mgv-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  position: relative;
  z-index: 10;
}
.mgv-pip {
  height: 8px;
  border-radius: 4px;
  border: 2px solid #1b3a5c;
  background: #fff;
  cursor: pointer;
  transition: width 0.3s ease, background 0.3s ease;
  width: 8px;
}
.mgv-pip.active {
  background: #FE5000;
  width: 26px;
  border-color: #FE5000;
}

/* ── auto-play bar ── */
.mgv-autoplay-bar {
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  background: #FE5000;
  border-radius: 0 3px 3px 0;
  z-index: 20;
  transition: none;
}

/* ── responsive ── */
@media (max-width: 640px) {
  .mgv-thumb { width: 70px; height: 70px; border-radius: 10px; }
  .mgv-thumbs-row { gap: 8px; padding: 8px 10px; }
  .mgv-arrow { width: 38px; height: 38px; font-size: 1.1rem; }
  .mgv-cartoon-frame { border-radius: 22px; }
  .mgv-frame-topbar { height: 36px; border-radius: 17px 17px 0 0; }
  .mgv-main-img-wrap { margin-top: 36px; }
}
`;

interface MomentsGalleryProps {
  onBookNow?: () => void;
}

export default function MomentsGallery({ onBookNow }: MomentsGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [autoProg, setAutoProg] = useState(0);

  const thumbsRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragRef = useRef({ on: false, startX: 0, scrollStart: 0 });

  const N = PHOTOS.length;

  /* ── inject CSS ── */
  useEffect(() => {
    if (document.getElementById("mgv-css")) return;
    const s = document.createElement("style");
    s.id = "mgv-css"; s.textContent = CSS;
    document.head.appendChild(s);
    return () => { document.getElementById("mgv-css")?.remove(); };
  }, []);

  /* ── transition to new photo ── */
  const goTo = useCallback((idx: number, fromAuto = false) => {
    if (!fromAuto) resetAuto();
    setFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setFading(false);
      setAutoProg(0);
    }, 340);
  }, []); // eslint-disable-line

  /* ── auto-advance every 4s ── */
  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (progRef.current) clearInterval(progRef.current);
    setAutoProg(0);
  };

  useEffect(() => {
    setAutoProg(0);
    autoRef.current = setInterval(() => {
      setActiveIdx(p => {
        const next = (p + 1) % N;
        setFading(true);
        setTimeout(() => { setActiveIdx(next); setFading(false); setAutoProg(0); }, 340);
        return p; // fading handles actual switch
      });
    }, 4200);

    // progress bar
    const TICK = 50;
    progRef.current = setInterval(() => {
      setAutoProg(p => Math.min(p + (TICK / 4200) * 100, 100));
    }, TICK);

    return () => { clearInterval(autoRef.current!); clearInterval(progRef.current!); };
  }, []); // eslint-disable-line

  /* scroll active thumb into view */
  useEffect(() => {
    const wrap = thumbsRef.current;
    if (!wrap) return;
    const thumb = wrap.children[activeIdx] as HTMLElement;
    if (!thumb) return;
    const wrapRect = wrap.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const offset = thumbRect.left - wrapRect.left - (wrapRect.width - thumbRect.width) / 2;
    wrap.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeIdx]);

  /* ── filmstrip drag ── */
  useEffect(() => {
    const wrap = thumbsRef.current;
    if (!wrap) return;
    const pd = (e: PointerEvent) => {
      dragRef.current = { on: true, startX: e.clientX, scrollStart: wrap.scrollLeft };
      wrap.classList.add("grabbing");
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };
    const pm = (e: PointerEvent) => {
      if (!dragRef.current.on) return;
      wrap.scrollLeft = dragRef.current.scrollStart - (e.clientX - dragRef.current.startX);
    };
    const pu = () => { dragRef.current.on = false; wrap.classList.remove("grabbing"); };
    wrap.addEventListener("pointerdown", pd);
    wrap.addEventListener("pointermove", pm);
    wrap.addEventListener("pointerup", pu);
    wrap.addEventListener("pointercancel", pu);
    return () => {
      wrap.removeEventListener("pointerdown", pd);
      wrap.removeEventListener("pointermove", pm);
      wrap.removeEventListener("pointerup", pu);
      wrap.removeEventListener("pointercancel", pu);
    };
  }, []);

  /* ── keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo((activeIdx + 1) % N);
      if (e.key === "ArrowLeft") goTo((activeIdx - 1 + N) % N);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, goTo, N]);

  const toggleLike = (i: number) => {
    setLiked(prev => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });
  };

  const current = PHOTOS[activeIdx];
  const holeCount = 14;

  return (
    <section className="mgv-root" aria-label="Moments Gallery">
      {/* bg blobs */}
      {[
        { w: 260, h: 260, top: "2%", left: "-4%", bg: "#c6e8ff" },
        { w: 170, h: 170, top: "12%", left: "90%", bg: "#ffd0e4" },
        { w: 140, h: 140, top: "72%", left: "86%", bg: "#cfffd6" },
        { w: 110, h: 110, top: "80%", left: "2%", bg: "#fff2c6" },
      ].map((b, i) => (
        <div key={i} className="mgv-blob" aria-hidden="true"
          style={{ width: b.w, height: b.h, top: b.top, left: b.left, background: b.bg }} />
      ))}

      {/* ── header ── */}
      <div className="mgv-header">
        <div className="mgv-badge">📸 Happy Moments</div>
        <h2 className="mgv-h2">
          Our <span className="o">Magical</span>{" "}
          <span className="b">Gallery</span> 🎉
        </h2>
        <p className="mgv-sub">Every photo is a story — click a thumbnail to relive it</p>
      </div>

      {/* ── cartoon frame (main image) ── */}
      <div className="mgv-frame-wrap">
        <div className="mgv-cartoon-frame">
          {/* top bar */}
          <div className="mgv-frame-topbar">
            <div className="mgv-frame-dots">
              <div className="mgv-frame-dot" style={{ background: "#ff5f56" }} />
              <div className="mgv-frame-dot" style={{ background: "#ffbd2e" }} />
              <div className="mgv-frame-dot" style={{ background: "#28c840" }} />
            </div>
            <span className="mgv-frame-title">Jus Jumpin' Gallery</span>
            <span className="mgv-frame-counter">{activeIdx + 1} / {N}</span>
          </div>

          {/* main image */}
          <div className="mgv-main-img-wrap">
            {/* auto-play progress bar */}
            <div
              className="mgv-autoplay-bar"
              style={{ width: `${autoProg}%` }}
              aria-hidden="true"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeIdx}
              src={current.src}
              alt={current.tag}
              className={`mgv-main-img${fading ? " fading" : ""}`}
              draggable={false}
            />
            {/* tag */}
            <div className="mgv-main-tag" style={{ "--tag-bg": current.color } as React.CSSProperties}>
              {current.tag}
            </div>
            {/* arrows */}
            <button className="mgv-arrow mgv-arrow-left"
              onClick={() => goTo((activeIdx - 1 + N) % N)}
              aria-label="Previous photo">‹</button>
            <button className="mgv-arrow mgv-arrow-right"
              onClick={() => goTo((activeIdx + 1) % N)}
              aria-label="Next photo">›</button>
          </div>

          {/* caption bar */}
          <div className="mgv-caption-bar">
            <span className="mgv-caption-text">{current.tag}</span>
            <button
              className={`mgv-like-btn${liked.has(activeIdx) ? " liked" : ""}`}
              onClick={() => toggleLike(activeIdx)}
              aria-label="Like photo"
            >
              {liked.has(activeIdx) ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* ── progress pips ── */}
      <div className="mgv-progress" aria-label="Photo navigation">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            className={`mgv-pip${i === activeIdx ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>

      {/* ── filmstrip thumbnail strip ── */}
      <div className="mgv-strip-wrap" aria-label="Photo thumbnails">
        <div className="mgv-strip-frame">
          {/* film holes top */}
          <div className="mgv-strip-holes">
            {Array.from({ length: holeCount }).map((_, i) => <div key={i} className="mgv-hole" />)}
          </div>

          {/* thumbnails */}
          <div className="mgv-thumbs-overflow" ref={thumbsRef}>
            <div className="mgv-thumbs-row" role="list">
              {PHOTOS.map((p, i) => (
                <button
                  key={i}
                  role="listitem"
                  className={`mgv-thumb${i === activeIdx ? " active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Select ${p.tag}`}
                  aria-pressed={i === activeIdx}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumb} alt={p.tag} loading="lazy" decoding="async" draggable={false} />
                  <div className="mgv-thumb-dot" aria-hidden="true" />
                  <span className="mgv-thumb-num">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* film holes bottom */}
          <div className="mgv-strip-holes">
            {Array.from({ length: holeCount }).map((_, i) => <div key={i} className="mgv-hole" />)}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="mgv-cta">
        <button
          onClick={onBookNow}
          className="mgv-cta-btn"
        >
          🎂 Book a Birthday Party
        </button>
        <p>Limited weekend slots — don&apos;t miss out!</p>
      </div>
    </section>
  );
}