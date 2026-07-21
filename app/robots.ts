import type { MetadataRoute } from "next";
import { companyInfo } from "@/components/siteData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${companyInfo.website}/sitemap.xml`,
    host: companyInfo.website,
  };
}
