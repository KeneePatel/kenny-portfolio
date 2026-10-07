import { MonoLabel } from "@/components/signal/mono-label"
import type { CaseStudy } from "@/content/types"

/**
 * The one key number on the page, in amber. Until it's confirmed, a dashed
 * slot holds its place — a placeholder never wears the accent.
 */
export function KeyResult({ result }: { result: CaseStudy["result"] }) {
  const { label, value, pending, caption, note } = result

  return (
    <div className="flex flex-1 flex-col justify-between gap-6 border-t-2 border-foreground pt-4">
      <MonoLabel tone="muted">{label}</MonoLabel>
      <div className="flex flex-col gap-2">
        {value ? (
          <p className="text-key text-primary">{value}</p>
        ) : (
          <p className="flex min-h-32 items-center border border-dashed border-muted-foreground px-4 font-mono text-data text-muted-foreground">
            {pending}
          </p>
        )}
        <p className="text-tool font-normal">{caption}</p>
      </div>
      <p className="font-mono text-xs text-muted-foreground">{note}</p>
    </div>
  )
}
