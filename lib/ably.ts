
import Ably from 'ably';

const apiKey = process.env.ABLY_API_KEY;

if (!apiKey) {
  throw new Error('ABLY_API_KEY environment variable is not set');
}

export const ably = new Ably.Realtime({
  key: apiKey,
  clientId: 'rei-connect-client',
});

// Chat channels
export const getChatChannel = (roomId: string = 'main-hall') => {
  return ably.channels.get(`chat:${roomId}`);
};

// Presence channel for user status
export const getPresenceChannel = (roomId: string = 'main-hall') => {
  return ably.channels.get(`presence:${roomId}`);
};

// AI assistant channel
export const getAIChannel = () => {
  return ably.channels.get('ai-assistant');
};

export default ably;
