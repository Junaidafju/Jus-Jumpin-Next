import type { Metadata } from "next";
import { AnimatedHeader } from "../components/AnimatedHeader";

export const metadata: Metadata = {
  title: "Our Activities | Jus Jumpin Trampoline & Play Zones",
  description:
    "Discover all activities at Jus Jumpin – trampolines, soft play, climbing and more. Designed to keep kids moving, laughing and exploring in safe, hygienic zones.",
};

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      <AnimatedHeader />
      <section className="jj-container py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          Our Activities
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page will list all Jus Jumpin activities with descriptions,
          benefits and imagery, and will later be driven by CMS data.
        </p>
      </section>
    </main>
  );
}

