import type { Metadata } from "next";
import { AnimatedHeader } from "../components/AnimatedHeader";

export const metadata: Metadata = {
  title: "Blog | Jus Jumpin Tips, Ideas & Updates for Parents and Kids",
  description:
    "Read the Jus Jumpin blog for play ideas, parenting tips, safety insights and updates from our trampoline and play parks across India.",
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      <AnimatedHeader />
      <section className="jj-container py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          This page will show a grid of blog posts powered by CMS content,
          following the listing structure defined in the blueprint.
        </p>
      </section>
    </main>
  );
}

