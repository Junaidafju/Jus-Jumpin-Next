// app/our-activities/page.tsx
import { Metadata } from "next";
import ActivitiesHero from "../components/activities/ActivitiesHero";
// import ActivitiesShowcase from "@/app/components/activities/ActivitiesShowcase";
import ActivitiesGrid from "@/app/components/activities/ActivitiesGrid";
import ActivitiesCTA from "@/app/components/activities/ActivitiesCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Activities at Jus Jumpin | Indoor Fun & Play Zones for Kids",
  "Discover exciting activities at Jus Jumpin – trampolines, foam pits, soft play zones &amp; more across India. Safe, clean fun for kids of all ages!",
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