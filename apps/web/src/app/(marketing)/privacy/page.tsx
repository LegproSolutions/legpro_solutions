import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/content";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-dark pt-[72px]">
      <Container className="prose prose-invert max-w-3xl py-16">
        <Link href="/" className="text-accent hover:underline">
          ← Back to Home
        </Link>
        <h1 className="mt-8 font-display text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-4 text-slate-400">
          {site.company.legalName} respects your privacy. This policy describes how we collect, use,
          and protect personal information submitted through our website and portals.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-white">Information We Collect</h2>
        <p className="text-slate-400">
          We may collect contact details, resume data, and messages you submit via forms or job
          applications.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-white">How We Use Information</h2>
        <p className="text-slate-400">
          Information is used to respond to inquiries, process job applications, and improve our
          recruitment services.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-white">Contact</h2>
        <p className="text-slate-400">
          For privacy-related questions, email{" "}
          <a href={`mailto:${site.company.email}`} className="text-accent">
            {site.company.email}
          </a>
          .
        </p>
      </Container>
    </div>
  );
}
