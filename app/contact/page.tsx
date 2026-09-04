import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";
import { profile, socials } from "@/app/_data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Adesh Yearanty about engineering roles, platform work, and collaborations.",
};

const WHATSAPP =
  "https://wa.me/message/WBX66Q3PYHI6N1";

const CHANNELS = [
  ...socials,
  { label: "Phone", value: profile.phone, href: `tel:+919700015263` },
  { label: "WhatsApp", value: "+91 97000 15263", href: WHATSAPP },
];

const EXPECT = [
  "A reply within a day or two",
  "Straight talk on scope and fit",
  "Happy to walk through SalesAstra's architecture",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="text-signal">that holds up.</span>
          </>
        }
        lead="Open to engineering roles, platform and architecture work, and collaborations with teams who care about how their systems are built — not just that they work in the demo."
      />

      <Section>
        <Container className="py-16 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate">
                  Direct
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="group mt-4 block text-balance text-3xl font-semibold tracking-tight text-paper transition-colors hover:text-signal sm:text-5xl"
                >
                  {profile.email}
                  <span
                    aria-hidden
                    className="ml-3 inline-block text-signal transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>

                <div className="mt-12 space-y-px">
                  {CHANNELS.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center justify-between border-b border-hairline py-4 transition-colors hover:bg-surface/40"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
                        {c.label}
                      </span>
                      <span className="flex items-center gap-3 text-sm text-paper">
                        {c.value}
                        <span
                          aria-hidden
                          className="text-slate transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-signal"
                        >
                          ↗
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-2xl border border-hairline bg-surface p-8 sm:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal">
                  What to expect
                </p>
                <ul className="mt-8 space-y-5">
                  {EXPECT.map((e) => (
                    <li key={e} className="flex gap-3 text-mist">
                      <span className="mt-2.5 h-px w-5 shrink-0 bg-signal" />
                      <span className="text-pretty leading-relaxed">{e}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-10 border-t border-hairline pt-6 text-sm leading-relaxed text-slate">
                  Based in {profile.location}. The fastest way to reach me is
                  email or WhatsApp — a sentence about what you&apos;re building
                  helps me give you a useful reply.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
