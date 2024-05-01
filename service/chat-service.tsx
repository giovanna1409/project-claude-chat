import { Message } from "@/types/layout";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export class ChatService {
    getCredentials() {
        return axiosInstance.get('/login');
    }

    getChats() {
        return axiosInstance.get('/chats');
    }

    addChat(messageStart: string) {
        return axiosInstance.post('/chats', { name: messageStart });
    }

    getChatById(id: string) {
        return axiosInstance.get('/chats/' + id);
    }

    deleteChat(id: string) {
        return axiosInstance.delete('/chats/' + id);
    }

    getChatMessages(id: string) {
        return axiosInstance.get('/chats/' + id + '/messages');
    }

    addMessageToChat(message: Message) {
        return axiosInstance.post('/chats/' + message.id_chat + '/messages', { content: message.content });
    }

    getChatAnswers(id: string) {
        return axiosInstance.get('/chats/' + id + '/answers');
    }
}