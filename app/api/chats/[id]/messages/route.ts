import { addAnswer, addMessage, getChatMessages } from "../../../../../lib/data";
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: "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",
});

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("chats/")[1].split("/")[0];
        const chatMessages = await getChatMessages(id);
        return NextResponse.json({ message: "Ok", chatMessages }, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {
            status: 500
        });
    }
}

export const POST = async (req: Request) => {
    try {
        const { content } = await req.json();
        const id = req.url.split("chats/")[1].split("/")[0];
        const chatMessage = { id_chat: id, content };
        await addMessage(chatMessage);
        const answer = await anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            temperature: 0,
            system: "You give me contextualized answers.",
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": chatMessage.content
                        }
                    ]
                }
            ]
        });
        const chatAnswer = { id_chat: id, content: answer.content[0].text };
        await addAnswer(chatAnswer);
        return NextResponse.json({ message: "Ok", chatAnswer }, {
            status: 201,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }.err, {
            status: 500,
        });
    }
};
