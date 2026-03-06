// app/our-activities/ActivitiesClient.tsx
"use client";

import { useRef } from "react";
import ActivitiesHero from "../components/activities/ActivitiesHero";
// import ActivitiesShowcase from "../components/activities/ActivitiesShowcase";
import ActivitiesCTA from "../components/activities/ActivitiesCTA";

export default function ActivitiesClient() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleExploreClick = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="min-h-screen">
            <ActivitiesHero onExploreClick={handleExploreClick} />
            <div ref={sectionRef}>
                {/* <ActivitiesShowcase /> */}
            </div>
            <ActivitiesCTA />
        </main>
    );
}