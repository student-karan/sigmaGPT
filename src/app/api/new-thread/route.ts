import { getOrCreateThread } from "@/lib/db";
import NextError from "@/lib/errorclass";

export async function GET() {
    try {
        const newthread = await getOrCreateThread({ title: "New chat" });
        return new Response(JSON.stringify({ thread: newthread, message: "New thread created" }), {
            status: 200
        })
    } catch (err) {
        const isNextError = err instanceof NextError;
        return new Response(JSON.stringify({ error: isNextError ? err.message : "Failed to create new thread" }), {
            status: isNextError ? err.status : 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}