import Link from "next/link"

import type { Project } from "@/content/types"

import { ProjectDiagram } from "./diagrams/project-diagram"

/**
 * One track panel: number, kind, title, one line, a diagram drawn from the
 * project, its stack and one action. Rendered on the server.
 */
export function ProjectPanel({
  project,
  number,
  cursor,
}: {
  project: Project
  number: string
  cursor: string
}) {
  const { title, kind, line, stack, diagram, link, pendingLink } = project

  return (
    <article className="flex h-full flex-col gap-4 bg-card p-5 md:p-6 lg:p-8">
      <div className="flex justify-between gap-4 font-mono text-label uppercase">
        <span className="text-amber-text">{number}</span>
        <span className="text-right text-muted-foreground">{kind}</span>
      </div>
      <h3 className="text-project text-balance">{title}</h3>
      <p className="max-w-prose text-body text-foreground-2">{line}</p>
      <ProjectDiagram diagram={diagram} />
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <p className="font-mono text-xs text-foreground-2">{stack.join(" · ")}</p>
        {link?.external ? (
          <a
            href={link.href}
            rel="noopener noreferrer"
            data-cursor={cursor}
            className="inline-flex min-h-11 items-center font-semibold"
          >
            <span className="link-rule">{link.label}</span>
            <span aria-hidden="true">&nbsp;↗</span>
          </a>
        ) : link ? (
          <Link href={link.href} data-cursor={cursor} className="inline-flex min-h-11 items-center font-semibold">
            <span className="link-rule">{link.label}</span>
          </Link>
        ) : (
          <span className="font-mono text-xs text-muted-foreground">{pendingLink}</span>
        )}
      </div>
    </article>
  )
}
