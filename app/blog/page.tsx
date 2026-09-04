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
    slug: "securing-admin-access-dual-header-impersonation",
    title: "Securing administrative access with a dual-header impersonation framework",
    excerpt:
      "Separating user authentication from dynamic authorization overlays. A deep dive into the dual-header architecture that enables secure administrator impersonation under AWS Cognito.",
    date: "Aug 2026",
    readingTime: "6 min",
    category: "Systems",
  },
  {
    slug: "kinesis-vs-sqs-messaging-pipeline",
    title: "Why I chose Kinesis over SQS for the messaging pipeline",
    excerpt:
      "SQS is the default choice. Kinesis was the right one — but only because of one constraint: conversation ordering. A look at the tradeoff and the partitioning strategy that made it work.",
    date: "Jun 2025",
    readingTime: "7 min",
    category: "Architecture",
  },
  {
    slug: "rbac-system-that-doesnt-lie",
    title: "Designing a RBAC system that doesn't lie to your users",
    excerpt:
      "Scope-based permissions sound simple until you model a hierarchy and add sharing rules. How I built a graph-based permission layer that stays consistent across microservices.",
    date: "May 2025",
    readingTime: "5 min",
    category: "Systems",
  },
  {
    slug: "redis-version-based-caching",
    title: "Redis version-based caching: a simpler way to invalidate",
    excerpt:
      "TTL-based expiry is unpredictable and cache-busting is ugly. Version-based caching gives you instant, controlled invalidation without either. Here's how it works in practice.",
    date: "Apr 2025",
    readingTime: "6 min",
    category: "Backend",
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
                {["Architecture", "Systems", "Backend", "Event-driven", "AWS", "Redis", "RBAC"].map((tag) => (
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
