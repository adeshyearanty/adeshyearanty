export const rbacArticleContent = `
Most RBAC implementations look clean in a diagram.

A user has a role. A role has permissions. An API checks the permission. Done.

That model works until someone asks a more realistic question: The user can read contacts — but which contacts?

That one question changes the problem completely.

## The visibility problem

In SalesAstra, access is not only about whether an action is allowed. It is also about the scope within which that action is allowed.

A user may be able to:

- view only their own records
- view records owned by members of their team
- view records visible through hierarchy
- view records explicitly shared with them
- view records exposed by sharing rules
- view every record in the tenant

At that point, a boolean permission is no longer enough.

\`\`\`
{
  "contacts.read": true
}
\`\`\`

This is technically valid and operationally misleading. It tells the application that the user can read contacts. It says nothing about which contacts.

That is how authorization systems start lying to users.

The UI shows a module because the permission says "allowed". The list API returns fewer records because another visibility rule exists somewhere else. A search endpoint returns records that the normal list endpoint hides. One microservice interprets "team" differently from another.

The user experiences inconsistent behavior even though every individual service believes it is enforcing permissions correctly.

## The solution: separate concerns

I wanted to avoid that. The architecture I settled on separates two concerns that are often incorrectly merged:

1. What actions can this user perform?
2. Which records are visible to this user?

That distinction became the foundation of the policy layer.

## Permission is not visibility

The role system defines action capability.

\`\`\`
{
  "module": "contacts",
  "action": "read",
  "allowed": true,
  "scope": 2
}
\`\`\`

In our model, scope values represent boundaries such as:

- 1 → own / self
- 2 → team / group
- 3 → all / any

The exact labels matter less than the principle.

A role can say: contacts.read = allowed, scope = team

But the role should not permanently store an expanded list such as:

\`\`\`
{
  "accessibleUserIds": [
    "u1", "u2", "u3", "u4", "u5"
  ]
}
\`\`\`

Why? Because that list is not actually role data. It is derived from mutable organizational state.

It can change when:

- a manager changes
- a user moves to another team
- hierarchy changes
- a sharing rule changes
- team membership changes
- a role assignment changes
- an explicit sharing relationship changes

So I kept action permissions in RBAC and treated hierarchy and sharing as visibility inputs.

That gives a much cleaner separation:

- **Role permissions**: can read? can create? can edit? can delete?
- **Visibility model**: self, team, hierarchy, sharing rules, tenant-wide

A manager seeing a subordinate's record does not automatically mean the manager can edit or delete it.

Visibility answers: can this record participate in the user's accessible dataset?

Action permission answers: what operation may the user perform?

Those are related questions, but they are not the same question.

## Why I centralized policy evaluation

SalesAstra is composed of multiple services.

Without a centralized policy model, every service eventually implements its own interpretation of access.

The Contacts service may write:

\`\`\`
if (user.role === 'manager') {
  // include team
}
\`\`\`

The Leads service may write:

\`\`\`
if (scope === 2) {
  // include direct reports
}
\`\`\`

The Search service may write:

\`\`\`
if (user.isAdmin) {
  // bypass filters
}
\`\`\`

Now there are three authorization systems. They may share terminology, but they do not share semantics.

That is dangerous because permission bugs are often not obvious denials. They are inconsistencies.

A user can find a record in global search but cannot open it. A dashboard counts records that the list API does not show. An export returns records that the UI never displayed.

To prevent this, policy evaluation happens in a single place: the policy engine.

Every service queries this engine with (user, action, resource, context) and receives a definitive answer about effective access.

## The implementation insight

The policy engine doesn't just return true/false. It returns the effective access context:

\`\`\`
{
  user: "u123",
  action: "read",
  module: "contacts",
  effectiveScope: 2,
  visibilityFilters: [
    "owner = u123",
    "assignee IN team_members(u123)",
    "in_hierarchy(u123)"
  ]
}
\`\`\`

Downstream services use these filters to construct queries. They don't re-implement policy logic. They apply the filters and trust the results.

This is not perfect. It requires discipline. But it prevents the common failure mode: each service implementing "their own" access control and slowly diverging until the system lies to users about what they can see.

## The outcome

Centralized policy evaluation is more expensive upfront. It requires thinking about the problem carefully. It requires building infrastructure.

But the payoff is consistency.

When a user reports that they can see something in search but not in list, there's exactly one place where that bug lives. Not three places. Not six.

And that matters more than I initially thought.
`;
