import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zulkarnen.dev"),
  title: "Zulkarnen — Software Engineer",
  description:
    "Full-stack software engineer with 3+ years building end-to-end web and mobile platforms. Go, Node.js, Laravel, Next.js, and a strong DevOps foundation.",
  keywords: [
    "Zulkarnen",
    "Software Engineer",
    "Full-stack Engineer",
    "Backend Engineer",
    "Next.js",
    "Go",
    "Node.js",
    "Laravel",
  ],
  openGraph: {
    title: "Zulkarnen — Software Engineer",
    description:
      "Full-stack software engineer with 3+ years building end-to-end web and mobile platforms.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
