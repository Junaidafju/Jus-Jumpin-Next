import React from 'react';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us - Jus Jumpin | Get in Touch for Bookings & Events',
  description: 'Contact Jus Jumpin for birthday party bookings, ticket inquiries, school trips, and general questions. Visit us in Rajarhat, Newtown for instant fun!',
  keywords: 'Jus Jumpin contact, birthday party booking, trampoline park contact, kids entertainment Kolkata',
  openGraph: {
    title: 'Contact Jus Jumpin - India\'s Premier Indoor Entertainment',
    description: 'Reach out to us for bookings, events, and inquiries. Your adventure starts here!',
    images: ['/images/contact-og.jpg'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}