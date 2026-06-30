import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocation, getAllSlugs } from '@/lib/locations/data';

import HeroCarousel from '@/app/components/location/HeroCarousel';
import LocationIntro from '@/app/components/location/LocationIntro';
import KeyHighlights from '@/app/components/location/KeyHighlights';
import ActivitiesSection from '@/app/components/location/ActivitiesSection';
import TimingsPricingMap from '@/app/components/location/TimingsPricingMap';
import SafetyFAQ from '@/app/components/location/SafetyFAQ';

// ── SSG: pre-build all 21 pages at deploy time ─────────────────────
export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

// ── SEO: unique metadata per location ──────────────────────────────
type MetadataProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { slug } = await params;
    const loc = getLocation(slug);
    if (!loc) return {};

    const canonical = `https://www.jusjumpin.com/${loc.slug}/`;
    const ogImage = loc.heroImages[0];

    return {
        title: loc.seoTitle,
        description: loc.seoDescription,
        keywords: loc.seoKeywords,
        alternates: { canonical },
        openGraph: {
            title: loc.seoTitle,
            description: loc.seoDescription,
            url: canonical,
            siteName: 'Jus Jumpin',
            images: [{ url: ogImage, width: 1200, height: 630, alt: loc.h1 }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: loc.seoTitle,
            description: loc.seoDescription,
            images: [ogImage],
        },
    };
}

// ── JSON-LD AmusementPark schema ───────────────────────────────────
function buildJsonLd(loc: NonNullable<ReturnType<typeof getLocation>>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'AmusementPark',
        name: `Jus Jumpin — ${loc.city} ${loc.mall}`,
        description: loc.seoDescription,
        url: `https://www.jusjumpin.com/${loc.slug}/`,
        image: loc.heroImages[0],
        telephone: loc.phone,
        address: {
            '@type': 'PostalAddress',
            streetAddress: loc.address,
            addressLocality: loc.city,
            addressRegion: loc.stateName,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: loc.lat,
            longitude: loc.lng,
        },
        openingHours: ['Mo-Fr 11:00-21:30', 'Sa-Su 11:00-22:00'],
        priceRange: '₹₹',
    };
}

// ── Page Component ─────────────────────────────────────────────────
type PageProps = { params: Promise<{ slug: string }> };

export default async function LocationPage({ params }: PageProps) {
    const { slug } = await params;
    const loc = getLocation(slug);
    if (!loc) notFound();

    const isKids = loc.type === 'kids';
    const jsonLd = buildJsonLd(loc);

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* §1 — Hero Carousel */}
            <HeroCarousel data={loc} />

            {/* §2 — Introduction + Flip Card */}
            <LocationIntro data={loc} />

            {/* §3 — Key Highlights */}
            <KeyHighlights highlights={loc.highlights} heroImages={loc.heroImages} accentColor={loc.accentColor} isKids={isKids} />

            {/* §4 — Activities */}
            <ActivitiesSection activities={loc.activities} type={loc.type} accentColor={loc.accentColor} />

            {/* §5 — Timings, Pricing & Map */}
            <TimingsPricingMap data={loc} />

            {/* §6 — Safety & FAQ */}
            <SafetyFAQ faqs={loc.faqs} accentColor={loc.accentColor} isKids={isKids} />
        </>
    );
}
