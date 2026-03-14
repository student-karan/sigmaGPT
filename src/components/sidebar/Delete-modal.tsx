"use client";
import React, { useContext, useState } from "react";
import Buttonloader from "../Button-loader";
import toast from "react-hot-toast";
import { Context } from "../contextprovider";
import { usePathname } from "next/navigation";

const DeleteModal = ({ Delete, threadId }: {
  Delete: () => Promise<{ success: boolean; message: string }>;
  threadId: string;
}) => {
  const { router } = useContext(Context);
  const [isPending, setIspending] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === `/chats/${threadId}`;

  function handleCancel() {
    router.back();
  }

  async function handledelete() {
    setIspending(true);
    const res = await Delete();
    setIspending(false);

    if (res.success) {
      toast.success(res.message);
      if (isActive) {
        router.push("/");
      } else {
        router.back();
        setTimeout(() => router.refresh(), 100);
      }
    } else {
      toast.error(res.message);
      router.back();
      setTimeout(() => router.refresh(), 100);
    }
  }

  return (
    <div className="delete-window">
      <div className="delete-box">
        <p className="text-gray-400">
          Are you sure you want to delete this chat?
        </p>
        <div className="w-full flex justify-end gap-4">
          <button
            className="hover:bg-black delete-box-btn"
            disabled={isPending}
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="bg-red-500 delete-box-btn"
            disabled={isPending}
            onClick={handledelete}
          >
            {isPending ? <Buttonloader /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
