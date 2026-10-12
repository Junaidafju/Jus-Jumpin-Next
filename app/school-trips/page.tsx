// app/school-trips/page.tsx
// ✅ Server component — correct place for StructuredData

import type { Metadata } from "next";
import SchoolTripsClient from "./SchoolTripsClient";
import StructuredData from "../components/shared/StructuredData";
import { schoolTestimonialsData } from "../components/school-trips/Schooltestimonialssection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "School Trips | Jus Jumpin",
  "Book an unforgettable, curriculum-aligned school trip at Jus Jumpin. Safe, fun, and Ofsted-aligned activities for all year groups.",
  "/school-trips/",
);

export default function SchoolTripsPage() {
  return (
    <>
      {/*
        StructuredData is a server component — render it HERE in page.tsx,
        NOT inside SchoolTripsClient (which is "use client").
        Next.js App Router does not allow importing server components
        from client components.
      */}
      <StructuredData
        testimonials={schoolTestimonialsData}
        businessName="Jus Jumpin"
        businessType="SportsActivityLocation"
      />
      <SchoolTripsClient />
    </>
  );
}