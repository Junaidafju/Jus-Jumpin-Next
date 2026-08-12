import Link from "next/link";
import { WPPost } from "@/lib/wordpress";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: WPPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { title, excerpt, date, slug, authorName, featuredImageUrl, categoriesList } = post;

  // Calculate reading time
  const wordCount = post.content?.rendered ? post.content.rendered.replace(/<[^>]*>/g, "").split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Strip HTML tags from excerpt
  const cleanExcerpt = excerpt.rendered
    ? excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 140) + "..."
    : "";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#121225]/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#6dc065]/40 hover:shadow-[0_12px_40px_rgba(109,192,101,0.15)]">
      {/* Background radial accent glow */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#6dc065]/5 blur-[60px] transition-all duration-500 group-hover:bg-[#6dc065]/10 pointer-events-none" />

      {/* Featured Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900/60">
        {featuredImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={featuredImageUrl}
            alt={title.rendered}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-700">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-85" />

        {/* Category Badge */}
        {categoriesList && categoriesList.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {categoriesList.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-gradient-to-r from-[#6dc065] to-[#b2d235] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md backdrop-blur-sm"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7 relative z-10">
        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#6dc065]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#6dc065]" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg sm:text-xl font-extrabold leading-snug text-white transition-colors duration-300 group-hover:text-[#6dc065]">
          <Link href={`/blogs/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <span dangerouslySetInnerHTML={{ __html: title.rendered }} />
          </Link>
        </h3>

        {/* Excerpt */}
        <p
          className="mb-6 line-clamp-3 text-sm text-slate-300/80 leading-relaxed font-medium"
          dangerouslySetInnerHTML={{ __html: cleanExcerpt }}
        />

        {/* Footer Meta / Read More */}
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a14] text-[10px] font-bold ring-1 ring-white/10">
              <User className="h-3 w-3 text-slate-400" />
            </div>
            <span className="text-xs font-bold text-slate-300 truncate max-w-[120px] sm:max-w-none">
              {authorName}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#b2d235] transition-colors duration-300 group-hover:text-[#6dc065]">
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
