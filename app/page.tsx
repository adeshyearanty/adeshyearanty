import Link from "next/link";
import { Container, Section, Kicker, Display, Lead } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";
import { FeaturedMessagingDiagram } from "@/app/_components/diagrams";
import { profile, signals, capabilities, metrics } from "@/app/_data/site";

const WHATSAPP =
  "https://wa.me/message/WBX66Q3PYHI6N1";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <Section className="border-t-0">
        <Container className="pb-24 pt-40 sm:pt-48 lg:pb-32">
          <Reveal>
            <Kicker>
              Full-Stack Engineer (Distributed Systems & AWS) · Microservices · Event-Driven Systems
            </Kicker>
          </Reveal>

          <Reveal delay={120} as="h1" className="mt-10 max-w-4xl">
            <span className="block text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-paper sm:text-7xl lg:text-[5.25rem]">
              Adesh Yearanty builds{" "}
              <span className="text-signal">event-driven systems.</span>
            </span>
          </Reveal>

          <Reveal delay={220}>
            <Lead className="mt-8 max-w-2xl">{profile.tagline}</Lead>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-base transition-colors hover:bg-signal"
              >
                View selected work
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-hairline-strong px-6 py-3 text-sm text-paper transition-colors hover:border-signal hover:text-signal"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-hairline pt-10 lg:grid-cols-4">
              {signals.map((s) => (
                <div key={s.label}>
                  <dt className="text-base font-medium text-paper">{s.label}</dt>
                  <dd className="mt-1 text-sm text-slate">{s.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Capabilities */}
      <Section>
        <Container className="py-24 lg:py-32">
          <Reveal>
            <Kicker index="01">What I do</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <Display className="mt-8 max-w-3xl">
              Engineering the spine of an AI-powered CRM.
            </Display>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-hairline bg-base sm:grid-cols-2">
            {capabilities.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={i * 80}
                className={`h-full w-full ${i < 2
                    ? "border-b border-hairline"
                    : i === 2
                      ? "border-b border-hairline sm:border-b-0"
                      : ""
                  } ${i % 2 === 0 ? "sm:border-r sm:border-hairline" : ""}`}
              >
                <div className="group flex h-full flex-col bg-base p-8 transition-colors duration-500 hover:bg-surface sm:p-10">
                  <span className="font-mono text-xs text-signal tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-tight text-paper">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-slate">
                    {cap.body}
                  </p>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
                    {cap.stack}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------- Featured case study */}
      <Section className="bg-surface">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <Kicker index="02">Featured · Architecture case study</Kicker>
          </Reveal>

          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <Reveal delay={80}>
              <div>
                <Display className="max-w-xl">
                  SalesAstra — a multi-tenant omnichannel CRM platform.
                </Display>
                <p className="mt-6 max-w-lg text-pretty leading-relaxed text-mist">
                  A production-grade platform unifying WhatsApp, Instagram,
                  Messenger, and a custom web chatbot into a single
                  tenant-isolated inbox, with event-driven message ingestion,
                  real-time WebSocket delivery, AI-assisted conversation routing,
                  and a graph-based RBAC system teams rely on daily.
                </p>

                <ul className="mt-8 space-y-3 text-sm text-slate">
                  {[
                    "Tenant isolation at the data, routing, and permission layer",
                    "Sub-second message fanout over NestJS WebSockets",
                    "Graph-based RBAC with scope enforcement across microservices",
                  ].map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-signal" />
                      {point}
                    </li>
                  ))}
                </ul>

                <dl className="mt-10 flex gap-10 border-t border-hairline pt-6">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
                      Channels
                    </dt>
                    <dd className="mt-1 text-2xl font-medium text-paper">
                      4 <span className="text-sm text-slate">unified</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
                      Tenancy
                    </dt>
                    <dd className="mt-1 text-2xl font-medium text-paper">
                      Multi<span className="text-sm text-slate">-tenant</span>
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/work"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-signal"
                >
                  Read the case studies
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <FeaturedMessagingDiagram />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- Achievements */}
      <Section>
        <Container className="py-24 lg:py-32">
          <Reveal>
            <Kicker index="03">By the numbers</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <Display className="mt-8 max-w-2xl">
              Production systems, not tutorial projects.
            </Display>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-hairline bg-base lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 90}
                className={`h-full w-full ${i < 2 ? "border-b border-hairline lg:border-b-0" : ""
                  } ${i % 2 === 0 ? "border-r border-hairline" : ""
                  } ${i < 3 ? "lg:border-r lg:border-hairline" : "lg:border-r-0"
                  }`}
              >
                <div className="flex h-full flex-col bg-base p-8 sm:p-10">
                  <p className="text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
                    {m.value}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Contact CTA */}
      <Section className="bg-surface">
        <Container className="py-28 text-center lg:py-40">
          <Reveal>
            <Kicker className="justify-center">Let&apos;s work together</Kicker>
          </Reveal>
          <Reveal delay={100} as="h2" className="mx-auto mt-8 max-w-3xl">
            <span className="block text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-paper sm:text-6xl">
              Let&apos;s build systems that scale.
            </span>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-mist">
              Open to engineering teams building event-driven, multi-tenant
              platforms — and the infrastructure that keeps them honest.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <Link
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-base transition-colors hover:bg-signal"
            >
              Start a conversation
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
