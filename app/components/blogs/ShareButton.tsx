"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window === "undefined") return;

    if (navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      }).catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4.5 py-2 text-xs font-black text-slate-200 transition-all duration-300 hover:border-[#6dc065]/40 hover:bg-[#6dc065]/10 hover:text-white cursor-pointer shadow-md"
      type="button"
    >
      <Share2 className="h-3.5 w-3.5 text-[#6dc065]" />
      Share Article
    </button>
  );
}
