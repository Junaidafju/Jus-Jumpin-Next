'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Disable smooth scrolling temporarily to prevent Next.js transition drag
        const html = document.documentElement;
        const originalScrollBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';

        // Reset scroll positions instantly
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.body.scrollTop = 0; // Legacy / Safari support

        // Re-enable smooth scrolling after transition completes
        const timeout = setTimeout(() => {
            html.style.scrollBehavior = originalScrollBehavior;
        }, 30);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}
