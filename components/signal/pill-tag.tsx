import { cn } from "@/lib/utils"

/** Non-interactive pill with the same surface and size as <Pill> (e.g. the clock). */
export function PillTag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "pill-surface inline-flex min-h-11 items-center gap-2.5 px-4.5",
        className
      )}
      {...props}
    />
  )
}
