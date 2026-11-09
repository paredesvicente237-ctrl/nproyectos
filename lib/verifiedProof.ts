import type { StaticImageData } from "next/image";

/**
 * Public proof content is opt-in: add an item only after its details are checked
 * and the customer has approved publication. Empty by design until then.
 */
export type VerifiedProject = {
  title: string;
  service: string;
  challenge: string;
  solution: string;
  image: StaticImageData | string;
  imageAlt: string;
  customerName?: string;
  publicationApproved: true;
};

export type VerifiedTestimonial = {
  quote: string;
  author: string;
  company?: string;
  service: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  source?: "Google" | "Email" | "Otro medio verificable";
  publicationApproved: true;
  authenticityVerified: true;
};

export const verifiedProjects: VerifiedProject[] = [];
export const verifiedTestimonials: VerifiedTestimonial[] = [];
