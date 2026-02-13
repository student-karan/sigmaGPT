export type Role = "User" | "Assistant" | "Loading"

export type Message = {
    role: Role;
    content: string;
    createdAt?: Date;
}

export type thread = {
    id: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages?: Message[];
}

export type allThreads = {
    threads: thread[]
}

