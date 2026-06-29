import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/content";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl("Hello LEGPRO Services, I would like to discuss your services.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
