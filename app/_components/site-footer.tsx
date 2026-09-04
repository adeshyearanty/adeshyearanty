import Link from "next/link";
import { Container } from "@/app/_components/primitives";
import { socials as SOCIALS } from "@/app/_data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal">
              Available for select work
            </p>
            <p className="mt-4 text-2xl font-medium tracking-tight text-paper">
              Let&apos;s build systems that scale.
            </p>
            <Link
              href="https://wa.me/message/WBX66Q3PYHI6N1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-signal"
            >
              Start a conversation
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-12 border-b border-hairline pb-2 text-sm text-slate transition-colors hover:text-paper"
              >
                <span>{s.label}</span>
                <span
                  aria-hidden
                  className="text-slate transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-signal"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono tracking-wide">
            © {new Date().getFullYear()} Adesh Yearanty
          </p>
          <p className="font-mono tracking-wide">
            Designed &amp; built from scratch · Next.js
          </p>
        </div>
      </Container>
    </footer>
  );
}
