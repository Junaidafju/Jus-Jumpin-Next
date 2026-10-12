import type { Metadata } from "next";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jusjumpin.com";

export const siteUrl = new URL(`${configuredSiteUrl.replace(/\/+$/, "")}/`);

export function absoluteUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return new URL(normalizedPath, siteUrl).toString();
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl("/image/Jus-Jumpin-Logo.webp");

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Jus Jumpin",
      locale: "en_IN",
      type: "website",
      images: [{ url: image, alt: "Jus Jumpin" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
