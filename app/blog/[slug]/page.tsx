import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, Kicker, Display } from "@/app/_components/primitives";
import { Reveal } from "@/app/_components/reveal";

// ------------------------------------------------------------- Article metadata
const POSTS = [
  {
    slug: "securing-admin-access-dual-header-impersonation",
    title: "Securing administrative access with a dual-header impersonation framework",
    date: "Aug 2026",
    readingTime: "6 min",
    category: "Systems",
    excerpt:
      "Separating user authentication from dynamic authorization overlays. A deep dive into the dual-header architecture that enables secure administrator impersonation under AWS Cognito.",
    seoTitle: "Securing administrative access with a dual-header impersonation framework — Adesh Yearanty",
    seoDescription: "A deep dive into separating authentication from authorization context during administrative user impersonation under AWS Cognito and NestJS.",
  },
  {
    slug: "kinesis-vs-sqs-messaging-pipeline",
    title: "Why I chose Kinesis over SQS for the messaging pipeline",
    date: "Jun 2025",
    readingTime: "7 min",
    category: "Architecture",
    excerpt:
      "SQS is the default choice. Kinesis was the right one — but only because of one constraint: conversation ordering. A look at the tradeoff and the partitioning strategy that made it work.",
    seoTitle: "Why I chose Kinesis over SQS for the messaging pipeline — Adesh Yearanty",
    seoDescription: "A breakdown of the conversation-ordering constraint that made Kinesis the right choice over SQS, and the two-phase partitioning strategy that solved it.",
  },
  {
    slug: "rbac-system-that-doesnt-lie",
    title: "Designing a RBAC system that doesn't lie to your users",
    date: "May 2025",
    readingTime: "5 min",
    category: "Systems",
    excerpt:
      "Scope-based permissions sound simple until you model a hierarchy and add sharing rules. How I built a graph-based permission layer that stays consistent across microservices.",
    seoTitle: "Designing a RBAC system that doesn't lie to your users — Adesh Yearanty",
    seoDescription: "How to separate action permissions from record visibility, model graph-based hierarchy, and keep authorization consistent across microservices.",
  },
  {
    slug: "redis-version-based-caching",
    title: "Redis version-based caching: a simpler way to invalidate",
    date: "Apr 2025",
    readingTime: "6 min",
    category: "Backend",
    excerpt:
      "TTL-based expiry is unpredictable and cache-busting is ugly. Version-based caching gives you instant, controlled invalidation without either. Here's how it works in practice.",
    seoTitle: "Redis version-based caching: a simpler way to invalidate — Adesh Yearanty",
    seoDescription: "Why version numbers beat pattern scanning for cache invalidation, and how to implement it in a multi-tenant NestJS backend.",
  },
];

// ------------------------------------------------------------- Dynamic Routing Params
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

// ------------------------------------------------------------- Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) {
    return {};
  }
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
    },
  };
}

// ------------------------------------------------------------- SVG Diagram Primitives
const SVGDefs = () => (
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX={8}
      refY={5}
      markerWidth={5}
      markerHeight={5}
      orient="auto-start-reverse"
    >
      <path
        d="M 0 1 L 8 5 L 0 9"
        fill="none"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </marker>
  </defs>
);

function SVGBox({
  x,
  y,
  w,
  h = 36,
  text,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  text: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="var(--color-surface)"
        stroke={accent ? "var(--color-signal)" : "rgba(255, 255, 255, 0.16)"}
        strokeWidth={1}
        className={accent ? "stroke-signal" : "stroke-hairline-strong"}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        className={accent ? "fill-signal font-mono font-medium" : "fill-paper font-mono"}
      >
        {text}
      </text>
    </g>
  );
}

// ------------------------------------------------------------- SVG Arrow Helper
function SVGArrow({
  x1,
  y1,
  x2,
  y2,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(255, 255, 255, 0.24)"
        strokeWidth={1}
        strokeDasharray={label ? "4 4" : undefined}
        markerEnd="url(#arrow)"
      />
      {label && (
        <text
          x={midX}
          y={midY - 4}
          textAnchor="middle"
          fontSize={8}
          className="fill-slate font-mono uppercase tracking-[0.1em]"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// ------------------------------------------------------------- SVG Diagram Components
function Article1Diagram1() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        System architecture overview
      </h4>
      <svg viewBox="0 0 600 590" className="mx-auto w-full max-w-xl h-auto">
        <SVGDefs />
        <SVGBox x={15} y={20} w={110} text="WhatsApp" />
        <SVGBox x={160} y={20} w={110} text="Messenger" />
        <SVGBox x={305} y={20} w={135} text="Instagram DM" />
        <SVGBox x={475} y={20} w={110} text="Web Chat" />

        <line x1={70} y1={56} x2={70} y2={80} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={215} y1={56} x2={215} y2={80} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={372.5} y1={56} x2={372.5} y2={80} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={530} y1={56} x2={530} y2={80} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />

        <line x1={70} y1={80} x2={530} y2={80} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <SVGArrow x1={300} y1={80} x2={300} y2={110} />

        <SVGBox x={150} y={110} w={300} text="Channel-specific adapters" />
        <SVGArrow x1={300} y1={146} x2={300} y2={180} />

        <SVGBox x={150} y={180} w={300} text="Event ingestion" />
        <line x1={300} y1={216} x2={300} y2={250} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} markerEnd="url(#arrow)" />

        <SVGBox x={150} y={250} w={300} text="Kinesis" accent={true} />
        <SVGArrow x1={300} y1={286} x2={300} y2={320} />

        <SVGBox x={150} y={320} w={300} text="Normalization / enrichment" />
        <SVGArrow x1={300} y1={356} x2={300} y2={390} />

        <SVGBox x={150} y={390} w={300} text="Conversation processing" />

        <SVGArrow x1={220} y1={426} x2={175} y2={460} />
        <SVGArrow x1={380} y1={426} x2={425} y2={460} />

        <SVGBox x={100} y={460} w={150} text="MongoDB" />
        <SVGBox x={350} y={460} w={150} text="Socket.IO" />

        <SVGArrow x1={175} y1={496} x2={175} y2={530} />
        <SVGBox x={100} y={530} w={150} text="Async AI consumers" />
      </svg>
    </div>
  );
}

function Article1Diagram2() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Phase 1 — raw ingress path
      </h4>
      <svg viewBox="0 0 500 350" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={100} y={20} w={300} text="Provider Webhook" />
        <SVGArrow x1={250} y1={56} x2={250} y2={90} />

        <SVGBox x={100} y={90} w={300} text="Validate request" />
        <SVGArrow x1={250} y1={126} x2={250} y2={160} />

        <SVGBox x={100} y={160} w={300} text="Build raw event envelope" />
        <SVGArrow x1={250} y1={196} x2={250} y2={230} />

        <SVGBox x={50} y={230} w={400} text="Kinesis · partition: tenantId + sourceId" accent={true} />
        <SVGArrow x1={250} y1={266} x2={250} y2={300} />

        <SVGBox x={100} y={300} w={300} text="Return acknowledgement" />
      </svg>
    </div>
  );
}

function Article1Diagram3() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Phase 2 — enrichment and domain processing
      </h4>
      <svg viewBox="0 0 620 540" className="mx-auto w-full max-w-xl h-auto">
        <SVGDefs />
        <SVGBox x={160} y={20} w={300} text="External Provider" />
        <SVGArrow x1={310} y1={56} x2={310} y2={90} />

        <SVGBox x={160} y={90} w={300} text="Webhook Ingress" />
        <SVGArrow x1={310} y1={126} x2={310} y2={160} />

        <SVGBox x={110} y={160} w={400} text="Raw Event Stream · partition: tenantId + sourceId" accent={true} />
        <SVGArrow x1={310} y1={196} x2={310} y2={230} />

        <SVGBox x={160} y={230} w={300} text="Enrichment Consumer" />

        <SVGArrow x1={310} y1={266} x2={105} y2={300} />
        <SVGArrow x1={310} y1={266} x2={310} y2={300} />
        <SVGArrow x1={310} y1={266} x2={515} y2={300} />

        <SVGBox x={15} y={300} w={180} text="resolve contact" />
        <SVGBox x={210} y={300} w={200} text="resolve/create conversation" />
        <SVGBox x={425} y={300} w={180} text="normalize payload" />

        <line x1={105} y1={336} x2={105} y2={360} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={310} y1={336} x2={310} y2={360} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={515} y1={336} x2={515} y2={360} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={105} y1={360} x2={515} y2={360} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <SVGArrow x1={310} y1={360} x2={310} y2={390} />

        <SVGBox x={90} y={390} w={440} text="Normalized Message Stream · partition: conversationId" accent={true} />
        <SVGArrow x1={310} y1={426} x2={310} y2={460} />

        <SVGBox x={160} y={460} w={300} text="Domain Consumers" />
      </svg>
    </div>
  );
}

function Article1ReconcileDiagram1() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Outbound reconciliation flow
      </h4>
      <svg viewBox="0 0 450 220" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={50} y={15} w={350} text="client_ref_id: ref_abc" />
        <SVGArrow x1={225} y1={51} x2={225} y2={80} />

        <SVGBox x={50} y={80} w={350} text="internal_message_id: msg_123" />
        <SVGArrow x1={225} y1={116} x2={225} y2={145} />

        <SVGBox x={50} y={145} w={350} text="platform_message_id: wamid...." />
      </svg>
    </div>
  );
}

function Article1ReconcileDiagram2() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Delivery lifecycle transitions
      </h4>
      <svg viewBox="0 0 400 220" className="mx-auto w-full max-w-xs h-auto">
        <SVGDefs />
        <SVGBox x={100} y={15} w={200} text="sent" />
        <SVGArrow x1={200} y1={51} x2={200} y2={80} />

        <SVGBox x={100} y={80} w={200} text="delivered" />
        <SVGArrow x1={200} y1={116} x2={200} y2={145} />

        <SVGBox x={100} y={145} w={200} text="read" />
      </svg>
    </div>
  );
}

function Article1AiDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        AI execution path
      </h4>
      <svg viewBox="0 0 600 480" className="mx-auto w-full max-w-xl h-auto">
        <SVGDefs />
        <SVGBox x={150} y={15} w={300} text="Inbound Message" />
        <SVGArrow x1={300} y1={51} x2={300} y2={75} />

        <SVGBox x={150} y={75} w={300} text="Persist message" />

        <SVGArrow x1={300} y1={93} x2={420} y2={93} label="trigger" />
        <SVGBox x={420} y={75} w={165} text="Real-time agent update" />

        <SVGArrow x1={300} y1={111} x2={300} y2={145} />
        <SVGBox x={150} y={145} w={300} text="AI decision consumer" />

        <SVGArrow x1={300} y1={181} x2={300} y2={210} />
        <g>
          <rect x={160} y={210} width={280} height={120} rx={6} fill="var(--color-surface)" stroke="rgba(255, 255, 255, 0.16)" strokeWidth={1} className="stroke-hairline-strong" />
          <text x={180} y={235} fontSize={11} className="fill-mist font-mono">├── should AI respond?</text>
          <text x={180} y={260} fontSize={11} className="fill-mist font-mono">├── is automation enabled?</text>
          <text x={180} y={285} fontSize={11} className="fill-mist font-mono">├── does agent own conversation?</text>
          <text x={180} y={310} fontSize={11} className="fill-mist font-mono">└── what context is required?</text>
        </g>

        <SVGArrow x1={300} y1={330} x2={300} y2={365} />
        <SVGBox x={150} y={365} w={300} text="Generate response" />
        <SVGArrow x1={300} y1={401} x2={300} y2={430} />

        <SVGBox x={150} y={430} w={300} text="Outbound event stream" />
      </svg>
    </div>
  );
}

function Article2Diagram1() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Permission vs visibility — two separate concerns
      </h4>
      <svg viewBox="0 0 500 320" className="mx-auto w-full max-w-md h-auto">
        <text x={120} y={25} textAnchor="middle" fontSize={11} className="fill-slate font-mono uppercase tracking-[0.15em]">
          Role permissions
        </text>
        <SVGBox x={20} y={45} w={200} text="can read?" />
        <SVGBox x={20} y={95} w={200} text="can create?" />
        <SVGBox x={20} y={145} w={200} text="can edit?" />
        <SVGBox x={20} y={195} w={200} text="can delete?" />

        <line x1={250} y1={10} x2={250} y2={300} stroke="rgba(255, 255, 255, 0.16)" strokeWidth={1} />

        <text x={380} y={25} textAnchor="middle" fontSize={11} className="fill-slate font-mono uppercase tracking-[0.15em]">
          Visibility model
        </text>
        <SVGBox x={280} y={45} w={200} text="self" />
        <SVGBox x={280} y={95} w={200} text="team" />
        <SVGBox x={280} y={145} w={200} text="hierarchy" />
        <SVGBox x={280} y={195} w={200} text="sharing rules" />
        <SVGBox x={280} y={245} w={200} text="tenant-wide" />
      </svg>
    </div>
  );
}

function Article2Diagram2() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Hierarchy resolution flow
      </h4>
      <svg viewBox="0 0 500 480" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={150} y={15} w={200} text="User" />
        <SVGArrow x1={250} y1={51} x2={250} y2={80} />

        <SVGBox x={150} y={80} w={200} text="Role + Scope" />
        <SVGArrow x1={250} y1={116} x2={250} y2={145} />

        <SVGBox x={130} y={145} w={240} text="Hierarchy Resolver" accent={true} />

        <SVGArrow x1={250} y1={181} x2={140} y2={210} />
        <SVGArrow x1={250} y1={181} x2={360} y2={210} />

        <SVGBox x={50} y={210} w={180} text="direct reports" />
        <SVGBox x={270} y={210} w={180} text="descendant subtree" />

        <line x1={140} y1={246} x2={140} y2={270} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={360} y1={246} x2={360} y2={270} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={140} y1={270} x2={360} y2={270} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <SVGArrow x1={250} y1={270} x2={250} y2={295} />

        <SVGBox x={150} y={295} w={200} text="Team Resolver" />
        <SVGArrow x1={250} y1={331} x2={250} y2={360} />

        <SVGBox x={130} y={360} w={240} text="Sharing Rule Resolver" />
        <SVGArrow x1={250} y1={396} x2={250} y2={425} />

        <SVGBox x={100} y={425} w={300} text="Effective Visibility Context" />
      </svg>
    </div>
  );
}

function Article2Diagram3() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Request authorization path
      </h4>
      <svg viewBox="0 0 600 480" className="mx-auto w-full max-w-xl h-auto">
        <SVGDefs />
        <SVGBox x={175} y={15} w={250} text="Authentication header" />
        <SVGArrow x1={300} y1={51} x2={300} y2={80} />

        <SVGBox x={175} y={80} w={250} text="Validate token" />
        <SVGArrow x1={300} y1={116} x2={300} y2={145} />

        <SVGBox x={150} y={145} w={300} text="Extract sub (authenticated subject)" />
        <SVGArrow x1={300} y1={181} x2={300} y2={210} />

        <SVGBox x={150} y={210} w={300} text="Central Policy Evaluation" accent={true} />

        <SVGArrow x1={300} y1={246} x2={77.5} y2={280} />
        <SVGArrow x1={300} y1={246} x2={195} y2={280} />
        <SVGArrow x1={300} y1={246} x2={285} y2={280} />
        <SVGArrow x1={300} y1={246} x2={462.5} y2={280} />

        <SVGBox x={10} y={280} w={135} text="role permissions" />
        <SVGBox x={155} y={280} w={80} text="action" />
        <SVGBox x={245} y={280} w={80} text="scope" />
        <SVGBox x={335} y={280} w={255} text="hierarchy + teams + sharing" />

        <line x1={77.5} y1={316} x2={77.5} y2={340} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={195} y1={316} x2={195} y2={340} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={285} y1={316} x2={285} y2={340} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={462.5} y1={316} x2={462.5} y2={340} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <line x1={77.5} y1={340} x2={462.5} y2={340} stroke="rgba(255, 255, 255, 0.24)" strokeWidth={1} />
        <SVGArrow x1={300} y1={340} x2={300} y2={365} />

        <SVGBox x={150} y={365} w={300} text="Effective Access Context" />

        <SVGArrow x1={300} y1={401} x2={77.5} y2={430} />
        <SVGArrow x1={300} y1={401} x2={222.5} y2={430} />
        <SVGArrow x1={300} y1={401} x2={367.5} y2={430} />
        <SVGArrow x1={300} y1={401} x2={517.5} y2={430} />

        <SVGBox x={10} y={430} w={135} text="CRUD services" />
        <SVGBox x={155} y={430} w={135} text="Listing queries" />
        <SVGBox x={300} y={430} w={135} text="Search filters" />
        <SVGBox x={445} y={430} w={145} text="UI hints" />
      </svg>
    </div>
  );
}

function Article2AuthDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Authorization request lifecycle
      </h4>
      <svg viewBox="0 0 500 440" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={100} y={15} w={300} text="Authorization header" />
        <SVGArrow x1={250} y1={51} x2={250} y2={75} />

        <SVGBox x={100} y={75} w={300} text="Validate token" />
        <SVGArrow x1={250} y1={111} x2={250} y2={135} />

        <SVGBox x={100} y={135} w={300} text="Extract sub" />
        <SVGArrow x1={250} y1={171} x2={250} y2={195} />

        <SVGBox x={100} y={195} w={300} text="Resolve authorization policy" />
        <SVGArrow x1={250} y1={231} x2={250} y2={255} />

        <SVGBox x={100} y={255} w={300} text="Allow / deny" />
        <SVGArrow x1={250} y1={291} x2={250} y2={315} />

        <SVGBox x={100} y={315} w={300} text="Apply visibility constraints" />
        <SVGArrow x1={250} y1={351} x2={250} y2={375} />

        <SVGBox x={100} y={375} w={300} text="Execute operation" />
      </svg>
    </div>
  );
}

function Article2FilterDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Authorized database query flow
      </h4>
      <svg viewBox="0 0 400 220" className="mx-auto w-full max-w-xs h-auto">
        <SVGDefs />
        <SVGBox x={100} y={15} w={200} text="Policy context" />
        <SVGArrow x1={200} y1={51} x2={200} y2={80} />

        <SVGBox x={100} y={80} w={200} text="Build authorized query" />
        <SVGArrow x1={200} y1={116} x2={200} y2={145} />

        <SVGBox x={100} y={145} w={200} text="Database" />
      </svg>
    </div>
  );
}

function Article3IntroDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Standard read-through cache sequence
      </h4>
      <svg viewBox="0 0 500 360" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={150} y={15} w={200} text="Request" />
        <SVGArrow x1={250} y1={51} x2={250} y2={80} />

        <SVGBox x={150} y={80} w={200} text="Check Redis" />

        <SVGArrow x1={350} y1={98} x2={390} y2={98} label="hit" />
        <SVGBox x={390} y={80} w={90} text="return" />

        <SVGArrow x1={250} y1={116} x2={250} y2={155} label="miss" />
        <SVGBox x={150} y={155} w={200} text="Database" />
        <SVGArrow x1={250} y1={191} x2={250} y2={225} />

        <SVGBox x={150} y={225} w={200} text="Cache result" />
        <SVGArrow x1={250} y1={261} x2={250} y2={295} />

        <SVGBox x={150} y={295} w={200} text="Return" />
      </svg>
    </div>
  );
}

function Article3ReadDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Version-based cache read path
      </h4>
      <svg viewBox="0 0 500 480" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={150} y={15} w={200} text="READ" />
        <SVGArrow x1={250} y1={51} x2={250} y2={80} />

        <SVGBox x={150} y={80} w={200} text="Get logical version" />
        <SVGArrow x1={250} y1={116} x2={250} y2={145} />

        <SVGBox x={150} y={145} w={200} text="Build versioned key" />
        <SVGArrow x1={250} y1={181} x2={250} y2={210} />

        <SVGBox x={150} y={210} w={200} text="Check Redis" />

        <SVGArrow x1={350} y1={228} x2={390} y2={228} label="hit" />
        <SVGBox x={390} y={210} w={90} text="return" />

        <SVGArrow x1={250} y1={246} x2={250} y2={290} label="miss" />
        <SVGBox x={150} y={290} w={200} text="Database" />
        <SVGArrow x1={250} y1={326} x2={250} y2={355} />

        <SVGBox x={150} y={355} w={200} text="Cache with TTL" />
        <SVGArrow x1={250} y1={391} x2={250} y2={420} />

        <SVGBox x={150} y={420} w={200} text="Return" />
      </svg>
    </div>
  );
}

function Article3WriteDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Version-based cache write path
      </h4>
      <svg viewBox="0 0 400 280" className="mx-auto w-full max-w-xs h-auto">
        <SVGDefs />
        <SVGBox x={100} y={15} w={200} text="WRITE" />
        <SVGArrow x1={200} y1={51} x2={200} y2={80} />

        <SVGBox x={100} y={80} w={200} text="Update database" />
        <SVGArrow x1={200} y1={116} x2={200} y2={145} />

        <SVGBox x={100} y={145} w={200} text="Increment logical version" accent={true} />
        <SVGArrow x1={200} y1={181} x2={200} y2={210} />

        <SVGBox x={100} y={210} w={200} text="Return" />
      </svg>
    </div>
  );
}

function Article3Diagram1() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Standard cache invalidation — the problem
      </h4>
      <svg viewBox="0 0 500 240" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={150} y={15} w={200} text="contacts updated" />
        <SVGArrow x1={250} y1={51} x2={250} y2={80} />

        <SVGBox x={50} y={80} w={400} text="find keys matching: tenant-42:contacts:*" />
        <SVGArrow x1={250} y1={116} x2={250} y2={145} />

        <SVGBox x={150} y={145} w={200} text="delete all matches" />

        <text x={250} y={215} textAnchor="middle" fontSize={11} className="fill-slate font-mono text-center">
          "As keyspace grows, discovery cost scales with cached query variants"
        </text>
      </svg>
    </div>
  );
}

function Article3Diagram2() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Version-based invalidation — before and after
      </h4>
      <svg viewBox="0 0 540 380" className="mx-auto w-full max-w-md h-auto">
        <SVGDefs />
        <text x={120} y={25} textAnchor="middle" fontSize={11} className="fill-slate font-mono uppercase tracking-[0.15em]">
          Before (pattern delete)
        </text>
        <SVGBox x={20} y={45} w={200} text="WRITE" />
        <SVGArrow x1={120} y1={81} x2={120} y2={100} />
        <SVGBox x={20} y={100} w={200} text="Update database" />
        <SVGArrow x1={120} y1={136} x2={120} y2={155} />
        <SVGBox x={20} y={155} w={200} text="SCAN Redis keyspace" />
        <SVGArrow x1={120} y1={191} x2={120} y2={210} />
        <SVGBox x={20} y={210} w={200} text="Find matching keys" />
        <SVGArrow x1={120} y1={246} x2={120} y2={265} />
        <SVGBox x={20} y={265} w={200} text="Delete batches" />
        <SVGArrow x1={120} y1={301} x2={120} y2={320} />
        <SVGBox x={20} y={320} w={200} text="Done" />

        <line x1={270} y1={10} x2={270} y2={360} stroke="rgba(255, 255, 255, 0.16)" strokeWidth={1} />

        <text x={420} y={25} textAnchor="middle" fontSize={11} className="fill-slate font-mono uppercase tracking-[0.15em]">
          After (version bump)
        </text>
        <SVGBox x={320} y={45} w={200} text="WRITE" />
        <SVGArrow x1={420} y1={81} x2={420} y2={100} />
        <SVGBox x={320} y={100} w={200} text="Update database" />
        <SVGArrow x1={420} y1={136} x2={420} y2={155} />
        <SVGBox x={320} y={155} w={200} text="INCR dataset version" accent={true} />
        <SVGArrow x1={420} y1={191} x2={420} y2={210} />
        <SVGBox x={320} y={210} w={200} text="Done" />
      </svg>
    </div>
  );
}

function Article3Diagram3() {
  return (
    <div className="my-10 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Version lifecycle
      </h4>
      <svg viewBox="0 0 650 160" className="mx-auto w-full max-w-xl h-auto">
        <SVGDefs />
        <text x={20} y={35} fontSize={12} className="fill-slate font-mono">v15</text>
        <SVGBox x={60} y={15} w={320} text="key: tenant-42:contacts:v15:list:..." />
        <text x={400} y={37} fontSize={12} className="fill-slate font-mono">→</text>
        <text x={425} y={37} fontSize={11} className="fill-slate font-mono uppercase tracking-wide">unreachable</text>
        <text x={530} y={37} fontSize={12} className="fill-slate font-mono">→</text>
        <text x={555} y={37} fontSize={11} className="fill-slate font-mono uppercase tracking-wide">TTL cleanup</text>

        <text x={20} y={85} fontSize={12} className="fill-slate font-mono">v16</text>
        <SVGBox x={60} y={65} w={320} text="key: tenant-42:contacts:v16:list:..." />
        <text x={400} y={87} fontSize={12} className="fill-slate font-mono">→</text>
        <text x={425} y={87} fontSize={11} className="fill-slate font-mono uppercase tracking-wide">unreachable</text>
        <text x={530} y={87} fontSize={12} className="fill-slate font-mono">→</text>
        <text x={555} y={87} fontSize={11} className="fill-slate font-mono uppercase tracking-wide">TTL cleanup</text>

        <text x={20} y={135} fontSize={12} className="fill-signal font-mono font-bold">v17</text>
        <SVGBox x={60} y={115} w={320} text="key: tenant-42:contacts:v17:list:..." accent={true} />
        <text x={400} y={137} fontSize={12} className="fill-signal font-mono">→</text>
        <text x={425} y={137} fontSize={11} className="fill-signal font-mono uppercase tracking-wide font-semibold">CURRENT</text>
        <text x={530} y={137} fontSize={12} className="fill-signal font-mono">←</text>
        <text x={555} y={137} fontSize={11} className="fill-signal font-mono uppercase tracking-wide font-semibold">all new reads</text>
      </svg>
    </div>
  );
}

function Article3ScanDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Wildcard keyspace deletion pattern
      </h4>
      <svg viewBox="0 0 450 220" className="mx-auto w-full max-w-sm h-auto">
        <SVGDefs />
        <SVGBox x={50} y={15} w={350} text="contacts updated" />
        <SVGArrow x1={225} y1={51} x2={225} y2={80} />

        <SVGBox x={50} y={80} w={350} text="find keys matching: tenant-42:contacts:*" />
        <SVGArrow x1={225} y1={116} x2={225} y2={145} />

        <SVGBox x={50} y={145} w={350} text="delete all matches" />
      </svg>
    </div>
  );
}

function Article4ImpersonationDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-hairline bg-surface/20 p-6 sm:p-8">
      <h4 className="mb-6 text-sm font-semibold tracking-tight text-paper text-center">
        Dual-Header Impersonation Overlay Flow
      </h4>
      <svg viewBox="0 0 550 360" className="mx-auto w-full max-w-md h-auto">
        <SVGDefs />
        {/* Top: Incoming Headers */}
        <text x={275} y={20} textAnchor="middle" className="fill-slate font-mono text-[10px] uppercase tracking-wider">
          Client Requests (Dual-Header)
        </text>
        <SVGBox x={20} y={40} w={230} text="Authorization: Bearer [Admin JWT]" />
        <SVGBox x={300} y={40} w={230} text="X-Impersonation-Token: [Imp JWT]" accent={true} />

        {/* Arrows to verification */}
        <SVGArrow x1={135} y1={76} x2={135} y2={130} label="auth" />
        <SVGArrow x1={415} y1={76} x2={415} y2={130} label="overlay" />

        {/* Verification Layers */}
        <SVGBox x={20} y={130} w={230} text="Cognito JWT Validation" />
        <SVGBox x={300} y={130} w={230} text="Impersonation Service (Redis Check)" accent={true} />

        {/* Dynamic lookup arrow for Redis session validation */}
        <path d="M 415 166 L 415 200" stroke="rgba(255, 255, 255, 0.16)" strokeDasharray="4 4" markerEnd="url(#arrow)" />
        <text x={425} y={188} className="fill-slate font-mono text-[9px] uppercase">Session Store</text>
        <SVGBox x={330} y={200} w={170} text="Redis: session:imp:[id]" h={30} />

        {/* Connect back from Redis check */}
        <path d="M 415 230 L 415 270" stroke="rgba(255, 255, 255, 0.16)" markerEnd="url(#arrow)" />
        <path d="M 135 166 L 135 270" stroke="rgba(255, 255, 255, 0.16)" markerEnd="url(#arrow)" />

        {/* Bottom: Resolved microservice context */}
        <rect
          x={80}
          y={270}
          width={390}
          height={70}
          rx={8}
          fill="var(--color-surface)"
          stroke="var(--color-signal)"
          strokeWidth={1}
          className="stroke-signal"
        />
        <text x={275} y={292} textAnchor="middle" className="fill-signal font-mono text-[11px] font-bold uppercase tracking-wider">
          Resolved Service Context (req)
        </text>
        <text x={95} y={312} className="fill-paper font-mono text-[10px]">
          req.actor = Platform Administrator (Sub)
        </text>
        <text x={95} y={328} className="fill-signal font-mono text-[10px] font-medium">
          req.user  = Impersonated Tenant User (Sub)
        </text>
      </svg>
    </div>
  );
}

// ------------------------------------------------------------- Article Pages Content
const ARTICLE_1 = (
  <>
    <p>
      SQS is usually the first AWS service I consider when I need to move work out of a
      synchronous request path.
    </p>
    <p>
      It is simple, durable, scalable, and operationally boring in the best possible way. A
      producer sends a message, a consumer processes it, and the queue absorbs
      temporary differences in throughput.
    </p>
    <p>For many systems, that is exactly what I want.</p>
    <p>
      But while designing{" "}
      <Link href="/work" className="underline text-paper hover:text-signal transition-colors">
        SalesAstra
      </Link>{" "}
      — an omnichannel, AI-first messaging platform handling channels such as WhatsApp,
      Facebook Messenger, Instagram DM, and Web Chat — I ran into a constraint that changed the
      decision:
    </p>
    <p className="font-semibold text-paper">
      messages belonging to the same conversation had to be processed in order.
    </p>
    <p>That sounds obvious until the system becomes asynchronous.</p>
    <p>
      A conversation is not just a collection of independent jobs. It is an ordered state
      transition.
    </p>
    <p>Consider a simple sequence:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`10:00:01 Customer sends message A
10:00:02 Customer sends message B
10:00:03 Agent sends reply C
10:00:04 Provider reports C as delivered
10:00:05 Provider reports C as read`}
      </code>
    </pre>
    <p>
      If those events are processed out of order, the database can temporarily — or
      permanently — represent a state that never existed.
    </p>
    <p>
      A read receipt may arrive before the corresponding outbound message has been
      reconciled. An AI consumer may generate a reply using stale conversation context. A
      WebSocket event may show message B before message A. A retry may overwrite a
      newer status with an older one.
    </p>
    <p>The requirement was therefore not:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      process every message globally in order.
    </p>
    <p>That would be expensive and unnecessary.</p>
    <p>The actual requirement was:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      preserve ordering inside the smallest domain boundary where ordering matters.
    </p>
    <p>
      For Pulse, that boundary is primarily the <strong>conversation</strong>.
    </p>
    <p>That requirement is what pushed the architecture toward Amazon Kinesis.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The system I was actually designing
    </h2>
    <p>Pulse owns the messaging domain around:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>contacts</li>
      <li>conversations</li>
      <li>messages</li>
      <li>inbound channel events</li>
      <li>outbound messages</li>
      <li>delivery and read statuses</li>
      <li>real-time agent updates</li>
      <li>asynchronous AI processing</li>
    </ul>

    <Article1Diagram1 />

    <p>MongoDB stores the domain state.</p>
    <p>NestJS services handle the backend processing.</p>
    <p>
      Socket.IO already provides real-time communication to the application, so I deliberately
      avoided introducing a second WebSocket architecture through API Gateway WebSocket APIs.
      Running two independent real-time systems would have created additional connection
      management, authentication, scaling, and operational overhead.
    </p>
    <p>
      The asynchronous path needed to support multiple external transports while keeping the
      internal domain consistent.
    </p>
    <p>The important architectural principle is that channel-specific payloads should not leak
      throughout the system.</p>
    <p>WhatsApp has one event structure. Instagram has another. Messenger has another. Web Chat is under our own control.</p>
    <p>Internally, they are normalized into a common Pulse message model.</p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`interface PulseMessage {
  tenantId: string;
  conversationId: string;
  channel: 'whatsapp' | 'messenger' | 'instagram' | 'webchat';
  direction: 'inbound' | 'outbound';
  senderId: string;
  recipientId: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
  content: unknown;
  occurredAt: string;
}`}
      </code>
    </pre>
    <p>This gives downstream consumers a stable contract regardless of the original provider.</p>
    <p>But normalization alone does not solve ordering.</p>
    <p>The partitioning strategy does.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Why plain SQS was not enough
    </h2>
    <p>
      Standard SQS gives excellent scalability and durability, but strict ordering is not its core
      guarantee.
    </p>
    <p>For independent background jobs, that is fine.</p>
    <p>For conversation state, it is not.</p>
    <p>Suppose the customer sends:</p>
    <p className="text-paper italic pl-4 border-l border-hairline-strong">
      A: "I was charged twice"<br />
      B: "The second transaction is TX-9281"
    </p>
    <p>If parallel consumers process B before A, several things can go wrong.</p>
    <p>The UI can display the messages incorrectly.</p>
    <p>An AI consumer can evaluate B without the context established by A.</p>
    <p>
      Conversation metadata such as{" "}
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        lastMessageAt
      </code>{" "}
      or preview text can be updated inconsistently.
    </p>
    <p>Automation rules can run against an incomplete sequence.</p>
    <p>The obvious response is to use SQS FIFO.</p>
    <p>
      That is a valid option, and I did not reject it because it is bad technology. I rejected the
      idea of treating the pipeline as a simple queue because the broader architecture was
      becoming an ordered event stream with multiple independent consumers.
    </p>
    <p>Pulse needed more than one worker taking jobs from a queue.</p>
    <p>The same message lifecycle could feed:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>persistence</li>
      <li>real-time delivery</li>
      <li>AI decisioning</li>
      <li>analytics</li>
      <li>audit processing</li>
      <li>indexing</li>
      <li>future automation consumers</li>
    </ul>
    <p>That distinction matters.</p>
    <p>A queue primarily asks:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      who should process this job?
    </p>
    <p>A stream architecture also asks:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      which consumers need to independently observe this event sequence?
    </p>
    <p>For Pulse, the second question became increasingly important.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The real reason Kinesis fit: partition-local ordering
    </h2>
    <p>Kinesis provides ordering within a shard.</p>
    <p>The partition key determines how records are distributed.</p>
    <p>
      That means the architecture can intentionally place related events into the same
      ordered path.
    </p>
    <p>Once a conversation is known, the natural key is:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        partitionKey = conversationId
      </code>
    </p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`await kinesis.send(
  new PutRecordCommand({
    StreamName: 'pulse-message-stream',
    PartitionKey: conversationId,
    Data: Buffer.from(JSON.stringify(event)),
  }),
);`}
      </code>
    </pre>
    <p>Now imagine three conversations:</p>
    <p className="font-mono text-sm text-slate">
      Conversation A: A1 → A2 → A3<br />
      Conversation B: B1 → B2<br />
      Conversation C: C1 → C2 → C3
    </p>
    <p>The system does not require this:</p>
    <p className="font-mono text-sm text-slate">
      A1 → B1 → C1 → A2 → C2 → B2 → A3 → C3
    </p>
    <p>There is no business value in globally ordering unrelated conversations.</p>
    <p>What matters is:</p>
    <p className="font-mono text-sm text-slate">
      A1 → A2 → A3<br />
      B1 → B2<br />
      C1 → C2 → C3
    </p>
    <p>
      Each conversation maintains its own order while unrelated conversations can scale
      independently.
    </p>
    <p>That is the key tradeoff.</p>
    <p>
      Global ordering would reduce concurrency. No ordering would weaken
      correctness. Conversation-level partitioning gives the system the ordering
      boundary it actually needs.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The bootstrap problem: what if the conversation does not exist yet?
    </h2>
    <p>There is an important complication.</p>
    <p>An inbound webhook does not always arrive with an internal Pulse conversationId.</p>
    <p>A provider may send:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>tenant-related channel information</li>
      <li>external sender ID</li>
      <li>page or phone number ID</li>
      <li>provider message ID</li>
      <li>channel-specific metadata</li>
    </ul>
    <p>But conversationId is an internal domain identifier.</p>
    <p>So the ingress path cannot always immediately use:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        partitionKey = conversationId
      </code>
    </p>
    <p>This led to a two-phase ingestion design.</p>

    <h3 className="text-xl font-semibold tracking-tight text-paper mt-8 mb-3">
      Phase 1: raw ingress
    </h3>
    <p>The webhook path should remain fast.</p>
    <p>
      I did not want every provider webhook to perform multiple database operations before
      acknowledging the request.
    </p>
    <p>
      The ingress layer therefore accepts the external event and publishes a raw event using
      a stable source-oriented partition key such as:
    </p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        tenantId + sourceId
      </code>
    </p>
    <p>For example:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        tenant-42:whatsapp-phone-17
      </code>
    </p>
    <p>The raw path looks like this:</p>

    <Article1Diagram2 />

    <p>
      The goal is to keep ingress close to O(1) with respect to application-side domain work.
      No conversation reconstruction.
      No AI processing.
      No expensive fan-out.
      No unnecessary synchronous dependency chain.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h3 className="text-xl font-semibold tracking-tight text-paper mt-8 mb-3">
      Phase 2: enrichment and conversation resolution
    </h3>
    <p>A downstream consumer takes the raw event and resolves the internal domain context.</p>
    <p>It can:</p>
    <ol className="list-decimal list-inside space-y-2 text-mist pl-2">
      <li>identify the tenant</li>
      <li>identify the channel account</li>
      <li>resolve the contact</li>
      <li>find or create the conversation</li>
      <li>normalize the provider payload</li>
      <li>emit the enriched event downstream</li>
    </ol>
    <p>At that point, the system knows the actual conversationId.</p>
    <p>The enriched event can then use:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        partitionKey = conversationId
      </code>
    </p>
    <p>The architecture becomes:</p>

    <Article1Diagram3 />

    <p>This separation solved two different problems with two different keys.</p>
    <p>The raw ingress stage needs stable ordering before the internal conversation exists.</p>
    <p>The domain stage needs conversation-local ordering after enrichment.</p>
    <p>
      Trying to force one partitioning strategy onto both phases would have made the design
      weaker.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Why I did not put database work in the webhook
    </h2>
    <p>It is tempting to write:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`Webhook
→ query tenant
→ query channel
→ query contact
→ query conversation
→ create conversation if missing
→ insert message
→ invoke AI
→ emit WebSocket event
→ return 200`}
      </code>
    </pre>
    <p>It is also a fragile request path.</p>
    <p>Every dependency increases latency and creates another failure mode.</p>
    <p>If MongoDB slows down, webhook acknowledgement slows down.</p>
    <p>If AI processing slows down, webhook acknowledgement slows down.</p>
    <p>
      If a downstream service times out, the provider may retry an event that was partially
      processed.
    </p>
    <p>That creates duplicate handling and more reconciliation work.</p>
    <p>The ingestion boundary should therefore do as little domain work as possible.</p>
    <p>The stream absorbs the event first.</p>
    <p>Domain processing happens asynchronously.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Outbound messages created another ordering problem
    </h2>
    <p>Inbound messages are only half the system.</p>
    <p>
      An agent can send an outbound message through Pulse before the external provider
      assigns its final platform message ID.
    </p>
    <p>For example, Pulse may create:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`internal_message_id = msg_123
client_ref_id = ref_abc
platform_message_id = null`}
      </code>
    </pre>
    <p>The outbound adapter sends the message to the provider.</p>
    <p>
      Later, the provider returns or echoes a platform-specific identifier such as a WhatsApp
      message ID.
    </p>
    <p>The system then reconciles:</p>

    <Article1ReconcileDiagram1 />

    <p>After that, delivery lifecycle events may arrive:</p>

    <Article1ReconcileDiagram2 />

    <p>These are not independent jobs.</p>
    <p>They are state transitions on the same logical message.</p>
    <p>That strengthened the case for an ordered event pipeline.</p>
    <p>
      The same inbound/status flow can process later provider events and update the existing
      message rather than creating disconnected records.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      AI had to remain asynchronous
    </h2>
    <p>Pulse is AI-first, but I deliberately did not put AI generation in the critical delivery path.</p>
    <p>The flow is closer to:</p>

    <Article1AiDiagram />

    <p>This is important for both reliability and latency.</p>
    <p>If an LLM provider is slow, inbound message persistence should still succeed.</p>
    <p>If AI generation fails, the conversation should still exist.</p>
    <p>
      If an agent takes over, AI behavior should be controlled by domain state rather than
      being hardwired into webhook processing.
    </p>
    <p>
      The stream architecture gives AI its own consumption path without turning it into a
      blocking dependency.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Kinesis did not remove the need for idempotency
    </h2>
    <p>Ordering is not exactly-once processing.</p>
    <p>That distinction matters.</p>
    <p>A distributed messaging pipeline still needs to assume:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>retries happen</li>
      <li>consumers restart</li>
      <li>providers resend webhooks</li>
      <li>processing can fail after a side effect</li>
      <li>the same logical event can be observed more than once</li>
    </ul>
    <p>So consumers must remain idempotent.</p>
    <p>
      For provider-originated events, a useful deduplication boundary is the external message
      or event ID.
    </p>
    <p>Conceptually:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        tenantId + channel + providerMessageId
      </code>
    </p>
    <p>
      Before creating a new message, the consumer can determine whether the logical event
      has already been applied.
    </p>
    <p>The principle is simple:</p>
    <p className="font-semibold text-paper">
      Kinesis gives me an ordering primitive. It does not eliminate duplicate
      processing semantics.
    </p>
    <p>That is an application responsibility.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Partition keys are a scaling decision, not just an ordering decision
    </h2>
    <p>Using conversationId has a consequence.</p>
    <p>A very hot conversation can become a hot partition.</p>
    <p>That is the tradeoff of preserving strict ordering for that conversation.</p>
    <p>
      But the alternative — distributing messages from the same conversation randomly —
      would improve parallelism by sacrificing the exact guarantee the architecture needs.
    </p>
    <p>The correct question is therefore not:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      which partition key distributes traffic most evenly?
    </p>
    <p>It is:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      what is the smallest key that preserves the business ordering requirement
      while still allowing unrelated work to run concurrently?
    </p>
    <p>
      For Pulse, conversation-level partitioning is a strong fit because most conversations are
      naturally independent.
    </p>
    <p>A tenant-level key would be too coarse:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        partitionKey = tenantId
      </code>
    </p>
    <p>One busy tenant could serialize a huge amount of unrelated conversation traffic.</p>
    <p>A random key would be too loose:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        partitionKey = randomUUID()
      </code>
    </p>
    <p>It would destroy conversation ordering.</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        conversationId
      </code>{" "}
      sits between those extremes.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Why not make Pulse handle everything synchronously?
    </h2>
    <p>Because domain ownership and execution coupling are different things.</p>
    <p>Pulse can own:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>contacts</li>
      <li>conversations</li>
      <li>messages</li>
      <li>message lifecycle</li>
      <li>channel normalization</li>
    </ul>
    <p>without requiring every operation to execute synchronously inside one request.</p>
    <p>
      Similarly, I chose to retain the existing NestJS + Socket.IO real-time layer instead of
      adding API Gateway WebSockets on top of it.
    </p>
    <p>The system already had one real-time mechanism.</p>
    <p>Adding another would mean:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>two connection models</li>
      <li>two authentication flows</li>
      <li>two scaling models</li>
      <li>duplicated event routing concerns</li>
      <li>more operational complexity</li>
    </ul>
    <p>
      For horizontally scaled Socket.IO instances, Redis can be used as the adapter layer so
      events reach clients regardless of which application instance owns the connection.
    </p>
    <p>That keeps the architecture focused:</p>
    <ul className="list-none space-y-2 text-mist pl-2">
      <li><strong>Kinesis</strong> = asynchronous ordered event backbone</li>
      <li><strong>MongoDB</strong> = durable domain state</li>
      <li><strong>Socket.IO</strong> = real-time client delivery</li>
      <li><strong>Redis</strong> = Socket.IO scaling / coordination where required</li>
      <li><strong>NestJS</strong> = domain and processing services</li>
      <li><strong>Next.js</strong> = agent-facing application</li>
    </ul>
    <p>Each component has a clear responsibility.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The tradeoff I accepted
    </h2>
    <p>Kinesis is not automatically better than SQS.</p>
    <p>It is more operationally involved than a simple queue.</p>
    <p>Consumers need to understand:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>shards</li>
      <li>partition keys</li>
      <li>checkpoints</li>
      <li>replay</li>
      <li>iterator behavior</li>
      <li>throughput distribution</li>
      <li>hot partitions</li>
      <li>consumer lag</li>
    </ul>
    <p>A bad partition key can create a bad system.</p>
    <p>A consumer that assumes exactly-once execution can corrupt state.</p>
    <p>A stream retained without a replay strategy is wasted complexity.</p>
    <p>So I would not choose Kinesis just because the system uses the word “event-driven”.</p>
    <p>I chose it because Pulse had a combination of requirements that aligned with an
      ordered stream:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>conversation-local ordering</li>
      <li>independent downstream consumers</li>
      <li>omnichannel normalization</li>
      <li>asynchronous AI processing</li>
      <li>lifecycle events for messages</li>
      <li>replayable processing</li>
      <li>high concurrency across unrelated conversations</li>
    </ul>
    <p>The decisive constraint was ordering.</p>
    <p>The broader event model made the choice worthwhile.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The architecture lesson
    </h2>
    <p>The most useful part of this decision was not “Kinesis is better than SQS”.</p>
    <p>It was learning to define ordering precisely.</p>
    <p>“Messages must be ordered” is too vague.</p>
    <p>A better set of questions is:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>ordered globally?</li>
      <li>ordered per tenant?</li>
      <li>ordered per channel account?</li>
      <li>ordered per contact?</li>
      <li>ordered per conversation?</li>
      <li>ordered only after enrichment?</li>
      <li>what happens before the internal entity exists?</li>
    </ul>
    <p>Once I answered those questions, the architecture became much clearer.</p>
    <p>For Pulse, the final principle was:</p>
    <p className="font-semibold text-paper pl-4 border-l border-signal">
      ingest quickly, resolve domain context asynchronously, normalize channel
      events, then preserve ordering at the conversation boundary.
    </p>
    <p>SQS remains an excellent default.</p>
    <p>
      Kinesis became the right choice only because the messaging domain had an ordering
      constraint that was both real and precisely defined.
    </p>
    <p>
      That is the difference between choosing infrastructure by popularity and choosing it
      from the invariants of the system.
    </p>
  </>
);

const ARTICLE_2 = (
  <>
    <p>Most RBAC implementations look clean in a diagram.</p>
    <p>A user has a role.</p>
    <p>A role has permissions.</p>
    <p>An API checks the permission.</p>
    <p>Done.</p>
    <p>That model works until someone asks a more realistic question:</p>
    <p className="font-semibold text-paper">
      The user can read contacts — but which contacts?
    </p>
    <p>That one question changes the problem completely.</p>
    <p>
      In{" "}
      <Link href="/work" className="underline text-paper hover:text-signal transition-colors">
        SalesAstra
      </Link>
      , access is not only about whether an action is allowed. It is also about the scope within
      which that action is allowed.
    </p>
    <p>A user may be able to:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>view only their own records</li>
      <li>view records owned by members of their team</li>
      <li>view records visible through hierarchy</li>
      <li>view records explicitly shared with them</li>
      <li>view records exposed by sharing rules</li>
      <li>view every record in the tenant</li>
    </ul>
    <p>At that point, a boolean permission is no longer enough.</p>
    <p>This:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "contacts.read": true
}`}
      </code>
    </pre>
    <p>is technically valid and operationally misleading.</p>
    <p>It tells the application that the user can read contacts.</p>
    <p>It says nothing about which contacts.</p>
    <p>That is how authorization systems start lying to users.</p>

    <hr className="border-t border-hairline my-12" />

    <p>
      The UI shows a module because the permission says “allowed”. The list API returns
      fewer records because another visibility rule exists somewhere else. A search endpoint
      returns records that the normal list endpoint hides. One microservice interprets “team”
      differently from another.
    </p>
    <p>
      The user experiences inconsistent behavior even though every individual service
      believes it is enforcing permissions correctly.
    </p>
    <p>I wanted to avoid that.</p>
    <p>The architecture I settled on separates two concerns that are often incorrectly merged:</p>
    <ol className="list-decimal list-inside space-y-2 text-mist pl-2">
      <li>What actions can this user perform?</li>
      <li>Which records are visible to this user?</li>
    </ol>
    <p>That distinction became the foundation of the policy layer.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Permission is not visibility
    </h2>
    <p>The role system defines action capability.</p>
    <p>For example:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "module": "contacts",
  "action": "read",
  "allowed": true,
  "scope": 2
}`}
      </code>
    </pre>
    <p>In our model, scope values represent boundaries such as:</p>
    <p className="font-mono text-sm text-slate">
      1 → own / self<br />
      2 → team / group<br />
      3 → all / any
    </p>
    <p>The exact labels matter less than the principle.</p>
    <p>A role can say:</p>
    <p className="font-mono text-sm text-paper">
      contacts.read = allowed, scope = team
    </p>
    <p>But the role should not permanently store an expanded list such as:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "accessibleUserIds": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ]
}`}
      </code>
    </pre>
    <p>Why?</p>
    <p>Because that list is not actually role data.</p>
    <p>It is derived from mutable organizational state.</p>
    <p>It can change when:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>a manager changes</li>
      <li>a user moves to another team</li>
      <li>hierarchy changes</li>
      <li>a sharing rule changes</li>
      <li>team membership changes</li>
      <li>a role assignment changes</li>
      <li>an explicit sharing relationship changes</li>
    </ul>
    <p>
      So I kept action permissions in RBAC and treated hierarchy and sharing as visibility
      inputs.
    </p>
    <p>That gives a much cleaner separation:</p>

    <Article2Diagram1 />

    <p>
      A manager seeing a subordinate’s record does not automatically mean the manager
      can edit or delete it.
    </p>
    <p>Visibility answers:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      can this record participate in the user’s accessible dataset?
    </p>
    <p>Action permission answers:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      what operation may the user perform?
    </p>
    <p>Those are related questions, but they are not the same question.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Why I centralized policy evaluation
    </h2>
    <p>SalesAstra is composed of multiple services.</p>
    <p>
      Without a centralized policy model, every service eventually implements its own
      interpretation of access.
    </p>
    <p>The Contacts service may write:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`if (user.role === 'manager') {
  // include team
}`}
      </code>
    </pre>
    <p>The Leads service may write:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`if (scope === 2) {
  // include direct reports
}`}
      </code>
    </pre>
    <p>The Search service may write:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`if (user.isAdmin) {
  // bypass filters
}`}
      </code>
    </pre>
    <p>Now there are three authorization systems.</p>
    <p>They may share terminology, but they do not share semantics.</p>
    <p>
      That is dangerous because permission bugs are often not obvious denials. They are
      inconsistencies.
    </p>
    <p>A user can find a record in global search but cannot open it.</p>
    <p>A dashboard counts records that the list API does not show.</p>
    <p>An export includes data hidden in the UI.</p>
    <p>
      One endpoint interprets team scope as direct reports. Another includes the full
      subordinate tree.
    </p>
    <p>
      To avoid that, we already designed a centralized policy endpoint that resolves the
      effective access context.
    </p>
    <p>Conceptually:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        POST /permissions/evaluate
      </code>
    </p>
    <p>or a policy-oriented endpoint with inputs such as:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "userId": "user-123",
  "tenantId": "tenant-456",
  "module": "contacts",
  "action": "read"
}`}
      </code>
    </pre>
    <p>The policy layer resolves the context required by downstream services.</p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "allowed": true,
  "scope": 2,
  "visibility": {
    "self": true,
    "eligibleUserIds": [
      "user-123",
      "user-201",
      "user-202"
    ]
  }
}`}
      </code>
    </pre>
    <p>The exact response can evolve.</p>
    <p>The important point is ownership:</p>
    <p className="font-semibold text-paper">
      hierarchy, team membership, scope interpretation, and sharing-rule resolution
      belong to the policy domain rather than being independently reinvented inside
      every module service.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Permission is not visibility
    </h2>
    <p>The role system defines action capability.</p>
    <p>For example:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "module": "contacts",
  "action": "read",
  "allowed": true,
  "scope": 2
}`}
      </code>
    </pre>
    <p>In our model, scope values represent boundaries such as:</p>
    <p className="font-mono text-sm text-slate">
      1 → own / self<br />
      2 → team / group<br />
      3 → all / any
    </p>
    <p>The exact labels matter less than the principle.</p>
    <p>A role can say:</p>
    <p className="font-mono text-sm text-paper">
      contacts.read = allowed, scope = team
    </p>
    <p>But the role should not permanently store an expanded list such as:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "accessibleUserIds": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ]
}`}
      </code>
    </pre>
    <p>Why?</p>
    <p>Because that list is not actually role data.</p>
    <p>It is derived from mutable organizational state.</p>
    <p>It can change when:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>a manager changes</li>
      <li>a user moves to another team</li>
      <li>hierarchy changes</li>
      <li>a sharing rule changes</li>
      <li>team membership changes</li>
      <li>a role assignment changes</li>
      <li>an explicit sharing relationship changes</li>
    </ul>
    <p>
      So I kept action permissions in RBAC and treated hierarchy and sharing as visibility
      inputs.
    </p>
    <p>That gives a much cleaner separation:</p>

    <Article2Diagram1 />

    <p>
      A manager seeing a subordinate’s record does not automatically mean the manager
      can edit or delete it.
    </p>
    <p>Visibility answers:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      can this record participate in the user’s accessible dataset?
    </p>
    <p>Action permission answers:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      what operation may the user perform?
    </p>
    <p>Those are related questions, but they are not the same question.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Why I centralized policy evaluation
    </h2>
    <p>SalesAstra is composed of multiple services.</p>
    <p>
      Without a centralized policy model, every service eventually implements its own
      interpretation of access.
    </p>
    <p>The Contacts service may write:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`if (user.role === 'manager') {
  // include team
}`}
      </code>
    </pre>
    <p>The Leads service may write:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`if (scope === 2) {
  // include direct reports
}`}
      </code>
    </pre>
    <p>The Search service may write:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`if (user.isAdmin) {
  // bypass filters
}`}
      </code>
    </pre>
    <p>Now there are three authorization systems.</p>
    <p>They may share terminology, but they do not share semantics.</p>
    <p>
      That is dangerous because permission bugs are often not obvious denials. They are
      inconsistencies.
    </p>
    <p>A user can find a record in global search but cannot open it.</p>
    <p>A dashboard counts records that the list API does not show.</p>
    <p>An export includes data hidden in the UI.</p>
    <p>
      One endpoint interprets team scope as direct reports. Another includes the full
      subordinate tree.
    </p>
    <p>
      To avoid that, we already designed a centralized policy endpoint that resolves the
      effective access context.
    </p>
    <p>Conceptually:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        POST /permissions/evaluate
      </code>
    </p>
    <p>or a policy-oriented endpoint with inputs such as:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "userId": "user-123",
  "tenantId": "tenant-456",
  "module": "contacts",
  "action": "read"
}`}
      </code>
    </pre>
    <p>The policy layer resolves the context required by downstream services.</p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "allowed": true,
  "scope": 2,
  "visibility": {
    "self": true,
    "eligibleUserIds": [
      "user-123",
      "user-201",
      "user-202"
    ]
  }
}`}
      </code>
    </pre>
    <p>The exact response can evolve.</p>
    <p>The important point is ownership:</p>
    <p className="font-semibold text-paper">
      hierarchy, team membership, scope interpretation, and sharing-rule resolution
      belong to the policy domain rather than being independently reinvented inside
      every module service.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The request path
    </h2>
    <p>Authentication establishes identity.</p>
    <p>Authorization establishes what that identity can do.</p>
    <p>A typical request arrives with an authorization token.</p>
    <p>The service extracts the authenticated subject from claims:</p>

    <Article2AuthDiagram />

    <p>
      The sub claim identifies the authenticated user.
    </p>
    <p>The service should not trust a client-provided body field such as:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "userId": "someone-else"
}`}
      </code>
    </pre>
    <p>for authorization identity.</p>
    <p>The authenticated principal comes from the verified token context.</p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`const subjectId = req.user.sub;`}
      </code>
    </pre>
    <p>The service then evaluates whether that subject can perform the requested action.</p>
    <p>For example:</p>
    <ul className="list-none space-y-1 font-mono text-sm text-mist pl-2">
      <li>contacts.read</li>
      <li>leads.update</li>
      <li>accounts.delete</li>
      <li>support-cases.assign</li>
    </ul>
    <p>The backend enforces the result.</p>
    <p>The frontend may hide buttons for usability, but hidden UI is not authorization.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Scope changes the query, not just the response code
    </h2>
    <p>
      One of the most important design decisions was that scope should influence the
      database query itself.
    </p>
    <p>Suppose a user requests:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        GET /contacts
      </code>
    </p>
    <p>A weak implementation does this:</p>
    <ol className="list-decimal list-inside space-y-2 text-mist pl-2">
      <li>query all tenant contacts</li>
      <li>load them into memory</li>
      <li>remove unauthorized records</li>
      <li>return the remainder</li>
    </ol>
    <p>That is inefficient and dangerous.</p>
    <p>The better model is:</p>

    <Article2FilterDiagram />

    <p>For own scope:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  tenantId,
  ownerId: subjectId
}`}
      </code>
    </pre>
    <p>For team or hierarchy scope:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  tenantId,
  ownerId: {
    $in: eligibleUserIds
  }
}`}
      </code>
    </pre>
    <p>For all scope:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  tenantId
}`}
      </code>
    </pre>
    <p>Sharing can extend the visibility predicate:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  tenantId,
  $or: [
    { ownerId: { $in: eligibleUserIds } },
    { sharedWithUserIds: subjectId },
    { teamId: { $in: eligibleTeamIds } }
  ]
}`}
      </code>
    </pre>
    <p>
      The exact persistence model depends on the module, but the principle stays the same:
      authorization should constrain the data retrieval boundary, not merely filter
      data after retrieval.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Hierarchy is a graph problem hiding inside an RBAC problem
    </h2>
    <p>Roles are relatively static.</p>
    <p>Hierarchy is not.</p>
    <p>Imagine:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`VP
├── Manager A
│   ├── User A1
│   └── User A2
└── Manager B
    ├── User B1
    └── User B2`}
      </code>
    </pre>
    <p>Now ask:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      What does team scope mean for the VP?
    </p>
    <p>Possible interpretations include:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>only direct reports</li>
      <li>all descendants</li>
      <li>members of explicitly assigned teams</li>
      <li>descendants plus shared records</li>
      <li>descendants only for selected modules</li>
    </ul>
    <p>There is no universally correct answer.</p>
    <p>The policy model must define it.</p>
    <p>
      The important architectural decision is that module services should not each traverse
      the hierarchy independently.
    </p>
    <p>
      If they do, one service will eventually include direct reports while another includes the
      full subtree.
    </p>
    <p>So the policy layer resolves the eligible user set according to one consistent definition.</p>

    <Article2Diagram2 />

    <p>
      That is why I did not want module services to hard-code visibility rules. The policy layer
      resolves those relationships and returns a consistent access context.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Sharing rules complicate everything
    </h2>
    <p>Hierarchy alone is manageable.</p>
    <p>Sharing rules introduce non-hierarchical edges.</p>
    <p>Suppose User A belongs to Team East.</p>
    <p>User B belongs to Team West.</p>
    <p>A sharing rule says:</p>
    <p className="italic text-paper pl-4 border-l border-hairline-strong">
      Opportunities owned by Team East are visible to Sales Managers in Team West
    </p>
    <p>Now visibility is no longer a tree.</p>
    <p>It is a graph.</p>
    <p>A record may be visible because of:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>ownership</li>
      <li>direct team membership</li>
      <li>hierarchy</li>
      <li>role-based sharing</li>
      <li>team-based sharing</li>
      <li>explicit sharing</li>
      <li>tenant-wide scope</li>
    </ul>
    <p>That is why I did not want module services to hard-code visibility rules.</p>
    <p>The policy layer resolves those relationships and returns a consistent access context.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      I deliberately avoided storing final permissions per user
    </h2>
    <p>A common optimization is to calculate everything and save:</p>
    <p className="font-mono text-sm text-paper">
      user → final permissions
    </p>
    <p>I avoided treating that as the source of truth.</p>
    <p>Effective access is derived from multiple changing inputs:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`User
+ role assignments
+ role permissions
+ scope
+ hierarchy
+ team membership
+ sharing rules
= effective access`}
      </code>
    </pre>
    <p>Persisting the final expanded result creates a synchronization problem.</p>
    <p>
      Every change now requires discovering every affected user and rewriting their
      materialized permissions.
    </p>
    <p>Instead, the source of truth remains normalized.</p>
    <p>Derived results can be cached.</p>
    <p>That distinction is important:</p>
    <p className="font-semibold text-paper pl-4 border-l border-signal">
      cache derived authorization state, but do not confuse the cache with the
      authorization model.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The cache needed to be split by reason for change
    </h2>
    <p>One of the better decisions was not caching authorization as one giant object.</p>
    <p>A naive key might be:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        user:123:everything
      </code>
    </p>
    <p>That looks convenient until something changes.</p>
    <p>If a sharing rule changes, should the entire permission cache be invalidated?</p>
    <p>If a hierarchy node moves, should role permissions be recomputed?</p>
    <p>If a role gains contacts.export, should the subordinate tree be rebuilt?</p>
    <p>Those data sets have different invalidation triggers.</p>
    <p>So the model was split conceptually into layers such as:</p>
    <ul className="list-none space-y-1 font-mono text-sm text-mist pl-2">
      <li>user:{"{id}"}:permissions</li>
      <li>user:{"{id}"}:subordinates</li>
      <li>user:{"{id}"}:sharingRules</li>
    </ul>
    <p>Now invalidation follows causality.</p>
    <p><strong>Role permission change</strong>: Invalidate user:{"{id}"}:permissions for users affected by the role.</p>
    <p><strong>User-role assignment change</strong>: Invalidate user:{"{id}"}:permissions for the affected user.</p>
    <p><strong>Hierarchy change</strong>: Invalidate user:{"{id}"}:subordinates for managers whose reachable subtree changed.</p>
    <p><strong>Sharing-rule change</strong>: Invalidate user:{"{id}"}:sharingRules for affected users.</p>
    <p><strong>Team membership change</strong>: Invalidate the visibility-related cache that depends on team membership.</p>
    <p>
      This is much more precise than deleting every authorization key whenever anything
      changes.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Search exposed whether the model was actually consistent
    </h2>
    <p>Global search is where weak authorization designs become obvious.</p>
    <p>A normal module endpoint may enforce visibility correctly:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        GET /contacts
      </code>
    </p>
    <p>
      Then a separate Search service indexes the same contacts and accidentally returns
      everything in the tenant.
    </p>
    <p>The search result now leaks the existence of unauthorized records.</p>
    <p>My decision was not to push a permanently expanded list such as:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "accessibleUsers": [
    "u1",
    "u2",
    "u3"
  ]
}`}
      </code>
    </pre>
    <p>into every OpenSearch document.</p>
    <p>That would couple the search index to mutable authorization topology.</p>
    <p>
      A hierarchy change could require reindexing huge numbers of business records even
      though the business data itself did not change.
    </p>
    <p>Instead:</p>

    <Article2Diagram3 />

    <p>Permission changes update policy state.</p>
    <p>They do not require rewriting every indexed contact, lead, account, or opportunity.</p>
    <p>That separation is critical.</p>
    <p>The index stores searchable business facts.</p>
    <p>The policy layer determines current visibility.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Event-driven invalidation
    </h2>
    <p>Authorization state changes are meaningful domain events.</p>
    <p>Examples include:</p>
    <ul className="list-none space-y-1 font-mono text-sm text-mist pl-2">
      <li>role.changed</li>
      <li>user-role.changed</li>
      <li>scope.changed</li>
      <li>hierarchy.changed</li>
      <li>team.changed</li>
      <li>sharing-rule.changed</li>
    </ul>
    <p>Those events can invalidate the appropriate cached policy context.</p>
    <p>
      This matters in a microservice architecture because the service making the change may
      not be the service holding a derived cache.
    </p>
    <p>Without explicit invalidation events, services drift.</p>
    <p>One service sees the new hierarchy.</p>
    <p>Another continues serving the old team visibility until TTL expiry.</p>
    <p>A third has stale search authorization.</p>
    <p>
      That is exactly the kind of system that appears correct in unit tests but behaves
      inconsistently in production.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Impersonation made the identity model even more important
    </h2>
    <p>
      The same principles become critical when platform administrators can impersonate
      tenant users.
    </p>
    <p>Our existing service flow relies heavily on the authenticated request context:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`token
→ extract sub
→ load permissions/scope
→ authorize action
→ audit using req.user`}
      </code>
    </pre>
    <p>A naive impersonation implementation simply replaces the subject.</p>
    <p>That is dangerous because the system can lose the distinction between:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>who actually initiated the action</li>
      <li>whose permissions are being applied</li>
    </ul>
    <p>Those are separate identities.</p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`actor   = platform administrator
subject = impersonated tenant user`}
      </code>
    </pre>
    <p>
      Authorization may need to execute using the subject’s effective tenant permissions.
    </p>
    <p>Audit must preserve the actor.</p>
    <p>
      Otherwise an administrator could perform an action while the audit trail falsely claims
      that the tenant user initiated it.
    </p>
    <p>That is not a logging detail.</p>
    <p>It is part of the authorization model.</p>
    <p>A trustworthy system must be able to answer both:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      Who performed the action?
    </p>
    <p>and:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      Under whose access context was it executed?
    </p>
    <p>
      If an administrator impersonates a user, the audit trail should not erase the
      administrator's identity.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The frontend should not invent authorization
    </h2>
    <p>Another rule I kept was:</p>
    <p className="font-semibold text-paper">
      the frontend consumes authorization; it does not define authorization.
    </p>
    <p>The frontend can use policy results to:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>hide unavailable actions</li>
      <li>disable buttons</li>
      <li>avoid showing inaccessible navigation</li>
      <li>explain why an action is unavailable</li>
    </ul>
    <p>But the API must still enforce the rule.</p>
    <p>For example:</p>
    <p>
      UI hides Delete is a user-experience decision.
    </p>
    <p>
      API rejects unauthorized DELETE request is security.
    </p>
    <p>Both are useful.</p>
    <p>Only one is authoritative.</p>
    <p>What “doesn’t lie to your users” means:</p>
    <p>A trustworthy authorization system should produce consistent answers across:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>list APIs</li>
      <li>detail APIs</li>
      <li>updates</li>
      <li>deletes</li>
      <li>exports</li>
      <li>dashboards</li>
      <li>global search</li>
      <li>background jobs</li>
      <li>real-time events</li>
    </ul>
    <p>
      If a user cannot access a contact through the Contacts service, global search should
      not expose it.
    </p>
    <p>
      If a sharing rule grants visibility, the list endpoint should not continue hiding the record
      because its local cache is stale.
    </p>
    <p>
      If a manager loses hierarchy access, the change should not require waiting for an
      arbitrary TTL before sensitive records disappear.
    </p>
    <p>
      That consistency is the real goal.
    </p>
    <p>The architecture I ended up with can be summarized as:</p>

    <Article2Diagram3 />

    <p>RBAC was only the starting point.</p>
    <p>The real system is a combination of capability, scope, and graph-derived visibility.</p>
    <p>The biggest lesson was this:</p>
    <p className="font-semibold text-paper pl-4 border-l border-signal">
      allowed: true is not a complete authorization decision when access depends
      on which records the user is allowed to see.
    </p>
    <p>
      Once hierarchy, teams, and sharing enter the system, permissions stop being a table
      lookup.
    </p>
    <p>They become policy evaluation.</p>
    <p>And if every service evaluates that policy differently, the system eventually lies.</p>
  </>
);

const ARTICLE_3 = (
  <>
    <p>Caching is easy until data changes.</p>
    <p>The first version of almost every cache looks reasonable:</p>

    <Article3IntroDiagram />

    <p>That is the easy part.</p>
    <p>The difficult question is:</p>
    <p className="font-semibold text-paper">what happens after a write?</p>
    <p>
      In a multi-tenant backend with filtered lists, pagination, sorting, search, role-aware
      visibility, and multiple service instances, one logical dataset can produce a large number
      of cache keys.
    </p>
    <p>For example:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`dev:contacts:tenant-42:list:page-1
dev:contacts:tenant-42:list:page-2
dev:contacts:tenant-42:list:status-active
dev:contacts:tenant-42:list:owner-u123
dev:contacts:tenant-42:list:sort-createdAt-desc
dev:contacts:tenant-42:list:search-acme`}
      </code>
    </pre>
    <p>Add combinations:</p>
    <p className="font-mono text-sm text-slate">
      page · pageSize · sort · search · filters · owner · team · status · date range
    </p>
    <p>and the keyspace grows quickly.</p>
    <p>Then a contact changes.</p>
    <p>Which keys are stale?</p>
    <p>Potentially all list caches derived from that tenant’s contact dataset.</p>
    <p>This is where our invalidation approach started becoming expensive.</p>
    <p>
      The system could cache quickly but had to spend too much time discovering and
      deleting stale keys.
    </p>
    <p>
      In the failure mode that pushed the redesign, invalidation was taking long enough to
      contribute to slow request paths and timeout behavior.
    </p>
    <p>The cache had become a latency source.</p>
    <p>That is the opposite of why it existed.</p>

    <Article3Diagram1 />

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The first instinct: delete matching keys
    </h2>
    <p>A straightforward invalidation strategy is:</p>

    <Article3ScanDiagram />

    <p>At small scale, this feels fine.</p>
    <p>The dangerous implementation is:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        KEYS tenant-42:contacts:*
      </code>
    </p>
    <p>followed by:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        DEL ...
      </code>
    </p>
    <p>
      I do not consider KEYS a production-safe invalidation strategy for a shared Redis
      workload.
    </p>
    <p>It scans the keyspace synchronously.</p>
    <p>
      As the keyspace grows, the operation can block Redis long enough to affect unrelated
      traffic.
    </p>
    <p>The next improvement is obvious:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        SCAN MATCH pattern COUNT 100
      </code>
    </p>
    <p>Unlike KEYS, SCAN is incremental.</p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`let cursor = '0';
do {
  const [nextCursor, keys] = await redis.scan(
    cursor,
    'MATCH',
    pattern,
    'COUNT',
    100,
  );
  cursor = nextCursor;
  if (keys.length > 0) {
    await redis.del(...keys);
  }
} while (cursor !== '0');`}
      </code>
    </pre>
    <p>That is much safer than KEYS.</p>
    <p>
      And in an earlier stage of the design, moving to a SCAN-based{" "}
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        invalidateByPattern(pattern)
      </code>{" "}
      approach was the correct improvement.
    </p>
    <p>But “safer than KEYS” does not mean “free”.</p>
    <p>That distinction became important.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      SCAN solved blocking, not discovery cost
    </h2>
    <p>Suppose a write invalidates:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        dev:contacts:tenant-42:*
      </code>
    </p>
    <p>Redis still has to iterate through the keyspace to discover matching keys.</p>
    <p>The application still has to:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>maintain a cursor</li>
      <li>perform repeated round trips</li>
      <li>collect matching keys</li>
      <li>issue delete operations</li>
      <li>handle large match sets</li>
      <li>wait for the process to complete or move it elsewhere</li>
    </ul>
    <p>The operation is incremental, but it is still work.</p>
    <p>If invalidation happens frequently, the system repeatedly asks Redis:</p>
    <p className="italic text-paper pl-4 border-l border-hairline-strong">
      please rediscover all cache entries derived from this dataset.
    </p>
    <p>That is the architectural smell.</p>
    <p>The problem is not only deletion.</p>
    <p>The problem is discovery.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Why TTL was not enough
    </h2>
    <p>A tempting response is:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      do not invalidate anything; just use a short TTL.
    </p>
    <p>That moves the problem rather than solving it.</p>
    <p>Suppose the TTL is five minutes.</p>
    <p>A user updates a record.</p>
    <p>The database is correct immediately.</p>
    <p>The cache can remain stale for almost five minutes.</p>
    <p>Now the application may show:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`Update API:
  success

List API:
  old value`}
      </code>
    </pre>
    <p>From the user’s perspective, the system is inconsistent.</p>
    <p>Shortening the TTL reduces the stale window but increases cache churn.</p>
    <p>Longer TTL improves hit rates but extends inconsistency.</p>
    <p>TTL is useful as a safety mechanism.</p>
    <p>
      I do not want it to be the primary correctness mechanism for data that should become
      stale immediately after a known mutation.
    </p>
    <p>The application already knows exactly when the dataset changes.</p>
    <p>It should use that information.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The key insight: stop deleting old generations
    </h2>
    <p>The alternative is version-based caching.</p>
    <p>
      Instead of trying to discover and delete every old cache key, maintain a small version
      number for the logical dataset.
    </p>
    <p>For example:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        cache-version:dev:contacts:tenant-42 = 17
      </code>
    </p>
    <p>A list request first resolves the current version.</p>
    <p>Then the actual cache key includes it:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        dev:contacts:tenant-42:v17:list:&lt;queryHash&gt;
      </code>
    </p>
    <p>For example:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        dev:contacts:tenant-42:v17:list:a91f8c
      </code>
    </p>
    <p>Now suppose a contact changes.</p>
    <p>Instead of scanning for:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        dev:contacts:tenant-42:*
      </code>
    </p>
    <p>and deleting every matching key, the write path does:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        INCR cache-version:dev:contacts:tenant-42
      </code>
    </p>
    <p>The version becomes:</p>
    <p className="font-semibold text-paper">18</p>
    <p>Every new request now reads or writes:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        dev:contacts:tenant-42:v18:list:&lt;queryHash&gt;
      </code>
    </p>
    <p>The old generation still physically exists:</p>
    <p className="font-mono text-sm text-slate">v17</p>
    <p>but it is logically unreachable.</p>
    <p>That is the entire idea.</p>
    <p>No wildcard deletion.</p>
    <p>No key discovery.</p>
    <p>No synchronous scan.</p>
    <p>No need to know how many query variants existed.</p>
    <p>One small metadata change invalidates the whole logical namespace.</p>

    <Article3Diagram2 />

    <p>That is a major simplification of the invalidation path.</p>
    <p>The complexity moves from:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      find and delete every stale cache entry
    </p>
    <p>to:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      advance the namespace generation
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      A concrete example
    </h2>
    <p>Assume a tenant requests:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        GET /contacts?page=1&amp;status=active
      </code>
    </p>
    <p>The application canonicalizes the query:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`{
  "page": 1,
  "status": "active"
}`}
      </code>
    </pre>
    <p>Then computes a stable hash:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        queryHash = 7f31a9
      </code>
    </p>
    <p>The current version is:</p>
    <p className="font-semibold text-paper">17</p>
    <p>The final key becomes:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        prod:contacts:tenant-42:v17:list:7f31a9
      </code>
    </p>
    <p>Another request arrives:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        GET /contacts?page=2&amp;status=active
      </code>
    </p>
    <p>Its key may be:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        prod:contacts:tenant-42:v17:list:c82d11
      </code>
    </p>
    <p>Another:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        GET /contacts?ownerId=u123&amp;sort=createdAt:desc
      </code>
    </p>
    <p>becomes:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        prod:contacts:tenant-42:v17:list:e51ab0
      </code>
    </p>
    <p>Now a contact is created.</p>
    <p>The write path does not need to know that three cached query variants exist.</p>
    <p>It does:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        INCR cache-version:prod:contacts:tenant-42
      </code>
    </p>
    <p>The version is now:</p>
    <p className="font-semibold text-paper">18</p>
    <p>The next request uses:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        prod:contacts:tenant-42:v18:list:7f31a9
      </code>
    </p>
    <p>The old key:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        prod:contacts:tenant-42:v17:list:7f31a9
      </code>
    </p>
    <p>cannot be hit by the new read path.</p>
    <p>From the application’s perspective, invalidation is immediate.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The read path
    </h2>
    <p>Conceptually:</p>

    <Article3ReadDiagram />

    <p>The exact implementation can vary.</p>
    <p>The important properties are:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>deterministic query normalization</li>
      <li>stable hashing</li>
      <li>tenant isolation</li>
      <li>module isolation</li>
      <li>version in the namespace</li>
      <li>TTL on generated cache entries</li>
    </ul>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The write path
    </h2>
    <p>After a successful database mutation:</p>

    <Article3WriteDiagram />

    <p>The ordering matters.</p>
    <p>I prefer:</p>
    <ol className="list-decimal list-inside space-y-2 text-mist pl-2">
      <li>write source of truth</li>
      <li>invalidate derived cache</li>
    </ol>
    <p>not:</p>
    <ol className="list-decimal list-inside space-y-2 text-mist pl-2">
      <li>invalidate cache</li>
      <li>attempt database write</li>
    </ol>
    <p>
      If the database write fails after invalidation, correctness is usually preserved but the
      cache was unnecessarily destroyed.
    </p>
    <p>More importantly, the cache should never be treated as the source of truth.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Why the version must be scoped correctly
    </h2>
    <p>A global version such as:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        contacts:version = 18
      </code>
    </p>
    <p>
      would mean one tenant updating one contact invalidates contact caches for every
      tenant.
    </p>
    <p>That defeats multi-tenant isolation.</p>
    <p>The version should be scoped to the smallest useful invalidation boundary.</p>
    <p>For example:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        cache-version:{"{env}"}:{"{service}"}:{"{tenant}"}:{"{module}"}
      </code>
    </p>
    <p>Such as:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        cache-version:prod:crm:tenant-42:contacts
      </code>
    </p>
    <p>This aligns with the broader cache namespace strategy we discussed:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        {"{env}"}:{"{service}"}:{"{tenant}"}:{"{module}"}:{"{hash}"}
      </code>
    </p>
    <p>Versioning extends it:</p>
    <p>
      <code className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[13px] text-paper">
        {"{env}"}:{"{service}"}:{"{tenant}"}:{"{module}"}:v{"{version}"}:{"{hash}"}
      </code>
    </p>
    <p>Now:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>dev does not invalidate prod</li>
      <li>one service does not accidentally own another service’s cache</li>
      <li>one tenant does not invalidate another tenant</li>
      <li>one module does not invalidate unrelated modules</li>
    </ul>
    <p>The invalidation boundary is explicit in the key.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Old generations still need cleanup
    </h2>
    <p>Version-based invalidation makes old keys unreachable.</p>
    <p>It does not physically delete them immediately.</p>
    <p>That is intentional.</p>
    <p>Old generation keys should still have TTLs.</p>
    <p>For example:</p>
    <p className="font-mono text-sm text-slate">
      v17 keys → expire naturally<br />
      v18 keys → current generation
    </p>
    <p>The model becomes:</p>
    <p className="font-mono text-sm text-paper">
      Version bump = correctness<br />
      TTL = garbage collection
    </p>
    <p>This is a much better use of TTL.</p>
    <p>TTL no longer determines how long users see stale data.</p>
    <p>It determines how long unreachable cache generations consume memory.</p>
    <p>That separation is one of the main reasons I prefer this pattern.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      This also helps with timeout behavior
    </h2>
    <p>The invalidation problem that motivated this design was not theoretical.</p>
    <p>
      When a request path has to discover and remove many keys, invalidation time becomes
      dependent on:
    </p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>total keyspace size</li>
      <li>number of matching keys</li>
      <li>SCAN iterations</li>
      <li>Redis round trips</li>
      <li>delete batch sizes</li>
      <li>network latency</li>
      <li>concurrent Redis workload</li>
    </ul>
    <p>
      That means a mutation that should be predictable can become increasingly slow as the
      cache grows.
    </p>
    <p>
      Eventually, the application can spend enough time invalidating cache entries that the
      operation contributes to request timeouts or visibly slow responses.
    </p>
    <p>Version bumping changes the complexity profile.</p>
    <p>The invalidation path no longer grows with the number of cached query variants.</p>
    <p>Conceptually:</p>
    <p className="font-mono text-sm text-slate">
      10 cached variants<br />
      100 cached variants<br />
      10,000 cached variants
    </p>
    <p>all require the same logical action:</p>
    <p className="font-mono text-sm text-paper">
      INCR version
    </p>
    <p>I am deliberately not claiming a fake benchmark here.</p>
    <p>The architectural improvement is the important part:</p>
    <p className="font-semibold text-paper">
      invalidation no longer requires enumerating the stale cache population.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Multi-instance services become easier to reason about
    </h2>
    <p>
      Suppose the{" "}
      <Link href="/work" className="underline text-paper hover:text-signal transition-colors">
        NestJS service
      </Link>{" "}
      runs on multiple instances:
    </p>
    <p className="font-mono text-sm text-slate">
      Instance A<br />
      Instance B<br />
      Instance C
    </p>
    <p>All of them share Redis.</p>
    <p>Instance A updates a contact and increments:</p>
    <p className="font-mono text-sm text-paper">
      tenant-42 contacts version: 17 → 18
    </p>
    <p>Instance B’s next request resolves version 18.</p>
    <p>Instance C’s next request resolves version 18.</p>
    <p>No instance needs an in-memory list of deleted keys.</p>
    <p>No instance needs to know which process originally populated the old entries.</p>
    <p>The version stored in Redis becomes the shared generation pointer.</p>
    <p>That is a clean coordination primitive.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Cross-service invalidation still requires ownership
    </h2>
    <p>Versioning does not mean every service should mutate every cache namespace.</p>
    <p>I prefer explicit ownership.</p>
    <p>For example:</p>
    <ul className="list-none space-y-1 text-mist pl-2">
      <li><strong>Contacts Service</strong> owns contact cache</li>
      <li><strong>Search Service</strong> owns search cache</li>
      <li><strong>Policy Service</strong> owns policy cache</li>
    </ul>
    <p>
      If one domain change affects another service, the change can be propagated as an
      event:
    </p>
    <ul className="list-none space-y-1 font-mono text-sm text-mist pl-2">
      <li>contact.updated</li>
      <li>role.changed</li>
      <li>hierarchy.changed</li>
      <li>sharing-rule.changed</li>
    </ul>
    <p>The receiving service decides how its own cache should react.</p>
    <p>That can be:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      increment version
    </p>
    <p>or a more targeted invalidation.</p>
    <p>This preserves service boundaries.</p>
    <p>
      A service should not need intimate knowledge of another service’s internal Redis key
      format.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Versioning is not always the right granularity
    </h2>
    <p>A version can invalidate too much if the namespace is too broad.</p>
    <p>
      Suppose one tenant has millions of independent records and only one detail cache
      changes.
    </p>
    <p>Bumping the entire module version may cause unnecessary cache misses.</p>
    <p>So I separate cache types by their dependency boundaries.</p>
    <p>For example:</p>
    <p><strong>List cache</strong>: tenant-wide module version</p>
    <p><strong>Detail cache</strong>: direct key invalidation by record ID</p>
    <p><strong>Policy cache</strong>: version based on policy dependency</p>
    <p><strong>Hierarchy cache</strong>: version based on hierarchy changes</p>
    <p>A possible design is:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`contacts:list-version:tenant-42
contacts:detail:tenant-42:contact-99`}
      </code>
    </pre>
    <p>After updating contact 99:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`DEL contacts:detail:tenant-42:contact-99
INCR contacts:list-version:tenant-42`}
      </code>
    </pre>
    <p>That is often better than forcing every cache into one strategy.</p>
    <p>The goal is not “version everything”.</p>
    <p>The goal is:</p>
    <p className="font-semibold text-paper pl-4 border-l border-signal">
      choose an invalidation boundary that matches the dependency graph of the
      cached data.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Authorization caches made this lesson even clearer
    </h2>
    <p>The same principle appears in policy caching.</p>
    <p>We previously separated authorization-related caches into different logical components:</p>
    <ul className="list-none space-y-1 font-mono text-sm text-mist pl-2">
      <li>user:{"{id}"}:permissions</li>
      <li>user:{"{id}"}:subordinates</li>
      <li>user:{"{id}"}:sharingRules</li>
    </ul>
    <p>Why?</p>
    <p>Because they change for different reasons.</p>
    <p>A role permission update should not force hierarchy reconstruction.</p>
    <p>A hierarchy update should not force role permission recomputation.</p>
    <p>A sharing-rule change should not invalidate unrelated static permission data.</p>
    <p>Versioning can follow the same model.</p>
    <p>Conceptually:</p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
        {`permission-version:\${tenant}:\${user}
hierarchy-version:\${tenant}:\${user}
sharing-version:\${tenant}:\${user}`}
      </code>
    </pre>
    <p>The exact key structure depends on the service.</p>
    <p>The broader lesson is that cache invalidation should follow causal dependencies.</p>
    <p>Not convenience.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The failure mode I wanted to avoid
    </h2>
    <p>
      The worst cache architecture is one where writes become slower as the cache becomes
      more successful.
    </p>
    <p>That can happen surprisingly easily.</p>
    <p>More reads create more cached query variants.</p>
    <p>More cached variants make invalidation more expensive.</p>
    <p>More expensive invalidation slows writes.</p>
    <p>Slow writes trigger timeouts.</p>
    <p>Timeouts trigger retries.</p>
    <p>Retries create more pressure.</p>
    <p>
      The cache that was introduced to reduce database load starts increasing system
      complexity and write latency.
    </p>
    <p>Version-based invalidation breaks that relationship for broad logical datasets.</p>
    <p>
      The number of old keys can grow temporarily, but invalidation itself does not need to
      enumerate them.
    </p>
    <p>TTL handles cleanup later.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      What I kept from the earlier approach
    </h2>
    <p>I do not consider SCAN useless.</p>
    <p>It remains useful for:</p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>operational cleanup</li>
      <li>migrations</li>
      <li>administrative maintenance</li>
      <li>removing known legacy namespaces</li>
      <li>exceptional background jobs</li>
    </ul>
    <p>
      And if pattern invalidation is necessary, SCAN MATCH ... COUNT ... is far safer than
      KEYS.
    </p>
    <p>
      But I no longer want broad pattern scanning in a latency-sensitive write path when the
      actual requirement is simply:
    </p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      make every previously cached representation of this logical dataset stale now.
    </p>
    <p>That is exactly what a version number expresses.</p>

    <Article3Diagram3 />

    <p>And the write path no longer needs to know how many cached representations of the
      old data exist.</p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The lesson
    </h2>
    <p>
      Cache invalidation becomes difficult when the system tries to track every physical cache
      entry derived from mutable data.
    </p>
    <p>A different way to frame the problem is:</p>
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      do I actually need to delete stale keys, or do I only need to make them
      impossible to read?
    </p>
    <p>Version-based caching chooses the second option.</p>
    <p>That shift turned invalidation from a discovery problem into a namespace problem.</p>
    <p>Instead of:</p>
    <p className="font-mono text-sm text-slate">
      find everything stale<br />
      then delete it
    </p>
    <p>the system does:</p>
    <p className="font-mono text-sm text-paper">
      advance the generation
    </p>
    <p>
      For the timeout and latency problems we were facing around broad invalidation, that is
      the part that mattered most.
    </p>
    <p>TTL still exists.</p>
    <p>Redis still stores multiple query variants.</p>
    <p>Old keys still need eventual cleanup.</p>
    <p>But correctness no longer waits for a scan to finish.</p>
    <p>Sometimes the simplest invalidation strategy is not deleting more efficiently.</p>
    <p>It is making deletion unnecessary.</p>
  </>
);

const ARTICLE_4 = (
  <>
    <p>
      In multi-tenant SaaS platforms, administrators frequently need to troubleshoot client problems. 
      Whether it is debugging a broken event workflow or validating custom billing triggers, seeing exactly 
      what the customer sees is often the only way to resolve complex tenant-scoped support requests.
    </p>
    <p>
      But how do you let an administrator access a tenant workspace as a specific customer user without compromising security?
    </p>
    <p>
      The naive solution is to build a back door: generate synthetic user accounts, bypass authentication, or share 
      credentials. These approaches are insecure and break regulatory compliance. A secure system must preserve 
      standard authentication flows, enforce strict access constraints, and maintain a complete audit trail.
    </p>
    <p>
      While building the foundation for{" "}
      <Link href="/work" className="underline text-paper hover:text-signal transition-colors">
        SalesAstra
      </Link>
      , we solved this by designing a **Dual-Header Impersonation Framework**. This architecture overlays 
      an administrative actor identity with an effective target authorization context.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The Core Architectural Principles
    </h2>
    <p>
      We designed our impersonation model around four strict architectural constraints:
    </p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li><strong>Cognito stays in control:</strong> AWS Cognito remains the sole authentication provider. API Gateway continues validating Cognito access tokens normally.</li>
      <li><strong>Dynamic Authorization Overlay:</strong> The impersonation context does not replace authentication. It overlays identity. The administrator remains the <em>actor</em>, but permission and query scopes are evaluated against the <em>effective user</em>.</li>
      <li><strong>Business Logic Ignorance:</strong> No downstream business service should write custom logic for impersonation. They access the resolved <code>req.user</code> exactly as they do in ordinary client sessions.</li>
      <li><strong>Strict Auditing:</strong> Every action performed during impersonation must be traced back to both the administrative actor and the target user.</li>
    </ul>

    <Article4ImpersonationDiagram />

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      How Dual-Header Impersonation Flows
    </h2>
    <p>
      When a Platform Administrator initiates an impersonation session from the platform administration UI, they must select the target user and provide a valid reason.
    </p>
    <p>
      The UI calls the User Service endpoint:
    </p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
{`POST /admin/impersonation/start
Content-Type: application/json

{
  "targetUserId": "user_abc123",
  "tenantId": "tenant_xyz789",
  "reason": "Investigating failing Meta webhook ingestion"
}`}
      </code>
    </pre>
    <p>
      The User Service performs a series of validation checks:
    </p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>Verifies the administrator has the <code>organizations:impersonate</code> permission.</li>
      <li>Validates the existence of the tenant and the target user.</li>
      <li>Revokes any existing impersonation sessions active for this administrator.</li>
    </ul>
    <p>
      If validation passes, a new document is written to the <code>impersonation_sessions</code> MongoDB collection and cached in Redis. 
      The service then generates a short-lived, signed JWT containing the session metadata.
    </p>

    <h3 className="text-xl font-medium tracking-tight text-paper mt-8 mb-3">
      The Impersonation Token Claims
    </h3>
    <p>
      The generated impersonation token describes the session boundaries:
    </p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
{`{
  "actorSub": "cognito-admin-subject-uuid",
  "targetSub": "cognito-target-user-uuid",
  "targetUserId": "user_abc123",
  "tenantId": "tenant_xyz789",
  "sessionId": "imp_sess_99999",
  "accessMode": "FULL" | "VIEW_ONLY",
  "iss": "platform-impersonation",
  "aud": "tenant-apis"
}`}
      </code>
    </pre>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Backend Authentication and Overlay Middleware
    </h2>
    <p>
      Once the tenant workspace opens, the application sends every API request with three critical pieces of metadata:
    </p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
{`Authorization: Bearer <Platform_Admin_Cognito_Token>
X-Impersonation-Token: <Impersonation_Session_JWT>
x-tenant-id: tenant_xyz789`}
      </code>
    </pre>
    <p>
      Every microservice running in ECS executes the authentication middleware in two separate phases:
    </p>
    
    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      Phase 1: Authenticate the Actor
    </p>
    <p>
      The API Gateway parses and validates the Cognito access token. If valid, the authenticated administrator 
      is resolved as the request actor:
    </p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
{`req.actor = { sub: decodedCognitoToken.sub, role: 'platform-admin' };`}
      </code>
    </pre>

    <p className="font-semibold text-paper pl-4 border-l border-hairline-strong">
      Phase 2: Overlay the Impersonated Identity
    </p>
    <p>
      If the request contains the <code>X-Impersonation-Token</code> header, the middleware intercepts the flow 
      and executes validation checks:
    </p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>Validates the signature, issuer, and expiration of the impersonation JWT.</li>
      <li>Ensures the tenant ID in the token matches the header <code>x-tenant-id</code>.</li>
      <li>Ensures the <code>actorSub</code> claim inside the impersonation token matches the authenticated actor's subject resolved in Phase 1.</li>
      <li>Performs a lookup in Redis for <code>session:imp:[sessionId]</code> to ensure the session remains active and has not been manually revoked.</li>
    </ul>
    <p>
      If validation passes, the request context is transformed:
    </p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
{`req.user = { sub: token.targetSub, id: token.targetUserId };
req.impersonation = { sessionId: token.sessionId, accessMode: token.accessMode };
req.authType = 'IMPERSONATION';`}
      </code>
    </pre>
    <p>
      By rewriting <code>req.user</code> to represent the target user's identity, the downstream microservices proceed 
      without modifying any business logic. All database query scopes (e.g. <code>OWN</code> or <code>TEAM</code>) and RBAC evaluations resolve 
      naturally for the target user.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Security Controls and Caching Guarantees
    </h2>
    <p>
      Impersonation bypasses credentials, which makes it a high-risk security vector. We built multiple safety nets:
    </p>
    
    <h3 className="text-xl font-medium tracking-tight text-paper mt-8 mb-3">
      1. Immediate Permissions Invalidation
    </h3>
    <p>
      Authorization systems often cache user roles and permissions in Redis to avoid hitting the database on every request. 
      When impersonation starts, we must ensure the system does not load cached administrator roles. 
      The backend resolves permission scopes starting from the target user subject:
    </p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
{`// Permissions resolution hierarchy
const subjectId = req.user.sub; // Resolves to targetSub when impersonation is active`}
      </code>
    </pre>

    <h3 className="text-xl font-medium tracking-tight text-paper mt-8 mb-3">
      2. View-Only vs Full Access Modes
    </h3>
    <p>
      If the admin specifies <code>VIEW_ONLY</code> access during session initialization, the frontend disables form submits, 
      save buttons, and action panels. To enforce this server-side, the backend API middleware intercepts mutating HTTP methods 
      (<code>POST</code>, <code>PUT</code>, <code>DELETE</code>, <code>PATCH</code>) when <code>req.impersonation.accessMode === 'VIEW_ONLY'</code>, 
      returning a <code>403 Forbidden</code> block immediately.
    </p>

    <h3 className="text-xl font-medium tracking-tight text-paper mt-8 mb-3">
      3. Immutability of the Audit Log
    </h3>
    <p>
      Standard requests record the action performer using a single identity field. 
      Under impersonation, the logging system intercepts the request and structures the audit document differently:
    </p>
    <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-sm text-paper">
      <code>
{`{
  "action": "contacts.update",
  "performedBy": "cognito-admin-subject-uuid", // Administrative actor
  "performedAs": "cognito-target-user-uuid",   // Target tenant user
  "impersonated": true,
  "sessionId": "imp_sess_99999",
  "timestamp": "2026-08-08T10:45:00Z"
}`}
      </code>
    </pre>
    <p>
      This audit model guarantees compliance: administrators cannot perform silent actions, and tenants are assured that every 
      action taken on their workspace is clearly demarcated.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      Legacy Ghost User Comparison
    </h2>
    <p>
      The dual-header overlay architecture replaced a legacy <strong>Ghost User</strong> approach. Under that old model, 
      the system generated a synthetic "ghost" user inside the database, generated a short-lived code, and exchanged it 
      for a synthetic bearer token representing only the ghost user.
    </p>
    <p>
      The legacy flow suffered from severe architectural flaws:
    </p>
    <ul className="list-disc list-inside space-y-2 text-mist pl-2">
      <li>It polluted the tenant database with dummy accounts.</li>
      <li>It lost the real administrator's identity at the API Gateway level, making tracing difficult.</li>
      <li>It required managing synthetic Cognito users or bypass loops in auth layers.</li>
    </ul>
    <p>
      While the Ghost User flow remains supported for legacy systems, standardizing on the dual-header architecture 
      keeps our AWS Cognito credentials untampered, audit trails crystal clear, and microservice business layers fully decoupled.
    </p>

    <hr className="border-t border-hairline my-12" />

    <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl mt-10 mb-4">
      The Lesson
    </h2>
    <p>
      Architecting admin impersonation is not a matter of creating a backdoor. It is about creating a secure, 
      auditable pipeline that flows parallel to user requests.
    </p>
    <p>
      By separating <strong>authentication</strong> (who is signing the request) from <strong>authorization</strong> (whose permissions 
      are being checked), we built a system that keeps our microservices simple, our audits secure, and our SaaS admins 
      productive.
    </p>
  </>
);

// ------------------------------------------------------------- Main Article Component
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  // Get the other 2 articles
  const otherPosts = POSTS.filter((p) => p.slug !== slug);

  return (
    <>
      {/* Article Header */}
      <Section className="border-t-0">
        <Container className="pb-12 pt-36 sm:pt-44">
          <Reveal>
            <div className="rounded-full border border-hairline bg-surface px-3 py-1 w-fit font-mono text-[11px] uppercase tracking-[0.12em] text-signal mb-6">
              {post.category}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <Display className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl text-balance">
              {post.title}
            </Display>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-sm text-slate font-mono tracking-wide">
              {post.date} · {post.readingTime} · By Adesh Yearanty
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Article Body */}
      <Section>
        <Container className="py-16 lg:py-24">
          <div className="mx-auto max-w-2xl">
            <article className="space-y-6 text-pretty text-lg leading-relaxed text-mist">
              {slug === "securing-admin-access-dual-header-impersonation" && ARTICLE_4}
              {slug === "kinesis-vs-sqs-messaging-pipeline" && ARTICLE_1}
              {slug === "rbac-system-that-doesnt-lie" && ARTICLE_2}
              {slug === "redis-version-based-caching" && ARTICLE_3}
            </article>

            {/* Back link */}
            <div className="mt-16 border-t border-hairline pt-10">
              <Reveal>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-paper"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                  <span>Back to writing</span>
                </Link>
              </Reveal>
            </div>

            {/* More from Adesh */}
            <Reveal delay={100}>
              <div className="mt-16 border-t border-hairline pt-16">
                <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-signal mb-8">
                  More from Adesh
                </h3>
                <ul className="divide-y divide-hairline">
                  {otherPosts.map((other) => (
                    <li key={other.slug}>
                      <Link href={`/blog/${other.slug}`} className="block">
                        <article className="group grid gap-4 border-b border-hairline py-8 transition-colors duration-500 hover:bg-surface/40 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
                          <div className="max-w-2xl">
                            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
                              <span className="text-signal">{other.category}</span>
                              <span className="h-px w-6 bg-hairline-strong" />
                              <span>{other.date}</span>
                            </div>
                            <h4 className="mt-3 text-xl font-semibold tracking-tight text-paper transition-colors group-hover:text-signal sm:text-2xl">
                              {other.title}
                            </h4>
                            <p className="mt-2 text-sm text-slate line-clamp-2 leading-relaxed">
                              {other.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate lg:flex-col lg:items-end lg:gap-1">
                            <span>{other.readingTime}</span>
                            <span
                              aria-hidden
                              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal"
                            >
                              →
                            </span>
                          </div>
                        </article>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
