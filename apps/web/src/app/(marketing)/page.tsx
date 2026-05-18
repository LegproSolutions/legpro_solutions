import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JobsPreviewSection } from "@/components/sections/JobsPreviewSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <JobsPreviewSection />
      <TrainingSection />
      <ClientsSection />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}
