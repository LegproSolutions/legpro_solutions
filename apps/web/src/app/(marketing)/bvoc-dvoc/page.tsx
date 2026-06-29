import { Metadata } from "next";
import BvocDvocClient from "./BvocDvocClient";

export const metadata: Metadata = {
  title: "B.Voc & D.Voc Vocational Programs | LEGPRO Services",
  description:
    "Empowering careers through industry-aligned B.Voc and D.Voc vocational degrees and diplomas. Learn, earn, and build professional skills with LEGPRO's Learn and Earn Model.",
  keywords: [
    "B.Voc",
    "D.Voc",
    "Bachelor of Vocation",
    "Diploma of Vocation",
    "Vocational Programs",
    "Learn and Earn",
    "Apprenticeships",
    "Skill Development",
    "LEGPRO Services",
  ],
};

export default function BvocDvocPage() {
  return <BvocDvocClient />;
}
