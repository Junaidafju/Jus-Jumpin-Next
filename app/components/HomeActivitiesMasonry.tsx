"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ACTIVITIES = [
  {
    title: "Interconnected Trampolines",
    image: "/image/birthday/photos.jpg",
    description: "Soar, flip, and bounce across interconnected wall-to-wall trampolines.",
  },
  {
    title: "Ninja Warrior Course",
    image: "/image/activities/ninja-course.jpg",
    description: "Test your speed and balance through obstacle courses.",
  },
  {
    title: "Giant Foam Pit",
    image: "/image/foam-pit.jpg",
    description: "Launch off trampolines into thousands of soft foam cubes.",
  },
  {
    title: "Soft Play Wonderland",
    image: "/image/birthday/dedicated-zones.jpg",
    description: "Safe, cushioned mazes and slides designed for little ones.",
  },
  {
    title: "Basketball Slam Dunk",
    image: "/image/basketball-dunk.jpg",
    description: "Bounce sky-high and slam dunk like a pro player.",
  },
  {
    title: "Wall Climbing Arena",
    image: "/image/birthday/fun-games.jpg",
    description: "Climb colorful wall grips with automated harness safety.",
  },
  {
    title: "Dodgeball Arena",
    image: "/image/birthday/kids-adult.jpg",
    description: "High-flying trampoline dodgeball matches with friends.",
  },
  {
    title: "Spiral Racing Slides",
    image: "/image/birthday/photo-moments.jpg",
    description: "Race down multi-lane spiral slides for endless giggles.",
  },
  {
    title: "Giant Ball Pool",
    image: "/image/birthday/personalized-themes.jpg",
    description: "Dive into an ocean of colorful play balls.",
  },
];

export default function HomeActivitiesMasonry() {
  const [grabbing, setGrabbing] = useState(false);
  const [instructions, setInstructions] = useState(false); // Default to false to avoid server/client mismatch

  const timelineRef = useRef<HTMLDivElement>(null);
  const imageTimelineRef = useRef<HTMLDivElement>(null);
  const backgroundImageTimelineRef = useRef<HTMLDivElement>(null);

  // Use a Ref to store grabbing & drag positions synchronously.
  // This bypasses React's asynchronous render state loop and prevents stale closure lagging!
  const stateRef = useRef({
    grabbing: false,
    position: { x: 0, left: 0 },
  });

  // ---- Scroll sync engine ----------------------------------------------
  const rafId = useRef<number | null>(null);
  const pendingLeft = useRef<number | null>(null);

  // Writes all tracks in lockstep, in the same tick.
  // - Dial/Tick Timeline: 1x speed
  // - Main Card Grid: 5x speed
  // - Background Layer: 7x speed (5 * 1.4)
  const syncTimelines = (left: number) => {
    if (timelineRef.current) timelineRef.current.scrollLeft = left;
    if (imageTimelineRef.current) imageTimelineRef.current.scrollLeft = left * 5;
    if (backgroundImageTimelineRef.current) backgroundImageTimelineRef.current.scrollLeft = left * 5 * 1.4;
  };

  const scheduleSync = (left: number) => {
    pendingLeft.current = left;
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        if (pendingLeft.current !== null) {
          syncTimelines(pendingLeft.current);
        }
        rafId.current = null;
      });
    }
  };

  // Clean up any pending frame on unmount
  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Safe client-side loading of instructions to avoid SSR Hydration discrepancies
  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("instructions");
      if (item === null) {
        setInstructions(true);
      }
    }
  }, []);

  const handleOnStart = (clientX: number) => {
    if (!timelineRef.current) return;
    stateRef.current.grabbing = true;
    stateRef.current.position = {
      x: clientX,
      left: timelineRef.current.scrollLeft,
    };
    setGrabbing(true);
  };

  const handleOnMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents ghost image dragging/text selection from hijacking drag events
    handleOnStart(e.clientX);
  };

  const handleOnTouchStart = (e: React.TouchEvent) => {
    handleOnStart(e.touches[0].clientX);
  };

  // Handles native scroll events on the timeline wrapper (wheel / momentum scrolling)
  const handleOnScroll = () => {
    if (timelineRef.current) {
      scheduleSync(timelineRef.current.scrollLeft);
    }
  };

  const handleOnMove = (clientX: number) => {
    const s = stateRef.current;
    if (s.grabbing && timelineRef.current) {
      const deltaX = s.position.x - clientX;
      const left = Math.max(0, s.position.left + deltaX);
      scheduleSync(left);
    }
  };

  const handleOnMouseMove = (e: React.MouseEvent) => {
    handleOnMove(e.clientX);
  };

  const handleOnTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleOnMove(e.touches[0].clientX);
    }
  };

  const handleOnMouseUp = () => {
    if (stateRef.current.grabbing) {
      stateRef.current.grabbing = false;
      setGrabbing(false);
      setInstructions(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("instructions", "false");
      }
    }
  };

  // Bind global drag release listeners for robust dragging boundary tracking
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      handleOnMove(e.clientX);
    };

    const handleGlobalUp = () => {
      handleOnMouseUp();
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleOnMove(e.touches[0].clientX);
      }
    };

    const handleGlobalTouchEnd = () => {
      handleOnMouseUp();
    };

    if (grabbing) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
      window.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
      window.addEventListener("touchend", handleGlobalTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grabbing]);

  // Generates timeline ticks with optional numbered label elements on top axis
  const getTicks = (quantity: number, showNumbers = false): React.ReactNode[] => {
    const ticks: React.ReactNode[] = [];

    const getClass = (index: number): string => {
      if (index % 15 === 0) return "fizz-buzz";
      if (index % 5 === 0) return "buzz";
      if (index % 3 === 0) return "fizz";
      return "";
    };

    for (let i = 1; i <= quantity; i++) {
      const cls = getClass(i);
      ticks.push(
        <div key={i} className="timeline-tick-wrapper flex flex-col items-center justify-end relative flex-shrink-0">
          {showNumbers && (
            <span className="absolute -top-10 text-[11px] font-black text-[#6dc065] tracking-widest select-none bg-slate-950/80 px-2 py-0.5 rounded border border-white/10 shadow-md">
              ZONE {i.toString().padStart(2, "0")}
            </span>
          )}
          <div className={`timeline-tick ${cls}`} />
        </div>
      );
    }

    return ticks;
  };

  return (
    <>
      <section
        id="activities"
        className="relative w-full bg-[#1e1e1e] overflow-hidden text-white border-t border-white/10"
      >
        {/* Header Overlay - Explore Our Action-Packed Zones (Centered & Premium) */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-2xl flex flex-col items-center text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black text-[#6dc065] uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg">
            ⚡ Explore Our Action-Packed Zones
          </div>
          <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] to-[#b2d235]">Ultimate Play Zones</span>
          </h2>
          <p className="text-slate-300 text-[10px] sm:text-sm font-semibold mt-1.5 drop-shadow-md">
            Drag or swipe horizontally to navigate across our high-energy rides & arenas!
          </p>
        </div>

        <div id="app-timeline-container">
          {/* Double Chevron down indicator pointing to dial ticks */}
          <div id="timeline-arrow-wrapper">
            <svg
              id="timeline-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
            <span id="timeline-arrow-guide" />
          </div>

          <div
            ref={timelineRef}
            onScroll={handleOnScroll}
            onMouseDown={handleOnMouseDown}
            onMouseMove={handleOnMouseMove}
            onMouseUp={handleOnMouseUp}
            onMouseLeave={handleOnMouseUp}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnMouseUp}
            onTouchCancel={handleOnMouseUp}
            onTouchMove={handleOnTouchMove}
            id="timeline-wrapper"
            className={grabbing ? "grabbing" : ""}
          >
            <div id="timeline">
              <div className="extra-timeline-ticks">{getTicks(2)}</div>
              <div id="timeline-ticks">{getTicks(ACTIVITIES.length, true)}</div>
              <div className="extra-timeline-ticks">{getTicks(2)}</div>
            </div>
          </div>

          {/* Foreground Card & Label Timeline */}
          <div id="image-timeline-wrapper" ref={imageTimelineRef}>
            <div id="image-timeline">
              <div id="image-timeline-items">
                {ACTIVITIES.map((act, index) => (
                  <div key={index} className="timeline-item">
                    {/* Large stylized zone label card header */}
                    <h1 className="timeline-item-label select-none">
                      Zone {index + 1}: {act.title}
                    </h1>
                    <div className="timeline-item-image-wrapper">
                      <div className="timeline-item-image">
                        <Image
                          src={act.image}
                          alt={act.title}
                          fill
                          className="object-cover rounded-[60px] hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 90vw, 1400px"
                          priority={index === 0}
                        />
                        <div className="timeline-item-image-filter" />

                        {/* Interactive Detail Overlay */}
                        <div className="absolute bottom-12 left-12 right-12 z-25 flex flex-col items-start pointer-events-none select-none">
                          <span className="px-3.5 py-1.5 rounded-full bg-[#6dc065] text-slate-950 text-xs font-black uppercase tracking-wider mb-2.5 shadow-md">
                            Zone {index + 1}
                          </span>
                          <p className="text-slate-200 text-sm sm:text-base font-semibold max-w-lg drop-shadow-md">
                            {act.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Background Blurred Parallax Timeline */}
          <div id="background-image-timeline-wrapper" ref={backgroundImageTimelineRef}>
            <div id="background-image-timeline">
              <div id="background-image-timeline-items">
                {ACTIVITIES.map((act, index) => (
                  <div
                    key={index}
                    className="timeline-item-background-image"
                    style={{
                      backgroundImage: `url(${act.image})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Guidance Overlay Instructions */}
          {instructions && (
            <div id="instructions">
              <h1>Pan from right to left</h1>
              <div id="instructions-action">
                <svg
                  className="instructions-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "24px", height: "24px", position: "absolute", top: "13px" }}
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Flat Scoped Styles compiled from SCSS */}
        <style jsx>{`
          #app-timeline-container {
            background-color: rgb(30, 30, 30);
            height: 100vh;
            overflow: hidden;
            position: relative;
            user-select: none;
            width: 100%;
          }

          #timeline-arrow-wrapper {
            align-items: center;
            bottom: 220px;
            display: flex;
            justify-content: center;
            pointer-events: none;
            position: absolute;
            width: 100%;
            z-index: 4;
          }

          #timeline-arrow {
            color: white;
            height: 40px;
            width: 40px;
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
          }

          #timeline-arrow-guide {
            background-color: rgba(255, 255, 255, 0.15);
            border-radius: 4px;
            bottom: -26px;
            height: 152px;
            left: 50%;
            position: absolute;
            transform: translate(-50%, 100%);
            width: 4px;
          }

          #timeline-wrapper {
            bottom: 0px;
            cursor: grab;
            display: flex;
            height: calc(100% - 40px);
            left: 0px;
            overflow: auto;
            padding-bottom: 40px;
            position: absolute;
            touch-action: none;
            width: 100%;
            z-index: 3;
            scrollbar-width: none;
          }

          #timeline-wrapper.grabbing {
            cursor: grabbing;
          }

          #timeline-wrapper::-webkit-scrollbar {
            height: 0px;
            display: none;
          }

          #timeline {
            display: inline-flex;
            gap: calc(20vw - 4px);
            padding: 0px calc(10vw - 2px);
          }

          .extra-timeline-ticks,
          #timeline-ticks {
            align-items: end;
            display: inline-flex;
            gap: calc(20vw - 4px);
          }

          .extra-timeline-ticks .timeline-tick {
            border-radius: 2px;
            flex-shrink: 0;
            width: 4px;
            background-color: rgba(255, 255, 255, 0.25);
            height: 10px;
          }

          #timeline-ticks .timeline-tick {
            border-radius: 2px;
            flex-shrink: 0;
            width: 4px;
            background-color: white;
            height: 20px;
          }

          #timeline-ticks .timeline-tick.fizz {
            height: 40px;
          }

          #timeline-ticks .timeline-tick.buzz {
            height: 80px;
          }

          #timeline-ticks .timeline-tick.fizz-buzz {
            height: 160px;
          }

          .timeline-tick-wrapper {
            width: 4px;
            height: 160px;
          }

          #image-timeline-wrapper,
          #background-image-timeline-wrapper {
            display: flex;
            height: 100%;
            left: 0px;
            overflow-x: auto;
            overflow-y: hidden;
            position: absolute;
            top: 0px;
            width: 100%;
            scrollbar-width: none;
          }

          #image-timeline-wrapper::-webkit-scrollbar,
          #background-image-timeline-wrapper::-webkit-scrollbar {
            height: 0px;
            display: none;
          }

          #image-timeline-wrapper {
            z-index: 2;
          }

          #image-timeline {
            display: inline-flex;
          }

          #image-timeline-items {
            display: inline-flex;
          }

          .timeline-item {
            align-items: end;
            display: flex;
            height: 100vh;
            justify-content: center;
            position: relative;
            width: 100vw;
          }

          .timeline-item-label {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            border-radius: 9999px;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 15px 40px rgba(0, 0, 0, 0.5);
            color: #ffffff;
            font-size: 1.75rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding: 12px 32px;
            margin-bottom: 900px;
            position: relative;
            text-align: center;
            z-index: 4;
            white-space: nowrap;
            transition: all 0.3s ease;
          }

          .timeline-item-image-wrapper {
            align-items: end;
            display: flex;
            height: 100%;
            justify-content: center;
            left: 0px;
            position: absolute;
            top: 0px;
            width: 100%;
            z-index: 1;
          }

          .timeline-item-image {
            border-radius: 60px;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 30px, rgba(0, 0, 0, 0.16) 0px 0px 10px;
            height: 865px;
            margin-bottom: 20px;
            min-height: 500px;
            position: relative;
            width: 1400px;
            overflow: hidden;
          }

          .timeline-item-image-filter {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
            border-radius: 60px;
            height: 100%;
            left: 0px;
            position: absolute;
            top: 0px;
            width: 100%;
            z-index: 2;
          }

          #background-image-timeline-wrapper {
            z-index: 1;
          }

          #background-image-timeline {
            display: inline-flex;
            margin-left: -20vw;
          }

          #background-image-timeline-items {
            display: inline-flex;
            position: relative;
            z-index: 1;
          }

          .timeline-item-background-image {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: 100%;
            opacity: 0.15;
            width: 140vw;
          }

          #instructions {
            border-radius: 6px;
            left: 50%;
            padding: 15px;
            pointer-events: none;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
          }

          #instructions h1 {
            color: white;
            font-size: 1.25em;
            text-align: center;
          }

          #instructions-action {
            backdrop-filter: blur(5px);
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            height: 30px;
            margin-top: 10px;
            overflow: hidden;
            padding: 10px;
            position: relative;
            width: 300px;
          }

          @keyframes panRightToLeft {
            from {
              opacity: 0;
              right: -20%;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            to {
              opacity: 0;
              right: calc(100% - 20px);
            }
          }

          .instructions-arrow {
            animation: panRightToLeft 2s ease-in-out infinite;
          }

          /* Media Queries */
          @media (max-width: 2000px) {
            .timeline-item-image {
              height: 679px !important;
              width: 1100px !important;
            }
            .timeline-item-label {
              font-size: 1.5rem !important;
              margin-bottom: 710px !important;
              padding: 10px 28px !important;
            }
          }

          @media (max-width: 1400px) {
            .timeline-item-image {
              height: 600px !important;
              width: 800px !important;
            }
            .timeline-item-label {
              font-size: 1.35rem !important;
              margin-bottom: 630px !important;
              padding: 8px 24px !important;
            }
          }

          @media (max-width: 1000px) {
            .timeline-item-image {
              border-radius: 40px !important;
              height: 60% !important;
              min-height: 400px !important;
              width: calc(100% - 60px) !important;
            }
            .timeline-item-image-filter {
              border-radius: 40px !important;
            }
            .timeline-item-label {
              font-size: 1.2rem !important;
              margin-bottom: 64% !important;
              padding: 8px 20px !important;
            }
          }

          @media (max-width: 500px) {
            .timeline-item-image {
              width: calc(100% - 40px) !important;
            }
            .timeline-item-label {
              font-size: 0.95rem !important;
              margin-bottom: 64% !important;
              padding: 6px 16px !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}