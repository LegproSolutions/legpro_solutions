import { Metadata } from "next";
import InternationalRecruitmentClient from "./InternationalRecruitmentClient";

export const metadata: Metadata = {
  title: "International Recruitment Services | LegPro Consultants",
  description:
    "Connecting global talent with global opportunities. End-to-end international recruitment solutions, candidate screening, compliance, and skilled overseas hiring across diverse industries.",
  keywords: [
    "International Recruitment",
    "Global Talent Sourcing",
    "Overseas Staffing",
    "Cross-Border Hiring",
    "Skilled Manpower Recruitment",
    "Expatriate Hiring",
    "Global Workforce Solutions",
    "LegPro Consultants",
    "International Job Placement",
    "International Manpower Consultancy",
  ],
  openGraph: {
    title: "International Recruitment Services | LegPro Consultants",
    description:
      "Connecting global talent with global opportunities. End-to-end international recruitment solutions across Europe, Middle East, Asia, and worldwide.",
    url: "https://legpro.co.in/international-recruitment",
    siteName: "LegPro Consultants",
    images: [
      {
        url: "/service-international.png",
        width: 1200,
        height: 630,
        alt: "International Recruitment - LegPro Consultants",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function InternationalRecruitmentPage() {
  return <InternationalRecruitmentClient />;
}
