import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | LEGPRO Services",
  description:
    "LEGPRO Services is a trusted workforce and learning solutions provider. For over 9 years, we have built stronger, more agile, and future-ready workforces through staffing, recruitment, and learning solutions.",
};

export default function AboutPage() {
  return <AboutClient />;
}
