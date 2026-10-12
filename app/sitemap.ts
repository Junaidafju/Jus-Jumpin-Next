import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/locations/data";
import { getPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/seo";

const publicPages = [
  "/",
  "/about/",
  "/birthday-celebration/",
  "/our-activities/",
  "/school-trips/",
  "/contact/",
  "/blogs/",
  "/careers/",
  "/terms-and-conditions/",
  "/privacy-policy/",
  "/safety-guidelines/",
  "/disclaimer/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locations = getAllSlugs().map((slug) => `/${slug}/`);
  const firstPage = await getPosts({ page: 1, perPage: 100 });
  const postPages = [firstPage];

  for (let firstPageNumber = 2; firstPageNumber <= firstPage.totalPages; firstPageNumber += 5) {
    const pageNumbers = Array.from(
      { length: Math.min(5, firstPage.totalPages - firstPageNumber + 1) },
      (_, index) => firstPageNumber + index,
    );
    const batch = await Promise.all(
      pageNumbers.map((page) => getPosts({ page, perPage: 100 })),
    );
    postPages.push(...batch);
  }

  const blogPosts = postPages.flatMap(({ posts }) =>
    posts
      .filter((post) => post.slug)
      .map((post) => {
        const published = new Date(post.date);
        return {
          url: absoluteUrl(`/blogs/${post.slug}/`),
          ...(Number.isNaN(published.getTime()) ? {} : { lastModified: published }),
        };
      }),
  );

  return [...publicPages, ...locations].map((path) => ({
    url: absoluteUrl(path),
  })).concat(blogPosts);
}
