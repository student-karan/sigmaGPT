import "dotenv/config";
import fetchGeminiResponse from "@/lib/gemini";
import { addMessageToThread, getOrCreateThread, deleteThread } from "@/lib/db";
import { NextRequest } from "next/server";
import { thread } from "@/types/types";
import NextError from "@/lib/errorclass";
import Thread from "@/models/Thread"; // Import model directly for cleanup

export async function POST(req: NextRequest) {
  try {
    const { prompt, threadId } = (await req.json()) as {
      prompt?: string;
      threadId?: string;
    };

    if (!prompt) {
      throw new NextError(400, "You must type something.");
    }

    let thread: thread;
    if (!threadId) {
      thread = await getOrCreateThread({ title: prompt });
    } else {
      thread = await getOrCreateThread({ id: threadId });
    }

    // 1. Add user prompt to DB
    await addMessageToThread(thread.id, "User", prompt);

    // 2. Fetch AI response
    let assistantreply: string;
    try {
      assistantreply = await fetchGeminiResponse(prompt);
    } catch (aiError) {
      console.error("AI Service Failure, cleaning up last message...");
      await Thread.findByIdAndUpdate(thread.id, {
        $pop: { messages: 1 } // Remove the last added message (the user's prompt)
      });
      throw new NextError(503, "AI service is currently overloaded. Your message wasn't saved. Please try again in a moment.");
    }

    // 3. Add AI response to DB
    await addMessageToThread(thread.id, "Assistant", assistantreply);

    const responseBody = {
      reply: assistantreply,
      newThreadId: threadId ?? thread.id,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

  } catch (err) {
    const isNextError = err instanceof NextError;
    const message = isNextError ? err.message : "Failed to process chat request";
    const status = isNextError ? err.status : 500

    return new Response(
      JSON.stringify({ error: message }),
      { status, headers: { "Content-Type": "application/json" } }
    );
  }
}