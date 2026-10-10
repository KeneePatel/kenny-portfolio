import type { StackCopy, StackLayer } from "./types"

/*
 * The toolkit, from Kenny's own sources only: the resume (skills, MyTech Lab,
 * the Kintu Designs internship, Starknet), the featured projects and the
 * archive (including the Serverless File Storage, FlexiGym and RoomM8 repos).
 * "Seen in" names only things shown on this site. The canvas also listed
 * tools from other team projects (Angular, ASP.NET, Elasticsearch, ChromaDB,
 * Azure, C++, Kotlin, scikit-learn, LangChain): [TODO: Kenny to confirm].
 */
export const stack: StackLayer[] = [
  {
    id: "interface",
    code: "L5",
    name: "Interface",
    tools: ["React", "Next.js", "Vue", "Tailwind CSS", "shadcn/ui", "Flutter", "React Native"],
    seenIn: ["FlexiGym", "RoomM8", "Starknet, open source", "Kintu Designs (internship)"],
  },
  {
    id: "services",
    code: "L4",
    name: "Services",
    tools: ["Node.js", "Express", "Spring Boot", "Flask", "FastAPI", "REST APIs", "Stripe"],
    seenIn: ["Microservices on GKE", "FlexiGym", "RoomM8", "Kintu Designs (internship)"],
  },
  {
    id: "data",
    code: "L3",
    name: "Data",
    tools: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Redis", "Firebase"],
    seenIn: ["RoomM8", "FlexiGym", "Serverless File Storage", "Kintu Designs (internship)"],
  },
  {
    id: "infrastructure",
    code: "L2",
    // Soft hyphen: on narrow phones the word breaks as "Infra- / structure".
    name: "Infra­structure",
    tools: ["Terraform", "AWS Lambda", "Step Functions", "GCP", "GKE", "Kubernetes", "Docker", "Cloud Build", "Prometheus", "Grafana"],
    seenIn: ["Serverless File Storage", "Microservices on GKE", "Kintu Designs (internship)"],
  },
  {
    id: "languages",
    code: "L1",
    name: "Languages",
    tools: ["TypeScript", "JavaScript", "Python", "Java", "Rust", "SQL", "Bash"],
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
