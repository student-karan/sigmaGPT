"use client";
import { Message } from "@/types/types";
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "./contextprovider";
import GptReplyLoader from "./gpt-reply-loader";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

const ChatWindow = ({
  messages,
  threadId,
}: {
  messages: Message[];
  threadId: string;
}) => {
  const {
    setChats,
    setprompt,
    chats,
    reply,
    prompt,
    setreply,
    latestReply,
    setLatestReply,
    isSendingPrompt,
  } = useContext(Context);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom AFTER DOM updated
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  // When thread changes, load messages and scroll
  useEffect(() => {
    if (reply && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "Assistant" && lastMessage.content === reply) {
        setChats(messages.slice(0, -1));
      } else {
        setChats(messages);
      }
    } else {
      setChats(messages);
    }

    if (prompt) setprompt("");
    // scroll the screen to bottom
    setTimeout(scrollToBottom, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, messages, setChats]);

  // When new prompt comes
  useEffect(() => {
    if (!prompt || !isSendingPrompt) return;
    // add prompt and loading state in chats
    setChats((prev) => [
      ...prev,
      { role: "User", content: prompt },
      { role: "Loading", content: "" },
    ]);

    setTimeout(scrollToBottom, 50);
    setprompt("");
  }, [isSendingPrompt, prompt]);

  // when agent reply came
  useEffect(() => {
    if (!reply) return;

    setChats((prev) => prev.filter((chat) => chat.role !== "Loading"));

    const words = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, idx + 1).join(" "));
      idx++;

      setTimeout(scrollToBottom, 400);
      if (idx === words.length) {
        clearInterval(interval);
        setLatestReply(null);
        setChats((prevchats) => [
          ...prevchats,
          { role: "Assistant", content: words.join(" ") },
        ]);
        setreply("");
      }
    }, 40);

    return () => clearInterval(interval);
  }, [reply, setreply, setChats]);

  return (
    <div
      ref={scrollContainerRef}
      className="chat-window-container"
    >
      <div className="chat-window-inner">
        {chats && chats.map((message, idx) => (
          <React.Fragment key={idx}>
            {message.role === "User" && (
              <div className="user-message-wrapper" key={idx}>
                <div className="user-message-bubble">
                  {message.content}
                </div>
              </div>
            )}

            {message.role === "Assistant" && (
              <div className="assistant-message-wrapper">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {message.content}
                </ReactMarkdown>
                <hr className="assistant-hr" />
              </div>
            )}

            {message.role === "Loading" && (
              <div className="w-full self-start">
                <GptReplyLoader />
              </div>
            )}
          </React.Fragment>
        ))}
        {latestReply && chats.length >= 1 && (
          <div className="assistant-message-wrapper">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {latestReply}
            </ReactMarkdown>
            <hr className="assistant-hr" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;