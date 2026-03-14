"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { Context } from "../contextprovider";
import { Trash } from "lucide-react";
import { thread } from "@/types/types";
import { usePathname } from "next/navigation";

const ThreadComponent = ({ thread }: { thread: thread }) => {
  const path = usePathname();
  const { hoverid, setHoverid, router } = useContext(Context);

  const handleRedirect = () => {
    router.push(`/chats/${thread.id}`);
  };
  return (
    <div
      onMouseEnter={() => setHoverid(thread.id)}
      onMouseLeave={() => setHoverid("")}
      className="w-full relative flex"
    >
      {/* // if a title length is too big, we show only a portion of it */}
      <div
        onClick={handleRedirect}
        className={`chat ${path.includes(thread.id) && "bg-white/5"}`}
      >
        {thread.title.length > 25
          ? thread.title.split(" ").slice(0, 5).join(" ") + "..."
          : thread.title}
      </div>
      <Link href={`/Delete_thread/${thread.id}`}>
        <Trash
          className={`icons-style absolute right-3.5 top-1 z-30 
            ${hoverid !== thread.id && "hidden"}`}
        />
      </Link>
    </div>
  );
};

export default ThreadComponent;
