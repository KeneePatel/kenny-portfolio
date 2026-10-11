import type { AudioSample } from "@/content/types"
import { wavePath } from "@/lib/waveform"

// Shared drawing box for real and stand-in waveforms (stretched to fit).
export const WAVE_BOX = { width: 900, height: 180, points: 200, inset: 6 } as const
const viewBox = `0 0 ${WAVE_BOX.width} ${WAVE_BOX.height}`

// Stand-in shapes for a clip without audio yet: one seeded sentence, noisy or clean.
const standIn = { width: WAVE_BOX.width, height: WAVE_BOX.height, points: 300, seed: 31 } as const
const stand = { noisy: wavePath({ ...standIn, noise: 0.9 }), clean: wavePath({ ...standIn, noise: 0 }) }

const ink: Record<AudioSample["tone"], string> = {
  noisy: "text-muted-foreground",
  denoised: "text-primary",
  clean: "text-foreground-2",
}

type ListenWaveProps = {
  tone: AudioSample["tone"]
  /** The clip's real waveform (a closed path in WAVE_BOX), drawn at build time. */
  wave: string | null
  progress: number | null
}

/** The chosen clip's waveform, with an accent playhead while there's a clip to play. */
export function ListenWave({ tone, wave, progress }: ListenWaveProps) {
  return (
    <div aria-hidden="true" className={`relative h-45 border bg-card ${ink[tone]}`}>
      <svg viewBox={viewBox} preserveAspectRatio="none" className="block size-full">
        {wave ? (
          <path d={wave} className="fill-current" />
        ) : (
          <path
            d={tone === "noisy" ? stand.noisy : stand.clean}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-current [stroke-width:var(--wave-clean-width)]"
          />
        )}
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
