"use client";
import React from 'react';
import { ChatService } from "@/service/chat-service";
import { Message } from "@/types/layout";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

const NewChatDemo = () => {
    const [valueInputMessage, setValueInputMessage] = useState("");
    const chatService = new ChatService();
    const router = useRouter();

    function addMessage() {
        if (valueInputMessage.length > 0) {
            const initialMessageContent = valueInputMessage.split(" ").slice(0, 3).join(" ") + '...';
            chatService.addChat(initialMessageContent).then(response => {
                const message: Message = { id_chat: response.data.chat.id, content: valueInputMessage };
                chatService.addMessageToChat(message).then(() => {
                    router.push('/chats/' + message.id_chat);
                });
            });
        }
    }

    return (
        <div className="card">
            <p>
                Talk to me whatever you want.
            </p>
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
                    <Button type="button" icon="pi pi-fw pi-comment" onClick={addMessage} />
                    <label htmlFor="textarea">Textarea</label>
                </span>
            </div>
        </div>
    );
};

export default NewChatDemo;
