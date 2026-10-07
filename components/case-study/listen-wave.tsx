import { wavePath } from "@/lib/waveform"

// One seeded sentence, drawn noisy (A) or clean (B). Illustrative, not the clip's real samples.
const WAVE = { width: 900, height: 180, points: 300, seed: 31 } as const
const paths = {
  noisy: wavePath({ ...WAVE, noise: 0.9 }),
  clean: wavePath({ ...WAVE, noise: 0 }),
}
const viewBox = `0 0 ${WAVE.width} ${WAVE.height}`

/** The chosen side's waveform, with an amber playhead once there's a clip to play. */
export function ListenWave({ noisy, progress }: { noisy: boolean; progress: number | null }) {
  return (
    <div aria-hidden="true" className="relative h-45 border bg-card">
      <svg viewBox={viewBox} preserveAspectRatio="none" className="block size-full">
        <path
          d={noisy ? paths.noisy : paths.clean}
          fill="none"
          vectorEffect="non-scaling-stroke"
          className={
            noisy ? "stroke-muted-foreground" : "stroke-primary [stroke-width:var(--wave-clean-width)]"
          }
        />
      </svg>
      {progress === null ? null : (
        <span
          className="absolute inset-y-0 left-(--progress) w-px bg-primary"
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />
      )}
    </div>
  )
}
