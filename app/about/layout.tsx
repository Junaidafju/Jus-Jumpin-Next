import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "About Jus Jumpin – India's Leading Indoor Trampoline Park",
  "Jus Jumpin is India's top indoor trampoline and play park brand offering safe, fun-filled zones for kids, families, and birthdays across multiple cities.",
  "/about/",
);

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
