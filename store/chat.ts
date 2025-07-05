
import { create } from 'zustand';
import { Message, ChatRoom } from '../lib/services/database';
import { getChatChannel, getPresenceChannel } from '../lib/ably';

interface OnlineUser {
  clientId: string;
  data: {
    userId: string;
    name: string;
    avatar?: string;
  };
}

interface ChatState {
  messages: Message[];
  rooms: ChatRoom[];
  activeRoom: string | null;
  onlineUsers: OnlineUser[];
  loading: boolean;
  
  // Actions
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setRooms: (rooms: ChatRoom[]) => void;
  setActiveRoom: (roomId: string | null) => void;
  setOnlineUsers: (users: OnlineUser[]) => void;
  setLoading: (loading: boolean) => void;
  
  // Real-time functions
  subscribeToRoom: (roomId: string) => void;
  unsubscribeFromRoom: (roomId: string) => void;
  sendMessage: (content: string, userId: string, roomId?: string) => void;
  enterPresence: (userId: string, name: string, avatar?: string) => void;
  leavePresence: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  rooms: [],
  activeRoom: null,
  onlineUsers: [],
  loading: false,

  addMessage: (message) =>
    set((state) => ({ 
      messages: [...state.messages, message]
    })),

  setMessages: (messages) => set({ messages }),
  setRooms: (rooms) => set({ rooms }),
  setActiveRoom: (roomId) => set({ activeRoom: roomId }),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setLoading: (loading) => set({ loading }),

  subscribeToRoom: (roomId) => {
    const chatChannel = getChatChannel(roomId);
    const presenceChannel = getPresenceChannel(roomId);

    // Subscribe to new messages
    chatChannel.subscribe('message', (message) => {
      get().addMessage(message.data);
    });

    // Subscribe to presence updates
    presenceChannel.presence.subscribe('enter', (member) => {
      const currentUsers = get().onlineUsers;
      const newUser = {
        clientId: member.clientId,
        data: member.data
      };
      
      if (!currentUsers.find(u => u.clientId === member.clientId)) {
        set({ onlineUsers: [...currentUsers, newUser] });
      }
    });

    presenceChannel.presence.subscribe('leave', (member) => {
      const currentUsers = get().onlineUsers;
      set({ 
        onlineUsers: currentUsers.filter(u => u.clientId !== member.clientId)
      });
    });

    // Get current presence members
    presenceChannel.presence.get((err, members) => {
      if (!err && members) {
        const users = members.map(member => ({
          clientId: member.clientId,
          data: member.data
        }));
        set({ onlineUsers: users });
      }
    });
  },

  unsubscribeFromRoom: (roomId) => {
    const chatChannel = getChatChannel(roomId);
    const presenceChannel = getPresenceChannel(roomId);
    
    chatChannel.unsubscribe();
    presenceChannel.unsubscribe();
  },

  sendMessage: async (content, userId, roomId) => {
    const chatChannel = getChatChannel(roomId || 'main-hall');
    
    const message: Message = {
      id: Date.now().toString(), // Temporary ID
      content,
      user_id: userId,
      room_id: roomId,
      message_type: 'text',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Publish to Ably
    chatChannel.publish('message', message);
  },

  enterPresence: (userId, name, avatar) => {
    const presenceChannel = getPresenceChannel(get().activeRoom || 'main-hall');
    
    presenceChannel.presence.enter({
      userId,
      name,
      avatar
    });
  },

  leavePresence: () => {
    const presenceChannel = getPresenceChannel(get().activeRoom || 'main-hall');
    presenceChannel.presence.leave();
  }
}));
