import Link from "next/link"

import { MonoLabel } from "@/components/signal/mono-label"
import { OutlineText } from "@/components/signal/outline-text"
import type { CaseStudy } from "@/content/types"
import { isPending } from "@/lib/case-study"
import { cn } from "@/lib/utils"

type CaseHeaderProps = {
  study: CaseStudy
  eyebrow: string
  back: { label: string; href: string }
  cursor: string
}

/** Back link, eyebrow, the title (second word outlined), the lede and a meta grid. */
export function CaseHeader({ study, eyebrow, back, cursor }: CaseHeaderProps) {
  const { title, lede, meta } = study

  return (
    <header className="flex flex-col">
      <Link
        href={back.href}
        data-cursor={cursor}
        className="inline-flex min-h-11 items-center self-start font-mono text-data text-foreground-2"
      >
        <span aria-hidden="true">←&nbsp;</span>
        <span className="link-rule">{back.label}</span>
      </Link>
      <MonoLabel tone="muted" className="mt-8">
        {eyebrow}
      </MonoLabel>
      <h1 className="mt-4 text-case text-balance">
        {title.filled} <OutlineText stroke="thick">{title.outlined}</OutlineText>
      </h1>
      <p className="mt-5 max-w-225 text-lead text-balance md:mt-8">{lede}</p>
      <dl className="mt-10 grid gap-x-gutter border-t border-foreground sm:grid-cols-2 md:mt-16 md:grid-cols-3 xl:grid-cols-6">
        {meta.map(({ term, detail }) => (
          <div key={term} className="flex flex-col gap-1 border-b py-3.5">
            <dt className="font-mono text-label text-muted-foreground uppercase">{term}</dt>
            <dd className={cn("text-body", isPending(detail) && "text-muted-foreground")}>
              {detail}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
