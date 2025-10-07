import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Snake Game",
  description: "A classic Snake game built with Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // หรือลบออกถ้าไม่ต้องการจำกัด
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen overflow-hidden">{children}</body>
    </html>
  );
}
