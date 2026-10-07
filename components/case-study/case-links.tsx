import { MonoLabel } from "@/components/signal/mono-label"
import type { PendingLink } from "@/content/types"

/** The side list of links (thesis, code, audio). Links that don't exist yet show their placeholder. */
export function CaseLinks({ label, links, cursor }: { label: string; links: PendingLink[]; cursor: string }) {
  return (
    <div className="flex flex-col gap-1 font-mono text-data">
      <MonoLabel tone="muted">{label}</MonoLabel>
      <ul>
        {links.map((link) => (
          <li key={link.label} className="flex min-h-11 items-center">
            {link.href ? (
              <a
                href={link.href}
                rel={link.external ? "noopener noreferrer" : undefined}
                data-cursor={cursor}
                className="inline-flex min-h-11 items-center"
              >
                <span className="link-rule">{link.label}</span>
                {link.external ? <span aria-hidden="true">&nbsp;↗</span> : null}
              </a>
            ) : (
              <span className="text-muted-foreground">{link.pending}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
