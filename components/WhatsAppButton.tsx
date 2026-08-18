import { MessageCircle } from "lucide-react";
import { salesContact } from "@/components/siteData";

export default function WhatsAppButton() {
  return (
    <a href={salesContact.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Contactar a Américo Véliz por WhatsApp" title="Contactar a Américo Véliz por WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-md bg-[#168F4D] text-white shadow-md hover:bg-[#11753f] sm:bottom-7 sm:right-7">
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
