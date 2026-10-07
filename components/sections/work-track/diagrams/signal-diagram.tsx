import { wavePath } from "@/lib/waveform"

// One seeded signal, drawn twice: with noise (before) and without (after).
const WAVE = { width: 700, height: 56, points: 140, seed: 5 } as const
const noisy = wavePath({ ...WAVE, noise: 1 })
const clean = wavePath({ ...WAVE, noise: 0 })
const viewBox = `0 0 ${WAVE.width} ${WAVE.height}`

/** Noisy speech above, the denoised signal below. */
export function SignalDiagram({ caption }: { caption: string }) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <svg viewBox={viewBox} preserveAspectRatio="none" className="block h-14 w-full">
        <path
          d={noisy}
          fill="none"
          vectorEffect="non-scaling-stroke"
          className="stroke-muted-foreground"
        />
      </svg>
      <span className="font-mono text-xs text-amber-text">{caption}</span>
      <svg viewBox={viewBox} preserveAspectRatio="none" className="block h-14 w-full">
        <path
          d={clean}
          fill="none"
          vectorEffect="non-scaling-stroke"
          className="stroke-primary [stroke-width:var(--wave-clean-width)]"
        />
      </svg>
    </div>
  )
}
