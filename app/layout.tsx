import type { Metadata } from "next";
import "./globals.css";

/* Metadata is Next.js's built-in way to set <title>, description, and social
   tags. Typing it as Metadata means a typo in a key is a build error. */
export const metadata: Metadata = {
  title: "Design System — Araxie Miller",
  description:
    "A small, typed React component library built on the araxiemiller.com design language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Fonts come from Google Fonts. preconnect speeds up the handshake. */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Urbanist:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
