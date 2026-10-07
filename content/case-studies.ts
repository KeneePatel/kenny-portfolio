import type { CaseCopy, CaseStudy, ChartRow } from "./types"

/*
 * Case studies, one per featured project that has one. Structure and copy are
 * from the canvas board "Case study — Speech Denoising". Kenny chose not to
 * show the canvas's PESQ figure, so every number, clip and image is a [TODO]
 * until he confirms it from the thesis. Never fill these in from elsewhere.
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

const pendingCaption = "[TODO: values from the thesis.] Dashed bars are placeholders, not data."

export const caseStudies: CaseStudy[] = [
  {
    slug: "speech-denoising",
    kind: "Master’s thesis",
    title: { filled: "Speech", outlined: "Denoising" },
    lede: "Benchmarking classical and deep-learning approaches for speech enhancement.",
    meta: [
      { term: "Role", detail: "Author — Master’s thesis" },
      { term: "Timeline", detail: "[TODO: start] – Aug 2025" },
      { term: "Institution", detail: "Dalhousie University" },
      { term: "Dataset", detail: "VoiceBank+DEMAND" },
      { term: "Metrics", detail: "PESQ · STOI · ΔSNR · Listening" },
      { term: "Technology", detail: "[TODO: languages, frameworks]" },
    ],
    result: {
      label: "Headline result",
      pending: "[TODO: headline number from the thesis]",
      caption: "Mean PESQ improvement — 16 kHz U-Net model.",
      note: "PESQ estimates perceived speech quality; higher is better.",
    },
    listen: {
      fig: "fig. 1 — Listen",
      groupLabel: "Choose audio",
      samples: [
        { id: "a", label: "A · Noisy input", detail: "Noisy input — VoiceBank+DEMAND test clip", noisy: true },
        { id: "b", label: "B · U-Net output", detail: "U-Net (16 kHz) output", noisy: false },
      ],
      defaultSample: "b",
      transcriptLabel: "Transcript",
      transcript: "[TODO: transcript of the spoken sentence]",
      pending: "[TODO: one VoiceBank+DEMAND test clip and the U-Net’s output for it]",
      caption: "Illustrative waveform. A and B are the same sentence; switching keeps your place.",
    },
    story: [
      {
        id: "problem",
        heading: "Problem",
        statement:
          "How do classical signal-processing methods compare with deep-learning models at removing noise from speech — when both are measured on the same data, with the same metrics?",
        note: "Benchmark, not a single-model paper: the comparison is the contribution.",
      },
      {
        id: "why",
        heading: "What I wanted to solve",
        statement: "[TODO: in your words, why this question mattered to you, and who it matters to.]",
      },
    ],
    approach: {
      block: {
        id: "approach",
        heading: "How I approached it",
        statement: "Six methods, one dataset, four kinds of evaluation.",
      },
      groups: [
        {
          label: "Classical · 4",
          items: ["Spectral subtraction", "Wiener filtering", "Wavelet thresholding", "Adaptive wavelet thresholding"],
        },
        { label: "Deep learning · 2", items: ["U-Net", "GAN"] },
        { label: "Data", items: ["VoiceBank+DEMAND"], tone: "data" },
        { label: "Evaluation · 4", items: ["PESQ", "STOI", "SNR improvement", "Subjective listening"], tone: "outcome" },
      ],
    },
    spectrograms: {
      fig: "fig. 2 — Spectrograms, before and after",
      axis: { frequency: "Frequency, 0–8 kHz ↑", time: "Time →" },
      images: [
        { label: "A · Noisy", alt: "Spectrogram of the noisy input.", pending: "[TODO: spectrogram, noisy input]" },
        { label: "B · Denoised", alt: "Spectrogram of the U-Net output.", pending: "[TODO: spectrogram, U-Net 16 kHz output]" },
      ],
      caption:
        "Same clip as fig. 1. One monochrome ramp for both panels, so the difference is in the noise, not the palette.",
    },
    decisions: [
      {
        id: "decisions",
        heading: "Technical decisions",
        statement:
          "[TODO: why 16 kHz; how the U-Net and GAN were set up and trained; how the classical baselines were tuned so the comparison was fair.]",
        note: "Keep each decision to one line and one reason.",
      },
      {
        id: "challenges",
        heading: "Challenges",
        statement: "[TODO: what was hard — data, training, evaluation — and what you did about it.]",
      },
    ],
    results: {
      id: "results",
      heading: "Results",
      charts: [
        {
          id: "pesq",
          fig: "fig. 3",
          title: "Mean PESQ improvement, by method",
          columns: ["Method", "Family", "ΔPESQ"],
          format: { decimals: 2, signed: true },
          rows: methods(),
          caption: `${pendingCaption} One axis and one ink for every method; the result being discussed is the only amber bar.`,
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
          title: "SNR improvement by method",
          columns: ["Method", "Family", "ΔSNR"],
          format: { decimals: 1, signed: true, unit: " dB" },
          rows: methods(),
          caption: pendingCaption,
        },
      ],
      listening: {
        id: "listening",
        heading: "fig. 4c — Subjective listening",
        statement: "[TODO: how the listening test was run, and what listeners preferred.]",
      },
    },
    learned: {
      block: {
        id: "learned",
        heading: "What I learned",
        statement:
          "[TODO: two or three honest lessons — about the methods, about evaluation, about yourself as an engineer.]",
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
  metaTitle: "{title} — Kenny Patel",
}
