
import { create } from 'zustand';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIStore {
  messages: AIMessage[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

export const useAIStore = create<AIStore>((set, get) => ({
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: "Hey there! I'm REI Mentor, your study companion. I'm here to help you think through real estate concepts and discover insights on your own. What topic are you working on today?",
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  error: null,

  addMessage: (message) => {
    const newMessage: AIMessage = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  updateLastMessage: (content) => {
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
        messages[messages.length - 1].content = content;
      }
      return { messages };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ 
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hey there! I'm REI Mentor, your study companion. I'm here to help you think through real estate concepts and discover insights on your own. What topic are you working on today?",
        timestamp: new Date(),
      },
    ] 
  }),
}));
