import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: `${site.company.brandLine} | Enterprise Staffing & HR`,
    template: `%s | ${site.company.brandLine}`,
  },
  description: site.company.description,
  keywords: [
    "LEGPRO",
    "staffing",
    "HRMS",
    "learning",
    "recruitment",
    "Ghaziabad",
    "India",
  ],
  openGraph: {
    title: site.company.brandLine,
    description: site.company.description,
    url: site.company.website,
    siteName: site.company.brandLine,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
