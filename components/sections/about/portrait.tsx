import Image from "next/image"

import type { AboutCopy } from "@/content/types"
import { cn } from "@/lib/utils"

/**
 * The portrait as "fig. 1", shown straight and exactly as Kenny edited it (no
 * filters, no tilt). A labelled frame until a photo is in content.
 */
export function Portrait({
  portrait,
  className,
}: {
  portrait: AboutCopy["portrait"]
  className?: string
}) {
  const { src, alt, placeholder, caption } = portrait

  return (
    <figure className={cn("flex flex-col gap-2.5", className)}>
      <div className="relative aspect-4/5 overflow-hidden border border-stroke bg-card">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 24rem, 80vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute bottom-3.5 left-3.5 right-3.5 font-mono text-xs text-muted-foreground">
            {placeholder}
          </span>
        )}
      </div>
      <figcaption className="font-mono text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}
