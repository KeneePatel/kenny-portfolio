/* Reading 16-bit PCM WAV files and drawing their waveform as an SVG path.
 * Pure (bytes in, data out), so a route page can run it at build time and
 * hand the paths to the audio player. */

/** Samples of a mono 16-bit PCM WAV file, scaled to -1…1. */
export function readPcm16(bytes: Uint8Array): Float32Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const text = (at: number) => String.fromCharCode(...bytes.subarray(at, at + 4))
  if (text(0) !== "RIFF" || text(8) !== "WAVE") throw new Error("Not a WAV file")

  let at = 12
  let bits = 0
  while (at + 8 <= bytes.length) {
    const id = text(at)
    const size = view.getUint32(at + 4, true)
    if (id === "fmt ") bits = view.getUint16(at + 22, true)
    if (id === "data") {
      if (bits !== 16) throw new Error(`Expected 16-bit PCM, got ${bits}-bit`)
      const count = Math.floor(size / 2)
      const samples = new Float32Array(count)
      for (let i = 0; i < count; i++) samples[i] = view.getInt16(at + 8 + i * 2, true) / 32768
      return samples
    }
    at += 8 + size + (size % 2)
  }
  throw new Error("WAV file has no data chunk")
}

/** Largest absolute sample value, for drawing several clips on one scale. */
export function peakOf(samples: Float32Array): number {
  let peak = 0
  for (const s of samples) peak = Math.max(peak, Math.abs(s))
  return peak
}

type EnvelopeOptions = {
  width: number
  height: number
  /** Number of columns across the width. */
  points: number
  /** Shared full-scale value; a clip at this level touches the top and bottom. */
  peak: number
  /** Keep the shape this far from the top and bottom edges. */
  inset: number
}

/** Min/max envelope as one closed path: the top edge left to right, then the bottom edge back. */
export function envelopePath(samples: Float32Array, { width, height, points, peak, inset }: EnvelopeOptions): string {
  const middle = height / 2
  const reach = middle - inset
  const per = samples.length / points
  const top: string[] = []
  const bottom: string[] = []

  for (let i = 0; i < points; i++) {
    let low = 0
    let high = 0
    for (let j = Math.floor(i * per); j < Math.floor((i + 1) * per); j++) {
      low = Math.min(low, samples[j])
      high = Math.max(high, samples[j])
    }
    const x = (((i + 0.5) / points) * width).toFixed(1)
    // Silence still draws a hairline.
    const up = Math.max((high / peak) * reach, 0.5)
    const down = Math.max((-low / peak) * reach, 0.5)
    top.push(`${x} ${(middle - up).toFixed(1)}`)
    bottom.unshift(`${x} ${(middle + down).toFixed(1)}`)
  }
  return `M${top.join(" L")} L${bottom.join(" L")} Z`
}
