import { addChat, getChats } from "../../../lib/data";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const chats = await getChats();
        return NextResponse.json({ message: "Ok", chats }, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {
            status: 500,
        });
    }
};

export const POST = async (req: Request) => {
    const { name } = await req.json();
    try {
        const chat = { name, id: Date.now().toString() };
        await addChat(chat);
        return NextResponse.json({ message: "Ok", chat }, {
            status: 201,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }.err, {
            status: 500,
        });
    }
};