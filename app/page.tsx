// app/page.tsx
import HomeHero3D from "./components/HomeHero3D";
import LocationSelector from "./components/LocationSelector";
import HomeIntroParallax from "./components/HomeIntroParallax";
import WhyJusJumpinSticky from "./components/WhyJusJumpinSticky";
import HomeActivitiesMasonry from "./components/HomeActivitiesMasonry";
import HomeReviewsMarquee from "./components/HomeReviewsMarquee";
import HomeFinalCTA from "./components/HomeFinalCTA";
import StructuredData from "./components/shared/StructuredData";
import { homeTestimonialsData } from "./components/HomeTestimonialsSection";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Indoor Trampoline & Play Parks Across India | Jus Jumpin",
  "Discover safe, exciting indoor trampoline parks and play zones across India. Find activities, celebrate birthdays, and plan your next visit with Jus Jumpin.",
  "/",
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a14] text-slate-100">
      {/* StructuredData for SEO */}
      <StructuredData
        testimonials={homeTestimonialsData}
        businessName="Jus Jumpin"
        businessType="SportsActivityLocation"
      />

      {/* 1. Cinematic Cloudinary Video Landing Hero */}
      <HomeHero3D />

      {/* 2. Parallax Intro Section */}
      <HomeIntroParallax />

      {/* 3. Geolocation Nearest Match & Location Carousel */}
      <LocationSelector />

      {/* 4. Sticky Scroll "Why Jus Jumpin" (8 Reasons) */}
      <WhyJusJumpinSticky />

      {/* 5. Activities Masonry Grid */}
      <HomeActivitiesMasonry />

      {/* 6. Dual 60fps Marquee Reviews */}
      <HomeReviewsMarquee />

      {/* 7. Final Conversion CTA Section */}
      <HomeFinalCTA />
    </main>
  );
}