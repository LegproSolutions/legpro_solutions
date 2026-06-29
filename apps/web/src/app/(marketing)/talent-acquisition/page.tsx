import { Metadata } from "next";
import TalentAcquisitionClient from "./TalentAcquisitionClient";

export const metadata: Metadata = {
  title: "Talent Acquisition Services | LEGPRO Services",
  description:
    "strategic Talent Acquisition solutions that help organizations identify and secure high-quality talent across various functions and levels. Partner with LEGPRO to streamline recruiting.",
  keywords: [
    "Talent Acquisition",
    "Recruitment",
    "Staffing Solutions",
    "Headhunting",
    "Executive Search",
    "Workforce Planning",
    "LEGPRO Services",
    "Hiring Agency India",
  ],
};

export default function TalentAcquisitionPage() {
  return <TalentAcquisitionClient />;
}
