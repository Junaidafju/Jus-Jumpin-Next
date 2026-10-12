// app/our-activities/page.tsx
import { Metadata } from "next";
import ActivitiesHero from "../components/activities/ActivitiesHero";
// import ActivitiesShowcase from "@/app/components/activities/ActivitiesShowcase";
import ActivitiesGrid from "@/app/components/activities/ActivitiesGrid";
import ActivitiesCTA from "@/app/components/activities/ActivitiesCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Our Activities | 25+ Exciting Adventures at Jus Jumpin",
  "Discover 25+ thrilling indoor activities including trampolines, adventure zones, interactive games and more at India's premier entertainment destination!",
  "/our-activities/",
);

export default function OurActivitiesPage() {
  return (
    <main className="relative overflow-x-hidden">
      <ActivitiesHero />
      {/* <ActivitiesShowcase /> */}
      <ActivitiesGrid />
      <ActivitiesCTA />
    </main>
  );
}