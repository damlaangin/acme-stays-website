import { MetadataRoute } from "next";
import { LISTINGS } from "@/content/listings";
import { POSTS } from "@/content/blog";
import { BRAND } from "@/utils/dummy";

const PAGES = ["", "/stays", "/homeowner", "/corporate", "/whoweare", "/blogs", "/faqs", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PAGES, ...LISTINGS.map((l) => `/stays/${l.slug}`), ...POSTS.map((p) => `/blogs/${p.slug}`)];
  return paths.map((path) => ({
    url: `${BRAND.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
