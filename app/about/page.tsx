import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";

// SEO metadata – can later be pulled from Sanity, but kept explicit for now.
export const metadata: Metadata = {
  title: "About Jus Jumpin | Premium Indoor Trampoline & Play Parks in India",
  description:
    "Learn about Jus Jumpin – our story, vision, safety philosophy, and growth across India as a premium indoor trampoline and play park brand for kids and families.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      <SiteHeader />
      <section className="jj-container py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          About Jus Jumpin
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page will tell the Jus Jumpin brand story, safety philosophy,
          vision and growth across India, following the structure defined in the
          planning document.
        </p>
      </section>
    </main>
  );
}


