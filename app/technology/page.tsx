import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";
import { techGroups } from "@/app/_data/site";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The tools Adesh Yearanty reaches for — NestJS, Next.js, TypeScript, AWS, MongoDB, Redis, Terraform, and the rest of a production-tested stack.",
};

function getTechBorderClasses(i: number) {
  const bottom =
    i < 6
      ? "border-b border-hairline"
      : i === 6
        ? "border-b border-hairline sm:border-b-0"
        : "";

  const right =
    i === 0 || i === 4 || i === 6
      ? "sm:border-r sm:border-hairline"
      : i === 1 || i === 3
        ? "lg:border-r lg:border-hairline"
        : i === 2
          ? "sm:border-r sm:border-hairline lg:border-r-0"
          : "";

  return `${bottom} ${right}`.trim();
}

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        kicker="Technical expertise"
        title={
          <>
            Tools chosen for production,{" "}
            <span className="text-signal">not résumés.</span>
          </>
        }
        lead="A working stack refined through shipping real systems. Every item here has earned its place in a production codebase."
      />

      <Section>
        <Container className="py-16 lg:py-24">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-hairline bg-base sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((g, i) => (
              <Reveal
                key={g.title}
                delay={(i % 3) * 80}
                className={`h-full w-full ${
                  i === 6 ? "lg:col-span-2" : i === 7 ? "lg:col-span-1" : ""
                } ${getTechBorderClasses(i)}`}
              >
                <div className="grid-texture h-full bg-base p-8 sm:p-10">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-medium tracking-tight text-paper">
                      {g.title}
                    </h2>
                    <span className="font-mono text-xs text-signal tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-hairline bg-surface px-3 py-1 text-[13px] text-mist"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
