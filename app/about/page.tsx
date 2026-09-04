import type { Metadata } from "next";
import { Container, Section, Kicker, Display, PageHeader } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";
import { principles, education } from "@/app/_data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Adesh Yearanty — Full-Stack Engineer (Distributed Systems & AWS) building event-driven, multi-tenant systems on NestJS, Next.js, and AWS at Miraki Technologies.",
};

const FACTS = [
  { label: "Focus", value: "Backend & event-driven systems" },
  { label: "Stack", value: "TypeScript · NestJS · AWS" },
  { label: "Based", value: "Hyderabad, India" },
  { label: "Currently", value: "Building SalesAstra @ Miraki Technologies" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="Identity"
        title={
          <>
            I build systems engineered to{" "}
            <span className="text-signal">last under load.</span>
          </>
        }
        lead="I'm a Full-Stack Engineer (Distributed Systems & AWS) at Miraki Technologies and a core engineer on SalesAstra. I care most about the parts of a system you don't see in a demo — ordering, isolation, and access control under real load."
      />

      <Section>
        <Container className="py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div className="space-y-6 text-pretty text-lg leading-relaxed text-mist">
                <p>
                  I&apos;m a Full-Stack Engineer (Distributed Systems & AWS) at Miraki Technologies, where I
                  work as a core engineer on SalesAstra — an AI-powered,
                  multi-tenant CRM platform. My work spans the whole system:
                  event-driven pipelines on AWS, real-time WebSocket layers,
                  fine-grained access control, and the Next.js interfaces on top
                  of it all.
                </p>
                <p>
                  I&apos;m most engaged when I&apos;m designing the spine of
                  something — the service contracts, the event flows, the
                  permission model that decides what every user can and
                  can&apos;t see. Those decisions compound. Getting them right
                  the first time saves months of untangling later.
                </p>
                <p>
                  I graduated with a B.E. in Computer Science from Chaitanya
                  Bharathi Institute of Technology (CGPA 9.3/10.0) in June 2025.
                  I joined Miraki as an intern in February 2025 and moved to
                  full-time in August 2025 — spending every month since building
                  deeper into SalesAstra&apos;s infrastructure.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <dl className="divide-y divide-hairline border-y border-hairline">
                  {FACTS.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-baseline justify-between gap-6 py-4"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
                        {f.label}
                      </dt>
                      <dd className="text-right text-sm text-paper">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 rounded-2xl border border-hairline bg-surface p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
                    Education
                  </p>
                  <p className="mt-4 text-base font-medium text-paper">
                    {education.degree}
                  </p>
                  <p className="mt-1 text-sm text-mist">{education.school}</p>
                  <p className="mt-3 text-sm text-slate">
                    {education.detail} · {education.year}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <Kicker index="01">Engineering philosophy</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <Display className="mt-8 max-w-3xl">
              A few convictions that shape everything I ship.
            </Display>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-hairline bg-surface sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 80}
                className={`h-full w-full ${
                  i < 2
                    ? "border-b border-hairline"
                    : i === 2
                      ? "border-b border-hairline sm:border-b-0"
                      : ""
                } ${i % 2 === 0 ? "sm:border-r sm:border-hairline" : ""}`}
              >
                <div className="h-full bg-surface p-8 sm:p-10">
                  <span className="font-mono text-xs text-signal tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-tight text-paper">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-slate">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
