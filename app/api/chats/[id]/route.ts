import { deleteChat, getChatById } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("chats/")[1];
        const chat = await getChatById(id);
        return NextResponse.json({ message: "Ok", chat }, {
            status: 200
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {
            status: 500
        });
    }
};

export const DELETE = async (req: Request) => {
    try {
        const id = req.url.split("chats/")[1];
        await deleteChat(id);
        return NextResponse.json({ message: "Ok" }, {
            status: 200
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {
            status: 500
        });
    }
};