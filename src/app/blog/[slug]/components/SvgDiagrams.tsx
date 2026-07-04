// Architecture Diagrams for Blog Articles
// All diagrams use SVG for clean, scalable visuals

export function KinesisArchitectureOverview() {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: "#a855f7", stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="800" height="300" fill="none" />
      
      {/* Producers */}
      <rect x="50" y="50" width="100" height="60" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" rx="4" />
      <text x="100" y="90" textAnchor="middle" fill="#e0f2fe" fontSize="14" fontWeight="bold">Producers</text>
      
      {/* Arrow to Kinesis */}
      <path d="M 150 80 L 250 80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Kinesis Streams */}
      <rect x="250" y="40" width="300" height="80" fill="url(#grad1)" stroke="#a855f7" strokeWidth="2" rx="4" />
      <text x="400" y="65" textAnchor="middle" fill="#f3e8ff" fontSize="16" fontWeight="bold">Kinesis Data Streams</text>
      <text x="400" y="90" textAnchor="middle" fill="#d8b4fe" fontSize="12">Ordered, durable message buffer</text>
      <text x="400" y="110" textAnchor="middle" fill="#d8b4fe" fontSize="12">Preserves conversation ordering</text>
      
      {/* Arrow to Consumers */}
      <path d="M 550 80 L 650 80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Consumers */}
      <rect x="650" y="50" width="100" height="60" fill="#06b6d4" opacity="0.2" stroke="#06b6d4" strokeWidth="2" rx="4" />
      <text x="700" y="90" textAnchor="middle" fill="#cffafe" fontSize="14" fontWeight="bold">Consumers</text>
      
      {/* Benefits box */}
      <rect x="50" y="180" width="700" height="100" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4" rx="4" />
      <text x="60" y="205" fill="#10b981" fontSize="13" fontWeight="bold">Benefits:</text>
      <text x="60" y="225" fill="#6ee7b7" fontSize="12">✓ Ordered message processing per shard</text>
      <text x="60" y="245" fill="#6ee7b7" fontSize="12">✓ Fan-out consumer groups</text>
      <text x="60" y="265" fill="#6ee7b7" fontSize="12">✓ Replay capability for debugging</text>
    </svg>
  );
}

export function KinesisPhase1RawIngress() {
  return (
    <svg viewBox="0 0 800 200" className="w-full h-auto">
      <rect width="800" height="200" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Phase 1: Raw Ingress</text>
      
      <rect x="50" y="60" width="150" height="50" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" rx="4" />
      <text x="125" y="90" textAnchor="middle" fill="#e0f2fe" fontSize="12" fontWeight="bold">Customer Message</text>
      
      <path d="M 200 85 L 250 85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      <rect x="250" y="60" width="150" height="50" fill="#a855f7" opacity="0.2" stroke="#a855f7" strokeWidth="2" rx="4" />
      <text x="325" y="90" textAnchor="middle" fill="#f3e8ff" fontSize="12" fontWeight="bold">Kinesis Ingress</text>
      
      <path d="M 400 85 L 450 85" stroke="#3b82f7" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      <rect x="450" y="60" width="150" height="50" fill="#06b6d4" opacity="0.2" stroke="#06b6d4" strokeWidth="2" rx="4" />
      <text x="525" y="90" textAnchor="middle" fill="#cffafe" fontSize="12" fontWeight="bold">Process Event</text>
      
      <path d="M 600 85 L 650 85" stroke="#3b82f7" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      <rect x="650" y="60" width="100" height="50" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="2" rx="4" />
      <text x="700" y="90" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="bold">Database</text>
    </svg>
  );
}

export function KinesisPhase2Enrichment() {
  return (
    <svg viewBox="0 0 800 200" className="w-full h-auto">
      <rect width="800" height="200" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Phase 2: Enrichment & Delivery</text>
      
      <rect x="50" y="60" width="120" height="50" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" rx="4" />
      <text x="110" y="90" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Enriched Event</text>
      
      <path d="M 170 85 L 220 85" stroke="#3b82f6" strokeWidth="2" />
      
      <rect x="220" y="60" width="120" height="50" fill="#a855f7" opacity="0.2" stroke="#a855f7" strokeWidth="2" rx="4" />
      <text x="280" y="90" textAnchor="middle" fill="#f3e8ff" fontSize="11" fontWeight="bold">SQS Queue</text>
      
      <path d="M 340 85 L 390 85" stroke="#a855f7" strokeWidth="2" />
      
      <rect x="390" y="60" width="120" height="50" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="2" rx="4" />
      <text x="450" y="90" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">Agent Handler</text>
      
      <path d="M 510 85 L 560 85" stroke="#f59e0b" strokeWidth="2" />
      
      <rect x="560" y="60" width="120" height="50" fill="#ec4899" opacity="0.2" stroke="#ec4899" strokeWidth="2" rx="4" />
      <text x="620" y="90" textAnchor="middle" fill="#fce7f3" fontSize="11" fontWeight="bold">Send via API</text>
    </svg>
  );
}

export function RBACPermissionVsVisibility() {
  return (
    <svg viewBox="0 0 800 250" className="w-full h-auto">
      <rect width="800" height="250" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Permission vs Visibility Problem</text>
      
      {/* Left side - Permission (Can I access?) */}
      <text x="150" y="70" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Permission (Can I?)</text>
      <rect x="50" y="90" width="200" height="30" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="1" rx="2" />
      <text x="150" y="112" textAnchor="middle" fill="#e0f2fe" fontSize="11">Database check: role + resource</text>
      
      {/* Right side - Visibility (Can I see?) */}
      <text x="650" y="70" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="bold">Visibility (Can I see?)</text>
      <rect x="550" y="90" width="200" height="30" fill="#a855f7" opacity="0.2" stroke="#a855f7" strokeWidth="1" rx="2" />
      <text x="650" y="112" textAnchor="middle" fill="#f3e8ff" fontSize="11">UI: show only accessible items</text>
      
      {/* Problem description */}
      <rect x="50" y="150" width="700" height="80" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" rx="4" />
      <text x="70" y="170" fill="#fca5a5" fontSize="12" fontWeight="bold">❌ The Lie:</text>
      <text x="70" y="190" fill="#fca5a5" fontSize="12">If user has permission but hierarchical constraints hide resource</text>
      <text x="70" y="210" fill="#fca5a5" fontSize="12">(parent shared with limited scope), UI won&apos;t show it</text>
    </svg>
  );
}

export function RBACHierarchyResolution() {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto">
      <rect width="800" height="300" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Hierarchy Resolution</text>
      
      {/* Org structure */}
      <circle cx="400" cy="70" r="20" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
      <text x="400" y="76" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Org</text>
      
      {/* Arrows down */}
      <path d="M 385 90 L 330 130" stroke="#3b82f6" strokeWidth="2" />
      <path d="M 400 90 L 400 130" stroke="#3b82f6" strokeWidth="2" />
      <path d="M 415 90 L 470 130" stroke="#3b82f6" strokeWidth="2" />
      
      {/* Teams */}
      <circle cx="330" cy="150" r="20" fill="#a855f7" opacity="0.3" stroke="#a855f7" strokeWidth="2" />
      <text x="330" y="156" textAnchor="middle" fill="#f3e8ff" fontSize="10" fontWeight="bold">Team A</text>
      
      <circle cx="400" cy="150" r="20" fill="#a855f7" opacity="0.3" stroke="#a855f7" strokeWidth="2" />
      <text x="400" y="156" textAnchor="middle" fill="#f3e8ff" fontSize="10" fontWeight="bold">Team B</text>
      
      <circle cx="470" cy="150" r="20" fill="#a855f7" opacity="0.3" stroke="#a855f7" strokeWidth="2" />
      <text x="470" y="156" textAnchor="middle" fill="#f3e8ff" fontSize="10" fontWeight="bold">Team C</text>
      
      {/* Arrow down from Team A */}
      <path d="M 330 170 L 330 210" stroke="#a855f7" strokeWidth="2" />
      
      {/* Resources */}
      <rect x="280" y="210" width="100" height="30" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="2" rx="2" />
      <text x="330" y="232" textAnchor="middle" fill="#d1fae5" fontSize="11">Resources</text>
      
      {/* Resolution note */}
      <text x="500" y="120" fill="#fbbf24" fontSize="11">Need to check:</text>
      <text x="500" y="140" fill="#fbbf24" fontSize="11">1. Direct permissions</text>
      <text x="500" y="160" fill="#fbbf24" fontSize="11">2. Parent permissions</text>
      <text x="500" y="180" fill="#fbbf24" fontSize="11">3. Visibility scope</text>
      <text x="500" y="200" fill="#fbbf24" fontSize="11">4. Shared constraints</text>
    </svg>
  );
}

export function RBACRequestAuthPath() {
  return (
    <svg viewBox="0 0 800 200" className="w-full h-auto">
      <rect width="800" height="200" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Request Authorization Path</text>
      
      <rect x="50" y="60" width="100" height="40" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" rx="4" />
      <text x="100" y="85" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Request</text>
      
      <path d="M 150 80 L 200 80" stroke="#3b82f6" strokeWidth="2" />
      
      <rect x="200" y="60" width="100" height="40" fill="#a855f7" opacity="0.2" stroke="#a855f7" strokeWidth="2" rx="4" />
      <text x="250" y="85" textAnchor="middle" fill="#f3e8ff" fontSize="11" fontWeight="bold">Check User</text>
      
      <path d="M 300 80 L 350 80" stroke="#a855f7" strokeWidth="2" />
      
      <rect x="350" y="60" width="100" height="40" fill="#06b6d4" opacity="0.2" stroke="#06b6d4" strokeWidth="2" rx="4" />
      <text x="400" y="85" textAnchor="middle" fill="#cffafe" fontSize="11" fontWeight="bold">Load Roles</text>
      
      <path d="M 450 80 L 500 80" stroke="#06b6d4" strokeWidth="2" />
      
      <rect x="500" y="60" width="100" height="40" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="2" rx="4" />
      <text x="550" y="85" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Check Perms</text>
      
      <path d="M 600 80 L 650 80" stroke="#10b981" strokeWidth="2" />
      
      <rect x="650" y="60" width="100" height="40" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="2" rx="4" />
      <text x="700" y="85" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">Allow/Deny</text>
    </svg>
  );
}

export function RedisStandardInvalidation() {
  return (
    <svg viewBox="0 0 800 200" className="w-full h-auto">
      <rect width="800" height="200" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Standard Invalidation (TTL)</text>
      
      <rect x="50" y="70" width="150" height="40" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" rx="4" />
      <text x="125" y="96" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Key expires in 60s</text>
      
      <path d="M 200 90 L 250 90" stroke="#3b82f6" strokeWidth="2" />
      
      <rect x="250" y="70" width="150" height="40" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="2" rx="4" />
      <text x="325" y="96" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">Waits 60 seconds</text>
      
      <path d="M 400 90 L 450 90" stroke="#f59e0b" strokeWidth="2" />
      
      <rect x="450" y="70" width="150" height="40" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="2" rx="4" />
      <text x="525" y="96" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Auto-deleted</text>
      
      {/* Problem */}
      <rect x="50" y="130" width="550" height="50" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" rx="4" />
      <text x="70" y="150" fill="#fca5a5" fontSize="11" fontWeight="bold">Problem:</text>
      <text x="70" y="168" fill="#fca5a5" fontSize="11">What if data changes at 30s? Still cached for 30s more</text>
    </svg>
  );
}

export function RedisVersionBasedComparison() {
  return (
    <svg viewBox="0 0 800 250" className="w-full h-auto">
      <rect width="800" height="250" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Version-Based: Immediate Invalidation</text>
      
      {/* TTL approach */}
      <text x="150" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">TTL Approach</text>
      <rect x="50" y="85" width="200" height="100" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="1" rx="2" />
      <text x="70" y="105" fill="#fef3c7" fontSize="11">1. Cached: v1</text>
      <text x="70" y="125" fill="#fef3c7" fontSize="11">2. Data changes</text>
      <text x="70" y="145" fill="#fef3c7" fontSize="11">3. Still returns v1</text>
      <text x="70" y="165" fill="#fef3c7" fontSize="11">4. TTL expires</text>
      <text x="70" y="185" fill="#fef3c7" fontSize="11">5. Fetches v2</text>
      
      {/* Version approach */}
      <text x="650" y="70" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Version-Based</text>
      <rect x="550" y="85" width="200" height="100" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" rx="2" />
      <text x="570" y="105" fill="#d1fae5" fontSize="11">1. Cached: v1</text>
      <text x="570" y="125" fill="#d1fae5" fontSize="11">2. Data changes</text>
      <text x="570" y="145" fill="#d1fae5" fontSize="11">3. Increment v2</text>
      <text x="570" y="165" fill="#d1fae5" fontSize="11">4. Compare versions</text>
      <text x="570" y="185" fill="#d1fae5" fontSize="11">5. Fetch on mismatch</text>
    </svg>
  );
}

export function RedisVersionLifecycle() {
  return (
    <svg viewBox="0 0 800 250" className="w-full h-auto">
      <rect width="800" height="250" fill="none" />
      <text x="400" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Version Lifecycle</text>
      
      <rect x="50" y="70" width="120" height="40" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" rx="4" />
      <text x="110" y="96" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Store: version=1</text>
      
      <path d="M 170 90 L 220 90" stroke="#3b82f6" strokeWidth="2" />
      
      <rect x="220" y="70" width="120" height="40" fill="#a855f7" opacity="0.2" stroke="#a855f7" strokeWidth="2" rx="4" />
      <text x="280" y="96" textAnchor="middle" fill="#f3e8ff" fontSize="11" fontWeight="bold">Cache: data+v1</text>
      
      <path d="M 340 90 L 390 90" stroke="#a855f7" strokeWidth="2" />
      
      <rect x="390" y="70" width="120" height="40" fill="#06b6d4" opacity="0.2" stroke="#06b6d4" strokeWidth="2" rx="4" />
      <text x="450" y="96" textAnchor="middle" fill="#cffafe" fontSize="11" fontWeight="bold">Update: v=2</text>
      
      <path d="M 510 90 L 560 90" stroke="#06b6d4" strokeWidth="2" />
      
      <rect x="560" y="70" width="190" height="40" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="2" rx="4" />
      <text x="655" y="96" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Compare: v1 != v2</text>
      
      {/* Key insight */}
      <rect x="50" y="150" width="700" height="80" fill="none" stroke="#3b82f6" strokeWidth="2" rx="4" />
      <text x="70" y="170" fill="#3b82f6" fontSize="12" fontWeight="bold">Key Insight:</text>
      <text x="70" y="190" fill="#bfdbfe" fontSize="11">Version is a lightweight counter stored in database</text>
      <text x="70" y="210" fill="#bfdbfe" fontSize="11">On cache fetch, verify version matches before using cached data</text>
    </svg>
  );
}
