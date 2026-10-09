import { cn } from "@/lib/utils"

type DiffLine = { sign: "+" | "-"; text: string }

/** A small diff: removed lines muted, added lines in the accent. */
export function DiffDiagram({ header, lines }: { header: string; lines: DiffLine[] }) {
  return (
    <div className="flex w-full flex-col gap-1 font-mono text-xs leading-relaxed">
      <span className="text-muted-foreground">{header}</span>
      {lines.map((line, index) => (
        <span
          // Lines are static content: the index is a stable key.
          key={index}
          className={cn(
            "whitespace-pre-wrap",
            line.sign === "+" ? "text-amber-text" : "text-muted-foreground"
          )}
        >
          {line.sign === "-" ? "−" : "+"}
          {"  "}
          {line.text}
        </span>
      ))}
    </div>
  )
}
