import type { Project, WorkCopy } from "./types"

/*
 * Featured projects for the Work track. Copy is from the art-direction canvas;
 * facts are checked against resources/projects.txt and the resume. Kenny left
 * out RoomM8, post-quantum for Node and team projects (collaborator repos).
 */
export const featured: Project[] = [
  {
    slug: "speech-denoising",
    title: "Speech Denoising",
    kind: "Master’s thesis · Research",
    line: "Benchmarking classical and deep-learning approaches to speech enhancement on VoiceBank+DEMAND.",
    stack: ["PESQ", "STOI", "U-Net", "GAN", "Wiener", "Wavelets"],
    diagram: {
      kind: "signal",
      caption: "↓ U-Net · 16 kHz",
      alt: "A noisy speech waveform above the same speech after a U-Net removes the noise.",
    },
    pendingLink: "[TODO: case study link, arrives in M11]",
  },
  {
    slug: "microservices-on-gke",
    title: "Microservices on GKE",
    kind: "Cloud · DevOps",
    line: "Two Node.js services on a regional GKE cluster, provisioned with Terraform and shipped by Cloud Build.",
    stack: ["Terraform", "Kubernetes", "GKE", "Docker", "Node.js"],
    diagram: {
      kind: "flow",
      rows: [
        [
          { label: "LoadBalancer", tone: "dashed" },
          { arrow: "→" },
          { label: "file-service" },
          { arrow: "→" },
          { label: "calc-service" },
          { arrow: "↘" },
          { label: "PV · 1 GiB", tone: "accent" },
        ],
      ],
      note: "Terraform → GKE · Cloud Build → Artifact Registry → kubectl rollout",
      alt: "A load balancer in front of a file service, which feeds a calculation service; both share a 1 GiB persistent volume. Terraform provisions GKE; Cloud Build pushes images to Artifact Registry and rolls them out with kubectl.",
    },
    link: {
      label: "Repository",
      href: "https://github.com/KeneePatel/k8s-assignment",
      external: true,
    },
  },
  {
    slug: "starknet-open-source",
    title: "Starknet, open source",
    kind: "Open source",
    // [TODO: confirm] Canvas copy and diff. The resume confirms fixes and a security
    // patch across Starknet repos; it doesn't mention the TypeScript migration.
    line: "Fixes, tests and a JavaScript-to-TypeScript migration in other people’s code bases.",
    stack: ["TypeScript", "Testing", "Cairo VM"],
    diagram: {
      kind: "diff",
      header: "@@ migration @@",
      lines: [
        { sign: "-", text: "module.js" },
        { sign: "+", text: "module.ts" },
        { sign: "-", text: "function run(input)" },
        { sign: "+", text: "function run(input: Program): Result" },
      ],
      alt: "A code diff: module.js becomes module.ts, and an untyped function gains TypeScript types.",
    },
    link: { label: "Contribution log ↓", href: "#open-source" },
  },
]

export const work: WorkCopy = {
  label: "Selected work · {total}",
  title: ["Things I built", "to understand."],
  trackLabel: "Featured projects",
  trackRole: "carousel",
  slideRole: "slide",
  slideLabel: "{current} of {total}",
  tabsLabel: "Choose project",
  tabLabel: "{number}: {title}",
  previous: "Previous project",
  next: "Next project",
  announcement: "Project {current} of {total}: {title}",
}
