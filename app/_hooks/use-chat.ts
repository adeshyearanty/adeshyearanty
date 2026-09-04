"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import {
  createSession,
  getConversation,
  getSessions,
  deleteSession as deleteSessionApi,
  type SessionListItem,
  type MessageResponse,
} from "@/app/_lib/chat-api";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";
const VISITOR_ID_KEY = "portfolio_visitor_id";
const SESSION_ID_KEY = "portfolio_chat_session_id";

export type ChatMessage = {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  status: "STREAMING" | "COMPLETED" | "FAILED";
  createdAt: string;
};

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getStoredSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_ID_KEY);
}

function setStoredSessionId(id: string | null): void {
  if (typeof window === "undefined") return;
  if (id) {
    localStorage.setItem(SESSION_ID_KEY, id);
  } else {
    localStorage.removeItem(SESSION_ID_KEY);
  }
}

export function useChat() {
  const [visitorId, setVisitorId] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<SessionListItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const socketRef = useRef<Socket | null>(null);
  const streamingContentRef = useRef("");
  const streamingMessageIdRef = useRef<string | null>(null);
  const messageIdsRef = useRef(new Set<string>());

  // Initialize visitor ID and restore session
  useEffect(() => {
    const vid = getOrCreateVisitorId();
    setVisitorId(vid);

    const storedSessionId = getStoredSessionId();

    const init = async () => {
      try {
        if (storedSessionId) {
          const conv = await getConversation(storedSessionId, vid);
          setSessionId(storedSessionId);
          const restoredMessages: ChatMessage[] = conv.messages.map(
            (m: MessageResponse) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              status: m.status,
              createdAt: m.createdAt,
            })
          );
          setMessages(restoredMessages);
          messageIdsRef.current = new Set(
            restoredMessages.map((m) => m.id)
          );
        }
      } catch {
        // Session no longer valid, clear it
        setStoredSessionId(null);
      }

      try {
        const sessionList = await getSessions(vid);
        setSessions(sessionList);
      } catch {
        // Ignore session list errors
      }

      setIsLoading(false);
    };

    init();
  }, []);

  // Socket.IO connection
  useEffect(() => {
    if (!visitorId) return;

    const socket = io(`${SOCKET_URL}/chat`, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on(
      "message:start",
      (data: { sessionId: string; messageId: string; role: string }) => {
        streamingMessageIdRef.current = data.messageId;
        streamingContentRef.current = "";
        setIsStreaming(true);

        const newMsg: ChatMessage = {
          id: data.messageId,
          role: "ASSISTANT",
          content: "",
          status: "STREAMING",
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => {
          // Deduplicate by messageId
          if (messageIdsRef.current.has(data.messageId)) return prev;
          messageIdsRef.current.add(data.messageId);
          return [...prev, newMsg];
        });
      }
    );

    socket.on(
      "message:chunk",
      (data: { sessionId: string; messageId: string; chunk: string }) => {
        const targetId = data.messageId || streamingMessageIdRef.current;
        if (!targetId) return;

        setMessages((prev) => {
          const exists = prev.some((m) => m.id === targetId);
          if (!exists) {
            messageIdsRef.current.add(targetId);
            const newMsg: ChatMessage = {
              id: targetId,
              role: "ASSISTANT",
              content: data.chunk,
              status: "STREAMING",
              createdAt: new Date().toISOString(),
            };
            return [...prev, newMsg];
          }
          return prev.map((m) =>
            m.id === targetId ? { ...m, content: m.content + data.chunk } : m
          );
        });

        if (targetId === streamingMessageIdRef.current) {
          streamingContentRef.current += data.chunk;
        }
      }
    );

    socket.on(
      "message:complete",
      (data: {
        sessionId: string;
        messageId: string;
        content: string;
      }) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === data.messageId
              ? {
                  ...m,
                  content: data.content,
                  status: "COMPLETED" as const,
                }
              : m
          )
        );
        setIsStreaming(false);
        streamingMessageIdRef.current = null;
        streamingContentRef.current = "";

        // Refresh sessions list to update lastMessageAt
        if (visitorId) {
          getSessions(visitorId)
            .then(setSessions)
            .catch(() => {});
        }
      }
    );

    socket.on(
      "message:error",
      (data: {
        sessionId: string;
        messageId: string | null;
        error: string;
      }) => {
        if (data.messageId) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === data.messageId
                ? { ...m, status: "FAILED" as const }
                : m
            )
          );
        }
        setIsStreaming(false);
        streamingMessageIdRef.current = null;
        streamingContentRef.current = "";
      }
    );

    // On reconnect, restore from MongoDB
    socket.io.on("reconnect", async () => {
      const currentSessionId = getStoredSessionId();
      if (currentSessionId && visitorId) {
        try {
          const conv = await getConversation(currentSessionId, visitorId);
          const restoredMessages: ChatMessage[] = conv.messages.map(
            (m: MessageResponse) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              status: m.status,
              createdAt: m.createdAt,
            })
          );
          messageIdsRef.current = new Set(
            restoredMessages.map((m) => m.id)
          );
          setMessages(restoredMessages);
          setIsStreaming(false);
        } catch {
          // Ignore reconnect restore errors
        }
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [visitorId]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!visitorId || !text.trim() || isStreaming) return;

      let currentSessionId = sessionId;

      // Create session on first message
      if (!currentSessionId) {
        try {
          const session = await createSession(visitorId);
          currentSessionId = session.id;
          setSessionId(session.id);
          setStoredSessionId(session.id);
        } catch {
          return;
        }
      }

      // Add user message to UI immediately (optimistic)
      const userMsgId = crypto.randomUUID();
      const userMsg: ChatMessage = {
        id: userMsgId,
        role: "USER",
        content: text,
        status: "COMPLETED",
        createdAt: new Date().toISOString(),
      };

      messageIdsRef.current.add(userMsgId);
      setMessages((prev) => [...prev, userMsg]);

      // Send via WebSocket
      if (socketRef.current?.connected) {
        socketRef.current.emit("message:send", {
          sessionId: currentSessionId,
          visitorId,
          message: text,
        });
      }
    },
    [visitorId, sessionId, isStreaming]
  );

  const startNewConversation = useCallback(() => {
    setSessionId(null);
    setStoredSessionId(null);
    setMessages([]);
    messageIdsRef.current.clear();
    streamingMessageIdRef.current = null;
    streamingContentRef.current = "";
    setIsStreaming(false);
  }, []);

  const switchConversation = useCallback(
    async (targetSessionId: string) => {
      if (!visitorId) return;

      try {
        setIsLoading(true);
        const conv = await getConversation(targetSessionId, visitorId);
        setSessionId(targetSessionId);
        setStoredSessionId(targetSessionId);
        const restoredMessages: ChatMessage[] = conv.messages.map(
          (m: MessageResponse) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            status: m.status,
            createdAt: m.createdAt,
          })
        );
        messageIdsRef.current = new Set(
          restoredMessages.map((m) => m.id)
        );
        setMessages(restoredMessages);
        setIsStreaming(false);
      } catch {
        // Ignore switch errors
      } finally {
        setIsLoading(false);
      }
    },
    [visitorId]
  );

  const deleteConversation = useCallback(
    async (targetSessionId: string) => {
      if (!visitorId) return;

      try {
        await deleteSessionApi(targetSessionId, visitorId);

        if (targetSessionId === sessionId) {
          startNewConversation();
        }

        const sessionList = await getSessions(visitorId);
        setSessions(sessionList);
      } catch {
        // Ignore delete errors
      }
    },
    [visitorId, sessionId, startNewConversation]
  );

  const refreshSessions = useCallback(async () => {
    if (!visitorId) return;
    try {
      const sessionList = await getSessions(visitorId);
      setSessions(sessionList);
    } catch {
      // Ignore refresh errors
    }
  }, [visitorId]);

  return {
    visitorId,
    sessionId,
    messages,
    sessions,
    isConnected,
    isStreaming,
    isLoading,
    sendMessage,
    startNewConversation,
    switchConversation,
    deleteConversation,
    refreshSessions,
  };
}
