import type { CaseCopy, CaseStudy, ChartRow } from "./types"

/*
 * Case studies, one per featured project that has one. Structure is from the
 * canvas board "Case study · Speech Denoising". Numbers come from
 * resources/Resume.pdf (MyTech Lab, May–Aug 2025): +0.36 PESQ over the
 * classical baselines, 824 held-out test pairs, 12,396 audio files, a
 * TensorFlow pipeline and a JavaScript scoring harness. Six methods: the
 * resume's "5" is a typo (Kenny, 2026-10-10). Per-method values, clips and
 * images stay [TODO] until Kenny adds them. Never fill these in from elsewhere.
 */

/** The six methods compared; the U-Net is the result discussed. `value: null` until the thesis numbers are added. */
const methods = (): ChartRow[] =>
  [
    { label: "Spectral subtraction", group: "Classical" },
    { label: "Wiener filtering", group: "Classical" },
    { label: "Wavelet thresholding", group: "Classical" },
    { label: "Adaptive wavelet thresholding", group: "Classical" },
    { label: "U-Net (16 kHz)", group: "Deep learning" },
    { label: "GAN", group: "Deep learning" },
  ].map((row) => ({ ...row, value: null, highlight: row.label === "U-Net (16 kHz)" }))

const pendingCaption = "[TODO: per-method values from the thesis.] Dashed bars are placeholders."

export const caseStudies: CaseStudy[] = [
  {
    slug: "speech-denoising",
    kind: "Master’s thesis",
    title: { filled: "Speech", outlined: "Denoising" },
    lede: "Can a neural network clean up a noisy recording better than classic signal processing? I tested both side by side to find out.",
    meta: [
      { term: "Role", detail: "R&D Project Engineer, MyTech Lab" },
      { term: "Timeline", detail: "May – Aug 2025" },
      { term: "Institution", detail: "Dalhousie University" },
      { term: "Dataset", detail: "VoiceBank+DEMAND, 12,396 audio files" },
      { term: "Metrics", detail: "PESQ · STOI · SNR" },
      { term: "Technology", detail: "TensorFlow · JavaScript" },
    ],
    result: {
      label: "Headline result",
      value: "+0.36",
      pending: "[TODO: headline number from the thesis]",
      caption: "PESQ gain over the classical baselines.",
      note: "PESQ estimates how clean speech sounds to a listener. Higher is better.",
    },
    listen: {
      fig: "fig. 1 · Listen",
      groupLabel: "Choose audio",
      samples: [
        { id: "a", label: "A · Noisy input", detail: "A noisy clip from the VoiceBank+DEMAND test set", noisy: true },
        { id: "b", label: "B · U-Net output", detail: "The same clip after the U-Net (16 kHz)", noisy: false },
      ],
      defaultSample: "b",
      transcriptLabel: "Transcript",
      transcript: "[TODO: transcript of the spoken sentence]",
      pending: "[TODO: one VoiceBank+DEMAND test clip and the U-Net’s output for it]",
      caption: "The waveform is only an illustration. A and B are the same sentence, and switching sides keeps your place.",
    },
    story: [
      {
        id: "problem",
        heading: "Problem",
        statement:
          "Old-school signal processing and deep learning both promise cleaner speech. I wanted a fair fight: same recordings, same scoring, side by side.",
        note: "The comparison is the whole point, so every method faced the same 824 test pairs.",
      },
      {
        id: "why",
        heading: "What I wanted to solve",
        statement: "[TODO: in your own words, why this question mattered to you and who it matters to.]",
      },
    ],
    approach: {
      block: {
        id: "approach",
        heading: "How I approached it",
        statement: "I ran all six methods on the same 824 held-out test pairs and scored each one with PESQ, STOI, and SNR.",
      },
      groups: [
        {
          label: "Classical · 4",
          items: ["Spectral subtraction", "Wiener filtering", "Wavelet thresholding", "Adaptive wavelet thresholding"],
        },
        { label: "Deep learning · 2", items: ["U-Net", "GAN"] },
        { label: "Data", items: ["VoiceBank+DEMAND", "12,396 audio files"], tone: "data" },
        { label: "Evaluation · 3", items: ["PESQ", "STOI", "SNR"], tone: "outcome" },
      ],
    },
    spectrograms: {
      fig: "fig. 2 · Spectrograms, before and after",
      axis: { frequency: "Frequency, 0–8 kHz ↑", time: "Time →" },
      images: [
        { label: "A · Noisy", alt: "Spectrogram of the noisy input.", pending: "[TODO: spectrogram, noisy input]" },
        { label: "B · Denoised", alt: "Spectrogram of the U-Net output.", pending: "[TODO: spectrogram, U-Net 16 kHz output]" },
      ],
      caption: "Same clip as fig. 1. Both panels use the same monochrome scale, so any difference you see comes from the noise.",
    },
    decisions: [
      {
        id: "decisions",
        heading: "Technical decisions",
        statement:
          "I built the data pipeline in TensorFlow: it turns each clip into a spectrogram with an STFT and applies frequency masking. To score everything the same way, I wrote a harness in JavaScript that runs every method over the 824 held-out pairs and reports PESQ, STOI, and SNR.",
        note: "[TODO: why 16 kHz, and how the classical baselines were tuned.]",
      },
      {
        id: "challenges",
        heading: "Challenges",
        statement: "[TODO: what was hard (data, training, or evaluation) and what you did about it.]",
      },
    ],
    results: {
      id: "results",
      heading: "Results",
      charts: [
        {
          id: "pesq",
          fig: "fig. 3",
          title: "PESQ gain by method",
          columns: ["Method", "Family", "ΔPESQ"],
          format: { decimals: 2, signed: true },
          rows: methods(),
          caption: `${pendingCaption} Every method shares one axis and one colour, so the U-Net is the only blue bar.`,
        },
        {
          id: "stoi",
          fig: "fig. 4a",
          title: "STOI by method",
          columns: ["Method", "Family", "STOI"],
          format: { decimals: 2 },
          rows: methods(),
          caption: pendingCaption,
        },
        {
          id: "snr",
          fig: "fig. 4b",
          title: "SNR gain by method",
          columns: ["Method", "Family", "ΔSNR"],
          format: { decimals: 1, signed: true, unit: " dB" },
          rows: methods(),
          caption: pendingCaption,
        },
      ],
      listening: {
        id: "listening",
        heading: "fig. 4c · Listening test",
        statement: "[TODO: was there a listening test? If so, how it ran and what listeners preferred.]",
      },
    },
    learned: {
      block: {
        id: "learned",
        heading: "What I learned",
        statement:
          "[TODO: two or three honest lessons about the methods, about evaluation, and about yourself as an engineer.]",
      },
      linksLabel: "Links",
      links: [
        { label: "Thesis PDF", pending: "[TODO: thesis PDF]", external: true },
        { label: "Code", pending: "[TODO: code]", external: true },
        { label: "Audio samples", pending: "[TODO: audio samples]", external: true },
      ],
    },
  },
]

export const caseCopy: CaseCopy = {
  eyebrow: "Case study · {number} / {total} · {kind}",
  allWork: { label: "All work", href: "/#work" },
  next: "Next · {number}",
  backTo: { label: "Back to the homepage", filled: "All", outlined: "work" },
  play: "Play {label}",
  pause: "Pause {label}",
  position: "{current} / {total}",
  chartView: "View as table",
  pendingValue: "[TODO]",
  metaTitle: "{title} · Kenny Patel",
}
