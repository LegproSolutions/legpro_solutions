import { Metadata } from "next";
import LearningStaffingClient from "./LearningStaffingClient";

export const metadata: Metadata = {
  title: "Learning & Skill Development Services | LEGPRO Services",
  description:
    "Empowering careers through continuous learning. We offer comprehensive Learning & Skill Development Solutions designed for job seekers, students, freshers, and working professionals.",
  keywords: [
    "Learning Staffing",
    "Skill Development",
    "Upskilling",
    "Job Skills",
    "Vocational Training",
    "Professional Skills",
    "LEGPRO Services",
  ],
};

export default function LearningStaffingPage() {
  return <LearningStaffingClient />;
}
