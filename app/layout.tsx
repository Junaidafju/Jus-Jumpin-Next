import type { Metadata } from "next";
import "./globals.css";
import { AnimatedHeader } from "./components/AnimatedHeader";
import FooterWrapper from "./components/FooterWrapper";


export const metadata: Metadata = {
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
        <AnimatedHeader />

        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
