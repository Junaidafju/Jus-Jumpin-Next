"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { WPCategory, WPPost } from "@/lib/wordpress";
import { Search, ChevronRight, Calendar } from "lucide-react";

interface BlogSidebarProps {
  categories: WPCategory[];
  recentPosts: WPPost[];
  activeCategoryId?: number;
  activeSearch?: string;
}

export function BlogSidebar({
  categories,
  recentPosts,
  activeCategoryId,
  activeSearch = "",
}: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState(activeSearch);

  // Sync state if URL changes
  useEffect(() => {
    setSearchVal(activeSearch);
  }, [activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchVal.trim()) {
      params.set("search", searchVal.trim());
    } else {
      params.delete("search");
    }
    // Reset page on new search
    params.delete("page");
    router.push(`/blogs?${params.toString()}`);
  };

  const handleClearCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("page");
    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <aside className="space-y-8 lg:sticky lg:top-28">
      {/* Search Widget */}
      <div className="rounded-3xl border border-white/5 bg-[#121225]/45 p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-[#6dc065]/5 blur-[40px] pointer-events-none" />
        <h3 className="mb-5 text-base font-extrabold text-white border-l-4 border-[#6dc065] pl-3 uppercase tracking-wider">
          Search Articles
        </h3>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#0a0a14]/60 py-3.5 pl-4 pr-12 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all duration-300 focus:border-[#6dc065]/50 focus:ring-2 focus:ring-[#6dc065]/10 focus:bg-[#0a0a14]"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-xl p-2 text-slate-400 transition-colors duration-300 hover:bg-[#121225] hover:text-[#6dc065] focus:outline-none cursor-pointer"
            aria-label="Submit Search"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>

      {/* Categories Widget */}
      <div className="rounded-3xl border border-white/5 bg-[#121225]/45 p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#b2d235]/5 blur-[40px] pointer-events-none" />
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white border-l-4 border-[#6dc065] pl-3 uppercase tracking-wider">
            Categories
          </h3>
          {activeCategoryId && (
            <button
              onClick={handleClearCategory}
              className="text-xs font-black text-[#b2d235] hover:underline hover:text-[#6dc065] cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>
        <ul className="space-y-2.5">
          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            const params = new URLSearchParams(searchParams.toString());
            params.set("category", cat.id.toString());
            params.delete("page"); // Reset page index on category filter

            return (
              <li key={cat.id}>
                <Link
                  href={`/blogs?${params.toString()}`}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black shadow-lg"
                      : "bg-[#0a0a14]/40 text-slate-300 border border-white/5 hover:bg-[#121225] hover:border-[#6dc065]/35 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className={`h-4 w-4 shrink-0 ${isActive ? "text-slate-950" : "text-[#6dc065]"}`} />
                    {cat.name}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-black ${
                      isActive ? "bg-black/20 text-slate-950" : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="rounded-3xl border border-white/5 bg-[#121225]/45 p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-[#ff4d94]/5 blur-[40px] pointer-events-none" />
        <h3 className="mb-5 text-base font-extrabold text-white border-l-4 border-[#6dc065] pl-3 uppercase tracking-wider">
          Recent Posts
        </h3>
        <div className="space-y-4.5">
          {recentPosts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={post.id}
                className="group flex gap-4 border-b border-white/5 pb-4.5 last:border-b-0 last:pb-0"
              >
                {/* Mini Image */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-900 border border-white/5">
                  {post.featuredImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featuredImageUrl}
                      alt={post.title.rendered}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-700">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="line-clamp-2 text-sm font-bold text-slate-200 transition-colors duration-300 group-hover:text-[#6dc065]">
                    <Link href={`/blogs/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </h4>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Calendar className="h-3.5 w-3.5 text-[#6dc065]" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
