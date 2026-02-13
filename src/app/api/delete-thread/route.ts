import { deleteThread } from "@/lib/db";
import NextError from "@/lib/errorclass";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const { threadId } = await req.json();
        if (!threadId) {
            throw new NextError(404, "Please provide a valid threadID.");
        }
        const deletethread = await deleteThread(threadId);

        return new Response(JSON.stringify({ thread: deletethread, message: "Thread deleted" }), {
            status: 200
        })
    } catch (err) {
        const isNextError = err instanceof NextError;
        return new Response(JSON.stringify({ error: isNextError ? err.message : "Failed to delete the thread" }), {
            status: isNextError ? err.status : 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}