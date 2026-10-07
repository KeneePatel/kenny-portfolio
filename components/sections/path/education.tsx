import Link from "next/link"

import { monoLabelVariants } from "@/components/signal/mono-label"
import type { PathCopy } from "@/content/types"

/** Closes the Path section: the MACS as a headline, then the bachelor's. */
export function Education({
  education,
  cursor,
}: {
  education: PathCopy["education"]
  cursor: string
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className={monoLabelVariants({ tone: "muted" })}>{education.label}</h3>
      <p className="text-degree">{education.headline}</p>
      <p className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-data text-foreground-2">
        {education.details.map((detail) => (
          <span key={detail}>{detail}</span>
        ))}
        <span className="text-amber-text">{education.gpa}</span>
        <Link href={education.thesis.href} data-cursor={cursor} className="-my-3 inline-flex min-h-11 items-center">
          <span className="link-rule">{education.thesis.label}</span>
        </Link>
      </p>
      <p className="font-mono text-xs text-muted-foreground">{education.secondary}</p>
    </div>
  )
}
