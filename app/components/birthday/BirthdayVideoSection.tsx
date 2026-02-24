"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   Reel data — extracted from the 5 embeds provided
   ───────────────────────────────────────── */
const REELS = [
  {
    id: "DU4zHigEgda",
    url: "https://www.instagram.com/reel/DU4zHigEgda/",
    account: "@jusjumpin_raipur",
    label: "Jus' Jumpin' Raipur",
    tag: "Party Highlights 🎉",
    color: "#FFD6E0",
  },
  {
    id: "DTCoDNIDMza",
    url: "https://www.instagram.com/reel/DTCoDNIDMza/",
    account: "@unseenghatkopar",
    label: "Unseen Ghatkopar",
    tag: "Kids in Action 🚀",
    color: "#D6F0FF",
  },
  {
    id: "DROpgl_knS9",
    url: "https://www.instagram.com/reel/DROpgl_knS9/",
    account: "@_swarnali_laha",
    label: "Swarnali Laha",
    tag: "Fun Moments ✨",
    color: "#E8FFD6",
  },
  {
    id: "DQ9CgwggPq2",
    url: "https://www.instagram.com/reel/DQ9CgwggPq2/",
    account: "@jusjumpin",
    label: "Jus' Jumpin' Official",
    tag: "Birthday Magic 🎂",
    color: "#FFF3D6",
  },
  {
    id: "DCrOpRjMjKn",
    url: "https://www.instagram.com/reel/DCrOpRjMjKn/",
    account: "@jusjumpin",
    label: "Jus' Jumpin' Official",
    tag: "Celebrate! 🥳",
    color: "#F0D6FF",
  },
];

/* ─────────────────────────────────────────
   CSS
   ───────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&display=swap');

.irs-root {
  position: relative;
  width: 100%;
  background: #e7f4ff;
  padding: 88px 0 100px;
  overflow: hidden;
  font-family: 'Nunito', sans-serif;
}

/* bg blobs */
.irs-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.38;
}

/* ── header ── */
.irs-header {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 56px;
  padding: 0 20px;
}
.irs-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 2.5px solid #b4dbff;
  color: #3080c0;
  font-family: 'Fredoka One', cursive;
  font-size: 0.88rem;
  letter-spacing: 1px;
  padding: 7px 22px;
  border-radius: 60px;
  margin-bottom: 18px;
  box-shadow: 0 4px 0 #b4dbff, 0 6px 18px rgba(48,128,192,0.10);
}
.irs-h2 {
  font-family: 'Fredoka One', cursive;
  font-size: clamp(2rem, 5.5vw, 3.8rem);
  font-weight: 400;
  color: #1b3a5c;
  line-height: 1.08;
  margin: 0 0 14px;
}
.irs-h2 .o { color: #FE5000; }
.irs-h2 .b { color: #3080c0; }
.irs-sub {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: #5a80a0;
  font-weight: 700;
  margin: 0;
}

/* ── scroll container ── */
.irs-scroll-wrap {
  position: relative;
  z-index: 5;
}

/* edge fade masks */
.irs-scroll-wrap::before,
.irs-scroll-wrap::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 80px;
  z-index: 10;
  pointer-events: none;
}
.irs-scroll-wrap::before {
  left: 0;
  background: linear-gradient(90deg, #e7f4ff 0%, transparent 100%);
}
.irs-scroll-wrap::after {
  right: 0;
  background: linear-gradient(270deg, #e7f4ff 0%, transparent 100%);
}

.irs-track {
  display: flex;
  gap: 24px;
  padding: 20px 60px 32px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  cursor: grab;
}
.irs-track::-webkit-scrollbar { display: none; }
.irs-track.grabbing { cursor: grabbing; }

/* ── reel card ── */
.irs-card {
  flex-shrink: 0;
  scroll-snap-align: center;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;
}

/* cartoon phone frame */
.irs-phone {
  position: relative;
  width: 100%;
  background: #1b3a5c;
  border: 4px solid #1b3a5c;
  border-radius: 28px;
  box-shadow:
    6px 6px 0 #1b3a5c,
    0 20px 50px rgba(27,58,92,0.20);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
}
.irs-card:hover .irs-phone {
  transform: translateY(-8px) rotate(-0.5deg);
  box-shadow:
    8px 10px 0 #1b3a5c,
    0 30px 60px rgba(27,58,92,0.28);
}

/* phone notch bar */
.irs-phone-top {
  background: #1b3a5c;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
}
.irs-notch {
  width: 60px;
  height: 14px;
  background: #0a1628;
  border-radius: 0 0 12px 12px;
}
.irs-cam {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0a1628;
  position: absolute;
  right: 26px;
}

/* embed wrapper — 9:16 ratio */
.irs-embed-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  background: #0a1628;
  overflow: hidden;
}

.irs-embed-wrap iframe,
.irs-embed-wrap blockquote {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  max-width: none !important;
  min-width: 0 !important;
}

/* loading skeleton inside embed */
.irs-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e3a5c 0%, #0d2140 50%, #1e3a5c 100%);
  background-size: 200% 200%;
  animation: irs-shimmer 2s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 2;
  transition: opacity 0.4s ease;
}
.irs-skeleton.hidden { opacity: 0; pointer-events: none; }

@keyframes irs-shimmer {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

.irs-skeleton-logo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  animation: irs-pulse 2s ease-in-out infinite;
}
@keyframes irs-pulse {
  0%,100% { transform: scale(1); opacity: 0.7; }
  50%      { transform: scale(1.1); opacity: 1; }
}
.irs-skeleton-text {
  font-family: 'Fredoka One', cursive;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 1px;
}

/* phone bottom bar */
.irs-phone-bottom {
  background: #1b3a5c;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.irs-home-bar {
  width: 80px;
  height: 5px;
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
}

/* ── card label below phone ── */
.irs-card-label {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
}
.irs-tag {
  font-family: 'Fredoka One', cursive;
  font-size: 0.9rem;
  color: #1b3a5c;
  background: var(--tag-bg, #fff);
  border: 2.5px solid rgba(27,58,92,0.12);
  border-radius: 40px;
  padding: 6px 18px;
  box-shadow: 3px 3px 0 rgba(27,58,92,0.1);
  letter-spacing: 0.3px;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.irs-card:hover .irs-tag {
  transform: scale(1.05) rotate(-1deg);
}
.irs-account {
  font-size: 0.78rem;
  color: #8aadcc;
  font-weight: 700;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.irs-account svg { flex-shrink: 0; }

/* ── nav arrows ── */
.irs-arrows {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 36px;
}
.irs-arrow-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid #1b3a5c;
  background: #fff;
  color: #1b3a5c;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 0 #1b3a5c;
  transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s, background 0.2s, color 0.2s;
  line-height: 1;
  font-family: 'Fredoka One', cursive;
}
.irs-arrow-btn:hover {
  background: #FE5000;
  border-color: #FE5000;
  color: #fff;
  box-shadow: 5px 5px 0 #c03a00;
  transform: scale(1.1);
}
.irs-arrow-btn:active {
  transform: scale(0.96);
  box-shadow: 2px 2px 0 #1b3a5c;
}
.irs-arrow-btn:disabled {
  opacity: 0.35;
  cursor: default;
  transform: none;
}

/* progress pips */
.irs-pips {
  display: flex;
  gap: 7px;
  align-items: center;
}
.irs-pip {
  height: 8px;
  border-radius: 4px;
  background: #b4d4f0;
  border: 2px solid #b4d4f0;
  transition: width 0.3s ease, background 0.3s ease, border-color 0.3s;
  cursor: pointer;
  width: 8px;
}
.irs-pip.active {
  background: #FE5000;
  border-color: #FE5000;
  width: 24px;
}

/* ── CTA ── */
.irs-cta {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-top: 52px;
}
.irs-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'Fredoka One', cursive;
  font-size: 1.1rem;
  color: #fff;
  background: linear-gradient(135deg, #E1306C 0%, #C13584 100%);
  border: 3px solid #1b3a5c;
  border-radius: 60px;
  padding: 15px 40px;
  text-decoration: none;
  box-shadow: 5px 5px 0 #1b3a5c;
  cursor: pointer;
  transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
  letter-spacing: 0.3px;
}
.irs-cta-btn:hover {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 7px 8px 0 #1b3a5c;
}
.irs-cta p {
  margin-top: 12px;
  font-size: 0.85rem;
  color: #5a80a0;
  font-weight: 700;
}

/* ── ticker ── */
.irs-ticker {
  position: relative;
  z-index: 10;
  overflow: hidden;
  margin-top: 52px;
  background: #fff;
  border-top: 2.5px solid #cce7ff;
  border-bottom: 2.5px solid #cce7ff;
  padding: 12px 0;
  white-space: nowrap;
}
.irs-ticker-track {
  display: inline-flex;
  animation: irs-tick 18s linear infinite;
}
.irs-ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Fredoka One', cursive;
  font-size: 0.88rem;
  color: #3080c0;
  padding: 0 28px;
}
.irs-ticker-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #E1306C;
  flex-shrink: 0;
}
@keyframes irs-tick {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── mobile ── */
@media (max-width: 600px) {
  .irs-card { width: 88vw; max-width: 320px; }
  .irs-track { padding: 16px 24px 28px; gap: 18px; }
  .irs-scroll-wrap::before,
  .irs-scroll-wrap::after { width: 30px; }
  .irs-root { padding: 64px 0 80px; }
  .irs-header { margin-bottom: 40px; }
}
`;

/* ── Instagram SVG icon ── */
const IgIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#E1306C">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

/* ── Reel card ── */
function ReelCard({ reel, index }: { reel: typeof REELS[0]; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Use Instagram's oEmbed iframe approach for reliable embedding */
  const embedUrl = `https://www.instagram.com/reel/${reel.id}/embed/captioned/`;

  return (
    <div className="irs-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="irs-phone">
        {/* Phone top bar with notch */}
        <div className="irs-phone-top" style={{ position: "relative" }}>
          <div className="irs-notch" />
          <div className="irs-cam" />
        </div>

        {/* Embed area */}
        <div className="irs-embed-wrap">
          {/* Skeleton loader */}
          <div className={`irs-skeleton${loaded ? " hidden" : ""}`}>
            <div className="irs-skeleton-logo">📱</div>
            <span className="irs-skeleton-text">Loading Reel...</span>
          </div>

          <iframe
            ref={iframeRef}
            src={embedUrl}
            allowFullScreen
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            onLoad={() => setLoaded(true)}
            title={`Instagram Reel by ${reel.account}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              background: "#0a1628",
            }}
          />
        </div>

        {/* Phone bottom home bar */}
        <div className="irs-phone-bottom">
          <div className="irs-home-bar" />
        </div>
      </div>

      {/* Label below */}
      <div className="irs-card-label">
        <div
          className="irs-tag"
          style={{ "--tag-bg": reel.color } as React.CSSProperties}
        >
          {reel.tag}
        </div>
        <div className="irs-account">
          <IgIcon />
          {reel.account}
        </div>
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function InstagramReelsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const dragRef = useRef({ on: false, startX: 0, scrollStart: 0 });

  /* inject CSS */
  useEffect(() => {
    if (document.getElementById("irs-css")) return;
    const s = document.createElement("style");
    s.id = "irs-css"; s.textContent = CSS;
    document.head.appendChild(s);
    return () => { document.getElementById("irs-css")?.remove(); };
  }, []);

  /* track scroll position → update active pip */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardW = track.scrollWidth / REELS.length;
      const idx = Math.round(track.scrollLeft / cardW);
      setActiveIdx(Math.min(Math.max(idx, 0), REELS.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll to card */
  const scrollTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.scrollWidth / REELS.length;
    track.scrollTo({ left: cardW * idx, behavior: "smooth" });
    setActiveIdx(idx);
  };

  /* drag scroll */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const pd = (e: PointerEvent) => {
      dragRef.current = { on: true, startX: e.clientX, scrollStart: track.scrollLeft };
      track.classList.add("grabbing");
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };
    const pm = (e: PointerEvent) => {
      if (!dragRef.current.on) return;
      track.scrollLeft = dragRef.current.scrollStart - (e.clientX - dragRef.current.startX);
    };
    const pu = () => {
      dragRef.current.on = false;
      track.classList.remove("grabbing");
    };

    track.addEventListener("pointerdown", pd);
    track.addEventListener("pointermove", pm);
    track.addEventListener("pointerup", pu);
    track.addEventListener("pointercancel", pu);
    return () => {
      track.removeEventListener("pointerdown", pd);
      track.removeEventListener("pointermove", pm);
      track.removeEventListener("pointerup", pu);
      track.removeEventListener("pointercancel", pu);
    };
  }, []);

  const tickerWords = [
    "Follow @jusjumpin 🎉",
    "Real Moments 📸",
    "Real Kids 🧒",
    "Real Fun 🚀",
    "Seen on Instagram ❤️",
    "Tag us @jusjumpin 🏷️",
    "Share the Joy 🌈",
  ];
  const doubled = [...tickerWords, ...tickerWords];

  const blobs = [
    { w: 260, h: 260, top: "2%", left: "-4%", bg: "#c6e8ff" },
    { w: 180, h: 180, top: "15%", left: "90%", bg: "#ffd0e4" },
    { w: 160, h: 160, top: "68%", left: "85%", bg: "#cfffd6" },
    { w: 120, h: 120, top: "78%", left: "1%", bg: "#fff2c6" },
  ];

  return (
    <section className="irs-root" aria-label="Instagram Reels">
      {/* bg blobs */}
      {blobs.map((b, i) => (
        <div key={i} className="irs-blob" aria-hidden="true"
          style={{ width: b.w, height: b.h, top: b.top, left: b.left, background: b.bg }} />
      ))}

      {/* Header */}
      <div className="irs-header">
        <div className="irs-badge">
          <IgIcon />
          As Seen on Instagram
        </div>
        <h2 className="irs-h2">
          We&apos;re <span className="o">Viral</span> for a{" "}
          <span className="b">Reason!</span> 🎊
        </h2>
        <p className="irs-sub">
          Real parties · Real kids · Real joy — straight from Instagram
        </p>
      </div>

      {/* Reels track */}
      <div className="irs-scroll-wrap">
        <div className="irs-track" ref={trackRef}>
          {REELS.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>
      </div>

      {/* Nav arrows + pips */}
      <div className="irs-arrows">
        <button
          className="irs-arrow-btn"
          onClick={() => scrollTo(activeIdx - 1)}
          disabled={activeIdx === 0}
          aria-label="Previous reel"
        >
          ‹
        </button>

        <div className="irs-pips" aria-label="Reel navigation">
          {REELS.map((_, i) => (
            <button
              key={i}
              className={`irs-pip${i === activeIdx ? " active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="irs-arrow-btn"
          onClick={() => scrollTo(activeIdx + 1)}
          disabled={activeIdx === REELS.length - 1}
          aria-label="Next reel"
        >
          ›
        </button>
      </div>

      {/* CTA */}
      <div className="irs-cta">
        <a
          href="https://www.instagram.com/jusjumpin/"
          target="_blank"
          rel="noopener noreferrer"
          className="irs-cta-btn"
        >
          <IgIcon />
          Follow us on Instagram
        </a>
        <p>Join our community of happy families 🎈</p>
      </div>

      {/* Ticker */}
      <div className="irs-ticker" aria-hidden="true">
        <div className="irs-ticker-track">
          {doubled.map((w, i) => (
            <span key={i} className="irs-ticker-item">
              <span className="irs-ticker-dot" />{w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}