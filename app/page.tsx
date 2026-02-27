// app/page.tsx
import Image from 'next/image';
import HomeHero3D from "./components/HomeHero3D";
import HomeExperience from "./components/HomeExperience";
import HomeTestimonialsSection from "./components/HomeTestimonialsSection";
import StructuredData from "./components/shared/StructuredData";
import { homeTestimonialsData } from "./components/HomeTestimonialsSection";

export default function Home() {
  return (
    <>
      {/*
        StructuredData is a server component — safe to use here in page.tsx.
        Renders a <script type="application/ld+json"> tag picked up by Google.
      */}
      <StructuredData
        testimonials={homeTestimonialsData}
        businessName="Jus Jumpin"
        businessType="SportsActivityLocation"
      />

      <HomeHero3D />
      <HomeExperience />

      {/* Testimonials — Kids Zone & Adult Zone */}
      <HomeTestimonialsSection />

      {/* rest of homepage */}
    </>
  );
}