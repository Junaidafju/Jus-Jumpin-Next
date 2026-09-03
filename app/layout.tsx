import type { Metadata } from "next";
import "./globals.css";
import { AnimatedHeader } from "./components/AnimatedHeader";
import FooterWrapper from "./components/FooterWrapper";
import PromoPopup from "./components/shared/PromoPopup";
import ScrollToTop from "./components/shared/ScrollToTop";
import SmoothScroll from "./components/shared/SmoothScroll";
import FloatingChat from './components/FloatingChat';


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jusjumpin.com'),
  title: "Jus Jumpin | Premium Indoor Trampoline & Play Parks",
  description:
    "Jus Jumpin offers premium indoor trampoline and play parks across India. Safe, hygienic fun for kids, teens, schools, and corporate groups.",
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
      </body>
    </html>
  );
}
