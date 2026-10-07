import Link from "next/link"

import { MonoLabel } from "@/components/signal/mono-label"
import { OutlineText } from "@/components/signal/outline-text"
import type { CaseCopy } from "@/content/types"

type CaseEndingProps = {
  copy: CaseCopy
  /** The next case study, if there is another one. */
  next: { href: string; label: string; title: string } | null
  cursor: { home: string; open: string }
}

/** The way out: the next case study in big type, or back to all work. */
export function CaseEnding({ copy, next, cursor }: CaseEndingProps) {
  const big = "group flex flex-col items-end gap-1.5 text-right"

  return (
    <nav
      aria-label={copy.allWork.label}
      className="flex flex-wrap items-end justify-between gap-6 border-t border-foreground pt-8"
    >
      {next ? (
        <>
          <Link
            href={copy.allWork.href}
            data-cursor={cursor.home}
            className="inline-flex min-h-11 items-center font-mono text-data"
          >
            <span aria-hidden="true">←&nbsp;</span>
            <span className="link-rule">{copy.allWork.label}</span>
          </Link>
          <Link href={next.href} data-cursor={cursor.open} className={big}>
            <MonoLabel tone="muted">{next.label}</MonoLabel>
            <span className="text-project">{next.title} →</span>
          </Link>
        </>
      ) : (
        <Link href={copy.allWork.href} data-cursor={cursor.home} className={`${big} ml-auto`}>
          <MonoLabel tone="muted">{copy.backTo.label}</MonoLabel>
          <span className="text-project">
            <span aria-hidden="true">← </span>
            {copy.backTo.filled}{" "}
            <OutlineText className="transition-[color,-webkit-text-stroke-color] duration-(--duration-quick) ease-out group-hover:type-outline-lit group-focus-visible:type-outline-lit">
              {copy.backTo.outlined}
            </OutlineText>
          </span>
        </Link>
      )}
    </nav>
  )
}
