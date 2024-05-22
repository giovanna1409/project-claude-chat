import { Answer, Chat, Message } from '@/types/layout.js';
import pool from '../app/config/db.js';

export const getChats = async () => {
    const connection =  await pool.getConnection();
    const [chats] = await connection.query('SELECT * FROM chats');
    connection.release();

    return chats;
};

export const getChatById =  async (id: string) => {
    const connection =  await pool.getConnection();
    const [chat] = await connection.query('SELECT * FROM chats WHERE id = ?', [id]);
    connection.release();

    return chat;
};

export const addChat = async (chat: Chat) => {
    const connection =  await pool.getConnection();
    await connection.query('INSERT INTO chats (id, name) VALUES (?, ?)', [chat.id, chat.name]);
    connection.release();
};

export const deleteChat = async (id: string) => {
    const connection =  await pool.getConnection();
    await connection.query('DELETE FROM messages WHERE id_chat = ?', [id]);
    await connection.query('DELETE FROM answers WHERE id_chat = ?', [id]);
    await connection.query('DELETE FROM chats WHERE id = ?', [id]);
    connection.release();
};

export const getChatMessages = async (id: string) => {
    const connection =  await pool.getConnection();
    const [chatMessages] = await connection.query('SELECT * FROM messages WHERE id_chat = ?', [id]);
    connection.release();

    console.log(chatMessages)

    return chatMessages;
};

export const addMessage = async (message: Message) => {
    const connection =  await pool.getConnection();
    await connection.query('INSERT INTO messages (id_chat, content) VALUES (?, ?)', [message.id_chat, message.content]);
    connection.release();
};

export const getChatAnswers = async (id: string) => {
    const connection =  await pool.getConnection();
    const [chatAnswers] = await connection.query('SELECT * FROM answers WHERE id_chat = ?', [id]);
    connection.release();

    return chatAnswers;
};

export const addAnswer = async (answer: Answer) => {
    const connection =  await pool.getConnection();
    await connection.query('INSERT INTO answers (id_chat, content) VALUES (?, ?)', [answer.id_chat, answer.content]);
    connection.release();
};

export const getCredentials = async () => {
    const connection =  await pool.getConnection();
    const [credentials] = await connection.query('SELECT * FROM credentials');
    connection.release();

    return credentials;
}