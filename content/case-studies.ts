import type { CaseCopy, CaseStudy, ChartRow } from "./types"

/*
 * Case studies, one per featured project that has one. Structure is from the
 * canvas board "Case study · Speech Denoising".
 *
 * Sources: Kenny's MACS project report "Comparison of Deep Learning and
 * Traditional Methods for Speech Denoising" (Dalhousie, August 2025; in the
 * AudioQuality-Denoising-Evaluator repo), that repo's code, and the
 * AudioQuality-Dataset repo. Chart values are the report's Table 5.1 (mean
 * change over the noisy input, 824 test pairs). Kenny's decisions (Oct 2026):
 * five methods (no GAN; the CMGAN prototype never produced results), call it a
 * master's research project, keep the U-Net's training-set size general, and
 * explain the SNR result. The "1.7 times louder" and "4.6 and 6.5 dB" figures
 * come from checking the repo: tf.signal.stft and inverse_stft with default
 * windows (frame 510, step 110) scale the rebuilt audio by about 1.74, and the
 * saved best and worst validation clips (all rebuilt the same way) gain 6.46
 * and 4.64 dB of SNR.
 *
 * Assets in public/case-studies/speech-denoising/ come from test clip p232_068
 * (bus noise at 2.5 dB; speaker p232 is held out of training). Kenny asked
 * for a different sentence (Oct 2026), so it replaced the saved validation
 * clip. It ran through the U-Net's saved weights (unet-se/model.weights.h5)
 * the way SE_main.ipynb's evaluation cell does: 16 kHz, zero-padded to 56,720
 * samples, all three versions rebuilt with inverse_stft so they share one
 * gain. In that re-run its wide-band PESQ went from 1.89 to 2.68 (+0.79),
 * better than 754 of the 824 test clips; the re-run's mean gain was +0.33
 * (the report's +0.36 comes from the evaluator's pipeline). The same 0.97 s
 * of zero padding is trimmed from all three versions, kept as 16-bit PCM WAV,
 * and the spectrograms (Hann 512, hop 128, one shared 85 dB scale) are WebP
 * alpha masks. The transcript is the dataset's own (testset_txt/p232_068.txt).
 * Audio: VoiceBank+DEMAND, Valentini-Botinhao 2017, CC BY 4.0.
 */

const AUDIO = "/case-studies/speech-denoising"

/** The five methods compared, with one metric's values; the U-Net is the result discussed. */
const methods = (values: [number, number, number, number, number]): ChartRow[] =>
  [
    { label: "Spectral subtraction", group: "Classical" },
    { label: "Wiener filtering", group: "Classical" },
    { label: "Wavelet thresholding", group: "Classical" },
    { label: "Adaptive wavelet thresholding", group: "Classical" },
    { label: "U-Net (16 kHz)", group: "Deep learning" },
  ].map((row, i) => ({ ...row, value: values[i], highlight: row.label === "U-Net (16 kHz)" }))

export const caseStudies: CaseStudy[] = [
  {
    slug: "speech-denoising",
    kind: "Master’s research project",
    title: { filled: "Speech", outlined: "Denoising" },
    lede: "Can a neural network clean up a noisy recording better than classic signal processing? I tested both side by side to find out.",
    meta: [
      { term: "Role", detail: "R&D Project Engineer, MyTech Lab" },
      { term: "Timeline", detail: "May – Aug 2025" },
      { term: "Supervisor", detail: "Dr. Srini Sampalli, Dalhousie University" },
      { term: "Dataset", detail: "VoiceBank+DEMAND, 16 kHz" },
      { term: "Metrics", detail: "PESQ · STOI · SNR" },
      { term: "Technology", detail: "Python · TensorFlow · librosa · PyWavelets" },
    ],
    result: {
      label: "Headline result",
      value: "+0.36",
      pending: "[TODO: headline number]",
      caption: "Average PESQ gain over the noisy recordings, from the U-Net.",
      note: "PESQ estimates how good speech sounds to a person. Higher is better, and this was the biggest gain of the five methods.",
    },
    listen: {
      fig: "fig. 1 · Listen",
      groupLabel: "Choose a version",
      samples: [
        { id: "a", label: "A · Noisy", detail: "The noisy recording", tone: "noisy", src: `${AUDIO}/noisy.wav` },
        { id: "b", label: "B · U-Net", detail: "After the U-Net (16 kHz)", tone: "denoised", src: `${AUDIO}/unet.wav` },
        { id: "c", label: "C · Clean", detail: "The clean original, for reference", tone: "clean", src: `${AUDIO}/clean.wav` },
      ],
      defaultSample: "b",
      transcriptLabel: "Transcript",
      transcript: "It is like a river running by my home.",
      pending: "[TODO: one VoiceBank+DEMAND clip and the U-Net’s output for it]",
      caption:
        "A sentence from the test set, over bus noise at 2.5 dB, the noisiest of its four levels. The speaker is one of the two voices the U-Net never heard in training. The U-Net did better than average on this clip, so treat it as one of the good ones. Switching versions keeps your place. Audio from VoiceBank+DEMAND (Valentini-Botinhao, 2017), CC BY 4.0.",
    },
    story: [
      {
        id: "problem",
        heading: "Problem",
        statement:
          "Old-school signal processing and deep learning both promise cleaner speech. I wanted a fair test: the same recordings and the same scoring for every method.",
        note: "Every method faced the same 824 test pairs, from two speakers the U-Net never heard in training.",
      },
      {
        id: "why",
        heading: "What I wanted to solve",
        statement:
          "Noise makes calls, hearing aids, and voice assistants harder to use. Many models train on 8 kHz audio or on artificial noise, so I wanted to see how a U-Net trained at 16 kHz on recordings of real noise, from cafés, streets, and buses, compares with the classic filters.",
        note: "16 kHz audio keeps sound up to 8 kHz, twice the range of the 8 kHz audio many older studies used.",
      },
    ],
    approach: {
      block: {
        id: "approach",
        heading: "How I approached it",
        statement: "I ran five methods on the same 824 test pairs and scored every result with PESQ, STOI, and SNR.",
      },
      groups: [
        {
          label: "Classical · 4",
          items: ["Spectral subtraction", "Wiener filtering", "Wavelet thresholding", "Adaptive wavelet thresholding"],
        },
        { label: "Deep learning · 1", items: ["U-Net (16 kHz)"] },
        { label: "Data", items: ["VoiceBank+DEMAND", "11,572 training pairs", "824 test pairs"], tone: "data" },
        {
          label: "Evaluation · 3",
          items: ["PESQ (sound quality)", "STOI (intelligibility)", "SNR (noise level)"],
          tone: "outcome",
        },
      ],
    },
    spectrograms: {
      fig: "fig. 2 · Spectrograms, before and after",
      axis: { frequency: "Frequency, 0–8 kHz ↑", time: "Time →" },
      images: [
        {
          label: "A · Noisy",
          alt: "Spectrogram of the noisy clip. Noise covers every frequency from start to finish, and the stacked stripes of the voice show through it faintly.",
          src: `${AUDIO}/spectrogram-noisy.webp`,
          pending: "[TODO: spectrogram, noisy input]",
        },
        {
          label: "B · U-Net",
          alt: "Spectrogram of the U-Net output. The pause before the sentence is clear, and the stripes of the voice stand out on a much darker background, with some noise left around them.",
          src: `${AUDIO}/spectrogram-unet.webp`,
          pending: "[TODO: spectrogram, U-Net output]",
        },
      ],
      caption:
        "Same clip as fig. 1, drawn on one shared scale. The U-Net clears the pause before the sentence and most of the noise around the words, and the stripes of the voice stay in place.",
    },
    decisions: [
      {
        id: "decisions",
        heading: "Technical decisions",
        statement:
          "The U-Net works on spectrograms. It predicts a mask for each noisy spectrogram, and I rebuild the audio with the noisy clip’s original phase. Training used L1 loss plus a term that protects speech energy, with time and frequency masking to help the model handle noise it hadn’t heard.",
        note: "A four-level U-Net with skip connections, trained with Adam in batches of 16 for up to 30 epochs, stopping after 4 epochs without improvement. Each clip is padded or cut to about 3.5 seconds to fit its fixed input size.",
      },
      {
        id: "challenges",
        heading: "Challenges",
        statement:
          "A fair comparison meant every method had to read the same files and write audio the evaluator could line up with the clean reference. PESQ rejects clips that are too short or silent, so the evaluator checks every file and skips the bad ones.",
        note: "The evaluator is one Python tool. It scores each output with the pesq and pystoi packages and saves the results as CSV files and charts.",
      },
    ],
    results: {
      id: "results",
      heading: "Results",
      charts: [
        {
          id: "pesq",
          fig: "fig. 3",
          title: "PESQ change by method",
          columns: ["Method", "Family", "ΔPESQ"],
          format: { decimals: 2, signed: true },
          rows: methods([-0.418, -0.2235, 0.0512, -0.0269, 0.3571]),
          caption:
            "Average change over the noisy recordings across the 824 test pairs. Above zero sounds better, below zero sounds worse. The U-Net is the only blue bar.",
        },
        {
          id: "stoi",
          fig: "fig. 4a",
          title: "STOI change by method",
          columns: ["Method", "Family", "ΔSTOI"],
          format: { decimals: 3, signed: true },
          rows: methods([-0.0642, -0.0471, -0.0104, -0.0013, 0.0037]),
          caption:
            "Intelligibility barely moved for any method, probably because the test clips start out easy to understand.",
        },
        {
          id: "snr",
          fig: "fig. 4b",
          title: "SNR change by method",
          columns: ["Method", "Family", "ΔSNR"],
          format: { decimals: 2, signed: true, unit: " dB" },
          rows: methods([-0.6539, -1.0666, 0.1297, 0.2459, -6.1707]),
          caption: "Wavelet thresholding raised SNR slightly. The next row explains the U-Net’s large drop.",
        },
      ],
      followUp: {
        id: "looking-back",
        heading: "Looking back at SNR",
        statement:
          "The U-Net’s SNR drop comes mostly from how I measured it. Rebuilding its audio from the spectrogram made it about 1.7 times louder than the clean reference, and SNR counts any difference in loudness as noise. On the two validation clips I saved, where every version went through the same rebuild, the U-Net improved SNR by 4.6 and 6.5 dB.",
        note: "SI-SDR, a version of SNR that ignores loudness, would avoid this.",
      },
    },
    learned: {
      block: {
        id: "learned",
        heading: "What I learned",
        statement:
          "Metrics can disagree. PESQ ranked the U-Net first and SNR ranked it last, and the gap traced back to my own pipeline. On these recordings, spectral subtraction and Wiener filtering made speech sound worse, while wavelet thresholding stayed close to neutral and costs very little to run.",
        note: "Next, I’d test the U-Net on noise it never heard in training, estimate phase instead of reusing the noisy one, and run a small listening test.",
      },
      linksLabel: "Links",
      links: [
        {
          label: "Research report (PDF)",
          href: "https://github.com/KeneePatel/AudioQuality-Denoising-Evaluator/blob/main/evaluator/Kenee_Project_Report_MACS.pdf",
          external: true,
        },
        {
          label: "Denoising and evaluation code",
          href: "https://github.com/KeneePatel/AudioQuality-Denoising-Evaluator",
          external: true,
        },
        {
          label: "Dataset preparation code",
          href: "https://github.com/KeneePatel/AudioQuality-Dataset",
          external: true,
        },
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
