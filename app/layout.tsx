import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zulkarnen — Software Engineer",
  description: "CV and portfolio of Zulkarnen, a Software Engineer.",
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
