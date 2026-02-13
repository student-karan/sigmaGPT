import React from 'react';
import DeleteModal from '@/components/sidebar/Delete-modal';
import { deleteThread } from '@/lib/db';
import { clearCookie, getThreadId } from '@/actions/server-actions';

const Deletethread = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    async function Delete() {
        "use server";
        try {
            const currthread = await getThreadId() as string | null;
            await deleteThread(id);
            let wasActive = false;
            if(currthread && currthread === id){
                await clearCookie();
                wasActive = true;
            }
            return { success: true, wasActive };
        } catch (err) {
            console.error((err as Error).message);
            return { success: false, wasActive: false };
        }
    }

    return (
        <DeleteModal Delete={Delete} threadId={id} />
    )
}

export default Deletethread