"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeHero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const frameCount = 300;

    const currentFrame = (i: number) =>
      `/frames/hero/male${String(i).padStart(4, "0")}.png`;

    const images: HTMLImageElement[] = [];
    const hero = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i + 1);
      images.push(img);
    }

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      const img = images[hero.frame];
      if (!img) return;

      // Object-fit: cover logic
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", resize);
    resize(); // Initial resize

    // Ensure first image is loaded before initial render
    if (images[0].complete) {
      render();
    } else {
      images[0].onload = render;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // Pin for 500% of viewport height
        scrub: 0.5, // Smooth scrubbing
        pin: true,
        // markers: true, // Uncomment for debugging
      },
      onUpdate: render,
    });

    tl.to(hero, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 1,
    });

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero-3d relative w-full h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-overlay absolute inset-0 z-10 flex flex-col justify-center pl-[8vw] text-white pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
          Jump • Play • Smile
        </h1>
        <p className="text-xl md:text-2xl font-medium drop-shadow-md">
          India’s happiest trampoline & soft play zone
        </p>
      </div>
    </section>
  );
}