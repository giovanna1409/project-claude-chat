import { getCredentials } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    try {
        const credentials = await getCredentials();
        return NextResponse.json({ message: "Ok", credentials }, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }.err, {
            status: 500,
        });
    }
};
