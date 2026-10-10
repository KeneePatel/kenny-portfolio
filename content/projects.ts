import type { Project, WorkCopy } from "./types"

/*
 * Featured projects for the Work track. Facts from resources/Resume.pdf and
 * resources/projects.txt. Kenny left out RoomM8, post-quantum for Node and
 * team projects (collaborator repos).
 */
export const featured: Project[] = [
  {
    slug: "speech-denoising",
    title: "Speech Denoising",
    kind: "Master’s thesis · Research",
    line: "I spent a summer teaching models to hear past the noise, then measured which approach did best.",
    stack: ["TensorFlow", "U-Net", "GAN", "PESQ", "STOI", "SNR"],
    diagram: {
      kind: "signal",
      caption: "↓ U-Net · 16 kHz",
      alt: "A noisy speech waveform above the same speech after a U-Net removes the noise.",
    },
    link: { label: "Case study →", href: "/work/speech-denoising" },
  },
  {
    slug: "microservices-on-gke",
    title: "Microservices on GKE",
    kind: "Cloud · DevOps",
    line: "Two small Node.js services on Kubernetes, with Terraform and Cloud Build handling the setup and the deploys.",
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
    line: "I helped move a Cairo VM from JavaScript to TypeScript and built features for two Starknet apps.",
    stack: ["TypeScript", "React", "Cairo VM", "REST"],
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
  title: ["Stuff I’ve", "made lately."],
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
