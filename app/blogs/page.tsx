import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getCategories, getRecentPosts } from "@/lib/wordpress";
import { BlogCard } from "../components/blogs/BlogCard";
import { BlogSidebar } from "../components/blogs/BlogSidebar";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Jus Jumpin Tips, Ideas & Updates for Parents and Kids",
  description:
    "Read the Jus Jumpin blog for play ideas, parenting tips, safety insights and updates from our trampoline and play parks across India.",
};

interface BlogsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }> | {
    search?: string;
    category?: string;
    page?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  // Resilient params parsing for all Next.js versions
  const resolvedParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const search = resolvedParams?.search || "";
  const categoryIdStr = resolvedParams?.category || "";
  const pageStr = resolvedParams?.page || "1";

  const currentPage = parseInt(pageStr, 10) || 1;
  const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : undefined;
  const postsPerPage = 6;

  // Parallel fetches for performance
  const [
    { posts, totalPages, totalPosts },
    categories,
    recentPosts,
  ] = await Promise.all([
    getPosts({
      page: currentPage,
      perPage: postsPerPage,
      search,
      categoryId,
    }),
    getCategories(),
    getRecentPosts(4),
  ]);

  // Construct URL parameters for pagination
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryIdStr) params.set("category", categoryIdStr);
    params.set("page", pageNumber.toString());
    return `/blogs?${params.toString()}`;
  };

  const activeCategory = categories.find((cat) => cat.id === categoryId);

  return (
    <main className="min-h-screen bg-[#0a0a14] text-slate-50 pb-20 relative overflow-hidden">
      {/* Decorative background glows for page background */}
      <div className="absolute top-[60vh] left-1/4 h-[500px] w-[500px] rounded-full bg-[#6dc065]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[80vh] right-1/4 h-[400px] w-[400px] rounded-full bg-[#ff4d94]/3 blur-[120px] pointer-events-none z-0" />

      {/* 1. Cinematic Hero Header Section (Matching user requirements) */}
      <section className="relative w-full h-[65vh] min-h-[500px] max-h-[750px] overflow-hidden flex items-center justify-center bg-black">
        {/* Full-bleed high-resolution active play background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65 scale-[1.01] z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        {/* Optimized dark gradients for maximum image clarity and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14]/70 via-black/15 to-[#0a0a14] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/20 via-transparent to-[#0a0a14]/20 z-10" />

        {/* Hero Content Box */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl pt-16">
          <span className="mb-4 inline-flex rounded-full bg-[#6dc065]/15 border border-[#6dc065]/35 px-4.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#6dc065] backdrop-blur-sm">
            Jus Jumpin Journal 🎪
          </span>
          <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white drop-shadow-lg">
            Play, Bounce &{" "}
            <span className="bg-gradient-to-r from-[#6dc065] via-[#8fc93a] to-[#b2d235] bg-clip-text text-transparent">
              Party!
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-slate-200 text-sm sm:text-base md:text-lg font-bold leading-relaxed drop-shadow-md">
            Discover parenting tips, health benefits of active play, hassle-free party planning guides, and exciting updates from our parks.
          </p>

          {/* Action buttons */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#articles"
              className="px-6 py-3.5 bg-gradient-to-r from-[#6dc065] to-[#b2d235] text-slate-950 font-black text-xs sm:text-sm rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_6px_20px_rgba(109,192,101,0.3)] text-center shrink-0 cursor-pointer"
            >
              Explore Articles 👇
            </a>
            <Link
              href="/birthday-celebration"
              className="px-6 py-3.5 bg-white/10 border border-white/20 text-white font-black text-xs sm:text-sm rounded-full hover:bg-white/20 hover:scale-105 active:scale-95 transition-all backdrop-blur-md text-center shrink-0"
            >
              Plan Birthday 🎉
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Blog Grid & Sidebar Container */}
      <div id="articles" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-20">

        {/* Active filter tags indicator */}
        {(search || activeCategory) && (
          <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-white/5 pb-6">
            <span className="text-sm font-bold text-slate-400">Active Filters:</span>
            {search && (
              <span className="flex items-center gap-2 rounded-xl bg-[#121225] border border-white/5 px-3.5 py-2 text-xs font-bold text-slate-200">
                Search: &ldquo;{search}&rdquo;
                <Link href={getPageUrl(1).replace(`search=${encodeURIComponent(search)}`, "")} className="text-[#b2d235] hover:text-[#6dc065] font-black ml-1 text-sm">×</Link>
              </span>
            )}
            {activeCategory && (
              <span className="flex items-center gap-2 rounded-xl bg-[#121225] border border-white/5 px-3.5 py-2 text-xs font-bold text-slate-200">
                Category: {activeCategory.name}
                <Link href={getPageUrl(1).replace(`category=${categoryIdStr}`, "")} className="text-[#b2d235] hover:text-[#6dc065] font-black ml-1 text-sm">×</Link>
              </span>
            )}
            <Link href="/blogs" className="text-xs font-black text-[#b2d235] hover:underline hover:text-[#6dc065]">
              Clear all
            </Link>
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Grid */}
          <div className="lg:col-span-2 space-y-12">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-white/5 pt-8">
                    <div className="text-xs sm:text-sm font-semibold text-slate-400">
                      Showing page <span className="font-black text-white">{currentPage}</span> of{" "}
                      <span className="font-black text-white">{totalPages}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {currentPage > 1 ? (
                        <Link
                          href={getPageUrl(currentPage - 1)}
                          className="flex items-center gap-1.5 rounded-2xl border border-white/5 bg-[#121225]/40 px-4.5 py-3 text-xs sm:text-sm font-black text-slate-300 transition-all duration-300 hover:border-[#6dc065]/40 hover:bg-[#6dc065]/10 hover:text-white"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Prev
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="flex items-center gap-1.5 rounded-2xl border border-white/5 bg-[#121225]/10 px-4.5 py-3 text-xs sm:text-sm font-black text-slate-600 cursor-not-allowed"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Prev
                        </button>
                      )}

                      {currentPage < totalPages ? (
                        <Link
                          href={getPageUrl(currentPage + 1)}
                          className="flex items-center gap-1.5 rounded-2xl border border-white/5 bg-[#121225]/40 px-4.5 py-3 text-xs sm:text-sm font-black text-slate-300 transition-all duration-300 hover:border-[#6dc065]/40 hover:bg-[#6dc065]/10 hover:text-white"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="flex items-center gap-1.5 rounded-2xl border border-white/5 bg-[#121225]/10 px-4.5 py-3 text-xs sm:text-sm font-black text-slate-600 cursor-not-allowed"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 p-16 text-center bg-[#121225]/10">
                <FileText className="mb-4 h-12 w-12 text-slate-600 animate-pulse" />
                <h3 className="mb-2 text-lg font-bold text-white">No articles found</h3>
                <p className="mb-6 max-w-sm text-sm text-slate-400 font-semibold leading-relaxed">
                  We couldn&rsquo;t find any posts matching your criteria. Try adjusting your search query or filters.
                </p>
                <Link
                  href="/blogs"
                  className="rounded-full bg-gradient-to-r from-[#6dc065] to-[#b2d235] px-8 py-3 text-sm font-black text-slate-950 transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_25px_rgba(109,192,101,0.3)]"
                >
                  View All Articles
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              activeCategoryId={categoryId}
              activeSearch={search}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
