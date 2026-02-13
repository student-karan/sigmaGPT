"use client";
import React, { useContext, useState } from "react";
import Buttonloader from "../Button-loader";
import toast from "react-hot-toast";
import { Context } from "../contextprovider";

const DeleteModal = ({
  Delete,threadId
}: {
  Delete: () => Promise<{ success: boolean; wasActive: boolean }>;
  threadId: string;
}) => {
  const { router } = useContext(Context);
  const [isPending, setIspending] = useState(false);

  function handleCancel() {
    router.back();
  }

  async function handledelete() {
    setIspending(true);
    const res = (await Delete()) as { success: boolean; wasActive: boolean };
    setIspending(false);
    if (res.success) {
      toast.success("Thread deleted successfully.");
      if (res.wasActive) {
        router.push("/");
        router.refresh();
      } else {
        router.back();
        setTimeout(() => {
          router.refresh();
        }, 100);
      }
    } else {
      toast.error("Failed to delete the thread.");
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
