import Image from "next/image"

import { MonoLabel } from "@/components/signal/mono-label"
import type { CaseStudy } from "@/content/types"

/** Before and after, side by side, on one monochrome ramp. Hatched slots until the images exist. */
export function Spectrograms({ figure }: { figure: CaseStudy["spectrograms"] }) {
  const { fig, axis, images, caption } = figure

  return (
    <figure className="flex flex-col gap-3.5 border-t border-foreground pt-4">
      <MonoLabel tone="muted">{fig}</MonoLabel>
      <div className="grid gap-6 md:grid-cols-2">
        {images.map((image) => (
          <div key={image.label} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="rotate-180 text-center font-mono text-label text-muted-foreground [writing-mode:vertical-rl]"
            >
              {axis.frequency}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="relative flex aspect-16/7 items-center justify-center border hatch px-4 text-center font-mono text-label text-muted-foreground">
                {image.src ? (
                  <Image src={image.src} alt={image.alt} fill sizes="(width >= 48rem) 50vw, 100vw" className="object-cover" />
                ) : (
                  image.pending
                )}
              </div>
              <div className="flex justify-between font-mono text-label text-muted-foreground">
                <span>{image.label}</span>
                <span aria-hidden="true">{axis.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="font-mono text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  )
}
