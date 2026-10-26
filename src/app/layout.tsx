import type { Metadata, Viewport } from "next";
import { SITE, siteOrigin } from "@/lib/site";
import "./globals.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@/features/explorer/studio.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: { default: `${SITE.name} — Explore a world of color`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#090b0c" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-latin-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to colors
        </a>
        {children}
      </body>
    </html>
  );
}
