const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface SessionResponse {
  id: string;
  visitorId: string;
  title: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
}

export interface SessionListItem {
  id: string;
  title: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
  messageCount: number;
}

export interface MessageResponse {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  status: 'STREAMING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

export interface ConversationResponse {
  session: SessionResponse;
  messages: MessageResponse[];
}

export async function createSession(
  visitorId: string,
  channel = 'WEB',
): Promise<SessionResponse> {
  const res = await fetch(`${API_URL}/chat/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitorId, channel }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create session: ${res.status}`);
  }

  return res.json();
}

export async function getSessions(
  visitorId: string,
  channel = 'WEB',
): Promise<SessionListItem[]> {
  const params = new URLSearchParams({ visitorId, channel });
  const res = await fetch(`${API_URL}/chat/sessions?${params}`);

  if (!res.ok) {
    throw new Error(`Failed to get sessions: ${res.status}`);
  }

  return res.json();
}

export async function getConversation(
  sessionId: string,
  visitorId: string,
): Promise<ConversationResponse> {
  const params = new URLSearchParams({ visitorId });
  const res = await fetch(`${API_URL}/chat/sessions/${sessionId}?${params}`);

  if (!res.ok) {
    throw new Error(`Failed to get conversation: ${res.status}`);
  }

  return res.json();
}

export async function deleteSession(
  sessionId: string,
  visitorId: string,
): Promise<void> {
  const params = new URLSearchParams({ visitorId });
  const res = await fetch(`${API_URL}/chat/sessions/${sessionId}?${params}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete session: ${res.status}`);
  }
}
