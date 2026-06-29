import { Metadata } from "next";
import NapsNatsClient from "./NapsNatsClient";

export const metadata: Metadata = {
  title: "NAPS & NATS Solutions | LEGPRO Services",
  description:
    "Empowering organizations with end-to-end National Apprenticeship Promotion Scheme (NAPS) & National Apprenticeship Training Scheme (NATS) solutions. Reduce hiring costs, ensure compliance, and build a skilled workforce.",
  keywords: [
    "NAPS",
    "NATS",
    "Apprenticeship",
    "LEGPRO Services",
    "Skill Development",
    "Workforce solutions",
    "Compliance support",
    "Staffing India",
  ],
};

export default function NapsNatsPage() {
  return <NapsNatsClient />;
}
