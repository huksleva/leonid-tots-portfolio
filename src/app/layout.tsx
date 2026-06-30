import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leonid-tots-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Leonid Tots — Backend Developer",
  description:
    "Portfolio of Leonid Tots, a backend developer specializing in Python, FastAPI, and REST APIs. Open to junior positions and internships.",
  authors: [{ name: "Leonid Tots" }],
  keywords: [
    "backend developer",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "junior developer",
    "portfolio",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Leonid Tots — Backend Developer",
    description:
      "Portfolio of Leonid Tots, a backend developer specializing in Python, FastAPI, and REST APIs.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Leonid Tots — Backend Developer",
    description:
      "Portfolio of Leonid Tots, a backend developer specializing in Python, FastAPI, and REST APIs.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leonid Tots",
  jobTitle: "Backend Developer",
  url: siteUrl,
  email: "leonid005xc@gmail.com",
  sameAs: ["https://github.com/huksleva"],
  knowsAbout: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Docker", "Git"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){if(localStorage.getItem('theme')!=='light')document.documentElement.classList.add('dark');})();` }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <LanguageProvider>
          <ThemeProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <a
              href="#main-content"
              className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-zinc-100 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-zinc-900"
            >
              Skip to main content
            </a>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
