import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const outlineTextVariants = cva("type-outline", {
  variants: {
    // ink: phrases people read (full-strength stroke). quiet: decorative or inactive.
    tone: {
      ink: "",
      quiet: "type-outline-quiet",
    },
    stroke: {
      thin: "",
      thick: "type-outline-thick",
    },
  },
  defaultVariants: {
    tone: "ink",
    stroke: "thin",
  },
})

/**
 * Outlined display type (30px and up only). Always sits next to a filled phrase.
 * Falls back to filled text where text-stroke is unsupported or colours are forced.
 */
export function OutlineText({
  tone,
  stroke,
  className,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof outlineTextVariants>) {
  return (
    <span
      className={cn(outlineTextVariants({ tone, stroke }), className)}
      {...props}
    />
  )
}
