"use client";
import React from 'react';
import { ChatService } from "@/service/chat-service";
import { Answer, Message } from "@/types/layout";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";

const ChatDemo = () => {
    const [chatId, setChatId] = useState("");
    const [chatName, setChatName] = useState("");
    const [chatMessageContents, setChatMessageContents] = useState<string[]>([]);
    const [chatAnswerContents, setChatAnswerContents] = useState<string[]>([]);
    const [valueInputMessage, setValueInputMessage] = useState("");
    const router = useRouter();
    const chatService = new ChatService();

    useEffect(() => {
        const chatId = window ? window.location.href.split("chats/")[1] : '';
        setChatId(chatId);
        if (chatId) {
            chatService.getChatById(chatId).then((response) => {
                setChatName(response.data.chat[0].name);
            });
            chatService.getChatMessages(chatId).then(response => {
                setChatMessageContents(response.data.chatMessages.map((message: Message) => message.content));
            });
            chatService.getChatAnswers(chatId).then(response => {
                setChatAnswerContents(response.data.chatAnswers.map((answer: Answer) => answer.content));
            });
        }
    }, []);

    const chatContent = chatMessageContents.map((messageContent, index) => {
        return (
            <div key={index}>
                <strong>User</strong>
                <p>{messageContent}</p>
                <strong>Claude System</strong>
                <p style={{ whiteSpace: 'pre-wrap' }}>{chatAnswerContents[index]}</p>
                <br></br>
            </div>
        );
    });

    function addMessage() {
        const message: Message = { id_chat: chatId, content: valueInputMessage };
        chatService.addMessageToChat(message).then(response => {
            chatMessageContents.push(message.content);
            chatAnswerContents.push(response.data.chatAnswer.content);
            chatContent.push(
                <div>
                    <strong>User</strong>
                    <p>{message.content}</p>
                    <strong>Claude System</strong>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{response.data.chatAnswer.content}</p>
                </div>
            );
        });
    }

    function deleteChat() {
        chatService.deleteChat(chatId).then(() => {
            router.push('/chats');
            window.location.href = 'http://localhost:8080/chats';
        });
    }

    return (
        <div className="card">
            <div>
                <h5 style={{display: 'inline-block'}}>{chatName}</h5>
                <Button
                    disabled={!chatId}
                    type="button"
                    icon="pi pi-fw pi-trash"
                    onClick={deleteChat}
                    style={{background: '#EF4444', opacity: 0.6, display: 'inline-block', float: 'right'}}
                />
            </div>

            <div>{chatContent}</div>

            <div className="field col-12">
                <span className="p-float-label row">
                    <InputTextarea
                        id="textarea"
                        className="w-full"
                        rows={2}
                        dir="auto"
                        value={valueInputMessage}
                        onChange={(e) => setValueInputMessage(e.target.value)}
                        style={{ resize: 'none' }}
                    >
                    </InputTextarea>
                    <label htmlFor="textarea">Textarea</label>
                    <Button disabled={!chatId} type="button" icon="pi pi-fw pi-comment" onClick={addMessage} />
                </span>
            </div>
        </div>
    );
};

export default ChatDemo;
