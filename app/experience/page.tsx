import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";
import { experience } from "@/app/_data/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "The professional journey of Adesh Yearanty — roles, scope, and the systems built at Miraki Technologies.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        kicker="The journey"
        title={
          <>
            Roles, scope, and the systems{" "}
            <span className="text-signal">built along the way.</span>
          </>
        }
        lead="Started as an intern shipping client work and CRM modules, transitioning full-time to engineer core architecture across SalesAstra — event-driven messaging, graph RBAC, AI workflows, and cloud infrastructure."
      />

      <Section>
        <Container className="py-12 lg:py-20">
          <ol className="relative border-l border-hairline">
            {experience.map((r, i) => (
              <Reveal key={r.period} as="li" delay={i * 90}>
                <div
                  className={`relative ${
                    i === experience.length - 1 ? "pb-4" : "pb-16 sm:pb-20"
                  } pl-8 sm:pl-12`}
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border ${
                      i === 0
                        ? "border-signal bg-signal"
                        : "border-hairline-strong bg-base"
                    }`}
                  />

                  {/* Period & Active Status */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
                      {r.period}
                    </p>
                    {i === 0 && (
                      <span className="rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Role & Org */}
                  <h2 className="mt-3.5 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                    {r.role}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-mist">{r.org}</p>

                  {/* Role Overview */}
                  <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-slate">
                    {r.body}
                  </p>

                  {/* Key Contributions & Engineering Scope */}
                  <ul className="mt-6 max-w-3xl space-y-3">
                    {r.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-mist"
                      >
                        <span className="mt-2.5 h-px w-3.5 shrink-0 bg-signal/60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
