import type { Metadata } from "next";
import { AnimatedHeader } from "../components/AnimatedHeader";

export const metadata: Metadata = {
  title: "School Trips to Jus Jumpin | Safe & Active Educational Outings",
  description:
    "Plan school trips to Jus Jumpin indoor trampoline and play parks. Structured batches, movement-focused activities and strict safety for students and institutions.",
};

export default function SchoolTripsPage() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      <AnimatedHeader />
      <section className="jj-container py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          School Trips
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page will present the benefits, structure and packages for
          school trips to Jus Jumpin, matching the planning document for
          institutions and group leads.
        </p>
      </section>
    </main>
  );
}

