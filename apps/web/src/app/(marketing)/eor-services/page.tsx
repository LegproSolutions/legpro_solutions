import { Metadata } from "next";
import EorServicesClient from "./EorServicesClient";

export const metadata: Metadata = {
  title: "Employer of Record (EOR) Services | LEGPRO Services",
  description:
    "Simplifying Global Employment. Empowering Business Growth. Expand your workforce without setting up a local legal entity with LEGPRO Services EOR solutions.",
  keywords: [
    "Employer of Record",
    "EOR Services",
    "Global Employment",
    "Workforce Expansion",
    "Payroll Management",
    "Statutory Compliance",
    "HR Administration",
    "Employee Onboarding",
    "LEGPRO Services",
    "Noida",
    "India",
  ],
};

export default function EorServicesPage() {
  return <EorServicesClient />;
}
