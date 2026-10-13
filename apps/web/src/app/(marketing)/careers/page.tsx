import { Metadata } from "next";
import { CareersClient } from "./CareersClient";

export const metadata: Metadata = {
  title: "Career Opportunities | LEGPRO Services Careers",
  description:
    "Explore career opportunities across HR & Recruitment, Payroll, Supervisor, Administration, Accounts, Operations, BD, Sales, and IT roles. Our HR team contacts suitable candidates for upcoming requirements.",
};

export default function CareersPage() {
  return <CareersClient />;
}
