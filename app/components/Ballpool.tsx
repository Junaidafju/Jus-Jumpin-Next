"use client";

import React, { useEffect, useRef } from 'react';

/**
 * BallPool: a canvas ball-pit that sits behind a section's content.
 *
 * - Canvas is pointer-events:none, so links/text above stay fully clickable.
 * - Mouse/touch is read from the PARENT element (the footer), so balls react
 *   even while the cursor is over text or cards.
 * - Move the cursor to push balls around, click/tap to burst them away.
 * - Simulation only runs while the footer is on screen.
 */

type Ball = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    ci: number; // colour / sprite index
};

// Jus Jumpin' palette: yellow + pink lead, supported by playful accents
const COLORS = [
    '#F59E0B', // amber
    '#EC4899', // pink
    '#FACC15', // yellow
    '#22D3EE', // cyan
    '#A78BFA', // violet
    '#34D399', // mint
    '#F97316', // orange
    '#EF4444', // red
];

const GRAVITY = 0.55;
const AIR_DRAG = 0.9985;
const WALL_BOUNCE = 0.45;
const BALL_BOUNCE = 0.35;
const FLOOR_FRICTION = 0.985;
const MOUSE_RADIUS = 75;

interface BallPoolProps {
    /** Overall ball opacity. Lower it if text legibility suffers. */
    opacity?: number;
    /** Upper limit on balls (count scales with screen width). */
    maxBalls?: number;
}

const makeSprite = (color: string): HTMLCanvasElement => {
    const s = 128;
    const c = document.createElement('canvas');
    c.width = s;
    c.height = s;
    const g = c.getContext('2d');
    if (!g) return c;

    const circle = () => {
        g.beginPath();
        g.arc(s / 2, s / 2, s / 2 - 1, 0, Math.PI * 2);
        g.closePath();
    };

    // base colour
    circle();
    g.fillStyle = color;
    g.fill();

    // edge shading
    const shade = g.createRadialGradient(s / 2, s / 2, s * 0.25, s / 2, s / 2, s / 2);
    shade.addColorStop(0, 'rgba(0,0,0,0)');
    shade.addColorStop(1, 'rgba(0,0,0,0.38)');
    circle();
    g.fillStyle = shade;
    g.fill();

    // glossy highlight
    const shine = g.createRadialGradient(s * 0.35, s * 0.3, 0, s * 0.35, s * 0.3, s * 0.32);
    shine.addColorStop(0, 'rgba(255,255,255,0.75)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    circle();
    g.fillStyle = shine;
    g.fill();

    return c;
};

const BallPool = ({ opacity = 0.85, maxBalls = 200 }: BallPoolProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const host = canvas?.parentElement;
        if (!canvas || !host) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        const ctx: CanvasRenderingContext2D = context;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const sprites = COLORS.map(makeSprite);

        let w = 0;
        let h = 0;
        let raf = 0;
        let running = false;
        let last = 0;
        const balls: Ball[] = [];
        const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };

        const targetCount = () => Math.max(30, Math.min(maxBalls, Math.round(w / 7)));

        const spawn = (n: number, aboveScreen: boolean) => {
            const small = w < 640 ? 0.75 : 1;
            for (let i = 0; i < n; i++) {
                const r = (14 + Math.random() * 12) * small;
                balls.push({
                    r,
                    x: r + Math.random() * Math.max(1, w - r * 2),
                    y: aboveScreen ? -r - Math.random() * h * 0.9 : Math.random() * h,
                    vx: (Math.random() - 0.5) * 2,
                    vy: Math.random() * 2,
                    ci: Math.floor(Math.random() * COLORS.length),
                });
            }
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            if (w === 0 || h === 0) return;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const target = targetCount();
            if (balls.length < target) spawn(target - balls.length, true);
            else if (balls.length > target) balls.splice(target);

            // keep everything inside the new bounds
            for (const b of balls) {
                b.x = Math.min(Math.max(b.x, b.r), w - b.r);
                if (b.y > h - b.r) b.y = h - b.r;
            }
        };

        const step = (dt: number) => {
            const n = balls.length;

            for (let i = 0; i < n; i++) {
                const b = balls[i];
                b.vy += GRAVITY * dt;
                b.vx *= AIR_DRAG;
                b.vy *= AIR_DRAG;
                b.x += b.vx * dt;
                b.y += b.vy * dt;

                // walls (no ceiling, so balls can fall in from above)
                if (b.x < b.r) {
                    b.x = b.r;
                    b.vx = Math.abs(b.vx) * WALL_BOUNCE;
                } else if (b.x > w - b.r) {
                    b.x = w - b.r;
                    b.vx = -Math.abs(b.vx) * WALL_BOUNCE;
                }
                if (b.y > h - b.r) {
                    b.y = h - b.r;
                    b.vy = -Math.abs(b.vy) * WALL_BOUNCE;
                    b.vx *= FLOOR_FRICTION;
                    if (Math.abs(b.vy) < 0.6) b.vy = 0;
                }
            }

            // ball to ball collisions (mass ~ r^2)
            for (let i = 0; i < n; i++) {
                const a = balls[i];
                for (let j = i + 1; j < n; j++) {
                    const c = balls[j];
                    const dx = c.x - a.x;
                    const dy = c.y - a.y;
                    const min = a.r + c.r;
                    const d2 = dx * dx + dy * dy;
                    if (d2 >= min * min || d2 < 0.0001) continue;

                    const d = Math.sqrt(d2);
                    const nx = dx / d;
                    const ny = dy / d;
                    const overlap = min - d;
                    const ma = a.r * a.r;
                    const mc = c.r * c.r;
                    const tot = ma + mc;

                    a.x -= nx * overlap * (mc / tot);
                    a.y -= ny * overlap * (mc / tot);
                    c.x += nx * overlap * (ma / tot);
                    c.y += ny * overlap * (ma / tot);

                    const vn = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
                    if (vn < 0) {
                        const imp = (-(1 + BALL_BOUNCE) * vn) / (1 / ma + 1 / mc);
                        a.vx -= (imp * nx) / ma;
                        a.vy -= (imp * ny) / ma;
                        c.vx += (imp * nx) / mc;
                        c.vy += (imp * ny) / mc;
                    }
                }
            }

            // mouse pushes balls away and drags them along its motion
            if (mouse.active) {
                for (let i = 0; i < n; i++) {
                    const b = balls[i];
                    const dx = b.x - mouse.x;
                    const dy = b.y - mouse.y;
                    const min = MOUSE_RADIUS + b.r;
                    const d2 = dx * dx + dy * dy;
                    if (d2 >= min * min || d2 < 0.0001) continue;

                    const d = Math.sqrt(d2);
                    const nx = dx / d;
                    const ny = dy / d;
                    const push = (min - d) / min;
                    b.x += nx * (min - d) * 0.25;
                    b.y += ny * (min - d) * 0.25;
                    b.vx += nx * push * 2.4 * dt + mouse.vx * 0.1 * push;
                    b.vy += ny * push * 2.4 * dt + mouse.vy * 0.1 * push;
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.globalAlpha = opacity;
            for (const b of balls) {
                ctx.drawImage(sprites[b.ci], b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
            }
            ctx.globalAlpha = 1;
        };

        const frame = (ts: number) => {
            if (!running) return;
            const dt = Math.min((ts - last) / 16.667, 2);
            last = ts;
            mouse.vx *= 0.85;
            mouse.vy *= 0.85;
            // two sub-steps keep stacking stable
            step(dt / 2);
            step(dt / 2);
            draw();
            raf = requestAnimationFrame(frame);
        };

        const start = () => {
            if (running || reduceMotion) return;
            running = true;
            last = performance.now();
            raf = requestAnimationFrame(frame);
        };

        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        // pointer input (listened on the footer so content above doesn't block it)
        const toLocal = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const onMove = (e: PointerEvent) => {
            const p = toLocal(e);
            if (mouse.active) {
                mouse.vx = Math.max(-40, Math.min(40, p.x - mouse.x));
                mouse.vy = Math.max(-40, Math.min(40, p.y - mouse.y));
            }
            mouse.x = p.x;
            mouse.y = p.y;
            mouse.active = true;
        };

        const onLeave = () => {
            mouse.active = false;
            mouse.vx = 0;
            mouse.vy = 0;
        };

        const onDown = (e: PointerEvent) => {
            // click / tap burst
            const p = toLocal(e);
            const burstR = 150;
            for (const b of balls) {
                const dx = b.x - p.x;
                const dy = b.y - p.y;
                const d = Math.hypot(dx, dy);
                if (d < burstR && d > 0.001) {
                    const f = (1 - d / burstR) * 14;
                    b.vx += (dx / d) * f;
                    b.vy += (dy / d) * f - 4;
                }
            }
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        if (reduceMotion) {
            // no animation: let the pool settle instantly and draw it once
            for (const b of balls) b.y = Math.random() * h;
            for (let i = 0; i < 400; i++) step(1);
            draw();
        } else {
            host.addEventListener('pointermove', onMove);
            host.addEventListener('pointerleave', onLeave);
            host.addEventListener('pointercancel', onLeave);
            host.addEventListener('pointerdown', onDown);
        }

        // only simulate while the footer is on screen
        const io = new IntersectionObserver(
            (entries) => (entries[0].isIntersecting ? start() : stop()),
            { threshold: 0.05 }
        );
        io.observe(host);

        return () => {
            stop();
            io.disconnect();
            ro.disconnect();
            host.removeEventListener('pointermove', onMove);
            host.removeEventListener('pointerleave', onLeave);
            host.removeEventListener('pointercancel', onLeave);
            host.removeEventListener('pointerdown', onDown);
        };
    }, [opacity, maxBalls]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default BallPool;