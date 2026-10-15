import type { Metadata } from "next";
import Script from "next/script";
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
  title: "Discover the Best Trampoline Park at Jus Jumpin",
  description:
    "Trampoline parks, foam pits, dodgeball & birthday parties for kids, teens & adults. Safe, high-energy adventures await!",
  openGraph: {
    title: "Discover the Best Trampoline Park at Jus Jumpin",
    description:
      "Trampoline parks, foam pits, dodgeball & birthday parties for kids, teens & adults. Safe, high-energy adventures await!",
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
    title: "Discover the Best Trampoline Park at Jus Jumpin",
    description:
      "Trampoline parks, foam pits, dodgeball & birthday parties for kids, teens & adults. Safe, high-energy adventures await!",
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
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GWTVT41WFF');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GWTVT41WFF"
          strategy="afterInteractive"
        />
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
