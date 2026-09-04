"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/app/_components/primitives";
import { navLinks as LINKS } from "@/app/_data/site";

export function SiteNav() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      setScrolled(doc.scrollTop > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress indicator */}
      <div
        className="absolute inset-x-0 top-0 h-px origin-left bg-signal"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <div
        className={`transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-hairline bg-base/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.3em] text-paper transition-colors hover:text-signal"
          >
            Adesh<span className="text-signal">.</span>Yearanty
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "text-paper"
                    : "text-slate hover:text-mist"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-signal" />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full border border-hairline-strong px-4 py-1.5 text-[13px] text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-paper md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-5 bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </Container>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-b border-hairline bg-base/95 backdrop-blur-xl transition-[max-height] duration-500 ease-out md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <Container className="flex flex-col py-4">
          {[...LINKS, { href: "/contact", label: "Contact" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b border-hairline py-3 text-sm tracking-wide last:border-0 ${
                isActive(link.href) ? "text-signal" : "text-mist"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
