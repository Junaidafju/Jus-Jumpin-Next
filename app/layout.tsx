import type { Metadata } from "next";
import "./globals.css";
import { AnimatedHeader } from "./components/AnimatedHeader";
import FooterWrapper from "./components/FooterWrapper";
import PromoPopup from "./components/shared/PromoPopup";
import ScrollToTop from "./components/shared/ScrollToTop";
import SmoothScroll from "./components/shared/SmoothScroll";
import FloatingChat from './components/FloatingChat';
import WhatsAppSideTab from './components/WhatsAppSideTab';
import { absoluteUrl, siteUrl } from "@/lib/seo";


export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Jus Jumpin | Premium Indoor Trampoline & Play Parks",
  description:
    "Jus Jumpin offers premium indoor trampoline and play parks across India. Safe, hygienic fun for kids, teens, schools, and corporate groups.",
  openGraph: {
    title: "Jus Jumpin | Premium Indoor Trampoline & Play Parks",
    description:
      "Jus Jumpin offers premium indoor trampoline and play parks across India. Safe, hygienic fun for kids, teens, schools, and corporate groups.",
    siteName: "Jus Jumpin",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: absoluteUrl("/image/Jus-Jumpin-Logo.webp"),
        alt: "Jus Jumpin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jus Jumpin | Premium Indoor Trampoline & Play Parks",
    description:
      "Jus Jumpin offers premium indoor trampoline and play parks across India. Safe, hygienic fun for kids, teens, schools, and corporate groups.",
    images: [absoluteUrl("/image/Jus-Jumpin-Logo.webp")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-slate-50 antialiased">
        <ScrollToTop />
        <SmoothScroll>
          <AnimatedHeader />

          {children}
          <FooterWrapper />
          <PromoPopup />
        </SmoothScroll>
        <FloatingChat />
        <WhatsAppSideTab />
      </body>
    </html>
  );
}
