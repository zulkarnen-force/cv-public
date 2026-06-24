import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { profile, contacts } from "@/content/cv";

const GA_MEASUREMENT_ID = "G-GE4S8SMNT2";
const SITE_URL = "https://zulkarnen.web.id";

const title = "Zulkarnen — Software Engineer";
const description =
  "Full-stack software engineer with 3+ years building end-to-end web and mobile platforms. Go, Node.js, Laravel, Next.js, and a strong DevOps foundation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Zulkarnen",
  },
  description,
  applicationName: "Zulkarnen — CV",
  authors: [{ name: "Zulkarnen", url: SITE_URL }],
  creator: "Zulkarnen",
  keywords: [
    "Zulkarnen",
    "Software Engineer",
    "Full-stack Engineer",
    "Backend Engineer",
    "DevOps Engineer",
    "Next.js",
    "Go",
    "Node.js",
    "Laravel",
    "Kubernetes",
    "Yogyakarta",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Zulkarnen — Software Engineer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zulkarnen — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.tagline,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yogyakarta",
    addressCountry: "ID",
  },
  email: "zulkarnen706@gmail.com",
  sameAs: contacts
    .filter((c) => c.kind !== "email")
    .map((c) => c.href),
  knowsAbout: [
    "Software Engineering",
    "Backend Development",
    "Full-stack Development",
    "DevOps",
    "Go",
    "Node.js",
    "Laravel",
    "Next.js",
    "Kubernetes",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </html>
  );
}
