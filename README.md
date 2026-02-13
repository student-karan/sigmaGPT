# SigmaGPT

SigmaGPT is a production-ready, multi-user AI chat application built with Next.js 15. It delivers a fluid, responsive experience similar to leading LLM interfaces, featuring secure data isolation and robust error handling.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **Multi-User Authentication**: Integrated with **Clerk** for secure sign-in and sign-up flows, including a custom animated landing page.
- **Complete Data Isolation**: Every chat thread is strictly tied to a `userId` at the database level, ensuring users can only access their own history.
- **URL-Driven State Management**: Uses the URL as the source of truth for active threads, ensuring consistent UI across device syncs and page refreshes.
- **Real-time Typing Simulation**: Implements a custom typing effect for AI responses to simulate real-time thought generation.
- **Persistent Chat History**: Stores threads and messages using MongoDB and Mongoose with optimized "Summary vs. Detail" data fetching.
- **Resilient AI Integration**: Features a self-healing mechanism that cleans up orphaned user prompts if the AI service (Gemini) fails due to high demand.
- **Animated UI**: Uses **Framer Motion** for smooth, high-end transitions and staggered entrance animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Model**: Google Gemini API
- **Database**: MongoDB (via [Mongoose](https://mongoosejs.com/))
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: Tailwind CSS (using semantic `@apply` architecture)
- **Markdown**: `react-markdown` with `rehype-highlight` for code syntax.

## 🧠 Key Technical Highlights

- **Secure Data Layer**: Refactored the database utility to internally handle authentication via Clerk's `auth()` helper, preventing IDOR (Insecure Direct Object Reference) vulnerabilities.
- **Custom Exception Handling**: Implemented a centralized `NextError` class and global Error Boundaries to provide descriptive, status-coded feedback to the user.
- **Optimized Performance**: Reduced network overhead and memory usage by removing redundant API routes in favor of direct database calls within Server Components.
- **Fail-Safe Mutations**: Developed a "pop-on-failure" logic in the chat route to ensure database consistency even when external AI APIs experience downtime.

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sigma-gpt.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file and add your credentials:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://..."

   # AI API
   GEMINI_API_KEY="your_gemini_key"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # App Config
   BASE_URL="http://localhost:3000"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** to view the app.
