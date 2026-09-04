/**
 * Single source of truth for all portfolio content.
 * Copy is written in first person, present tense — builder voice.
 */

export const profile = {
  name: "Adesh Yearanty",
  shortName: "Adesh Yearanty",
  role: "Full-Stack Engineer (Distributed Systems & AWS)",
  company: "Miraki Technologies",
  product: "SalesAstra",
  productUrl: "https://salesastra.ai",
  location: "Hyderabad, India",
  tagline:
    "Associate Full Stack Engineer with 1.5+ years of experience building production-grade multi-tenant SaaS platforms using NestJS, Next.js, and AWS. Experienced in designing event-driven microservices, real-time messaging systems, fine-grained RBAC, AI-assisted workflows, infrastructure automation, and cloud-native architectures. Passionate about building scalable backend systems that remain reliable under high throughput.",
  email: "adesh.yearanty@gmail.com",
  phone: "+91 97000 15263",
} as const;

export const socials = [
  { label: "GitHub", value: "github.com/adeshyearanty", href: "https://github.com/adeshyearanty" },
  {
    label: "LinkedIn",
    value: "in/adeshyearanty",
    href: "https://linkedin.com/in/adeshyearanty-271718212",
  },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
] as const;

export const navLinks = [
  { href: "/", label: "Index" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/technology", label: "Technology" },
  { href: "/blog", label: "Writing" },
] as const;

/** Hero signal chips. */
export const signals = [
  { label: "Full-stack", detail: "NestJS, Next.js, and everything between" },
  { label: "Event-driven", detail: "Kinesis, SQS, Lambda, WebSockets" },
  { label: "Multi-tenant", detail: "Isolation, RBAC, branding at scale" },
  { label: "Cloud-native", detail: "AWS, Terraform, CI/CD" },
] as const;

/** Home: what I do. */
export const capabilities = [
  {
    title: "Systems & architecture",
    body: "Designing service boundaries, event flows, and data models that stay legible as products and teams grow.",
    stack: "Event-driven · Microservices · Multi-tenant",
  },
  {
    title: "Cloud & infrastructure",
    body: "Repeatable, observable infrastructure — Lambda functions, ECS clusters, API Gateways, and IaC that deploys with one command.",
    stack: "AWS · Terraform · GitHub Actions",
  },
  {
    title: "Backend engineering",
    body: "High-throughput NestJS services with careful attention to ordering guarantees, caching strategy, and failure modes.",
    stack: "NestJS · Node.js · MongoDB · Redis",
  },
  {
    title: "Product interfaces",
    body: "Real-time frontends that feel fast — messaging UIs, RBAC admin screens, and branding configuration built in Next.js.",
    stack: "Next.js · React · TypeScript",
  },
] as const;

/** Home: by the numbers. */
export const metrics = [
  { value: "50+", label: "Features & modules shipped to production" },
  { value: "6", label: "AWS services owned end-to-end" },
  { value: "3", label: "Messaging channels integrated (WhatsApp, Instagram, Messenger)" },
  { value: "1.5", label: "Years in production engineering" },
] as const;

/** Work: SalesAstra split into 3 thematic case studies. */
export const projects = [
  {
    slug: "omni-channel-messaging",
    title: "SalesAstra — Omni-Channel Messaging Pipeline",
    summary: "Event-driven message pipeline",
    description:
      "Unified WhatsApp, Instagram, Messenger, and a custom web chatbot into a single event-driven ingestion pipeline. Ingress Lambda validates and publishes to Kinesis; Consumer Lambda normalises payloads across channels into a unified schema; outbound routes back through Meta Graph API. Message ordering guaranteed per conversation via tenant + phone-number partitioning key.",
    decisions: [
      "Chose Kinesis over SQS so ordering is guaranteed per conversation",
      "Normalized four channel payloads into a single message schema",
      "Outbound routes back through Meta Graph API or live WebSocket",
    ],
    diagram: "messaging",
    role: "Core engineer",
    year: "2025",
    link: "https://salesastra.ai",
    tags: ["NestJS", "AWS Lambda", "Kinesis", "SQS", "WebSockets", "Meta Graph API"],
  },
  {
    slug: "ai-assisted-workflows",
    title: "SalesAstra — AI-Assisted CRM Workflows",
    summary: "Dynamic AI ↔ human routing",
    description:
      "Dynamic AI-to-human conversation routing with round-robin agent assignment, AI-based session summarisation, and automatic lead attribute extraction that prefills CRM records without manual entry. External lead capture runs via an embeddable script using DOM mapping to intercept client website forms and publish structured events to SQS for async processing.",
    decisions: [
      "AI-to-human handoff with round-robin agent assignment",
      "AI session summarization and structured lead extraction",
      "External form capture via DOM mapping → SQS → lead service",
    ],
    diagram: "websocket",
    role: "Core engineer",
    year: "2025",
    link: "https://salesastra.ai",
    tags: ["NestJS", "AWS SQS", "MongoDB", "Meta Graph API", "Next.js"],
  },
  {
    slug: "access-control-infra",
    title: "SalesAstra — Multi-Tenant Access Control & Infra",
    summary: "Graph-based RBAC + cloud foundation",
    description:
      "Fine-grained RBAC with users, roles, teams, hierarchy, and sharing rules — scope-based visibility (All / Team / Own) enforced via a graph-based hierarchy shared across microservices. Multi-tenant branding system applies org-configured signatures and footers to all outbound email. Auth via AWS Cognito with JWT-based API Gateway authorisation. Full infrastructure provisioned with Terraform; deployments automated via GitHub Actions CI/CD. Currently building: serverless global search on AWS OpenSearch, integrated with this RBAC layer.",
    decisions: [
      "Scope resolution (All/Team/Own) traverses an org graph",
      "Permission layer enforces scope on every query and search result",
      "Per-tenant branding + full Terraform-provisioned AWS footprint",
    ],
    diagram: "rbac",
    role: "Core engineer",
    year: "2025",
    link: "https://salesastra.ai",
    tags: ["NestJS", "AWS Cognito", "Terraform", "GitHub Actions", "OpenSearch", "Next.js"],
  },
] as const;

export type Project = (typeof projects)[number];

/** About: engineering philosophy. */
export const principles = [
  {
    title: "Ordering is an architecture decision",
    body: "I reach for Kinesis over a simple queue when conversation order actually matters, and partition by tenant and phone number so correctness holds under load — not just in the demo.",
  },
  {
    title: "Normalize at the edge",
    body: "Four channels, one schema. I push channel-specific quirks into a consumer that emits a unified message shape, so every downstream service stays simple and channel-agnostic.",
  },
  {
    title: "Enforce permissions once",
    body: "RBAC lives in a shared permission layer, not copied into each service. Every query — including search — is filtered by the caller's resolved scope before anything is returned.",
  },
  {
    title: "Make invalidation boring",
    body: "Version-based Redis keys mean cache invalidation is instant and obvious. No cache-busting gymnastics, no stale reads to chase down in production.",
  },
] as const;

/** Experience timeline. */
export const experience = [
  {
    period: "Aug 2025 — Present",
    role: "Associate Full-Stack Engineer (Distributed Systems & AWS)",
    org: "SalesAstra Platform — Miraki Technologies",
    body: "Own the architecture and engineering of SalesAstra's core platform. Responsible for the omni-channel messaging pipeline, real-time WebSocket layer, AI conversation workflows, RBAC system, multi-tenant branding, and infrastructure-as-code. Building the full surface area — NestJS microservices backend, Next.js frontend, and the AWS infrastructure beneath both.",
    highlights: [
      "Designed and implemented an event-driven omni-channel messaging platform supporting WhatsApp, Instagram, Messenger, and Web Chatbot using AWS Lambda, Kinesis, SQS, and NestJS, ensuring ordered message delivery through tenant and conversation partitioning.",
      "Engineered a production-grade multi-tenant CRM platform with tenant-specific databases, isolated configurations, branding, and workspace-level security supporting enterprise SaaS deployments.",
      "Designed and implemented secure cross-tenant impersonation architecture allowing platform administrators to operate as tenant users using signed impersonation tokens, dual-header authentication, permission validation, and complete audit traceability without exposing Cognito credentials.",
      "Designed graph-based Role Based Access Control supporting hierarchy traversal, sharing rules, and permission scopes (All, Team, Own), consistently enforced across multiple microservices.",
      "Built AI-assisted CRM workflows including AI-to-human routing, round-robin agent assignment, automated lead extraction, and conversation summarization.",
      "Developed real-time communication infrastructure using NestJS WebSockets for session management, read receipts, typing indicators, and live messaging across channels.",
      "Implemented secure authentication using AWS Cognito, JWT authorization, and API Gateway security with token refresh mechanisms.",
      "Provisioned AWS infrastructure using Terraform and GitHub Actions covering ECS, Lambda, Kinesis, Cognito, API Gateway, ElastiCache, S3, and OpenSearch with automated deployments.",
      "Implemented Redis version-based cache invalidation strategy reducing stale reads while simplifying cache consistency across distributed services.",
      "Integrated Meta Graph API, WhatsApp Business API, Facebook Login, Razorpay, and Google Analytics into production applications.",
      "Delivered 50+ production features spanning CRM modules, messaging platform, partner management, branding, security policies, work schedules, impersonation, organization management, chatbot enhancements, and infrastructure improvements across the SalesAstra platform."
    ],
  },
  {
    period: "Feb 2025 — Jul 2025",
    role: "Associate Full-Stack Developer — Intern",
    org: "Product & Client Engineering — Miraki Technologies",
    body: "Contributed to client platforms and began building SalesAstra. Worked across the full stack — NestJS backends, Next.js frontends, AWS Lambda functions, and Razorpay integrations — across four different products in six months.",
    highlights: [
      "Engineered SalesAstra's CRM lead management module using NestJS microservices and Next.js",
      "Resolved 50+ feature requests and production bugs across Kind India, Sohum Spa, and Vaishnaoi Group",
      "Built and deployed contact/lead capture forms with AWS Amplify and Lambda, and integrated Razorpay payment processing for Sohum Spa",
    ],
  },
] as const;

export const education = {
  degree: "B.E. Computer Science and Engineering",
  school: "Chaitanya Bharathi Institute of Technology, Hyderabad",
  detail: "CGPA 9.3 / 10.0",
  year: "Graduated June 2025",
} as const;

/** Technology page groups. */
export const techGroups = [
  {
    title: "Languages",
    items: ["TypeScript (primary)", "JavaScript", "Java", "Python", "C"],
  },
  {
    title: "Backend",
    items: [
      "NestJS (microservices)",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "JWT",
      "OAuth",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "TanStack Query",
      "Zustand / Redux",
    ],
  },
  {
    title: "Databases",
    items: ["MongoDB", "Redis (version-based caching)", "AWS OpenSearch"],
  },
  {
    title: "Cloud (AWS)",
    items: [
      "ECS",
      "Lambda",
      "Kinesis",
      "SQS",
      "API Gateway",
      "S3",
      "CloudWatch",
      "Cognito",
      "IAM",
      "Parameter Store",
      "Secrets Manager",
      "ElastiCache",
      "OpenSearch",
    ],
  },
  {
    title: "DevOps",
    items: ["Terraform", "GitHub Actions", "Docker", "CI/CD"],
  },
  {
    title: "Architecture",
    items: [
      "Microservices",
      "Distributed Systems",
      "Multi-Tenant Architecture",
      "Event Driven Systems",
      "RBAC",
      "Domain Driven Design",
      "System Design",
      "Caching Strategies",
      "Message Ordering",
      "API Design",
      "Authentication & Authorization",
      "Infrastructure as Code",
      "Observability",
    ],
  },
  {
    title: "Integrations & APIs",
    items: [
      "Meta Graph API",
      "WhatsApp Business API",
      "Facebook Login",
      "Google Analytics",
      "Razorpay",
      "AWS Amplify",
    ],
  },
] as const;
