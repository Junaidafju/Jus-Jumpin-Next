"use client";

import { useState } from "react";
import Link from "next/link";
import BirthdayBookingModal from "./birthday/BirthdayBookingModal";

export default function HomeFinalCTA() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  const ctaVideo = process.env.NEXT_PUBLIC_CLOUDINARY_CTA_VIDEO || "samples/sea-turtle";

  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${ctaVideo}.mp4`;
  const posterUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_1/${ctaVideo}.jpg`;



  const handleScrollToLocations = (e: React.MouseEvent) => {
    e.preventDefault();
    const locSection = document.getElementById("locations");
    if (locSection) {
      locSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative w-full min-h-[500px] sm:min-h-[550px] overflow-hidden bg-[#0a0a14] flex items-center justify-center text-white border-t border-white/10">
        {/* Full-Bleed Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            className="w-full h-full object-cover opacity-35"
          />
          {/* Dark Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/60 to-[#0a0a14]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/80 via-transparent to-[#0a0a14]/80" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#6dc065] uppercase tracking-widest mb-6 backdrop-blur-md">
            🚀 Ready for the Ultimate Bounce?
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Reserve Your Fun Today & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235]">
              Create Unforgettable Memories!
            </span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-lg mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of happy kids and families at Jus Jumpin. Book your tickets online or host a grand birthday party today!
          </p>

          {/* 3 Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 w-full max-w-2xl mx-auto">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-sm sm:text-base rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(109,192,101,0.4)] text-center"
            >
              🎂 Book Tickets Now
            </button>

            <Link
              href="/birthday-celebration"
              className="w-full sm:w-auto px-7 py-4 bg-white/15 border border-white/25 text-white font-black text-sm sm:text-base rounded-full hover:bg-white/25 hover:scale-105 transition-all backdrop-blur-md text-center"
            >
              🎉 Plan Birthday Party
            </Link>

            <a
              href="#locations"
              onClick={handleScrollToLocations}
              className="w-full sm:w-auto px-7 py-4 bg-slate-900/80 border border-white/20 text-slate-200 font-bold text-sm sm:text-base rounded-full hover:border-[#6dc065] hover:text-white transition-colors backdrop-blur-md text-center"
            >
              📍 Find Nearest Location
            </a>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BirthdayBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
