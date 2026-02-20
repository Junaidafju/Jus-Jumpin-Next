"use client";


import AboutHero from "../components/about/AboutHero";
import Marquee from "../components/about/Marquee";
import WelcomeSection from "../components/about/WelcomeSection";
import MissionVision from "../components/about/MissionVision";
import ValuesSection from "../components/about/ValuesSection";
import FounderSection from "../components/about/FounderSection";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-bg-cream overflow-x-hidden">


            <AboutHero />
            <Marquee />
            <WelcomeSection />
            <MissionVision />
            <ValuesSection />
            <FounderSection />

            {/* Floating Emojis (Decorative) - Fixed Position */}
            <div className="fixed top-[20%] left-[5%] text-5xl opacity-30 animate-bounce pointer-events-none -z-10">🤸</div>
            <div className="fixed top-[60%] right-[8%] text-5xl opacity-30 animate-pulse pointer-events-none -z-10 delay-1000">⭐</div>
            <div className="fixed bottom-[20%] left-[10%] text-5xl opacity-30 animate-bounce pointer-events-none -z-10 delay-2000">🎉</div>
            <div className="fixed top-[40%] right-[15%] text-5xl opacity-30 animate-pulse pointer-events-none -z-10 delay-3000">💫</div>

        </main>
    );
}
