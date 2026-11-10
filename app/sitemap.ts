import type { MetadataRoute } from "next";
import { companyInfo } from "@/components/siteData";
import { products } from "@/lib/productData";
import { services } from "@/lib/serviceData";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${companyInfo.website}/servicios/${service.slug}`,
  }));
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${companyInfo.website}/productos/${product.slug}`,
  }));

  return [
    { url: companyInfo.website },
    { url: `${companyInfo.website}/productos` },
    ...productPages,
    { url: `${companyInfo.website}/maestranza-santiago` },
    { url: `${companyInfo.website}/privacidad` },
    ...servicePages,
  ];
}
