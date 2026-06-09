import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

interface ChatStore {
  isOpen: boolean;
  messages: ChatMessage[];
  contextSent: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  setContextSent: (v: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  messages: [],
  contextSent: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  clearMessages: () => set({ messages: [], contextSent: false }),
  setContextSent: (v) => set({ contextSent: v }),
}));
