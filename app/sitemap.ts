import type { MetadataRoute } from "next";
import { companyInfo } from "@/components/siteData";
import { services } from "@/lib/serviceData";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${companyInfo.website}/servicios/${service.slug}`,
  }));

  return [
    { url: companyInfo.website },
    { url: `${companyInfo.website}/productos` },
    { url: `${companyInfo.website}/maestranza-santiago` },
    ...servicePages,
  ];
}
