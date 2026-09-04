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
        lead="Started as an intern shipping client work and CRM modules. Moved full-time and took ownership of SalesAstra's core architecture — messaging, RBAC, AI workflows, and infrastructure."
      />

      <Section>
        <Container className="py-12 lg:py-20">
          <ol className="relative border-l border-hairline">
            {experience.map((r, i) => (
              <Reveal key={r.period} as="li" delay={i * 90}>
                <div className="relative pb-14 pl-8 sm:pl-12">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-signal bg-base" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
                    {r.period}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                    {r.role}
                  </h2>
                  <p className="mt-1 text-sm text-mist">{r.org}</p>
                  <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-slate">
                    {r.body}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-mist">
                        <span className="mt-2 h-px w-4 shrink-0 bg-signal" />
                        {h}
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
