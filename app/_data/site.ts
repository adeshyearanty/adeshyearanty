/**
 * Single source of truth for all portfolio content.
 * Copy is written in first person, present tense — builder voice.
 */

export const profile = {
  name: "Adesh Yearanty",
  shortName: "Adesh Yearanty",
  role: "Associate Full-Stack Engineer (Distributed Systems & AWS)",
  company: "Miraki Technologies",
  product: "SalesAstra",
  productUrl: "https://salesastra.ai",
  location: "Hyderabad, India",
  tagline:
    "Associate Full-Stack Engineer designing and building production-grade multi-tenant SaaS platforms with NestJS, Next.js, and AWS. Focused on the system boundaries that keep distributed architectures correct under concurrency and failure — from event-driven messaging pipelines and tenant isolation to fine-grained authorization and deterministic workflow execution.",
  email: "adesh.yearanty@gmail.com",
  phone: "+91 92811 73006",
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
  { label: "Full-stack", detail: "NestJS microservices, Next.js, and distributed state" },
  { label: "Event-driven", detail: "Kinesis, Lambda, asynchronous workflows, WebSockets" },
  { label: "Multi-tenant", detail: "Tenant isolation, graph RBAC, and secure impersonation" },
  { label: "Cloud-native", detail: "AWS, Terraform, and automated CI/CD pipelines" },
] as const;

/** Home: what I do. */
export const capabilities = [
  {
    title: "Systems & architecture",
    body: "Designing service boundaries, event-driven message flows, and state ownership models that preserve tenant isolation, consistency boundaries, and workflow correctness under failure.",
    stack: "Event-driven · Microservices · Multi-tenant",
  },
  {
    title: "Cloud & infrastructure",
    body: "Provisioning reproducible, observable AWS environments — Lambda workers, ECS services, Kinesis streams, OpenSearch clusters, and API Gateways automated with Terraform and CI/CD.",
    stack: "AWS · Terraform · GitHub Actions",
  },
  {
    title: "Backend engineering",
    body: "Engineering high-throughput NestJS services with strict conversation ordering, idempotent event handling, version-based caching, and fine-grained authorization layers.",
    stack: "NestJS · Node.js · MongoDB · Redis",
  },
  {
    title: "Product interfaces",
    body: "Building responsive, real-time frontends in Next.js — live omnichannel messaging consoles, graph-based RBAC administration, and multi-tenant workspace configurations.",
    stack: "Next.js · React · TypeScript",
  },
] as const;

/** Home: by the numbers. */
export const metrics = [
  { value: "4", label: "Unified messaging channels (WhatsApp, Instagram, Messenger, Web Chat)" },
  { value: "50+", label: "Features & modules shipped to production across SalesAstra" },
  { value: "Multi-tenant", label: "Platform isolation, graph RBAC & cross-tenant impersonation" },
  { value: "1.5+", label: "Years in production distributed systems engineering" },
] as const;

/** Work: SalesAstra split into 3 thematic case studies. */
export const projects = [
  {
    slug: "omni-channel-messaging",
    title: "SalesAstra — Omni-Channel Messaging Pipeline",
    summary: "Pulse: Distributed messaging architecture",
    description:
      "Unified WhatsApp, Instagram, Messenger, and a custom web chatbot into a single event-driven ingestion pipeline powered by Amazon Kinesis. Ingress Lambdas validate incoming webhooks and stream raw events; Consumer Lambdas normalize provider payloads into a unified canonical schema; pulse-service serves as the authoritative system of record backed by MongoDB. Messages project immediately to agent consoles over Socket.IO, while outbound messages flow through Kinesis to a dedicated Dispatcher for Meta Graph API delivery and asynchronous reconciliation. Message sequencing is strictly preserved via tenant and conversation partitioning.",
    decisions: [
      "Chose Kinesis over SQS to guarantee strict conversation sequencing through tenant and phone partition keys",
      "Established pulse-service as the sole authoritative system of record, separating internal state ownership from external delivery",
      "Decoupled fast-path Socket.IO UI updates from asynchronous media hydration, AI summarization, and webhook reconciliation",
      "Enforced monotonic state machines and idempotency constraints across Meta Graph API retries to make duplicate deliveries harmless",
    ],
    diagram: "messaging",
    role: "Core engineer",
    year: "2025",
    link: "https://salesastra.ai",
    tags: ["NestJS", "AWS Lambda", "Kinesis", "WebSockets", "Meta Graph API", "MongoDB", "Redis"],
  },
  {
    slug: "ai-assisted-workflows",
    title: "SalesAstra — AI-Assisted CRM Workflows",
    summary: "Deterministic AI-integrated workflows",
    description:
      "Integrated AI capabilities into deterministic application workflows where LLMs propose actions but application logic validates and authorizes state mutations. Features dynamic AI-to-human conversation routing, round-robin agent assignment, automated lead attribute extraction, and conversation summarization. WhatsApp OTP verification operates as an explicit workflow boundary gating automated CRM record mutations, while human takeover deterministically pauses automation. External lead capture intercepts client web forms and publishes structured events to SQS for asynchronous processing.",
    decisions: [
      "Treated AI output strictly as untrusted proposals, requiring application-level eligibility validation before mutating records",
      "Established WhatsApp OTP verification as an architectural workflow boundary gating automated CRM mutations",
      "Decoupled historical contact engagement from active conversation ownership to make human agent takeover deterministic",
      "Designed workflow states to support intentional pauses for verification or agent takeover without treating delays as failures",
    ],
    diagram: "websocket",
    role: "Core engineer",
    year: "2025",
    link: "https://salesastra.ai",
    tags: ["NestJS", "MongoDB", "WebSockets", "WhatsApp Business API", "AWS SQS", "Next.js"],
  },
  {
    slug: "access-control-infra",
    title: "SalesAstra — Multi-Tenant Access Control & Infra",
    summary: "Authorization, tenancy & cloud infrastructure",
    description:
      "Engineered the security and cloud infrastructure for multi-tenant enterprise deployments. Implemented graph-based RBAC with users, roles, teams, and hierarchy traversal, enforcing scope-based visibility (All, Team, Own) consistently across microservices. Decoupled sovereign organization ownership from administrative roles to prevent privilege inversion. Built secure cross-tenant impersonation using signed tokens and a dual-header authorization overlay without exposing AWS Cognito credentials. Integrated tenant-scoped AWS OpenSearch indexes for candidate generation and duplicate detection, Redis version-based caching, and automated the entire AWS footprint with Terraform and GitHub Actions CI/CD.",
    decisions: [
      "Separated sovereign organization ownership from administrative RBAC roles to prevent privilege inversion under Super Admin accounts",
      "Implemented a dual-header authorization overlay enabling auditable administrative impersonation without Cognito credential sharing",
      "Used tenant-scoped OpenSearch indexes for candidate generation while evaluating duplicate classification in deterministic application logic",
      "Automated the multi-tenant AWS footprint with Terraform and GitHub Actions CI/CD for repeatable, zero-downtime deployments",
    ],
    diagram: "rbac",
    role: "Core engineer",
    year: "2025",
    link: "https://salesastra.ai",
    tags: ["NestJS", "AWS Cognito", "Terraform", "GitHub Actions", "OpenSearch", "Redis", "Next.js"],
  },
] as const;

export type Project = (typeof projects)[number];

/** About: engineering philosophy. */
export const principles = [
  {
    title: "Ordering is an architecture decision",
    body: "When conversation sequence determines business correctness, ordering cannot be treated as an afterthought. I reach for Kinesis partitioned by tenant and conversation key so sequencing guarantees hold under distributed load.",
  },
  {
    title: "Persistence is the source of truth; real-time delivery is a projection",
    body: "The database establishes durable fact; real-time channels notify clients that state changed. Persisting before broadcasting eliminates non-atomic failure windows and ensures UI state never outranks durable data.",
  },
  {
    title: "AI can propose; application logic authorizes",
    body: "Model outputs are probabilistic suggestions, not permissions to mutate production records. Verification gates, tenant isolation, and duplicate checks must always live in deterministic application code.",
  },
  {
    title: "Historical state is not current ownership",
    body: "Past contact interactions prove history, not present routing authority. Decoupling historical engagement from active session ownership prevents routing conflicts and makes human takeover deterministic.",
  },
] as const;

/** Experience timeline. */
export const experience = [
  {
    period: "Aug 2025 — Present",
    role: "Associate Full-Stack Engineer (Distributed Systems & AWS)",
    org: "SalesAstra Platform — Miraki Technologies",
    body: "Engineer core architecture across SalesAstra's multi-tenant platform. Responsible for the event-driven Pulse messaging pipeline, real-time WebSocket infrastructure, deterministic AI-integrated workflows, graph-based RBAC, cross-tenant impersonation, search duplicate detection, and automated cloud infrastructure across NestJS, Next.js, and AWS.",
    highlights: [
      "Designed and built the event-driven Pulse messaging pipeline unifying WhatsApp, Instagram, Messenger, and Web Chat using AWS Lambda, Kinesis, and NestJS, enforcing strict per-conversation message ordering and canonical schema normalization.",
      "Architected a multi-tenant isolation model with tenant-scoped databases, isolated configuration, and multi-tenant OpenSearch indexing to guarantee complete data segregation across shared SaaS infrastructure.",
      "Implemented secure administrative impersonation using signed tokens and a dual-header authentication overlay, allowing auditable cross-tenant access without exposing underlying AWS Cognito credentials.",
      "Engineered a graph-based Role-Based Access Control (RBAC) engine supporting org hierarchy traversal and scope-based permissions (All, Team, Own), consistently evaluated across all microservices.",
      "Built deterministic AI-assisted CRM workflows with WhatsApp OTP verification boundaries, automated lead extraction, and AI-to-human routing with round-robin assignment, ensuring AI output cannot bypass application authorization.",
      "Developed real-time communication infrastructure using NestJS WebSockets (Socket.IO) for instant UI delivery, session state management, typing indicators, and read receipts, decoupled from asynchronous background processing.",
      "Built provider delivery reconciliation mechanisms handling Meta Graph API asynchronous webhooks and monotonic state machines to prevent message loss and out-of-order status updates.",
      "Implemented duplicate candidate generation and search using tenant-scoped AWS OpenSearch, decoupling BM25 relevance scoring from application-level duplicate classification decisions.",
      "Designed a version-based Redis cache invalidation strategy that eliminates stale reads and cache-busting complexity across distributed services.",
      "Provisioned and automated cloud infrastructure using Terraform and GitHub Actions CI/CD covering ECS, Lambda, Kinesis, Cognito, API Gateway, ElastiCache, S3, and OpenSearch with zero-downtime deployments.",
    ],
  },
  {
    period: "Feb 2025 — Jul 2025",
    role: "Associate Full-Stack Developer — Intern",
    org: "Product & Client Engineering — Miraki Technologies",
    body: "Contributed to client platforms and began engineering SalesAstra modules. Worked across NestJS backends, Next.js frontends, AWS Lambda functions, and third-party integrations across four production products.",
    highlights: [
      "Engineered SalesAstra's initial CRM lead management module using NestJS microservices and Next.js.",
      "Resolved 50+ production bug fixes and feature requests across client web applications including Kind India, Sohum Spa, and Vaishnaoi Group.",
      "Built serverless contact and lead capture pipelines using AWS Amplify and Lambda, integrating Razorpay payment processing for Sohum Spa.",
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
      "REST APIs",
      "WebSockets (Socket.IO)",
      "JWT",
      "OAuth",
      "Event-driven processing",
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
      "Zustand",
    ],
  },
  {
    title: "Databases",
    items: [
      "MongoDB (primary datastore)",
      "Redis (version-based caching)",
      "AWS OpenSearch (search & duplicate detection)",
    ],
  },
  {
    title: "Cloud (AWS)",
    items: [
      "ECS",
      "Lambda",
      "Kinesis (core event backbone)",
      "SQS (decoupled async tasks)",
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
    items: ["Terraform (IaC)", "GitHub Actions", "Docker", "CI/CD automation"],
  },
  {
    title: "Architecture",
    items: [
      "Distributed Systems",
      "Event-Driven Architecture",
      "Microservices",
      "Multi-Tenant Isolation",
      "Graph-Based RBAC",
      "Authentication & Authorization",
      "Workflow & State Design",
      "Idempotency",
      "Message Ordering",
      "Caching Strategies",
      "Search Architecture",
      "System Design",
      "API Design",
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
      "Razorpay",
      "Google Analytics",
      "AWS Amplify",
    ],
  },
] as const;
