import { MessageCircle } from "lucide-react";
import { companyInfo } from "@/components/siteData";

export default function WhatsAppButton() {
  return (
    <a href={companyInfo.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" title="Contactar por WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-md bg-[#168F4D] text-white shadow-md hover:bg-[#11753f] sm:bottom-7 sm:right-7">
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
