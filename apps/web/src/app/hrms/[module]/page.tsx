import { notFound } from "next/navigation";
import { HrmsModulePage } from "@/components/hrms/HrmsModulePage";
import { HRMS_MODULE_SLUGS } from "@/components/hrms/hrms-nav";

export function generateStaticParams() {
  return HRMS_MODULE_SLUGS.map((module) => ({ module }));
}

export default async function HrmsModuleRoute({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  if (!HRMS_MODULE_SLUGS.includes(module)) {
    notFound();
  }
  return <HrmsModulePage moduleSlug={module} />;
}
