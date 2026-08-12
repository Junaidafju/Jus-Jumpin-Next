import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts, getCategories } from "@/lib/wordpress";
import { BlogContentHtml } from "@/app/components/blogs/BlogContentHtml";
import { BlogCard } from "@/app/components/blogs/BlogCard";
import { BlogSidebar } from "@/app/components/blogs/BlogSidebar";
import { ShareButton } from "@/app/components/blogs/ShareButton";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | Jus Jumpin Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const cleanExcerpt = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160) + "..."
    : "";

  return {
    title: `${post.title.rendered} | Jus Jumpin Blog`,
    description: cleanExcerpt,
    openGraph: {
      title: post.title.rendered,
      description: cleanExcerpt,
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Fetch sidebar data and related posts
  const [categories, recentPosts] = await Promise.all([
    getCategories(),
    getRecentPosts(5),
  ]);

  // Exclude current post from related posts
  const relatedPosts = recentPosts
    .filter((rp) => rp.id !== post.id)
    .slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate reading time
  const wordCount = post.content?.rendered ? post.content.rendered.replace(/<[^>]*>/g, "").split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));

  return (
    <main className="min-h-screen bg-[#0a0a14] text-slate-50 pt-36 pb-20 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#6dc065]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-1/4 h-[400px] w-[400px] rounded-full bg-[#ff4d94]/5 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors duration-300 hover:text-[#6dc065]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        {/* Two Column Layout to resolve empty margins on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Post Contents */}
          <div className="lg:col-span-2">
            {/* Article Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {post.categoriesList &&
                post.categoriesList.map((cat) => (
                  <span
                    key={cat.id}
                    className="rounded-full bg-[#6dc065]/10 border border-[#6dc065]/20 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#6dc065] shadow-sm"
                  >
                    {cat.name}
                  </span>
                ))}
            </div>

            {/* Article Title */}
            <h1
              className="mb-6 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Post Author / Date Meta bar */}
            <div className="mb-10 flex flex-wrap items-center justify-between gap-y-4 gap-x-6 border-b border-white/5 pb-6 text-sm text-slate-400 font-semibold">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-[#b2d235] ring-1 ring-white/10">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <span className="font-bold text-slate-200">{post.authorName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#6dc065]" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#6dc065]" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <ShareButton title={post.title.rendered} />
            </div>

            {/* Featured Image */}
            {post.featuredImageUrl && (
              <div className="mb-10 aspect-video w-full overflow-hidden rounded-3xl border border-white/5 bg-[#121225]/40 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImageUrl}
                  alt={post.title.rendered}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* HTML Article Content wrapped in a premium card */}
            <article className="border-b border-white/5 pb-16">
              <div className="bg-[#121225]/25 border border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-24 -bottom-24 h-48 w-48 bg-[#b2d235]/5 rounded-full blur-[60px] pointer-events-none" />
                <BlogContentHtml html={post.content.rendered} />
              </div>
            </article>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 text-2xl font-black text-white border-l-4 border-[#6dc065] pl-3 uppercase tracking-wider">
                  You Might Also Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="relative z-10">
                      <BlogCard post={relatedPost} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar + booking CTAs */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-8">
            {/* Booking CTA Widget */}
            <div className="rounded-3xl border border-dashed border-[#6dc065]/40 bg-[#6dc065]/5 p-6 text-center backdrop-blur-xl relative overflow-hidden shadow-lg">
              <div className="absolute -right-10 -bottom-10 h-24 w-24 bg-[#b2d235]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-10 -top-10 h-20 w-20 bg-[#6dc065]/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-lg font-black text-white mb-2">🎉 Plan Your Visit!</h4>
              <p className="text-slate-300 text-xs font-semibold leading-relaxed mb-5">
                Defy gravity and enjoy endless excitement at India's happiest indoor trampoline & play park.
              </p>
              <Link
                href="/birthday-celebration"
                className="block w-full rounded-full bg-gradient-to-r from-[#6dc065] to-[#b2d235] py-3 text-xs font-black text-slate-950 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_15px_rgba(109,192,101,0.25)] text-center"
              >
                🎂 Book Tickets Now
              </Link>
            </div>

            {/* Reusable Blog widgets (Search, Categories, Recent) */}
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts.slice(0, 4)}
              activeCategoryId={post.categoriesList?.[0]?.id}
            />
          </div>
          
        </div>
      </div>
    </main>
  );
}
