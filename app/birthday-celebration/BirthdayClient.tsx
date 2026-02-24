// app/birthday-celebration/BirthdayClient.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import BirthdayHero from '@/app/components/birthday/BirthdayHero';
import BirthdayIntro from '@/app/components/birthday/BirthdayIntro';
import WhyCelebrate from '@/app/components/birthday/WhyCelebrate';
import FeatureComparisonTable from '@/app/components/birthday/FeatureComparisonTable';
import MomentsGallery from '@/app/components/birthday/MomentsGallery';
import BirthdayVideoSection from '@/app/components/birthday/BirthdayVideoSection';
import CTASection from '@/app/components/birthday/CTASection';
import BirthdayBookingModal from '@/app/components/birthday/BirthdayBookingModal';
import { useState } from 'react';

// Dynamically import Confetti to avoid SSR
const ConfettiLanding = dynamic(
    () => import('@/app/components/birthday/ConfettiLanding'),
    { ssr: false, loading: () => null }
);

export default function BirthdayClient() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const openBookingModal = () => setIsBookingModalOpen(true);
    const closeBookingModal = () => setIsBookingModalOpen(false);

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50 overflow-x-hidden">
            {/* Confetti Effect - Client Only */}
            <ConfettiLanding />

            {/* Hero Section - Full Width */}
            <BirthdayHero onBookNow={openBookingModal} />

            {/* BirthdayIntro - Full Width with separators (no container) */}
            <BirthdayIntro onBookNow={openBookingModal} />
            <WhyCelebrate onBookNow={openBookingModal} />
            <FeatureComparisonTable onBookNow={openBookingModal} />
            <MomentsGallery onBookNow={openBookingModal} />
            <BirthdayVideoSection />
            {/* Content Sections - Contained */}
            <div className="container mx-auto px-4 py-12 space-y-20">
                <Suspense fallback={<div className="h-64 animate-pulse bg-orange-200 rounded-2xl" />}>

                </Suspense>

                <CTASection onBookNow={openBookingModal} />
            </div>

            {/* Booking Modal */}
            <BirthdayBookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
        </main>
    );
}