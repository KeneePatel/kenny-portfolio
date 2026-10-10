import type { Project, WorkCopy } from "./types"

/*
 * Featured projects for the Work track. Facts from resources/Resume.pdf and
 * resources/projects.txt. Other projects, team projects included, live in
 * the archive. "This website" is the portfolio itself (Kenny, 2026-10-10).
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
  {
    slug: "this-website",
    title: "This website",
    kind: "Front end · Design",
    line: "The site you’re on. The dots up top nod to my thesis: move your cursor and the noise settles into a clean wave.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas 2D"],
    diagram: {
      kind: "flow",
      rows: [
        [
          { label: "noisy dots", tone: "dashed" },
          { arrow: "→" },
          { label: "cursor lens" },
          { arrow: "→" },
          { label: "clean wave", tone: "accent" },
        ],
      ],
      note: "Canvas 2D · redraws only while the pointer moves · pauses off-screen",
      alt: "Noisy dots pass through the cursor’s lens and come out as a clean wave. The canvas redraws only while the pointer moves and pauses when it’s off-screen.",
    },
    link: { label: "You’re looking at it ↑", href: "#top" },
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
