import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Careers | Join the Jus Jumpin Team",
  "Explore career opportunities with Jus Jumpin and help create fun, safe experiences for families across India.",
  "/careers/",
);

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
