import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, PageHeader } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on event-driven systems, multi-tenant architecture, and the craft of building software — by Adesh Yearanty.",
};

const POSTS = [
  {
    slug: "the-workflow-should-be-allowed-to-stop",
    title: "The Workflow Should Be Allowed to Stop",
    excerpt:
      "A workflow that cannot proceed yet is not a failed workflow. In production systems, the most consequential workflows intentionally stop — waiting for OTP verification, agent takeover, provider delivery confirmation, or media processing. The distinction between \"waiting\" and \"failed\" is architectural, not incidental.",
    date: "Sep 2026",
    readingTime: "12 min",
    category: "Systems",
  },
  {
    slug: "when-a-contact-isnt-a-conversation",
    title: "When a Contact Isn't a Conversation",
    excerpt:
      "A contact is not a conversation. A CRM record is not a conversation. Engagement history is not conversation ownership. These are distinct data entities with different lifecycles, and collapsing them into one concept is one of the most common and costly modeling mistakes in omnichannel messaging systems.",
    date: "Aug 2026",
    readingTime: "11 min",
    category: "Systems",
  },
  {
    slug: "persist-first-broadcast-second",
    title: "Persist First, Broadcast Second",
    excerpt:
      "The UI is a projection of application state, not the source of truth. The database establishes what happened; the real-time channel tells interested clients that something changed. Why persist-first is fundamentally safer than broadcast-first, how Pulse manages distributed failure windows between MongoDB and Socket.IO, and why UI state should never outrank durable truth.",
    date: "Aug 2026",
    readingTime: "10 min",
    category: "Systems",
  },
  {
    slug: "database-transaction-doesnt-make-system-atomic",
    title: "A Database Transaction Doesn't Make Your System Atomic",
    excerpt:
      "A database transaction can make one database operation atomic. It cannot make your database, event stream, WebSocket layer, external API, and background workers behave like one transaction. Where the transaction boundary ends and how Pulse manages distributed failure windows.",
    date: "Jul 2026",
    readingTime: "12 min",
    category: "Systems",
  },
  {
    slug: "tenant-isolation-doesnt-end-at-the-database",
    title: "Tenant Isolation Doesn't End at the Database",
    excerpt:
      "Adding tenantId to a database query is not a multi-tenant security architecture. How tenant isolation must survive across the entire distributed lifecycle: authentication, Redis caches, OpenSearch indexes, Kinesis event streams, background Lambda workers, Socket.IO rooms, and external webhooks.",
    date: "Jun 2026",
    readingTime: "14 min",
    category: "Architecture",
  },
  {
    slug: "similarity-is-not-probability",
    title: "Similarity Is Not Probability",
    excerpt:
      "A search score tells you how well something matched a query. It does not automatically tell you the probability that two records are duplicates. Why treating raw OpenSearch relevance as calibrated confidence causes CRM data corruption, and how we decoupled candidate generation from duplicate classification.",
    date: "May 2026",
    readingTime: "11 min",
    category: "Systems",
  },
  {
    slug: "search-became-a-data-integrity-problem",
    title: "Search Became a Data Integrity Problem",
    excerpt:
      "Search is usually treated as a read concern. That changes when its result influences whether the application is allowed to create or mutate data. How OpenSearch moved from a search convenience into a data integrity gate for duplicate detection in SalesAstra.",
    date: "Apr 2026",
    readingTime: "13 min",
    category: "Architecture",
  },
  {
    slug: "ownership-is-not-a-permission",
    title: "Ownership Is Not a Permission",
    excerpt:
      "A Super Admin can manage every user, but they cannot demote the organization owner. Why treating ownership as merely another permission creates an authorization model that contradicts itself, and how we decoupled sovereign authority from administrative RBAC in SalesAstra.",
    date: "Mar 2026",
    readingTime: "14 min",
    category: "Systems",
  },
  {
    slug: "who-owns-the-truth-distributed-system",
    title: "In a distributed system, who owns the truth?",
    excerpt:
      "The hardest question in a distributed system isn't where to put the message broker. It's deciding who is allowed to change the truth. How Pulse separates event processing from state ownership across Ingress, Kinesis, Consumer Lambdas, Dispatchers, and async AI workers.",
    date: "Feb 2026",
    readingTime: "15 min",
    category: "Architecture",
  },
  {
    slug: "exactly-once-delivery-is-a-trap",
    title: "Exactly-once delivery is a trap",
    excerpt:
      "Don't try to make the system execute exactly once. Make executing twice harmless. How Pulse enforces idempotency across Meta webhook retries, Kinesis at-least-once deliveries, and distributed race conditions using unique compound constraints and monotonic state machines.",
    date: "Jan 2026",
    readingTime: "13 min",
    category: "Systems",
  },
  {
    slug: "api-success-doesnt-mean-message-delivered",
    title: "A successful API request doesn't mean your message was delivered",
    excerpt:
      "Meta returns HTTP 200 with a message ID in 180ms. That proves the provider accepted the payload—it does not prove the message was delivered. How we modeled identifier reconciliation, monotonic delivery state machines, and asynchronous webhook convergence in Pulse.",
    date: "Dec 2025",
    readingTime: "14 min",
    category: "Systems",
  },
  {
    slug: "engagement-history-isnt-conversation-ownership",
    title: "Engagement history isn't conversation ownership",
    excerpt:
      "Historical interaction proves that a contact interacted with a CRM record in the past. It does not prove which record owns the conversation now. How we built deterministic conversation routing in Pulse by decoupling history, active sessions, and agent takeover.",
    date: "Nov 2025",
    readingTime: "13 min",
    category: "Systems",
  },
  {
    slug: "ai-shouldnt-authorize-actions",
    title: "AI can suggest the action. It shouldn't authorize the action.",
    excerpt:
      "In automated conversational CRMs, having an LLM determine that enough data exists to create a lead is not permission to mutate the database. Why model output must be treated as an untrusted proposal, and how we built application-level eligibility guards around verification, tenant isolation, and duplicate detection.",
    date: "Oct 2025",
    readingTime: "12 min",
    category: "Systems",
  },
  {
    slug: "whatsapp-otp-workflow-verification",
    title: "Why WhatsApp OTP became a workflow boundary, not just a verification step",
    excerpt:
      "Data completeness does not imply action authorization. In an automated conversational CRM, verification is not just an authentication check — it is a gate that governs which automated downstream actions are permitted to execute.",
    date: "Sep 2025",
    readingTime: "11 min",
    category: "Architecture",
  },
  {
    slug: "kinesis-vs-sqs-messaging-pipeline",
    title: "Why I chose Kinesis over SQS for the messaging pipeline",
    excerpt:
      "SQS is the default choice. Kinesis was the right one — but only because of one constraint: conversation ordering. A look at the tradeoff and the partitioning strategy that made it work.",
    date: "Sep 2025",
    readingTime: "7 min",
    category: "Architecture",
  },
  {
    slug: "designing-pulse-omnichannel-messaging-architecture",
    title: "Designing Pulse: a real-time omnichannel messaging architecture",
    excerpt:
      "A deep architecture case study on unifying WhatsApp, Instagram, Messenger, and Web Chat under a single system of record. How we separated commands from events, built on Kinesis, and decoupled fast-path UI delivery from async enrichment.",
    date: "Aug 2025",
    readingTime: "14 min",
    category: "Architecture",
  },
  {
    slug: "designing-tenant-aware-opensearch-architecture",
    title: "Designing a tenant-aware OpenSearch architecture for search and duplicate detection",
    excerpt:
      "When search moves from a UI convenience to data integrity, the architecture changes. How we built a tenant-scoped OpenSearch system for candidate generation, index versioning, and relevance scoring.",
    date: "Jul 2025",
    readingTime: "10 min",
    category: "Architecture",
  },
  {
    slug: "redis-version-based-caching",
    title: "Redis version-based caching: a simpler way to invalidate",
    excerpt:
      "TTL-based expiry is unpredictable and cache-busting is ugly. Version-based caching gives you instant, controlled invalidation without either. Here's how it works in practice.",
    date: "Jun 2025",
    readingTime: "6 min",
    category: "Backend",
  },
  {
    slug: "securing-admin-access-dual-header-impersonation",
    title: "Securing administrative access with a dual-header impersonation framework",
    excerpt:
      "Separating user authentication from dynamic authorization overlays. A deep dive into the dual-header architecture that enables secure administrator impersonation under AWS Cognito.",
    date: "May 2025",
    readingTime: "6 min",
    category: "Systems",
  },
  {
    slug: "rbac-system-that-doesnt-lie",
    title: "Designing a RBAC system that doesn't lie to your users",
    excerpt:
      "Scope-based permissions sound simple until you model a hierarchy and add sharing rules. How I built a graph-based permission layer that stays consistent across microservices.",
    date: "Apr 2025",
    readingTime: "5 min",
    category: "Systems",
  },
  {
    slug: "tenant-discovery-authentication-cognito",
    title: "When tenant discovery and authentication depend on each other",
    excerpt:
      "In multi-tenant SaaS, you cannot select an identity provider until you know the tenant, but you cannot identify the tenant until the user authenticates. How we broke the dependency with a dual-login discovery architecture.",
    date: "Apr 2025",
    readingTime: "9 min",
    category: "Architecture",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        kicker="Writing"
        title={
          <>
            Notes on systems and{" "}
            <span className="text-signal">the craft.</span>
          </>
        }
        lead="Occasional essays on architecture, reliability, and the decisions that shape software over the long run."
      />

      <Section>
        <Container>
          <ul>
            {POSTS.map((post, i) => (
              <Reveal key={post.title} as="li" delay={(i % 2) * 80}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <article className="group grid gap-4 border-b border-hairline py-10 transition-colors duration-500 hover:bg-surface/40 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:py-12">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
                        <span className="text-signal">{post.category}</span>
                        <span className="h-px w-6 bg-hairline-strong" />
                        <span>{post.date}</span>
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-paper transition-colors group-hover:text-signal sm:text-3xl">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-pretty leading-relaxed text-slate">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate lg:flex-col lg:items-end lg:gap-2">
                      <span>{post.readingTime}</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal"
                      >
                        →
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="mt-16 border-t border-hairline pt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate mb-4">
                Topics covered
              </p>
              <div className="flex flex-wrap gap-2">
                {["Architecture", "Systems", "Backend", "Event-driven", "AWS", "Cognito", "Redis", "RBAC", "OpenSearch"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-mist"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="py-12 text-sm text-slate">
              More writing is on the way. In the meantime, the work pages tell
              most of the story.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
