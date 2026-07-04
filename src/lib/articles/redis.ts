export const redisArticleContent = `
Caching is easy until data changes.

The first version of almost every cache looks reasonable:

\`\`\`
Request
  ↓
Check Redis
  ├── hit → return
  └── miss
       ↓
    Database
       ↓
    Cache result
       ↓
    Return
\`\`\`

That is the easy part.

The difficult question is: what happens after a write?

## The explosion of cache keys

In a multi-tenant backend with filtered lists, pagination, sorting, search, role-aware visibility, and multiple service instances, one logical dataset can produce a large number of cache keys.

For example:

\`\`\`
dev:contacts:tenant-42:list:page-1
dev:contacts:tenant-42:list:page-2
dev:contacts:tenant-42:list:status-active
dev:contacts:tenant-42:list:owner-u123
dev:contacts:tenant-42:list:sort-createdAt-desc
dev:contacts:tenant-42:list:search-acme
\`\`\`

Add combinations of:

- page
- pageSize
- sort
- search
- filters
- owner
- team
- status
- date range

and the keyspace grows quickly.

Then a contact changes. Which keys are stale? Potentially all list caches derived from that tenant's contact dataset.

This is where our invalidation approach started becoming expensive.

The system could cache quickly but had to spend too much time discovering and deleting stale keys.

In the failure mode that pushed the redesign, invalidation was taking long enough to contribute to slow request paths and timeout behavior.

The cache had become a latency source. That is the opposite of why it existed.

## The first instinct: delete matching keys

A straightforward invalidation strategy is:

\`\`\`
contacts updated
  ↓
find keys matching: tenant-42:contacts:*
  ↓
delete all matches
\`\`\`

At small scale, this feels fine. The dangerous implementation is:

\`\`\`
KEYS tenant-42:contacts:*
\`\`\`

followed by:

\`\`\`
DEL ...
\`\`\`

I do not consider KEYS a production-safe invalidation strategy for a shared Redis workload.

It scans the keyspace synchronously. As the keyspace grows, the operation can block Redis long enough to affect unrelated traffic.

The next improvement is obvious:

\`\`\`
SCAN MATCH pattern COUNT 100
\`\`\`

Unlike KEYS, SCAN is incremental. Conceptually:

\`\`\`javascript
let cursor = '0';
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
} while (cursor !== '0');
\`\`\`

That is much safer than KEYS.

And in an earlier stage of the design, moving to a SCAN-based \`invalidateByPattern(pattern)\` approach was the correct improvement.

But "safer than KEYS" does not mean "free".

That distinction became important.

## SCAN solved blocking, not discovery cost

Suppose a write invalidates: \`dev:contacts:tenant-42:*\`

Redis still has to iterate through the keyspace to discover matching keys.

The application still has to:

- maintain a cursor
- perform repeated round trips
- collect matching keys
- issue delete operations
- handle large match sets
- wait for the process to complete or move it elsewhere

The operation is incremental, but it is still work.

If invalidation happens frequently, the system repeatedly asks Redis: please rediscover all cache entries derived from this dataset.

That is the architectural smell.

The problem is not only deletion. The problem is discovery.

## Why TTL was not enough

A tempting response is: do not invalidate anything; just use a short TTL.

That moves the problem rather than solving it.

Suppose the TTL is five minutes.

A user updates a record. The database is correct immediately. The cache can remain stale for almost five minutes.

Now the application may show:

- Update API: success
- List API: old value

From the user's perspective, the system is inconsistent.

Shortening the TTL reduces the stale window but increases cache churn. Longer TTL improves hit rates but extends inconsistency.

TTL is useful as a safety mechanism. I do not want it to be the primary correctness mechanism for data that should become stale immediately after a known mutation.

## The insight: version-based invalidation

Instead of deleting cache keys when data changes, increment a version number.

\`\`\`
dev:contacts:version = 15
dev:contacts:v15:list:page-1 (cache key)
\`\`\`

When a contact changes:

\`\`\`
SET dev:contacts:version 16
\`\`\`

Keys with old versions automatically become stale:

- v15 keys expire via TTL
- Read requests look for current version (v16)
- Stale keys are left alone; they're ignored

New reads will:

1. Check version: 16
2. Look for v16:list:page-1
3. Cache miss → compute and store as v16:list:page-1
4. Return result

The beauty of this approach:

- Invalidation is O(1): just increment version
- No pattern discovery
- No SCAN loops
- No stale key cleanup required (TTL handles it)
- Immediate consistency

When the tenant writes:

\`\`\`javascript
await redis.incr('contacts:tenant-42:version');
\`\`\`

All downstream queries immediately stop using the old cache keys without explicitly deleting anything.

## The tradeoff

You trade storage efficiency for latency efficiency. You have old cache keys hanging around until they TTL out.

For most systems, that's a good trade. You're spending a few MB of Redis RAM to avoid discovery and deletion overhead.

If you have enormous keyspace and limited Redis memory, this may not be ideal. But you're unlikely to hit that constraint unless you're caching at an unusual scale.

## The implementation details

The version goes in the cache key:

\`\`\`javascript
const version = await redis.get('contacts:tenant-42:version');
const key = \`contacts:tenant-42:v\${version}:list:page-\${page}\`;
const cached = await redis.get(key);
\`\`\`

When you write:

\`\`\`javascript
// Update database
await db.contacts.update(...);

// Bump version
await redis.incr('contacts:tenant-42:version');

// Don't delete anything
\`\`\`

The old version's cache keys are left alone. They're useless now because reads fetch the new version. They'll expire via TTL.

This is simpler, faster, and more predictable than invalidation-based caching.

For systems where immediate consistency matters and you have enough RAM for version churn, version-based caching is worth considering.
`;
