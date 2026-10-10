import type { StackCopy, StackLayer } from "./types"

/*
 * The toolkit, from Kenny's own sources only: the resume (skills, MyTech Lab,
 * the Kintu Designs internship, Starknet), the featured projects and the
 * archive. "Seen in" names only things shown on this site. The canvas also
 * listed tools from team projects (Angular, Tailwind, Spring Boot, ASP.NET,
 * MySQL, MongoDB, DynamoDB, Elasticsearch, ChromaDB, AWS, Azure, C++, Kotlin,
 * scikit-learn, LangChain): [TODO: Kenny to confirm which belong here].
 */
export const stack: StackLayer[] = [
  {
    id: "interface",
    code: "L5",
    name: "Interface",
    tools: ["React", "Vue", "Next.js", "Bootstrap", "Flutter", "React Native"],
    seenIn: ["Starknet, open source", "Trekking Booking Platform", "Kintu Designs (internship)", "Cross-Platform Mobile Apps"],
  },
  {
    id: "services",
    code: "L4",
    name: "Services",
    tools: ["Node.js", "Express", "Flask", "FastAPI", "REST APIs"],
    seenIn: ["Microservices on GKE", "Kintu Designs (internship)", "Flight Price Prediction"],
  },
  {
    id: "data",
    code: "L3",
    name: "Data",
    tools: ["PostgreSQL", "MongoDB", "Redis", "SQL", "Firebase"],
    seenIn: ["Kintu Designs (internship)", "Trekking Booking Platform", "Flight Price Prediction"],
  },
  {
    id: "infrastructure",
    code: "L2",
    // Soft hyphen: on narrow phones the word breaks as "Infra- / structure".
    name: "Infra­structure",
    tools: ["GCP", "GKE", "Kubernetes", "Terraform", "Docker", "Cloud Build", "Artifact Registry", "Prometheus", "Grafana"],
    seenIn: ["Microservices on GKE", "Kintu Designs (internship)"],
  },
  {
    id: "languages",
    code: "L1",
    name: "Languages",
    tools: ["Python", "TypeScript", "JavaScript", "C++", "Java", "Rust", "SQL", "Bash"],
    seenIn: ["Across everything above"],
  },
  {
    id: "signal-ml",
    code: "L0",
    name: "Signal & ML",
    tools: ["TensorFlow", "U-Net", "GAN", "STFT", "Wiener filtering", "Wavelets", "PESQ", "STOI", "OpenCV"],
    seenIn: ["Speech Denoising", "Real-Time Motion Tracking"],
  },
]

export const stackCopy: StackCopy = {
  label: "Toolkit · open a layer",
  title: "What I reach for.",
  toolsCount: "{count} tools",
  seenIn: "Seen in",
  defaultOpen: "infrastructure",
}
