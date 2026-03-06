'use client';

import React from 'react';
import { ContactHero } from '@/app/components/contact/ContactHero';
import { ContactFormSection } from '@/app/components/contact/ContactFormSection';
import { MapLocationSection } from '@/app/components/contact/MapLocationSection';


export default function ContactClient() {
    return (
        <main className="contact-page" style={{ minHeight: '100vh' }}>
            <ContactHero />
            {/* Spacer to prevent overlap */}
            <div style={{ marginTop: 0 }}>
                <ContactFormSection />
            </div>
            <MapLocationSection />
        </main>
    );
}