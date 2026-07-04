// Kinesis vs SQS Article Diagrams

export function KinesisArchitectureOverview() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
        </marker>
      </defs>

      {/* Channels */}
      <text x="60" y="50" className="text-sm font-bold fill-white">
        WhatsApp
      </text>
      <rect x="40" y="70" width="80" height="50" className="stroke-blue-400" />
      <text x="60" y="105" className="text-xs fill-gray-300" textAnchor="middle">
        Channel
      </text>

      <text x="180" y="50" className="text-sm font-bold fill-white">
        Messenger
      </text>
      <rect x="160" y="70" width="80" height="50" className="stroke-blue-400" />
      <text x="180" y="105" className="text-xs fill-gray-300" textAnchor="middle">
        Channel
      </text>

      <text x="300" y="50" className="text-sm font-bold fill-white">
        Instagram DM
      </text>
      <rect x="280" y="70" width="80" height="50" className="stroke-blue-400" />
      <text x="320" y="105" className="text-xs fill-gray-300" textAnchor="middle">
        Channel
      </text>

      <text x="420" y="50" className="text-sm font-bold fill-white">
        Web Chat
      </text>
      <rect x="400" y="70" width="80" height="50" className="stroke-blue-400" />
      <text x="440" y="105" className="text-xs fill-gray-300" textAnchor="middle">
        Channel
      </text>

      {/* Arrows down */}
      <line
        x1="80"
        y1="120"
        x2="80"
        y2="150"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />
      <line
        x1="200"
        y1="120"
        x2="200"
        y2="150"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />
      <line
        x1="320"
        y1="120"
        x2="320"
        y2="150"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />
      <line
        x1="440"
        y1="120"
        x2="440"
        y2="150"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />

      {/* Adapters */}
      <rect x="30" y="150" width="100" height="50" className="stroke-purple-400" />
      <text x="80" y="180" className="text-xs fill-gray-300" textAnchor="middle">
        Adapters
      </text>

      <rect x="170" y="150" width="100" height="50" className="stroke-purple-400" />
      <text x="220" y="180" className="text-xs fill-gray-300" textAnchor="middle">
        Adapters
      </text>

      <rect x="310" y="150" width="100" height="50" className="stroke-purple-400" />
      <text x="360" y="180" className="text-xs fill-gray-300" textAnchor="middle">
        Adapters
      </text>

      <rect x="450" y="150" width="100" height="50" className="stroke-purple-400" />
      <text x="500" y="180" className="text-xs fill-gray-300" textAnchor="middle">
        Adapters
      </text>

      {/* Convergence arrows */}
      <path
        d="M 80 200 L 240 240"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />
      <path
        d="M 220 200 L 240 240"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />
      <path
        d="M 360 200 L 320 240"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />
      <path
        d="M 500 200 L 320 240"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />

      {/* Ingestion */}
      <rect x="200" y="240" width="120" height="50" className="stroke-blue-400" />
      <text x="260" y="270" className="text-xs fill-gray-300" textAnchor="middle">
        Ingestion
      </text>

      {/* Arrow to Kinesis */}
      <line
        x1="260"
        y1="290"
        x2="260"
        y2="320"
        markerEnd="url(#arrowhead)"
        className="stroke-gray-500"
      />

      {/* Kinesis */}
      <rect x="180" y="320" width="160" height="50" className="stroke-green-400" />
      <text x="260" y="350" className="text-xs font-bold fill-green-400" textAnchor="middle">
        Kinesis
      </text>
    </svg>
  );
}

export function KinesisPhase1RawIngress() {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      <defs>
        <marker
          id="arrowhead2"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
        </marker>
      </defs>

      {/* Webhook */}
      <rect x="50" y="100" width="100" height="60" className="stroke-blue-400" />
      <text x="100" y="135" className="text-sm fill-gray-300" textAnchor="middle">
        Webhook
      </text>

      {/* Arrow */}
      <line
        x1="150"
        y1="130"
        x2="200"
        y2="130"
        markerEnd="url(#arrowhead2)"
        className="stroke-gray-500"
      />

      {/* Validate */}
      <rect x="200" y="100" width="100" height="60" className="stroke-purple-400" />
      <text x="250" y="135" className="text-sm fill-gray-300" textAnchor="middle">
        Validate
      </text>

      {/* Arrow */}
      <line
        x1="300"
        y1="130"
        x2="350"
        y2="130"
        markerEnd="url(#arrowhead2)"
        className="stroke-gray-500"
      />

      {/* Build Envelope */}
      <rect x="350" y="100" width="120" height="60" className="stroke-purple-400" />
      <text x="410" y="135" className="text-sm fill-gray-300" textAnchor="middle">
        Build
      </text>
      <text x="410" y="150" className="text-xs fill-gray-400" textAnchor="middle">
        Envelope
      </text>

      {/* Arrow */}
      <line
        x1="470"
        y1="130"
        x2="520"
        y2="130"
        markerEnd="url(#arrowhead2)"
        className="stroke-gray-500"
      />

      {/* Kinesis */}
      <rect x="520" y="100" width="100" height="60" className="stroke-green-400" />
      <text x="570" y="135" className="text-sm font-bold fill-green-400" textAnchor="middle">
        Kinesis
      </text>

      {/* Partitioning info */}
      <text x="400" y="220" className="text-xs fill-gray-400" textAnchor="middle">
        Partitioning by conversationId ensures ordering
      </text>
    </svg>
  );
}

export function KinesisPhase2Enrichment() {
  return (
    <svg
      viewBox="0 0 800 350"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      <defs>
        <marker
          id="arrowhead3"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
        </marker>
      </defs>

      {/* External Provider */}
      <rect x="50" y="50" width="120" height="60" className="stroke-blue-400" />
      <text x="110" y="85" className="text-sm fill-gray-300" textAnchor="middle">
        External
      </text>
      <text x="110" y="100" className="text-sm fill-gray-300" textAnchor="middle">
        Provider
      </text>

      {/* Arrow down */}
      <line
        x1="110"
        y1="110"
        x2="110"
        y2="160"
        markerEnd="url(#arrowhead3)"
        className="stroke-gray-500"
      />

      {/* Webhook */}
      <rect x="50" y="160" width="120" height="60" className="stroke-purple-400" />
      <text x="110" y="195" className="text-sm fill-gray-300" textAnchor="middle">
        Webhook
      </text>

      {/* Arrow right */}
      <line
        x1="170"
        y1="190"
        x2="250"
        y2="190"
        markerEnd="url(#arrowhead3)"
        className="stroke-gray-500"
      />

      {/* Raw Stream */}
      <rect x="250" y="160" width="100" height="60" className="stroke-green-400" />
      <text x="300" y="195" className="text-sm fill-green-400" textAnchor="middle">
        Raw Stream
      </text>

      {/* Arrow right */}
      <line
        x1="350"
        y1="190"
        x2="430"
        y2="190"
        markerEnd="url(#arrowhead3)"
        className="stroke-gray-500"
      />

      {/* Enrichment Consumers */}
      <rect x="430" y="160" width="140" height="60" className="stroke-purple-400" />
      <text x="500" y="190" className="text-sm fill-gray-300" textAnchor="middle">
        Enrichment
      </text>
      <text x="500" y="205" className="text-sm fill-gray-300" textAnchor="middle">
        Consumers
      </text>

      {/* Side label */}
      <text x="400" y="280" className="text-xs fill-gray-400" textAnchor="middle">
        External events are normalized and enriched in parallel
      </text>
    </svg>
  );
}

// RBAC System Article Diagrams

export function RBACPermissionVsVisibility() {
  return (
    <svg
      viewBox="0 0 800 350"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      {/* Left side - Permission */}
      <text x="200" y="40" className="text-lg font-bold fill-blue-400" textAnchor="middle">
        Permission
      </text>
      <rect x="100" y="60" width="200" height="260" className="stroke-blue-400" />

      <text x="200" y="100" className="text-sm font-semibold fill-gray-300" textAnchor="middle">
        Action Capability
      </text>

      <text x="120" y="140" className="text-sm fill-gray-400">
        • Can read?
      </text>
      <text x="120" y="170" className="text-sm fill-gray-400">
        • Can create?
      </text>
      <text x="120" y="200" className="text-sm fill-gray-400">
        • Can edit?
      </text>
      <text x="120" y="230" className="text-sm fill-gray-400">
        • Can delete?
      </text>

      {/* Right side - Visibility */}
      <text x="600" y="40" className="text-lg font-bold fill-purple-400" textAnchor="middle">
        Visibility
      </text>
      <rect x="500" y="60" width="200" height="260" className="stroke-purple-400" />

      <text x="600" y="100" className="text-sm font-semibold fill-gray-300" textAnchor="middle">
        Data Scope
      </text>

      <text x="520" y="140" className="text-sm fill-gray-400">
        • Self
      </text>
      <text x="520" y="170" className="text-sm fill-gray-400">
        • Team
      </text>
      <text x="520" y="200" className="text-sm fill-gray-400">
        • Hierarchy
      </text>
      <text x="520" y="230" className="text-sm fill-gray-400">
        • Sharing rules
      </text>
      <text x="520" y="260" className="text-sm fill-gray-400">
        • Tenant-wide
      </text>

      <text x="400" y="340" className="text-xs fill-gray-400" textAnchor="middle">
        Two separate concerns that must be evaluated independently
      </text>
    </svg>
  );
}

export function RBACHierarchyResolution() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      <defs>
        <marker
          id="arrowhead4"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
        </marker>
      </defs>

      {/* User */}
      <rect x="50" y="50" width="100" height="60" className="stroke-blue-400" />
      <text x="100" y="85" className="text-sm fill-gray-300" textAnchor="middle">
        User
      </text>

      {/* Arrow */}
      <line
        x1="150"
        y1="80"
        x2="200"
        y2="80"
        markerEnd="url(#arrowhead4)"
        className="stroke-gray-500"
      />

      {/* Role + Scope */}
      <rect x="200" y="50" width="120" height="60" className="stroke-purple-400" />
      <text x="260" y="75" className="text-xs fill-gray-300" textAnchor="middle">
        Role +
      </text>
      <text x="260" y="92" className="text-xs fill-gray-300" textAnchor="middle">
        Scope
      </text>

      {/* Arrow */}
      <line
        x1="320"
        y1="80"
        x2="370"
        y2="80"
        markerEnd="url(#arrowhead4)"
        className="stroke-gray-500"
      />

      {/* Resolvers */}
      <rect x="370" y="50" width="120" height="60" className="stroke-green-400" />
      <text x="430" y="85" className="text-xs fill-gray-300" textAnchor="middle">
        Resolvers
      </text>

      {/* Curved arrow down and right */}
      <path
        d="M 490 80 Q 550 150 550 200"
        markerEnd="url(#arrowhead4)"
        className="stroke-gray-500"
      />

      {/* Effective Context */}
      <rect x="450" y="200" width="200" height="80" className="stroke-blue-400" />
      <text x="550" y="230" className="text-sm font-semibold fill-blue-400" textAnchor="middle">
        Effective Access Context
      </text>
      <text x="550" y="255" className="text-xs fill-gray-400" textAnchor="middle">
        (user, scope, effective permissions)
      </text>

      {/* Side annotations */}
      <text x="100" y="150" className="text-xs fill-gray-500">
        Manager
      </text>
      <text x="430" y="150" className="text-xs fill-gray-500">
        Hierarchy tree
      </text>
      <text x="430" y="165" className="text-xs fill-gray-500">
        Organization rules
      </text>
    </svg>
  );
}

export function RBACRequestAuthPath() {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      <defs>
        <marker
          id="arrowhead5"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
        </marker>
      </defs>

      {/* Auth Header */}
      <rect x="40" y="80" width="100" height="60" className="stroke-blue-400" />
      <text x="90" y="115" className="text-xs fill-gray-300" textAnchor="middle">
        Auth Header
      </text>

      {/* Arrow */}
      <line
        x1="140"
        y1="110"
        x2="200"
        y2="110"
        markerEnd="url(#arrowhead5)"
        className="stroke-gray-500"
      />

      {/* Policy Eval */}
      <rect x="200" y="80" width="120" height="60" className="stroke-purple-400" />
      <text x="260" y="115" className="text-xs fill-gray-300" textAnchor="middle">
        Policy Eval
      </text>

      {/* Arrow */}
      <line
        x1="320"
        y1="110"
        x2="380"
        y2="110"
        markerEnd="url(#arrowhead5)"
        className="stroke-gray-500"
      />

      {/* Check Cache */}
      <rect x="380" y="80" width="110" height="60" className="stroke-green-400" />
      <text x="435" y="110" className="text-xs fill-gray-300" textAnchor="middle">
        Check
      </text>
      <text x="435" y="125" className="text-xs fill-gray-300" textAnchor="middle">
        Cache
      </text>

      {/* Arrow down if miss */}
      <line
        x1="435"
        y1="140"
        x2="435"
        y2="180"
        markerEnd="url(#arrowhead5)"
        className="stroke-gray-500"
        strokeDasharray="5,5"
      />

      {/* Resolve Access */}
      <rect x="375" y="180" width="120" height="60" className="stroke-purple-400" />
      <text x="435" y="215" className="text-xs fill-gray-300" textAnchor="middle">
        Resolve Access
      </text>

      {/* Arrow back up right */}
      <path
        d="M 495 180 L 600 140"
        markerEnd="url(#arrowhead5)"
        className="stroke-gray-500"
      />

      {/* Effective Access */}
      <rect x="530" y="80" width="120" height="60" className="stroke-green-400" />
      <text x="590" y="115" className="text-xs fill-gray-300" textAnchor="middle">
        Effective Access
      </text>

      {/* Result label */}
      <text x="700" y="115" className="text-xs fill-gray-400">
        Allow/Deny
      </text>
    </svg>
  );
}

// Redis Caching Article Diagrams

export function RedisStandardInvalidation() {
  return (
    <svg
      viewBox="0 0 800 350"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      <defs>
        <marker
          id="arrowhead6"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
        </marker>
      </defs>

      {/* Contact Updated */}
      <rect x="50" y="30" width="120" height="60" className="stroke-blue-400" />
      <text x="110" y="65" className="text-xs fill-gray-300" textAnchor="middle">
        Contact Updated
      </text>

      {/* Arrow down */}
      <line
        x1="110"
        y1="90"
        x2="110"
        y2="140"
        markerEnd="url(#arrowhead6)"
        className="stroke-gray-500"
      />

      {/* Find Keys */}
      <rect x="40" y="140" width="140" height="60" className="stroke-purple-400" />
      <text x="110" y="170" className="text-xs fill-gray-300" textAnchor="middle">
        Find Keys Matching:
      </text>
      <text x="110" y="185" className="text-xs fill-gray-400" textAnchor="middle">
        tenant-42:contacts:*
      </text>

      {/* Arrow down */}
      <line
        x1="110"
        y1="200"
        x2="110"
        y2="250"
        markerEnd="url(#arrowhead6)"
        className="stroke-gray-500"
      />

      {/* Delete All Matches */}
      <rect x="30" y="250" width="160" height="60" className="stroke-red-400" />
      <text x="110" y="285" className="text-xs fill-gray-300" textAnchor="middle">
        Delete All Matches
      </text>

      {/* Issues */}
      <text x="250" y="80" className="text-sm font-semibold fill-red-400">
        Issues:
      </text>
      <text x="250" y="110" className="text-xs fill-gray-400">
        • Blocks Redis
      </text>
      <text x="250" y="135" className="text-xs fill-gray-400">
        • Scales poorly
      </text>
      <text x="250" y="160" className="text-xs fill-gray-400">
        • Slow discovery
      </text>
      <text x="250" y="185" className="text-xs fill-gray-400">
        • High latency
      </text>

      {/* SCAN improvement note */}
      <rect x="250" y="220" width="200" height="80" className="stroke-yellow-400/30" />
      <text x="350" y="245" className="text-xs fill-yellow-400" textAnchor="middle">
        SCAN improves blocking
      </text>
      <text x="350" y="270" className="text-xs fill-gray-400" textAnchor="middle">
        but doesn't solve
      </text>
      <text x="350" y="290" className="text-xs fill-gray-400" textAnchor="middle">
        discovery cost problem
      </text>
    </svg>
  );
}

export function RedisVersionBasedComparison() {
  return (
    <svg
      viewBox="0 0 900 350"
      className="w-full h-auto max-w-3xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      {/* Left - Standard TTL */}
      <text x="200" y="40" className="text-sm font-bold fill-gray-300" textAnchor="middle">
        Standard TTL
      </text>
      <rect x="80" y="60" width="240" height="260" className="stroke-red-400/50" />

      <text x="200" y="100" className="text-xs fill-gray-400" textAnchor="middle">
        Write happens:
      </text>
      <text x="200" y="120" className="text-xs fill-green-400" textAnchor="middle">
        ✓ Database updated
      </text>

      <text x="200" y="160" className="text-xs fill-gray-400" textAnchor="middle">
        For 5 minutes:
      </text>
      <text x="200" y="180" className="text-xs fill-red-400" textAnchor="middle">
        ✗ Cache still stale
      </text>

      <text x="200" y="220" className="text-xs fill-gray-400" textAnchor="middle">
        Result:
      </text>
      <text x="200" y="240" className="text-xs fill-red-400" textAnchor="middle">
        Inconsistent read
      </text>

      {/* Right - Version Based */}
      <text x="700" y="40" className="text-sm font-bold fill-gray-300" textAnchor="middle">
        Version-Based
      </text>
      <rect x="580" y="60" width="240" height="260" className="stroke-green-400/50" />

      <text x="700" y="100" className="text-xs fill-gray-400" textAnchor="middle">
        Write happens:
      </text>
      <text x="700" y="120" className="text-xs fill-green-400" textAnchor="middle">
        ✓ Increment version
      </text>

      <text x="700" y="160" className="text-xs fill-gray-400" textAnchor="middle">
        Immediately:
      </text>
      <text x="700" y="180" className="text-xs fill-green-400" textAnchor="middle">
        ✓ Old version expires
      </text>

      <text x="700" y="220" className="text-xs fill-gray-400" textAnchor="middle">
        Result:
      </text>
      <text x="700" y="240" className="text-xs fill-green-400" textAnchor="middle">
        Always consistent
      </text>
    </svg>
  );
}

export function RedisVersionLifecycle() {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full h-auto max-w-2xl mx-auto my-8"
      style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}
    >
      <defs>
        <marker
          id="arrowhead7"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
        </marker>
      </defs>

      {/* Version lifecycle */}
      <text x="400" y="40" className="text-sm font-bold fill-gray-300" textAnchor="middle">
        Version Lifecycle
      </text>

      {/* Timeline */}
      <line
        x1="100"
        y1="100"
        x2="700"
        y2="100"
        className="stroke-gray-600"
      />

      {/* v15 */}
      <circle cx="150" cy="100" r="6" className="fill-blue-400" />
      <text x="150" y="130" className="text-sm fill-gray-300" textAnchor="middle">
        v15
      </text>
      <text x="150" y="150" className="text-xs fill-gray-400" textAnchor="middle">
        Active
      </text>

      {/* v16 */}
      <circle cx="350" cy="100" r="6" className="fill-green-400" />
      <text x="350" y="130" className="text-sm fill-gray-300" textAnchor="middle">
        v16
      </text>
      <text x="350" y="150" className="text-xs fill-gray-400" textAnchor="middle">
        Active
      </text>

      {/* v17 */}
      <circle cx="550" cy="100" r="6" className="fill-purple-400" />
      <text x="550" y="130" className="text-sm fill-gray-300" textAnchor="middle">
        v17
      </text>
      <text x="550" y="150" className="text-xs fill-gray-400" textAnchor="middle">
        Active
      </text>

      {/* Stale marker */}
      <circle cx="150" cy="100" r="12" className="stroke-red-400" strokeWidth="2" />
      <text x="150" y="210" className="text-xs fill-red-400" textAnchor="middle">
        → Expires
      </text>

      {/* Cache keys */}
      <text x="400" y="250" className="text-xs fill-gray-400" textAnchor="middle">
        Cache keys: contacts:v15:*, contacts:v16:*, contacts:v17:*
      </text>
    </svg>
  );
}
