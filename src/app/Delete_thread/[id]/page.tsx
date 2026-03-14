import React from "react";
import DeleteModal from "@/components/sidebar/Delete-modal";
import { deleteThread } from "@/lib/db";
import NextError from "@/lib/errorclass";

const Deletethread = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  async function Delete() {
    "use server";
    try {
      await deleteThread(id);
      return { success: true, message : "Thread deleted successfully." };
    } catch (err) {
      const errormsg = err instanceof NextError ? err.message : "An unexpected error occurred.";
      return { success: false, message: errormsg };
    }
  }

  return <DeleteModal Delete={Delete} threadId={id} />;
};

export default Deletethread;
