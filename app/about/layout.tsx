import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "About Jus Jumpin | Indoor Play and Adventure Parks",
  "Learn about Jus Jumpin, our mission, values, and commitment to fun, active play for families across India.",
  "/about/",
);

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
