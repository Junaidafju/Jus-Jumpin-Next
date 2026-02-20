'use client';

import { useEffect, useRef } from 'react';

const ConfettiLanding = () => {
    const hasFired = useRef(false);

    useEffect(() => {
        if (hasFired.current) return;

        // Dynamically import to avoid SSR issues
        import('canvas-confetti').then((confettiModule) => {
            const confetti = confettiModule.default;
            hasFired.current = true;

            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

            const randomInRange = (min: number, max: number) => {
                return Math.random() * (max - min) + min;
            };

            const interval: NodeJS.Timeout = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Side confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });

                // Center burst
                if (Math.random() > 0.8) {
                    confetti({
                        particleCount: 100,
                        angle: 90,
                        spread: 100,
                        origin: { x: 0.5, y: 0.5 },
                        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
                    });
                }
            }, 250);

            // Cleanup
            return () => {
                clearInterval(interval);
                // Clear any remaining confetti
                const canvas = document.querySelector('canvas');
                if (canvas) {
                    canvas.remove();
                }
            };
        });
    }, []);

    return null; // This component doesn't render anything
};

export default ConfettiLanding;