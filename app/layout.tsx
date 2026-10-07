import type { Metadata } from "next"
import { Archivo, IBM_Plex_Mono } from "next/font/google"

import { Chrome } from "@/components/chrome/chrome"
import { SiteFooter } from "@/components/chrome/site-footer"
import { RingCursor } from "@/components/signal/ring-cursor"
import { SkipLink } from "@/components/signal/skip-link"
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
  title: site.metadata.title,
  description: site.metadata.description,
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
          <SkipLink href={`#${site.chrome.skipTarget}`}>
            {site.chrome.skipLink}
          </SkipLink>
          <Chrome site={site} />
          {children}
          <SiteFooter site={site} copy={footer} />
          <RingCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
