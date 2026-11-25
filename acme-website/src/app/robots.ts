import { MetadataRoute } from "next";
import { BRAND } from "@/utils/dummy";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${BRAND.siteUrl}/sitemap.xml` };
}
