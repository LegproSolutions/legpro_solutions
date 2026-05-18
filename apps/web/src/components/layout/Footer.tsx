import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-darker">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Image
              src="/legpro-logo.svg"
              alt={site.company.brandLine}
              width={180}
              height={48}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {site.footer.description}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/#about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/hrms" className="hover:text-accent">
                  HRMS
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-accent">
                  Job Skills
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-accent">
                  Job Mela
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/#services" className="hover:text-accent">
                  Staffing
                </Link>
              </li>
              <li>
                <Link href="/#training" className="hover:text-accent">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/#clients" className="hover:text-accent">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{site.company.phoneDisplay}</li>
              <li>
                <a href={`mailto:${site.company.email}`} className="hover:text-accent">
                  {site.company.email}
                </a>
              </li>
              <li>{site.company.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {site.company.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
