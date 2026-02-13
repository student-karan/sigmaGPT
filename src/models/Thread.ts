import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage {
  role: "User" | "Assistant";
  content: string;
  createdAt: Date;
}

export interface IThread extends Document {
  userId: string;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ["User", "Assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ThreadSchema = new Schema<IThread>(
  {
    userId: {
      type: String,
      required: true,
      index: true, // Index for faster lookups by user
    },
    title: {
      type: String,
      default: "New Chat",
    },
    messages: [MessageSchema],
  },
  {
    timestamps: true,
    collection: "Thread",
  }
);

// Check if the model is already defined to prevent multiple compilations in development
const Thread: Model<IThread> = mongoose.models.Thread || mongoose.model<IThread>("Thread", ThreadSchema);

export default Thread;
