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
  
  // 4. If they have no threads, show the empty Home Page
  return <HomePage />;
}