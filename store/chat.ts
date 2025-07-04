
import { create } from 'zustand';

interface Message {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  room_id?: string;
  created_at: string;
}

interface ChatState {
  messages: Message[];
  activeRoom: string | null;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setActiveRoom: (roomId: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  activeRoom: null,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setActiveRoom: (roomId) => set({ activeRoom: roomId }),
}));
