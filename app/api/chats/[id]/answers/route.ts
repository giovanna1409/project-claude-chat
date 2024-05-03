import { getChatAnswers } from "../../../../../lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("chats/")[1].split("/")[0];
        const chatAnswers = await getChatAnswers(id);
        return NextResponse.json({ message: "Ok", chatAnswers }, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {
            status: 500
        });
    }
}