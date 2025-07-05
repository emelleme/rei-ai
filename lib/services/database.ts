
import { pool } from '../database';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  type: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  room_id?: string;
  message_type: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_avatar?: string;
}

// User functions
export const createUser = async (email: string, name?: string): Promise<User> => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [email, name]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
  const client = await pool.connect();
  try {
    const setClause = Object.keys(updates)
      .filter(key => key !== 'id')
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [userId, ...Object.values(updates).filter((_, index) => Object.keys(updates)[index] !== 'id')];
    
    const result = await client.query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      values
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Chat room functions
export const createChatRoom = async (name: string, description: string, createdBy: string): Promise<ChatRoom> => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO chat_rooms (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
      [name, description, createdBy]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM chat_rooms ORDER BY created_at DESC');
    return result.rows;
  } finally {
    client.release();
  }
};

// Message functions
export const createMessage = async (content: string, userId: string, roomId?: string): Promise<Message> => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO messages (content, user_id, room_id) VALUES ($1, $2, $3) RETURNING *',
      [content, userId, roomId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getMessages = async (roomId?: string, limit: number = 50): Promise<Message[]> => {
  const client = await pool.connect();
  try {
    let query = `
      SELECT m.*, u.name as user_name, u.avatar_url as user_avatar 
      FROM messages m 
      JOIN users u ON m.user_id = u.id 
    `;
    let params: any[] = [];
    
    if (roomId) {
      query += ' WHERE m.room_id = $1';
      params.push(roomId);
    } else {
      query += ' WHERE m.room_id IS NULL';
    }
    
    query += ' ORDER BY m.created_at DESC LIMIT $' + (params.length + 1);
    params.push(limit);
    
    const result = await client.query(query, params);
    return result.rows.reverse(); // Return in chronological order
  } finally {
    client.release();
  }
};

// Room membership functions
export const joinRoom = async (userId: string, roomId: string): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO room_members (user_id, room_id) VALUES ($1, $2) ON CONFLICT (user_id, room_id) DO NOTHING',
      [userId, roomId]
    );
  } finally {
    client.release();
  }
};

export const getUserRooms = async (userId: string): Promise<ChatRoom[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT cr.* FROM chat_rooms cr
      JOIN room_members rm ON cr.id = rm.room_id
      WHERE rm.user_id = $1
      ORDER BY cr.updated_at DESC
    `, [userId]);
    return result.rows;
  } finally {
    client.release();
  }
};
