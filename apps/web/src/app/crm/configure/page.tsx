import Link from "next/link";

export const metadata = {
  title: "CRM not configured",
};

export default function CrmConfigurePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <h1 className="font-display text-2xl font-bold text-white">CRM portal URL not set</h1>
      <p className="mt-3 max-w-md text-slate-400">
        Add <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-accent">NEXT_PUBLIC_CRM_URL</code>{" "}
        to <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">apps/web/.env.local</code> with your
        existing CRM base URL. Visiting <strong>/crm</strong> will then redirect users there.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
