import type { Metadata } from "next"
import { Archivo, IBM_Plex_Mono } from "next/font/google"

import { Chrome } from "@/components/chrome/chrome"
import { RouteSkipLink } from "@/components/chrome/route-skip-link"
import { SiteFooter } from "@/components/chrome/site-footer"
import { RingCursor } from "@/components/signal/ring-cursor"
import { ThemeProvider } from "@/components/theme-provider"
import { footer } from "@/content/contact"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
})

export const metadata: Metadata = {
  // Share images need absolute URLs.
  metadataBase: new URL(site.url),
  title: site.metadata.title,
  description: site.metadata.description,
  // Each page's own title and description fill the link preview. The icons
  // and share image are files in app/ (favicon.ico, icon.svg, apple-icon.png,
  // opengraph-image.png), which Next adds to every page.
  openGraph: { type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Server renders Night (the brand default, and the no-JS fallback); next-themes'
    // blocking script swaps to the stored or OS theme before first paint.
    <html
      lang="en"
      className={cn("dark antialiased", archivo.variable, plexMono.variable)}
      suppressHydrationWarning
    >
      <body id="top">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RouteSkipLink
            home={{ href: `#${site.chrome.skipTarget}`, label: site.chrome.skipLink }}
            page={{ href: "#main", label: site.chrome.skipToContent }}
          />
          <Chrome site={site} />
          {children}
          <SiteFooter site={site} copy={footer} />
          <RingCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
