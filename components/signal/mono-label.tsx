import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const monoLabelVariants = cva("font-mono text-label uppercase", {
  variants: {
    tone: {
      accent: "text-amber-text",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    tone: "accent",
  },
})

/** 12px uppercase mono label: indices, section labels, metadata. */
export function MonoLabel({
  tone,
  className,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof monoLabelVariants>) {
  return (
    <span className={cn(monoLabelVariants({ tone }), className)} {...props} />
  )
}
