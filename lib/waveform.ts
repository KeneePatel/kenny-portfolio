import { mulberry32 } from "./field"

/* A speech-like waveform as an SVG path: bursts of a two-tone signal, with
 * optional seeded noise on top. Same seed, noise 0 → the clean version of
 * the same signal. Pure, so it renders on the server. */

const WAVE = {
  /** Bursts across the width, and where the first one starts. */
  bursts: 4.2,
  burstPhase: 0.4,
  /** Floor of the envelope between bursts. */
  quiet: 0.1,
  /** Two tones (radians across the width) and their mix. */
  tones: [150, 330] as const,
  mix: [0.62, 0.38] as const,
  tonePhase: 1.3,
  gain: 0.8,
  /** Noise amplitude at noise = 1. */
  noiseGain: 1.4,
  /** Keep the stroke off the top and bottom edges. */
  inset: 4,
} as const

export type WaveOptions = {
  width: number
  height: number
  /** Number of segments. */
  points: number
  /** 0 = clean signal, 1 = fully noisy. */
  noise: number
  seed: number
}

export function wavePath({ width, height, points, noise, seed }: WaveOptions): string {
  const random = mulberry32(seed)
  const middle = height / 2
  const reach = middle - WAVE.inset
  const segments: string[] = []

  for (let i = 0; i <= points; i++) {
    const u = i / points
    const burst = Math.max(0, Math.sin(u * Math.PI * WAVE.bursts + WAVE.burstPhase)) ** 2
    const envelope = WAVE.quiet + (1 - WAVE.quiet) * burst
    const tone =
      WAVE.mix[0] * Math.sin(u * WAVE.tones[0]) +
      WAVE.mix[1] * Math.sin(u * WAVE.tones[1] + WAVE.tonePhase)
    // Always draw the random number, so noisy and clean share one sequence.
    const jitter = (random() - 0.5) * WAVE.noiseGain * noise
    const value = Math.max(-1, Math.min(1, envelope * tone * WAVE.gain + jitter))
    segments.push(`${i ? "L" : "M"}${(u * width).toFixed(1)} ${(middle - reach * value).toFixed(1)}`)
  }
  return segments.join(" ")
}
