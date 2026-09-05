'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Chatbot from './Chatbot';

export default function FloatingChat() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Show trigger button after 2 seconds
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    if (!isMounted || pathname === '/chat') {
        return null;
    }

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-19 right-6 z-50 p-0 bg-transparent border-0 cursor-pointer focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                    } ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
                aria-label="Open chat"
            >
                <div className="relative flex items-center justify-center">
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/cd1c9a80364113.5cdec491b07d9.gif"
                        alt="Jus Jumpin AI Chatbot"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
                    />
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></span>
                </div>
            </button>

            {/* Chat Modal Window (Kaily Design Theme) */}
            <div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                className={`fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-50 w-[390px] max-w-[calc(100vw-2rem)] h-[610px] max-h-[calc(100vh-5rem)] bg-[#f4f5fa] rounded-[28px] shadow-[0_25px_70px_-15px_rgba(99,69,252,0.35)] border border-slate-200/90 transition-all duration-300 transform origin-bottom-right overflow-hidden ${isOpen
                    ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto'
                    : 'scale-90 opacity-0 translate-y-8 pointer-events-none'
                    }`}
            >
                <Chatbot onClose={toggleChat} />
            </div>
        </>
    );
}