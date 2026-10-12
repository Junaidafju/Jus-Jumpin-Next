"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

type Particle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  alpha: number;
  phase: number;
};

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const textCanvas = document.createElement("canvas");
      textCanvas.width = width;
      textCanvas.height = height;
      const textContext = textCanvas.getContext("2d");

      if (!textContext) {
        return;
      }

      const mainSize = Math.min(width * 0.55, height * 0.48, 350);
      const subtitleSize = Math.min(width * 0.11, 48);
      const textCenterY = height * 0.41;
      const subtitleY = textCenterY + mainSize * 0.62;

      textContext.fillStyle = "#ffffff";
      textContext.textAlign = "center";
      textContext.textBaseline = "middle";
      textContext.font = `900 ${mainSize}px Arial, sans-serif`;
      textContext.fillText("4☢︎4", width / 2, textCenterY, width * 0.88);
      textContext.font = `700 ${subtitleSize}px Arial, sans-serif`;
      textContext.fillText("Not Found", width / 2, subtitleY, width * 0.82);
     

      const pixels = textContext.getImageData(0, 0, width, height).data;
      const sampleStep =
        width <= 640 ? 3 : Math.max(3, Math.floor(width / 380));
      particles = [];

      for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const alpha = pixels[(y * width + x) * 4 + 3];

          if (alpha > 128) {
            const isSubtitle = y > subtitleY - subtitleSize * 0.65;
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              targetX: x,
              targetY: y,
              radius: isSubtitle ? Math.random() * 1.3 + 0.7 : Math.random() * 2.1 + 0.8,
              alpha: Math.random() * 0.55 + 0.4,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";

      for (const particle of particles) {
        const deltaX = particle.targetX - particle.x;
        const deltaY = particle.targetY - particle.y;
        const pointerX = particle.x - pointer.x;
        const pointerY = particle.y - pointer.y;
        const pointerDistance = Math.hypot(pointerX, pointerY);
        let repelX = 0;
        let repelY = 0;

        if (pointerDistance < 90) {
          const force = ((90 - pointerDistance) / 90) * 2.5;
          repelX = (pointerX / (pointerDistance || 1)) * force;
          repelY = (pointerY / (pointerDistance || 1)) * force;
        }

        particle.x += deltaX * 0.055 + repelX;
        particle.y += deltaY * 0.055 + repelY;
        particle.phase += 0.025;

        context.globalAlpha = particle.alpha;
        context.beginPath();
        context.arc(
          particle.x + Math.sin(particle.phase) * 0.25,
          particle.y + Math.cos(particle.phase) * 0.25,
          particle.radius,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.globalAlpha = 1;

      if (!reduceMotion.matches) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    const onResize = () => {
      resize();
      if (reduceMotion.matches) {
        render();
      }
    };

    resize();
    if (reduceMotion.matches) {
      for (const particle of particles) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
      }
    }
    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <main className={styles.page}>
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />
      <h1 className={styles.screenReaderOnly}>404 - Not Found</h1>
      <nav className={styles.actions} aria-label="404 page navigation">
        <Link className={styles.button} href="/">
          Back to Home
        </Link>
        <Link className={styles.button} href="/contact/">
          Contact Us
        </Link>
      </nav>
    </main>
  );
}