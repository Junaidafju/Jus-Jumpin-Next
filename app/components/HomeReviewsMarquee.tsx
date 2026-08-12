"use client";

const REVIEWS_ROW_1 = [
  {
    id: 1,
    name: "Priyanka Sharma",
    location: "Kolkata ABC Square",
    rating: 5,
    date: "2 days ago",
    text: "Hosted my son's 7th birthday here! The staff was incredibly attentive, safety was top-notch, and kids had non-stop fun on the trampolines. Highly recommend!",
    avatarBg: "bg-emerald-600",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Bengaluru M5 Ecity",
    rating: 5,
    date: "1 week ago",
    text: "Best place for weekend family outings! Clean, 100% padded soft play area for my toddler and an awesome ninja course for older kids.",
    avatarBg: "bg-purple-600",
  },
  {
    id: 3,
    name: "Ananya Mukherjee",
    location: "Kolkata Avani Mall",
    rating: 5,
    date: "3 days ago",
    text: "Super energetic atmosphere! The grip socks, AC cooling, and cafe food made our 3-hour stay comfortable. Kids didn't want to leave!",
    avatarBg: "bg-amber-600",
  },
  {
    id: 4,
    name: "Vikram Das",
    location: "Raipur Magneto Mall",
    rating: 5,
    date: "5 days ago",
    text: "Celebrated corporate team building event in the adult trampoline area. Ultimate foam pit jumps and basketball dunking! 10/10 fun.",
    avatarBg: "bg-blue-600",
  },
  {
    id: 5,
    name: "Sonia Patel",
    location: "Bengaluru Forum Mall",
    rating: 5,
    date: "1 week ago",
    text: "Very hygienic and well-maintained. Safety supervisors are present at every single trampoline zone. Very reassuring for parents.",
    avatarBg: "bg-rose-600",
  },
];

const REVIEWS_ROW_2 = [
  {
    id: 6,
    name: "Devendra Singhania",
    location: "Kolkata ABC Square",
    rating: 5,
    date: "4 days ago",
    text: "The party hosts managed everything from balloon decorations to cake cutting flawlessly! Hassle-free birthday celebration experience.",
    avatarBg: "bg-teal-600",
  },
  {
    id: 7,
    name: "Meera Nair",
    location: "Bengaluru M5 Ecity",
    rating: 5,
    date: "2 weeks ago",
    text: "My twins loved the donut slide and spiral racing slides! The cafe served fresh pizzas and cold drinks. Excellent day out destination.",
    avatarBg: "bg-indigo-600",
  },
  {
    id: 8,
    name: "Siddharth Roy",
    location: "Kolkata Avani Mall",
    rating: 5,
    date: "6 days ago",
    text: "Great value for money packages! Combined adult and kid combo tickets allowed us to jump together with our children. Pure joy!",
    avatarBg: "bg-[#6dc065]",
  },
  {
    id: 9,
    name: "Tanvi Gupta",
    location: "Raipur City Center",
    rating: 5,
    date: "3 days ago",
    text: "Spacious play park with over 20+ activities. The foam cube pit and rock climbing wall were the highlights of our visit!",
    avatarBg: "bg-pink-600",
  },
  {
    id: 10,
    name: "Arjun Banerjee",
    location: "Kolkata Camac Street",
    rating: 5,
    date: "1 week ago",
    text: "Professional staff, clean restrooms, air-conditioned comfort, and top quality safety equipment. Jus Jumpin is our go-to weekend spot!",
    avatarBg: "bg-cyan-600",
  },
];

export default function HomeReviewsMarquee() {
  return (
    <section className="relative w-full bg-[#0a0a14] py-20 md:py-28 overflow-hidden text-white border-t border-white/10">
      {/* Background Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black text-[#6dc065] uppercase tracking-widest mb-4 backdrop-blur-md">
          ⭐ 5-Star Customer Experiences
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235]">50,000+ Happy Families</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-3 font-medium">
          Verified Google Business reviews from parents, kids, and adventure enthusiasts across India.
        </p>
      </div>

      {/* Dual Row CSS Marquee */}
      <div className="space-y-6 relative z-10 overflow-hidden">
        {/* Row 1: Left to Right */}
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] pointer-events-auto cursor-pointer">
          {[...REVIEWS_ROW_1, ...REVIEWS_ROW_1].map((rev, idx) => (
            <div
              key={`row1-${rev.id}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-md`}>
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white leading-tight">
                      {rev.name}
                    </h3>
                    <p className="text-[11px] text-[#6dc065] font-bold">
                      📍 {rev.location}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-amber-400 font-bold">
                  {"★".repeat(rev.rating)}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed line-clamp-3">
                &quot;{rev.text}&quot;
              </p>
              <div className="text-[10px] text-slate-400 font-medium mt-3 text-right">
                Verified Google Review • {rev.date}
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused] pointer-events-auto cursor-pointer">
          {[...REVIEWS_ROW_2, ...REVIEWS_ROW_2].map((rev, idx) => (
            <div
              key={`row2-${rev.id}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-md`}>
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white leading-tight">
                      {rev.name}
                    </h3>
                    <p className="text-[11px] text-[#6dc065] font-bold">
                      📍 {rev.location}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-amber-400 font-bold">
                  {"★".repeat(rev.rating)}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed line-clamp-3">
                &quot;{rev.text}&quot;
              </p>
              <div className="text-[10px] text-slate-400 font-medium mt-3 text-right">
                Verified Google Review • {rev.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}