import type { MetadataRoute } from "next";
import { companyInfo } from "@/components/siteData";
import { services } from "@/lib/serviceData";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${companyInfo.website}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: companyInfo.website,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${companyInfo.website}/productos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...servicePages,
  ];
}
