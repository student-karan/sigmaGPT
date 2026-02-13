import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Toastprovider from "@/components/toastprovider";
import ContextProvider from "@/components/contextprovider";
import Sidebar from "@/components/sidebar/Sidebar";
import Loadingthreads from "@/components/sidebar/Loading-threads";
import Allthreads from "@/components/sidebar/All-threads";
import Navbar from "@/components/Navbar";
import Inputbar from "@/components/input/Input";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SigmaGPT",
  description: "Your friendly Ai Agent",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="body">
          <SignedOut>
            {children}
          </SignedOut>
          <SignedIn>
            <Toastprovider>
              <ContextProvider>
                <Sidebar
                  Allthreads={
                    <Suspense fallback={<Loadingthreads />}>
                      <Allthreads />
                    </Suspense>
                  }
                />
                <div className="main-component">
                  <Navbar />
                  <div className="flex-1 overflow-hidden">{children}</div>
                  <Inputbar />
                </div>
              </ContextProvider>
            </Toastprovider>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}