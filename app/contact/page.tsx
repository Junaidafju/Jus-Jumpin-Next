import React from 'react';
import ContactClient from './ContactClient';
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Contact Us | Jus Jumpin",
    "Contact Jus Jumpin for birthday party bookings, ticket inquiries, school trips, and general questions. Visit us in Rajarhat, Newtown for instant fun!",
    "/contact/",
  ),
  keywords: 'Jus Jumpin contact, birthday party booking, trampoline park contact, kids entertainment Kolkata',
};

export default function ContactPage() {
  return <ContactClient />;
}