import type { Metadata } from "next";
import { AnimatedHeader } from "../components/AnimatedHeader";

export const metadata: Metadata = {
  title: "Birthday Celebration at Jus Jumpin | Kids Birthday Party Venues",
  description:
    "Plan unforgettable kids birthday celebrations at Jus Jumpin trampoline and play parks. Safe, hygienic party zones, curated packages, and complete on-ground support for parents.",
};

export default function BirthdayCelebrationPage() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      <AnimatedHeader />
      <section className="jj-container py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          Birthday Celebration
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page will showcase why Jus Jumpin is perfect for birthday
          celebrations, available packages, inclusions, galleries and a
          prominent enquiry form as per the blueprint.
        </p>
      </section>
    </main>
  );
}


