import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  IndianRupee,
  UserPlus,
  TrendingUp,
  ListTodo,
  Megaphone,
  FolderOpen,
  GraduationCap,
  BarChart3,
  Settings,
} from "lucide-react";

export type HrmsNavItem = {
  slug: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

export const HRMS_NAV: HrmsNavItem[] = [
  { slug: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/hrms" },
  { slug: "employees", label: "Employees", icon: Users, href: "/hrms/employees" },
  { slug: "attendance", label: "Attendance", icon: Clock, href: "/hrms/attendance" },
  { slug: "leave", label: "Leave Management", icon: CalendarDays, href: "/hrms/leave" },
  { slug: "payroll", label: "Payroll", icon: IndianRupee, href: "/hrms/payroll" },
  { slug: "recruitment", label: "Recruitment", icon: UserPlus, href: "/hrms/recruitment" },
  { slug: "performance", label: "Performance", icon: TrendingUp, href: "/hrms/performance" },
  { slug: "tasks", label: "Tasks", icon: ListTodo, href: "/hrms/tasks" },
  { slug: "announcements", label: "Announcements", icon: Megaphone, href: "/hrms/announcements" },
  { slug: "documents", label: "Documents", icon: FolderOpen, href: "/hrms/documents" },
  { slug: "training", label: "Training", icon: GraduationCap, href: "/hrms/training" },
  { slug: "reports", label: "Reports & Analytics", icon: BarChart3, href: "/hrms/reports" },
  { slug: "settings", label: "Settings", icon: Settings, href: "/hrms/settings" },
];

export const HRMS_MODULE_SLUGS = HRMS_NAV.filter((n) => n.slug !== "dashboard").map((n) => n.slug);
