import { HrmsShell } from "@/components/hrms/HrmsShell";

export const metadata = {
  title: "HRMS",
};

export default function HrmsLayout({ children }: { children: React.ReactNode }) {
  return <HrmsShell>{children}</HrmsShell>;
}
