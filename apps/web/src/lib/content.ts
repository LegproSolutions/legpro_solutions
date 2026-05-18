import siteData from "../../../../content/site.json";

export type SiteContent = typeof siteData;

export const site = siteData as SiteContent;

export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${site.company.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
