import ChatWindow from '@/components/chat-window';
import { getThreadmessages } from '@/lib/db';
import React from 'react';

const Chats = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const messages = await getThreadmessages(id);

    return (
        <ChatWindow messages={messages} threadId={id} />
    )
}

export default Chats