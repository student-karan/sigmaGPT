"use client";
import React, { useContext } from "react";
import { Context } from "../contextprovider";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import NextError from "@/lib/errorclass";
import toast from "react-hot-toast";

const Inputbar = () => {
  const path = usePathname();
  const {
    isSendingPrompt,
    prompt,
    setprompt,
    setisSendingPrompt,
    latestReply,
    setreply,
    router,
  } = useContext(Context);

  async function handelSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Get threadId from URL path (e.g., /chats/id)
    const threadIdMatch = path.match(/\/chats\/([^\/]+)/);
    const currThread = threadIdMatch ? threadIdMatch[1] : null;

    const currentPrompt = prompt.trim();
    if (!currentPrompt) {
      return;
    }
    setisSendingPrompt(true);
    try {
      const res = await fetch("/api/chat-route", {
        method: "POST",
        body: JSON.stringify({ prompt: currentPrompt, threadId: currThread }),
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new NextError(429,data.error || "The AI is currently busy. Please try again.");
      }

      const agentReply = data as {
        reply: string;
        newThreadId: string;
      };
      
      if (!currThread) {
        router.refresh();
        router.push(`/chats/${agentReply.newThreadId}`);
      }
      setreply(agentReply.reply);
    } catch (err) {
      const isNextError = err instanceof NextError;
      console.error("Chat Error : ", isNextError ? err.message : "");
      
      toast.error(isNextError ? err.message : "An error occurred while fetching reply.")
    } finally {
      setisSendingPrompt(false);
      setprompt(""); // Clear prompt on success or failure
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 mb-6 mt-3">
      <form
        onSubmit={handelSubmit}
        className="w-5/6 sm:w-2/3 bg-transparent relative text-lg"
      >
        <input
          type="text"
          className="input"
          placeholder="Ask Anything?"
          name="input"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="off"
          value={prompt}
          onChange={(e) => setprompt(e.target.value)}
          disabled={isSendingPrompt || latestReply != null}
        />

        <button
          disabled={
            !prompt || !prompt.trim() || isSendingPrompt || latestReply != null
          }
          type="submit"
          className="input_btn"
        >
          <ArrowUp className="text-black" />
        </button>
      </form>
      <p className="text-gray-500 lg:text-sm text-xs">
        SigmaGPT can make mistakes, check important information and see cookie
        preferences.
      </p>
    </div>
  );
};

export default Inputbar;
