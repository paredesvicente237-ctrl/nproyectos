import type { MetadataRoute } from "next";
import { companyInfo } from "@/components/siteData";
import { products } from "@/lib/productData";
import { services } from "@/lib/serviceData";
import { industrialResources } from "@/lib/industrialResources";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${companyInfo.website}/servicios/${service.slug}`,
  }));
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${companyInfo.website}/productos/${product.slug}`,
  }));
  const resourcePages: MetadataRoute.Sitemap = industrialResources.map((resource) => ({
    url: `${companyInfo.website}/recursos-industriales/${resource.slug}`,
    lastModified: new Date(`${resource.updatedAt}T12:00:00-03:00`),
  }));

  return [
    { url: companyInfo.website },
    { url: `${companyInfo.website}/productos` },
    ...productPages,
    { url: `${companyInfo.website}/maestranza-santiago` },
    { url: `${companyInfo.website}/privacidad` },
    { url: `${companyInfo.website}/recursos-industriales` },
    ...servicePages,
    ...resourcePages,
  ];
}
