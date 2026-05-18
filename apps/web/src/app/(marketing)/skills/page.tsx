import type { Metadata } from "next";
import Link from "next/link";
import { Award, BookOpen, Languages, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Job Skills Portal",
};

const icons = { Languages, Award, Wrench, BookOpen } as const;

export default function SkillsPortalPage() {
  return (
    <div className="min-h-screen bg-surface-dark pt-[72px]">
      <Container className="py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Job Skills Portal</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">
          Build skills. <span className="text-gradient">Get hired.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Skill development, certification programs, interview preparation, and training modules —
          aligned with employer needs and apprenticeship pathways.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.training.map((t) => {
            const Icon = icons[t.icon as keyof typeof icons] ?? BookOpen;
            return (
              <article
                key={t.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                  <Icon size={24} />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">{t.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{t.description}</p>
                <button
                  type="button"
                  className="mt-6 w-full rounded-xl border border-white/15 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  View programs
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/#training" className="btn-secondary">
            Back to website training section
          </Link>
          <Link href="/" className="btn-primary">
            Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
