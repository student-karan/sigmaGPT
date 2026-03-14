import dbConnect from "./mongodb";
import Thread from "@/models/Thread";
import { auth } from "@clerk/nextjs/server";
import { Message, thread as ThreadType } from "@/types/types";
import NextError from "./errorclass";

/**
 * Helper to ensure user is authenticated and get their ID.
 */
const getAuthenticatedUserId = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new NextError(401, "Unauthorized: Please sign in to continue.");
    }
    return userId;
};

/**
 * Helper to validate MongoDB ObjectId format
 */
const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

export const getallThreads = async (): Promise<ThreadType[]> => {
    try {
        await dbConnect();
        const userId = await getAuthenticatedUserId();
        
        const allthreads = await Thread.find({ userId })
            .select("title createdAt updatedAt userId")
            .sort({ updatedAt: -1 });
        
        return allthreads.map((thread) => ({
            id: thread._id.toString(),
            userId: thread.userId,
            title: thread.title,
            createdAt: thread.createdAt,
            updatedAt: thread.updatedAt,
        }));
    } catch (error) {
        if (error instanceof NextError) throw error;
        throw new NextError(500, "Failed to fetch threads from database.");
    }
}

export const getOrCreateThread = async ({ id, title }: { id?: string, title?: string }): Promise<ThreadType> => {
    try {
        await dbConnect();
        const userId = await getAuthenticatedUserId();
        
        if (id && isValidObjectId(id)) {
            const thread = await Thread.findOne({ _id: id, userId })
            .select("title createdAt updatedAt userId");
            if (thread) {
                return {
                    id,
                    userId: thread.userId,
                    title: thread.title,
                    createdAt: thread.createdAt,
                    updatedAt: thread.updatedAt
                };
            }
        }
        
        const newThread = await Thread.create({
            userId,
            title: title ?? "New chat",
            messages: []
        });

        return {
            id: newThread._id.toString(),
            userId: newThread.userId,
            title: newThread.title,
            createdAt: newThread.createdAt,
            updatedAt: newThread.updatedAt,
        };
    } catch (error) {
        if (error instanceof NextError) throw error;
        throw new NextError(500, "Failed to get or create thread.");
    }
}

export const getThreadmessages = async (id: string): Promise<Message[]> => {
    try {
        await dbConnect();
        const userId = await getAuthenticatedUserId();
        
        if (!id || !isValidObjectId(id)) {
            throw new NextError(400, "Invalid Thread ID provided.");
        }

        const thread = await Thread.findOne({ _id: id, userId });
        if (!thread) {
            throw new NextError(404, "Thread not found or access denied.");
        }

        return thread.messages
            .map((m: Message) => ({
                role: m.role as "User" | "Assistant",
                content: m.content,
                createdAt: m.createdAt
            }))
            .sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateA - dateB;
            });
    } catch (error) {
        if (error instanceof NextError) throw error;
        throw new NextError(500, "Failed to fetch messages.");
    }
}

export const deleteThread = async (id: string) : Promise<void> => {
    try {
        await dbConnect();
        const userId = await getAuthenticatedUserId();
        
        if (!id || !isValidObjectId(id)) {
            throw new NextError(400, "Invalid Thread ID provided.");
        }

        const deletedThread = await Thread.findOneAndDelete({ _id: id, userId });
        if (!deletedThread) {
            throw new NextError(404, "Thread not found or access denied.");
        }
        
    } catch (error) {
        if (error instanceof NextError) throw error;
        throw new NextError(500, "Failed to delete thread.");
    }
}

export const addMessageToThread = async (id: string, role: "User" | "Assistant", message: string): Promise<ThreadType> => {
    try {
        await dbConnect();
        const userId = await getAuthenticatedUserId();
        
        if (!id || !isValidObjectId(id)) {
            throw new NextError(400, "Invalid Thread ID provided.");
        }

        const updatedThread = await Thread.findOneAndUpdate(
            { _id: id, userId },
            {
                $push: {
                    messages: {
                        role,
                        content: message,
                        createdAt: new Date()
                    }
                }
            },
            { new: true }
        );

        if (!updatedThread) {
            throw new NextError(404, "Thread not found or access denied.");
        }

        return {
            id: updatedThread._id.toString(),
            userId: updatedThread.userId,
            title: updatedThread.title,
            messages: updatedThread.messages.map((m: Message) => ({
                role: m.role as "User" | "Assistant",
                content: m.content,
                createdAt: m.createdAt
            })),
            createdAt: updatedThread.createdAt,
            updatedAt: updatedThread.updatedAt,
        };
    } catch (error) {
        if (error instanceof NextError) throw error;
        throw new NextError(500, "Failed to add message to thread.");
    }
}