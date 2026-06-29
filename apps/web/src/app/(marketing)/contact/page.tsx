import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | LEGPRO Services",
  description: "Connect with LEGPRO Services for tailored recruitment, staffing, apprenticeship, and learning programs across India.",
};

export default function ContactPage() {
  return (
    <div className="pt-8">
      <ContactSection />
    </div>
  );
}
