import { addAnswer, addMessage, getChatMessages } from "../../../../../lib/data";
import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("chats/")[1].split("/")[0];
        const chatMessages = await getChatMessages(id);

        if (chatMessages == null || undefined) {
            throw new Error('No messages found');
        }

        return NextResponse.json({ message: "Ok", chatMessages }, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", error: err }, {
            status: 500,
        });
    }
}

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        if (!body || typeof body.content !== 'string') {
            throw new Error('Invalid request body');
        }
        const { content } = body;
        const id = req.url.split("chats/")[1].split("/")[0];
        const chatMessage = { id_chat: id, content };
        await addMessage(chatMessage);
        const answer = await axios.post('https://api.anthropic.com/v1/messages', {
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            temperature: 0,
            system: "You give me contextualized answers.",
            messages: [
                {
                    role: "user",
                    content: chatMessage.content
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            }
        });
        const chatAnswer = { id_chat: id, content: answer.data.content[0].text };
        await addAnswer(chatAnswer);
        return NextResponse.json({ message: "Ok", chatAnswer }, {
            status: 201,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", error: err }, {
            status: 500,
        });
    }
};
