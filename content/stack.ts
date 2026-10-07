import type { StackCopy, StackLayer } from "./types"

/*
 * The toolkit, from Kenny's own sources only: the resume (skills, projects,
 * the Kintu Designs internship), the featured projects and the archive.
 * "Seen in" names only things shown on this site. The canvas also listed
 * tools from team projects (React, Next.js, Angular, Tailwind, Spring Boot,
 * ASP.NET, PostgreSQL, MySQL, MongoDB, DynamoDB, Elasticsearch, ChromaDB,
 * AWS, Azure, C++, Kotlin, scikit-learn, LangChain): [TODO: Kenny to confirm
 * which belong here].
 */
export const stack: StackLayer[] = [
  {
    id: "interface",
    code: "L5",
    name: "Interface",
    tools: ["Flutter", "React Native"],
    seenIn: ["Cross-Platform Mobile Apps"],
  },
  {
    id: "services",
    code: "L4",
    name: "Services",
    tools: ["Node.js", "Express", "Flask", "REST APIs"],
    seenIn: ["Microservices on GKE", "Flight Price Prediction"],
  },
  {
    id: "data",
    code: "L3",
    name: "Data",
    tools: ["Redis", "SQL", "Firebase"],
    seenIn: ["Flight Price Prediction", "Cross-Platform Mobile Apps"],
  },
  {
    id: "infrastructure",
    code: "L2",
    // Soft hyphen: on narrow phones the word breaks as "Infra- / structure".
    name: "Infra­structure",
    tools: ["GCP", "GKE", "Kubernetes", "Terraform", "Docker", "Cloud Build", "Prometheus", "Grafana"],
    seenIn: ["Microservices on GKE", "Kintu Designs (internship)"],
  },
  {
    id: "languages",
    code: "L1",
    name: "Languages",
    tools: ["Python", "TypeScript", "JavaScript", "Java", "Rust", "SQL", "Bash"],
    seenIn: ["Across everything above"],
  },
  {
    id: "signal-ml",
    code: "L0",
    name: "Signal & ML",
    tools: ["U-Net", "GAN", "Wiener filtering", "Wavelets", "PESQ", "STOI", "OpenCV"],
    seenIn: ["Speech Denoising", "Real-Time Motion Tracking"],
  },
]

export const stackCopy: StackCopy = {
  label: "Toolkit · open a layer",
  title: "The stack.",
  toolsCount: "{count} tools",
  seenIn: "Seen in",
  defaultOpen: "infrastructure",
}
