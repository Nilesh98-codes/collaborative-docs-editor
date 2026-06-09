"use client";

import ReactMarkdown from "react-markdown";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  SparklesIcon,
  XIcon,
  SendIcon,
  Trash2Icon,
  MessageSquareIcon,
  LightbulbIcon,
  FileTextIcon,
  PenLineIcon,
} from "lucide-react";
import { toast } from "sonner";

import { useChatStore, type ChatMessage } from "@/store/use-chat-store";
import { useEditorStore } from "@/store/use-editor-store";

/* ------------------------------------------------------------------ */
/*  Suggestion chips shown in the empty state                         */
/* ------------------------------------------------------------------ */
const SUGGESTIONS = [
  {
    label: "Summarize this document",
    icon: FileTextIcon,
  },
  {
    label: "Suggest improvements",
    icon: LightbulbIcon,
  },
  {
    label: "Improve grammar",
    icon: PenLineIcon,
  },
  {
    label: "Create an outline",
    icon: MessageSquareIcon,
  },
];

/* ------------------------------------------------------------------ */
/*  Typing-dots loader                                                */
/* ------------------------------------------------------------------ */
const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <span className="size-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
    <span className="size-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
    <span className="size-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Single message bubble                                             */
/* ------------------------------------------------------------------ */
const MessageBubble = ({ msg }: { msg: ChatMessage }) => {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-md"
            : "bg-neutral-100 text-neutral-800 rounded-bl-md border border-neutral-200/60"
        }`}
      >
        {isUser ? (
          msg.text
        ) : (
          <div className="max-w-none text-[13px] leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_li]:mb-0.5 [&_h1]:text-base [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mb-1.5 [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:mb-1 [&_code]:bg-neutral-200/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_pre]:bg-neutral-200/70 [&_pre]:p-2 [&_pre]:rounded-lg [&_pre]:mb-2 [&_pre]:overflow-x-auto [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-300 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-neutral-600 [&_strong]:font-semibold [&_a]:text-indigo-600 [&_a]:underline">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main chat panel                                                   */
/* ------------------------------------------------------------------ */
export const AIChatPanel = () => {
  const {
    isOpen,
    close,
    messages,
    addMessage,
    clearMessages,
    contextSent,
    setContextSent,
  } = useChatStore();

  const { editor } = useEditorStore();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* -- responsive check -------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* -- auto-scroll to bottom --------------------------------------- */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  /* -- focus input when panel opens -------------------------------- */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* -- send a message ---------------------------------------------- */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      // Add user message
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        text: trimmed,
      };
      addMessage(userMsg);
      setInput("");
      setIsLoading(true);

      // Build messages array from store (include the one we just added)
      const allMessages = [...messages, userMsg];
      const payload: {
        messages: { role: string; text: string }[];
        context?: string;
      } = {
        messages: allMessages.map((m) => ({ role: m.role, text: m.text })),
      };

      // Send document context only on the first message of the session
      if (!contextSent && editor) {
        const docText = editor.getText();
        if (docText.trim().length > 0) {
          payload.context = docText.slice(0, 2000);
        }
        setContextSent(true);
      }

      try {
        const res = await fetch("/api/gemini-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          const errMsg = data.error || "Failed to get AI response.";
          const lower = errMsg.toLowerCase();

          if (
            lower.includes("quota") ||
            lower.includes("rate limit") ||
            lower.includes("429")
          ) {
            toast.error(
              "AI quota exceeded. Please wait a moment and try again."
            );
          } else {
            toast.error(errMsg);
          }
          return;
        }

        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: data.text,
        };
        addMessage(assistantMsg);

        if (data.contextTruncated) {
          toast.warning(
            "Document was too long — only the first 2,000 characters of context were used."
          );
        }
      } catch {
        toast.error("Network error. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, contextSent, editor, addMessage, setContextSent]
  );

  /* -- keyboard submit --------------------------------------------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!isOpen) return null;

  /* -- panel content (shared between desktop & mobile) ------------- */
  const panelContent = (
    <div className="flex flex-col h-full bg-white border-l border-neutral-200/70 shadow-[-2px_0_12px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-7 rounded-lg bg-indigo-100">
            <SparklesIcon className="size-4 text-indigo-600" />
          </div>
          <span className="text-sm font-semibold text-neutral-800">
            AI Assistant
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              clearMessages();
              toast.success("Conversation cleared.");
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Clear conversation"
          >
            <Trash2Icon className="size-4" />
          </button>
          <button
            onClick={close}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            title="Close panel"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Conversation area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && !isLoading ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 mb-4">
              <SparklesIcon className="size-7 text-indigo-500" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-800 mb-1">
              How can I help?
            </h3>
            <p className="text-xs text-neutral-500 mb-6 max-w-[220px]">
              Ask me anything about your document, or try a suggestion below.
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-[260px]">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => sendMessage(s.label)}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-neutral-200/80 bg-white text-left text-xs text-neutral-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all duration-150 shadow-sm"
                >
                  <s.icon className="size-3.5 shrink-0 text-indigo-400" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-neutral-100 rounded-2xl rounded-bl-md border border-neutral-200/60">
                  <TypingDots />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input area */}
      <div className="px-3 pb-3 pt-2 border-t border-neutral-100 bg-white">
        <div className="flex items-end gap-2 bg-neutral-50 border border-neutral-200/80 rounded-xl px-3 py-2 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your document…"
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 resize-none focus:outline-none max-h-[100px] min-h-[24px] leading-relaxed disabled:opacity-50"
            style={{ height: "auto", overflow: "hidden" }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = `${Math.min(t.scrollHeight, 100)}px`;
              t.style.overflow =
                t.scrollHeight > 100 ? "auto" : "hidden";
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="flex items-center justify-center size-8 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 mb-[1px]"
            title="Send message"
          >
            <SendIcon className="size-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-neutral-400 text-center mt-2">
          AI can make mistakes. Review important information.
        </p>
      </div>
    </div>
  );

  /* -- mobile: full-screen overlay drawer -------------------------- */
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 print:hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 animate-in fade-in-0 duration-200"
          onClick={close}
        />
        {/* Drawer */}
        <div className="absolute inset-y-0 right-0 w-full max-w-md animate-in slide-in-from-right duration-300">
          {panelContent}
        </div>
      </div>
    );
  }

  /* -- desktop: inline sidebar ------------------------------------- */
  return (
    <div className="w-[360px] shrink-0 h-[calc(100vh-114px)] sticky top-[114px] print:hidden">
      {panelContent}
    </div>
  );
};
