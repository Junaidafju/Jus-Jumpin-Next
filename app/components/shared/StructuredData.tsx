// app/shared/StructuredData.tsx
//
// ⚠️  USAGE: Import this in page.tsx (server component), NOT in a "use client" file.
//
//   ✅  app/school-trips/page.tsx:
//         import StructuredData from "@/shared/StructuredData";
//         import { schoolTestimonialsData } from "@/components/school-trips/SchoolTestimonialsSection";
//         export default function Page() {
//           return (
//             <>
//               <StructuredData testimonials={schoolTestimonialsData} />
//               <SchoolTripsClient />
//             </>
//           );
//         }
//
//   ❌  Do NOT import inside SchoolTripsClient.tsx or any "use client" component.
//       Server components cannot be imported from client components in Next.js App Router.

import type { Testimonial } from "./TestimonialCard";

interface StructuredDataProps {
    testimonials: Testimonial[];
    businessName?: string;
    businessType?: string;
}

export default function StructuredData({
    testimonials,
    businessName = "Jus Jumpin",
    businessType = "LocalBusiness",
}: StructuredDataProps) {
    // Guard: if testimonials is undefined/null/empty, skip rendering
    if (!Array.isArray(testimonials) || testimonials.length === 0) return null;

    const avg =
        testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

    const schema = {
        "@context": "https://schema.org",
        "@type": businessType,
        name: businessName,
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avg.toFixed(1),
            bestRating: "5",
            worstRating: "1",
            ratingCount: String(testimonials.length),
        },
        review: testimonials.map((t) => ({
            "@type": "Review",
            author: { "@type": "Person", name: t.name },
            datePublished: t.date ?? new Date().getFullYear().toString(),
            reviewBody: t.text,
            reviewRating: {
                "@type": "Rating",
                ratingValue: String(t.rating),
                bestRating: "5",
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}