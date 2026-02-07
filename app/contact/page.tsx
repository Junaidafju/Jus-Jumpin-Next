import type { Metadata } from "next";
import { AnimatedHeader } from "../components/AnimatedHeader";

export const metadata: Metadata = {
  title: "Contact Jus Jumpin | Enquiries, Bookings & Partnerships",
  description:
    "Contact Jus Jumpin for bookings, birthday celebrations, school trips, corporate events or franchise and partnership enquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      <AnimatedHeader />
      <section className="jj-container py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          Contact Jus Jumpin
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page will host your main contact form, central contact details
          and business/franchise enquiry information, mirroring the contact
          structure from the planning file.
        </p>
      </section>
    </main>
  );
}

