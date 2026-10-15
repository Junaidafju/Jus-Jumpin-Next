import React from 'react';
import ContactClient from './ContactClient';
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Contact Jus Jumpin – India's Premier Kids Play Zone",
    "Reach out to Jus Jumpin for inquiries, bookings, partnerships, or support. ! Call us at 9800005721 or 9830359999 today! Friendly help awaits.",
    "/contact/",
  ),
  keywords: 'Jus Jumpin contact, birthday party booking, trampoline park contact, kids entertainment Kolkata',
};

export default function ContactPage() {
  return <ContactClient />;
}