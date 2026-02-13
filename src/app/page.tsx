import { getallThreads } from "@/lib/db";
import { redirect } from "next/navigation";
import HomePage from "@/components/Home-Page-Component";
import LandingPage from "@/components/LandingPage";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  // 1. If user is not authenticated, show the landing page
  if (!userId) {
    return <LandingPage />;
  }
  
  // 2. If authenticated, fetch their threads
  const threads = await getallThreads();
  
  // 3. If they have history, redirect to the most recent one (threads[0] is sorted by updatedAt)
  if (threads.length > 0) {
    redirect(`/chats/${threads[0].id}`);
  }

  // 4. If they have no threads, show the empty Home Page
  return <HomePage />;
}