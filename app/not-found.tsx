import type { Metadata } from "next"
import Link from "next/link"

import { MonoLabel } from "@/components/signal/mono-label"
import { OutlineText } from "@/components/signal/outline-text"
import { site } from "@/content/site"

export const metadata: Metadata = { title: site.notFound.metaTitle }

/** Any unknown URL (and unknown case-study slugs): one line, and the way home. */
export default function NotFound() {
  const { label, title, body, home } = site.notFound

  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-dvh flex-col justify-center gap-6 px-page pt-36 pb-16"
    >
      <MonoLabel>{label}</MonoLabel>
      <h1 className="text-section text-balance">
        {title.filled} <OutlineText>{title.outlined}</OutlineText>
      </h1>
      <p className="max-w-160 text-body text-foreground-2">{body}</p>
      <Link
        href={home.href}
        data-cursor={site.chrome.cursor.home}
        className="inline-flex min-h-11 items-center self-start font-semibold"
      >
        <span aria-hidden="true">←&nbsp;</span>
        <span className="link-rule">{home.label}</span>
      </Link>
    </main>
  )
}
