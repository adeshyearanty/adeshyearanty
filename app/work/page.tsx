import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, PageHeader } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";
import { Diagram } from "@/app/_components/diagrams";
import { projects } from "@/app/_data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Engineering work by Adesh Yearanty — event-driven messaging, multi-tenant RBAC, AI-assisted CRM workflows, and serverless search built at Miraki Technologies.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        kicker="Selected work"
        title={
          <>
            Systems built for production,{" "}
            <span className="text-signal">not demos.</span>
          </>
        }
        lead="Three facets of the same platform — SalesAstra — each a distinct engineering challenge with its own architecture, tradeoffs, and lessons."
      />

      <Section>
        <Container>
          <ul className="divide-y divide-hairline">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <article
                  className={`grid gap-10 py-16 lg:gap-16 lg:py-24 ${i % 2 === 1
                      ? "lg:grid-cols-[1.05fr_1fr]"
                      : "lg:grid-cols-[1fr_1.05fr]"
                    } lg:items-center`}
                >
                  <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div>
                      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-slate">
                        <span className="text-signal tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-8 bg-hairline-strong" />
                        {p.summary}
                      </div>

                      <h2 className="mt-6 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                        {p.title}
                      </h2>
                      <p className="mt-5 max-w-xl text-pretty leading-relaxed text-mist">
                        {p.description}
                      </p>

                      {p.slug === "omni-channel-messaging" && (
                        <div className="mt-6 flex flex-col gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Related writing</span>
                          <Link
                            href="/blog/kinesis-vs-sqs-messaging-pipeline"
                            className="inline-flex items-center gap-1.5 text-[13px] text-mist transition-colors hover:text-signal"
                          >
                            <span>→</span>
                            <span className="underline decoration-hairline-strong underline-offset-4 hover:decoration-signal">Why I chose Kinesis over SQS</span>
                          </Link>
                        </div>
                      )}

                      {p.slug === "access-control-infra" && (
                        <div className="mt-6 flex flex-col gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Related writing</span>
                          <div className="flex flex-col gap-2">
                            <Link
                              href="/blog/securing-admin-access-dual-header-impersonation"
                              className="inline-flex items-center gap-1.5 text-[13px] text-mist transition-colors hover:text-signal"
                            >
                              <span>→</span>
                              <span className="underline decoration-hairline-strong underline-offset-4 hover:decoration-signal">Securing admin access with dual-header impersonation</span>
                            </Link>
                            <Link
                              href="/blog/rbac-system-that-doesnt-lie"
                              className="inline-flex items-center gap-1.5 text-[13px] text-mist transition-colors hover:text-signal"
                            >
                              <span>→</span>
                              <span className="underline decoration-hairline-strong underline-offset-4 hover:decoration-signal">Designing a RBAC system that doesn&apos;t lie</span>
                            </Link>
                            <Link
                              href="/blog/redis-version-based-caching"
                              className="inline-flex items-center gap-1.5 text-[13px] text-mist transition-colors hover:text-signal"
                            >
                              <span>→</span>
                              <span className="underline decoration-hairline-strong underline-offset-4 hover:decoration-signal">Redis version-based caching</span>
                            </Link>
                          </div>
                        </div>
                      )}

                      <ul className="mt-8 space-y-3 text-sm text-slate">
                        {p.decisions.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span className="mt-2 h-px w-4 shrink-0 bg-signal" />
                            {d}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-mist"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex items-center gap-6 border-t border-hairline pt-6 text-sm">
                        <span className="text-slate">
                          {p.role} · {p.year}
                        </span>
                        <Link
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-paper transition-colors hover:text-signal"
                        >
                          Visit SalesAstra
                          <span
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            ↗
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal
                    delay={120}
                    className={i % 2 === 1 ? "lg:order-1" : ""}
                  >
                    <Diagram kind={p.diagram} />
                  </Reveal>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
