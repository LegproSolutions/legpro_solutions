import { Metadata } from "next";
import { CareersClient } from "./CareersClient";

export const metadata: Metadata = {
  title: "Career Opportunities | LEGPRO Services Careers",
  description:
    "Explore career opportunities across Talent Acquisition & Sourcing, Payroll, Staffing Operations, Supervisor / Plant Managers, Administration, Accounts, Apprenticeship Operations, Business Development / Sales, and IT roles. Our HR team contacts suitable candidates for upcoming requirements.",
};

export default function CareersPage() {
  return <CareersClient />;
}
