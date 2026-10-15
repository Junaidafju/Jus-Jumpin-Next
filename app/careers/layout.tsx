import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Career | Jus Jumpin",
  "Experience the ultimate indoor trampoline and play park experience at Jus Jumpin - India's premier destination for family fun.",
  "/careers/",
);

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
