import { Metadata } from "next";
import ContractualStaffingClient from "./ContractualStaffingClient";

export const metadata: Metadata = {
  title: "Contractual Staffing Services | LEGPRO Services",
  description:
    "Flexible workforce solutions for modern businesses. Scale your team instantly, access skilled & semi-skilled talent, reduce recruitment overheads, and streamline compliance with LEGPRO's contractual staffing.",
  keywords: [
    "Contractual Staffing",
    "Temporary Staffing",
    "Flexible workforce solutions",
    "Project-based hiring",
    "Workforce outsourcing",
    "Blue-collar staffing",
    "White-collar staffing",
    "LEGPRO Services",
    "Staffing India",
  ],
};

export default function ContractualStaffingPage() {
  return <ContractualStaffingClient />;
}
