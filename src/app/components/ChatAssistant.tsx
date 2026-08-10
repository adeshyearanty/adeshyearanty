'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Plus,
  ChevronLeft,
  Clock,
  Trash2,
  Bot,
  User,
  Loader2,
  Wifi,
  WifiOff,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useChat, ChatMessage } from '../hooks/useChat';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Refresh sessions when history panel opens
  useEffect(() => {
    if (showHistory) {
      refreshSessions();
    }
  }, [showHistory, refreshSessions]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput('');
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center cursor-pointer"
            id="chat-assistant-button"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-2rem)] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(15, 15, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 100, 200, 0.15)',
              boxShadow:
                '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(100, 100, 255, 0.05)',
            }}
            id="chat-assistant-panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                borderBottom: '1px solid rgba(100, 100, 200, 0.1)',
              }}
            >
              <div className="flex items-center gap-3">
                {showHistory ? (
                  <button
                    onClick={() => setShowHistory(false)}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Back to chat"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {showHistory ? 'Conversation History' : "Adesh's AI Assistant"}
                  </h3>
                  {!showHistory && (
                    <div className="flex items-center gap-1.5">
                      {isConnected ? (
                        <Wifi className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <WifiOff className="w-3 h-3 text-red-400" />
                      )}
                      <span
                        className={`text-xs ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}
                      >
                        {isConnected ? 'Online' : 'Reconnecting...'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!showHistory && (
                  <>
                    <button
                      onClick={() => setShowHistory(true)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                      title="Conversation history"
                      aria-label="View conversation history"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={startNewConversation}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                      title="New conversation"
                      aria-label="Start new conversation"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowHistory(false);
                  }}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* History Panel */}
            {showHistory ? (
              <div className="flex-1 overflow-y-auto p-3 space-y-2 chat-scrollbar">
                {sessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Clock className="w-10 h-10 mb-3 opacity-30" />
                    <p className="text-sm">No conversations yet</p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className="group flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5"
                      style={{
                        border: '1px solid rgba(100, 100, 200, 0.08)',
                      }}
                      onClick={() => {
                        switchConversation(session.id);
                        setShowHistory(false);
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">
                          {session.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {session.messageCount} messages
                          </span>
                          <span className="text-xs text-gray-600">·</span>
                          <span className="text-xs text-gray-500">
                            {formatTime(session.lastMessageAt)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all cursor-pointer"
                        title="Delete conversation"
                        aria-label={`Delete conversation: ${session.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4">
                        <Bot className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-base font-medium text-white mb-2">
                        Hi there! 👋
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        I&apos;m Adesh&apos;s AI assistant. Ask me about his
                        projects, skills, experience, or anything from his
                        portfolio!
                      </p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <MessageBubble key={msg.id} message={msg} />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div
                  className="p-3 shrink-0"
                  style={{
                    borderTop: '1px solid rgba(100, 100, 200, 0.1)',
                  }}
                >
                  <div
                    className="flex items-end gap-2 rounded-xl p-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(100, 100, 200, 0.1)',
                    }}
                  >
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about Adesh's work..."
                      rows={1}
                      className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none max-h-24 leading-relaxed px-2 py-1.5"
                      style={{ scrollbarWidth: 'none' }}
                      disabled={isStreaming}
                      id="chat-input"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isStreaming || !isConnected}
                      className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                      aria-label="Send message"
                      id="chat-send-button"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'USER';
  const isFailed = message.status === 'FAILED';
  const isStreamingMsg = message.status === 'STREAMING';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${
          isUser
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
            : 'bg-gradient-to-br from-blue-500 to-purple-600'
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-white" />
        )}
      </div>

      {/* Message */}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-white'
            : 'bg-white/[0.04] text-gray-200'
        } ${isFailed ? 'border border-red-500/30' : ''}`}
        style={
          !isUser
            ? { border: '1px solid rgba(100, 100, 200, 0.06)' }
            : undefined
        }
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none chat-markdown">
            {message.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {message.content}
              </ReactMarkdown>
            ) : null}
            {isStreamingMsg && message.content.length > 0 && (
              <span className="inline-block w-1.5 h-3.5 bg-[#d8b26a] ml-0.5 animate-pulse align-middle" />
            )}
            {isStreamingMsg && message.content.length === 0 && (
              <div className="flex items-center gap-1.5 py-1 px-0.5">
                <span className="typing-dots">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </span>
              </div>
            )}
          </div>
        )}
        {isFailed && (
          <p className="text-xs text-red-400 mt-1.5 opacity-80">
            ⚠ Response failed
          </p>
        )}
      </div>
    </motion.div>
  );
}
