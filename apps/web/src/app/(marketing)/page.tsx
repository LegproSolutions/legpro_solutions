import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ClientsSection } from "@/components/sections/ClientsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <IndustriesSection />
      <ClientsSection />
    </>
  );
}
