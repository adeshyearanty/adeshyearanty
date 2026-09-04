/**
 * Hand-built architecture diagrams for the SalesAstra case studies.
 * Pure CSS/flex — no images, no external libs — themed with design tokens.
 */

function Node({
  label,
  note,
  accent = false,
}: {
  label: string;
  note?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 text-center ${
        accent
          ? "border-signal/40 bg-signal-soft"
          : "border-hairline bg-surface"
      }`}
    >
      <p
        className={`text-[13px] font-medium ${
          accent ? "text-signal" : "text-paper"
        }`}
      >
        {label}
      </p>
      {note ? <p className="mt-0.5 text-[10px] text-slate">{note}</p> : null}
    </div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1 text-slate">
      <span className="h-3 w-px bg-hairline-strong" />
      {label ? (
        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
          {label}
        </span>
      ) : null}
      <span className="h-3 w-px bg-hairline-strong" />
    </div>
  );
}

function DiagramShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid-texture rounded-2xl border border-hairline bg-base p-6 shadow-premium sm:p-8">
      {children}
    </div>
  );
}

/** Architecture 1 — event-driven omni-channel messaging pipeline. */
export function MessagingDiagram() {
  return (
    <DiagramShell>
      <div className="flex flex-wrap justify-center gap-2">
        {["WhatsApp", "Instagram", "Messenger", "Web Chatbot"].map((c) => (
          <span
            key={c}
            className="rounded-md border border-hairline bg-surface px-2.5 py-1 text-[11px] text-mist"
          >
            {c}
          </span>
        ))}
      </div>
      <FlowArrow label="webhook" />
      <Node label="Ingress Lambda" note="Validate · publish" />
      <FlowArrow label="stream" />
      <Node
        label="Kinesis Stream"
        note="Partition: tenant + phone no."
        accent
      />
      <FlowArrow label="consume" />
      <Node label="Consumer Lambda" note="Normalize → unified schema" />
      <FlowArrow />
      <div className="grid grid-cols-2 gap-2">
        <Node label="NestJS CRM" note="Store · state" />
        <Node label="Outbound" note="Graph API · WS" />
      </div>
    </DiagramShell>
  );
}

/**
 * Home featured case study — full event-driven flow.
 * Channel chips → ingest → three service nodes → two delivery/data nodes.
 * The middle Consumer Lambda stays the accent-highlighted node.
 */
export function FeaturedMessagingDiagram() {
  return (
    <DiagramShell>
      <div className="flex flex-wrap justify-center gap-2">
        {["WhatsApp", "Instagram", "Messenger", "Web Chatbot"].map((c) => (
          <span
            key={c}
            className="rounded-md border border-hairline bg-surface px-2.5 py-1 text-[11px] text-mist"
          >
            {c}
          </span>
        ))}
      </div>
      <FlowArrow label="ingest" />
      <Node label="Meta Webhook / Web Chatbot" />
      <FlowArrow />
      <Node label="Ingress Lambda" note="Auth · Rate limit" />
      <FlowArrow />
      <Node label="Consumer Lambda" note="Tenant-aware normalization" accent />
      <FlowArrow />
      <Node label="NestJS CRM Service" note="Rules · AI routing · Assign" />
      <FlowArrow />
      <div className="grid grid-cols-2 gap-2">
        <Node label="MongoDB" note="Per-tenant data" />
        <Node label="Redis Cache + WebSocket Fanout" />
      </div>
    </DiagramShell>
  );
}

/** Architecture 2 — WebSocket real-time fanout layer. */
export function WebsocketDiagram() {
  return (
    <DiagramShell>
      <div className="flex justify-center">
        <Node label="Incoming message" note="Any channel" />
      </div>
      <FlowArrow label="emit" />
      <div className="flex justify-center">
        <Node label="NestJS WS Gateway" note="Sessions · sync · receipts" accent />
      </div>

      <div className="mt-2 flex items-center justify-center gap-1 text-slate">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
          fanout
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <Node label="Agent A" note="Connected" />
        <Node label="Agent B" note="Connected" />
        <Node label="Contact" note="Web client" />
      </div>

      <div className="mt-3 rounded-lg border border-hairline bg-surface px-3 py-2 text-center">
        <p className="text-[10px] text-slate">
          API Gateway WebSocket · $connect / $disconnect / $default
        </p>
      </div>
    </DiagramShell>
  );
}

/** Architecture 4 — graph-based RBAC scope resolution. */
export function RbacDiagram() {
  return (
    <DiagramShell>
      <div className="grid grid-cols-4 gap-2">
        <Node label="User" />
        <Node label="Role" />
        <Node label="Team" />
        <Node label="Hierarchy" note="Org graph" accent />
      </div>

      <div className="my-3 flex items-center justify-center gap-2 text-slate">
        <span className="h-px w-10 bg-hairline-strong" />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
          resolves scope
        </span>
        <span className="h-px w-10 bg-hairline-strong" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Node label="All" note="Whole tenant" />
        <Node label="Team" note="Team records" />
        <Node label="Own" note="Created by me" />
      </div>

      <div className="mt-3 rounded-lg border border-hairline bg-surface px-3 py-2 text-center">
        <p className="text-[10px] text-slate">
          Permission layer filters every query &amp; search result
        </p>
      </div>
    </DiagramShell>
  );
}

export function Diagram({ kind }: { kind: string }) {
  if (kind === "websocket") return <WebsocketDiagram />;
  if (kind === "rbac") return <RbacDiagram />;
  return <MessagingDiagram />;
}
