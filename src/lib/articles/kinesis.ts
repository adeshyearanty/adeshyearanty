export const kinesisArticleContent = `
SQS is usually the first AWS service I consider when I need to move work out of a synchronous request path.

It is simple, durable, scalable, and operationally boring in the best possible way. A producer sends a message, a consumer processes it, and the queue absorbs temporary differences in throughput.

For many systems, that is exactly what I want.

But while designing Pulse — an omnichannel, AI-first messaging platform handling channels such as WhatsApp, Facebook Messenger, Instagram DM, and Web Chat — I ran into a constraint that changed the decision: messages belonging to the same conversation had to be processed in order.

That sounds obvious until the system becomes asynchronous.

A conversation is not just a collection of independent jobs. It is an ordered state transition.

## The problem with ordering

Consider a simple sequence:

- 10:00:01  Customer sends message A
- 10:00:02  Customer sends message B
- 10:00:03  Agent sends reply C
- 10:00:04  Provider reports C as delivered
- 10:00:05  Provider reports C as read

If those events are processed out of order, the database can temporarily — or permanently — represent a state that never existed.

A read receipt may arrive before the corresponding outbound message has been reconciled. An AI consumer may generate a reply using stale conversation context. A WebSocket event may show message B before message A. A retry may overwrite a newer status with an older one.

The requirement was therefore not: process every message globally in order. That would be expensive and unnecessary.

The actual requirement was: preserve ordering inside the smallest domain boundary where ordering matters.

For Pulse, that boundary is primarily the conversation.

That requirement is what pushed the architecture toward Amazon Kinesis.

## The system I was actually designing

Pulse owns the messaging domain around:

- contacts
- conversations
- messages
- inbound channel events
- outbound messages
- delivery and read statuses
- real-time agent updates
- asynchronous AI processing

MongoDB stores the domain state. NestJS services handle the backend processing.

Socket.IO already provides real-time communication to the application, so I deliberately avoided introducing a second WebSocket architecture through API Gateway WebSocket APIs. Running two independent real-time systems would have created additional connection management, authentication, scaling, and operational overhead.

The asynchronous path needed to support multiple external transports while keeping the internal domain consistent.

### System architecture flow

The key insight is that channel-specific payloads should not leak throughout the system.

WhatsApp has one event structure. Instagram has another. Messenger has another. Web Chat is under our own control.

Internally, they are normalized into a common Pulse message model.

## Why Kinesis was the right choice

Kinesis provides ordering guarantees at the shard level. If I partition by conversationId, all events for the same conversation go to the same shard, and Kinesis guarantees within-shard ordering.

This solves the ordering problem without requiring complex application-level logic.

### Phase 1: Raw ingestion

Channel adapters normalize incoming events into a PulseMessage envelope. Each envelope is keyed by conversationId and sent to Kinesis.

### Phase 2: Enrichment

External provider webhooks (delivery/read receipts, etc.) flow through a separate ingestion path and are enriched by consumer applications.

The separation between raw ingestion and enrichment allows us to maintain ordered domain state while processing independent async updates.

## The tradeoffs

Kinesis is more complex operationally than SQS. You must manage shards, understand shard limits, and think about partition keys.

But for a system where conversation ordering is a hard requirement, those tradeoffs are worth it. The alternative — application-level ordering logic — is far more fragile and harder to maintain.

The decision came down to: which tool better matches the problem we're solving?

SQS is general-purpose. Kinesis is optimized for ordered streams. For Pulse, Kinesis was the answer.
`;
