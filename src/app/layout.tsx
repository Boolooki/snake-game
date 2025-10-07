import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  manifest: "/manifest.json",
  title: "Snake Game",
  description: "A classic Snake game built with Next.js",
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
