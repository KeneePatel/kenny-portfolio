import { MonoLabel } from "@/components/signal/mono-label"
import type { CaseStudy } from "@/content/types"

/**
 * Before and after, side by side, on one shared scale. Each image is a mask
 * filled with the page's ink colour, so the panels follow the theme.
 * Hatched slots until the images exist.
 */
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
              {image.src ? (
                <div className="relative aspect-16/7 border bg-card">
                  <div
                    role="img"
                    aria-label={image.alt}
                    className="spectrogram-mask absolute inset-0 bg-foreground"
                    style={{ "--mask": `url(${image.src})` } as React.CSSProperties}
                  />
                </div>
              ) : (
                <div className="flex aspect-16/7 items-center justify-center border hatch px-4 text-center font-mono text-label text-muted-foreground">
                  {image.pending}
                </div>
              )}
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
