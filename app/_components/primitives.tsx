import type { ReactNode } from "react";

type DivProps = {
  children: ReactNode;
  className?: string;
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * The single source of horizontal alignment for the whole site.
 * Every section, the nav, and the footer wrap their content in this so the
 * left/right edges line up perfectly at all breakpoints.
 */
export function Container({ children, className }: DivProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: DivProps & { id?: string }) {
  return (
    <section
      id={id}
      className={cn("relative border-t border-hairline", className)}
    >
      {children}
    </section>
  );
}

/** Small uppercase eyebrow label, optionally indexed (e.g. "01 / Identity"). */
export function Kicker({
  index,
  children,
  className,
}: DivProps & { index?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-slate",
        className,
      )}
    >
      {index ? (
        <span className="text-signal tabular-nums">{index}</span>
      ) : null}
      <span className="h-px w-8 bg-hairline-strong" aria-hidden />
      {children}
    </p>
  );
}

/** Large editorial display heading. */
export function Display({ children, className }: DivProps) {
  return (
    <h2
      className={cn(
        "text-balance font-semibold leading-[1.02] tracking-[-0.03em] text-paper",
        "text-4xl sm:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className }: DivProps) {
  return (
    <p
      className={cn(
        "text-pretty text-lg leading-relaxed text-mist sm:text-xl",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Standard interior-page header that clears the fixed nav. */
export function PageHeader({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Section className="border-t-0">
      <Container className="pb-16 pt-36 sm:pt-44">
        <Kicker>{kicker}</Kicker>
        <Display className="mt-8 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
          {title}
        </Display>
        {lead ? <Lead className="mt-8 max-w-2xl">{lead}</Lead> : null}
      </Container>
    </Section>
  );
}
