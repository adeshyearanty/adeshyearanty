"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useChat, type ChatMessage } from "@/app/_hooks/use-chat";

const STARTER_PROMPTS = [
  "What is Adesh's core stack?",
  "Tell me about SalesAstra architecture",
  "What AWS services has he owned?",
  "How can I get in touch?",
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  // Position state (null indicates default bottom-right docked position)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  const widgetRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
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
  } = useChat();

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, isStreaming]);

  // Keep widget inside viewport on window resize if dragged
  useEffect(() => {
    const handleResize = () => {
      if (!widgetRef.current || !position) return;
      const width = widgetRef.current.offsetWidth || 380;
      const height = widgetRef.current.offsetHeight || 500;
      const maxX = Math.max(12, window.innerWidth - width - 16);
      const maxY = Math.max(12, window.innerHeight - height - 16);
      setPosition((prev) => {
        if (!prev) return null;
        return {
          x: Math.min(Math.max(12, prev.x), maxX),
          y: Math.min(Math.max(12, prev.y), maxY),
        };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position]);

  // Refresh sessions when history panel opens
  useEffect(() => {
    if (showHistory) {
      refreshSessions();
    }
  }, [showHistory, refreshSessions]);

  // Pointer drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;

    const widget = widgetRef.current;
    if (!widget) return;

    const rect = widget.getBoundingClientRect();
    const currentX = position ? position.x : rect.left;
    const currentY = position ? position.y : rect.top;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: currentX,
      posY: currentY,
    };
    setIsDragging(true);
    setPosition({ x: currentX, y: currentY });
  }, [position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    const width = widgetRef.current?.offsetWidth || 380;
    const height = widgetRef.current?.offsetHeight || 500;
    const maxX = Math.max(12, window.innerWidth - width - 16);
    const maxY = Math.max(12, window.innerHeight - height - 16);

    const nextX = Math.min(Math.max(12, dragStartRef.current.posX + deltaX), maxX);
    const nextY = Math.min(Math.max(12, dragStartRef.current.posY + deltaY), maxY);

    setPosition({ x: nextX, y: nextY });
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
  }, [isDragging]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming) return;
    setInput("");
    sendMessage(query);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowHistory(false);
  };

  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Determine if we should show messages or the welcome/empty state
  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ----------------- Floating Launcher Button ----------------- */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 cubic-bezier(0.16,1,0.3,1) ${isOpen
          ? "pointer-events-none scale-75 opacity-0 translate-y-4"
          : "scale-100 opacity-100 translate-y-0"
          }`}
      >
        <button
          onClick={handleOpen}
          className="group flex items-center gap-3 rounded-full border border-hairline-strong bg-surface/95 px-4 py-3 text-paper shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-signal hover:bg-surface"
          aria-label="Open chat assistant"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors group-hover:text-signal">
            Ask Assistant
          </span>
          <svg
            className="h-4 w-4 text-slate transition-colors group-hover:text-signal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {/* ----------------- Chat Window Container ----------------- */}
      <div
        ref={widgetRef}
        style={
          position
            ? {
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              top: 0,
              left: 0,
              bottom: "auto",
              right: "auto",
            }
            : undefined
        }
        className={`fixed z-50 w-[calc(100vw-32px)] max-w-[380px] select-none rounded-2xl border border-hairline-strong bg-surface/95 shadow-2xl backdrop-blur-xl transition-all duration-300 cubic-bezier(0.16,1,0.3,1) ${!position ? "bottom-6 right-6" : ""
          } ${isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-90 opacity-0 translate-y-6"
          } ${isDragging ? "shadow-signal/15 ring-1 ring-signal/40 cursor-grabbing" : ""}`}
      >
        {/* ----------------- Header (Drag Handle) ----------------- */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex cursor-grab items-center justify-between border-b border-hairline px-4 py-3 active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5">
            {/* Back button in history view / Drag grip in chat view */}
            {showHistory ? (
              <button
                onClick={() => setShowHistory(false)}
                className="rounded-lg p-1 text-slate transition-colors hover:bg-surface-2 hover:text-paper"
                aria-label="Back to chat"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <span className="text-slate/60 hover:text-slate transition-colors" title="Drag anywhere to reposition">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="6" r="1.5" />
                  <circle cx="16" cy="6" r="1.5" />
                  <circle cx="8" cy="12" r="1.5" />
                  <circle cx="16" cy="12" r="1.5" />
                  <circle cx="8" cy="18" r="1.5" />
                  <circle cx="16" cy="18" r="1.5" />
                </svg>
              </span>
            )}

            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-signal" : "bg-red-500 animate-pulse"}`} />
              <div>
                <p className="text-xs font-semibold tracking-tight text-paper">
                  {showHistory ? "Conversations" : "Adesh Assistant"}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate">
                  {showHistory
                    ? `${sessions.length} session${sessions.length !== 1 ? "s" : ""}`
                    : isConnected
                      ? "Systems & Architecture"
                      : "Reconnecting…"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Window actions */}
          <div className="flex items-center gap-1">
            {!showHistory && (
              <>
                {/* History button */}
                <button
                  onClick={() => setShowHistory(true)}
                  className="rounded-lg p-1.5 text-slate transition-colors hover:bg-surface-2 hover:text-paper"
                  title="Conversation history"
                  aria-label="View conversation history"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                {/* New conversation button */}
                <button
                  onClick={startNewConversation}
                  className="rounded-lg p-1.5 text-slate transition-colors hover:bg-surface-2 hover:text-paper"
                  title="New conversation"
                  aria-label="Start new conversation"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-lg p-1.5 text-slate transition-colors hover:bg-surface-2 hover:text-paper"
              title={isMinimized ? "Expand" : "Minimize"}
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              {isMinimized ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              )}
            </button>
            <button
              onClick={handleClose}
              className="rounded-lg p-1.5 text-slate transition-colors hover:bg-surface-2 hover:text-paper"
              title="Close"
              aria-label="Close chat"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ----------------- Body (Chat area) ----------------- */}
        <div
          className={`flex flex-col overflow-hidden transition-all duration-300 cubic-bezier(0.16,1,0.3,1) ${isMinimized
            ? "max-h-0 opacity-0 pointer-events-none"
            : "max-h-[calc(100vh-140px)] h-[460px] opacity-100"
            }`}
        >
          {/* ----------------- History Panel ----------------- */}
          {showHistory ? (
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
              {sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate/60 gap-2">
                  <svg className="h-8 w-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs">No conversations yet</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className="group flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all hover:bg-surface-2/60 border border-transparent hover:border-hairline"
                    onClick={() => {
                      switchConversation(session.id);
                      setShowHistory(false);
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-paper truncate">
                        {session.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[10px] text-slate">
                          {session.messageCount} msg{session.messageCount !== 1 ? "s" : ""}
                        </span>
                        <span className="text-slate/30">·</span>
                        <span className="font-mono text-[10px] text-slate">
                          {formatTime(session.lastMessageAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(session.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate hover:text-red-400 transition-all"
                      title="Delete"
                      aria-label={`Delete: ${session.title}`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <>
              {/* Message stream */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 text-sm">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex items-center gap-1.5 text-xs text-slate">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:0.4s]" />
                    </div>
                  </div>
                ) : !hasMessages ? (
                  /* Welcome state when no messages */
                  <div className="flex flex-col items-start gap-2">
                    <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed border border-hairline bg-base text-mist">
                      <p className="whitespace-pre-line text-[13px]">
                        Hi! I&apos;m Adesh&apos;s portfolio assistant. Ask me anything about his systems, SalesAstra architecture, tech stack, or background.
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))
                )}

                {/* Typing/streaming indicator */}
                {isStreaming && messages.length > 0 && messages[messages.length - 1]?.role === "USER" && (
                  <div className="flex items-center gap-1.5 rounded-xl border border-hairline bg-base px-3 py-2 text-xs text-slate w-fit">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions when no conversation started */}
              {!hasMessages && (
                <div className="flex-shrink-0 border-t border-hairline/60 bg-base/40 px-3 py-2">
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-slate">
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="rounded-full border border-hairline bg-surface px-2.5 py-1 text-left text-[11px] text-mist transition-colors hover:border-signal/50 hover:text-paper"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- Input form ----------------- */}
              <form
                onSubmit={handleSubmit}
                className="flex-shrink-0 flex items-center gap-2 border-t border-hairline bg-surface-2/80 p-3 rounded-b-2xl"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isConnected ? "Ask about systems, stack, projects..." : "Connecting..."}
                  disabled={isStreaming || !isConnected}
                  className="flex-1 rounded-xl border border-hairline bg-base px-3 py-2 text-xs text-paper placeholder-slate/70 outline-none transition-colors focus:border-signal disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming || !isConnected}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-signal text-base font-medium transition-opacity disabled:opacity-30"
                  aria-label="Send message"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ----------- Message Bubble Component ----------- */

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "USER";
  const isFailed = message.status === "FAILED";
  const isStreamingMsg = message.status === "STREAMING";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
          isUser
            ? "bg-signal text-base font-medium"
            : "border border-hairline bg-base text-mist"
        } ${isFailed ? "border-red-500/40" : ""}`}
      >
        {!isUser ? (
          message.content ? (
            <div className="chat-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {message.content}
              </ReactMarkdown>
              {isStreamingMsg && (
                <span className="inline-block w-1.5 h-3.5 bg-signal ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          ) : isStreamingMsg ? (
            <div className="flex items-center gap-1.5 py-0.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal [animation-delay:0.4s]" />
            </div>
          ) : null
        ) : (
          <p className="whitespace-pre-line text-[13px]">{message.content}</p>
        )}

        {isFailed && (
          <p className="text-[10px] text-red-400/80 mt-1">⚠ Response failed</p>
        )}
      </div>
    </div>
  );
}
