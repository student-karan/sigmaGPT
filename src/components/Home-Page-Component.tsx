"use client";
import { Context } from "./contextprovider";
import React, { useContext, useEffect, useState } from "react";

const HomePage = () => {
    const { refreshHome } = useContext(Context);
    const Messages = [
        "What are you working on?",
        "What can I help with?",
        "What's on the agenda today?",
        "Ready when you are."
    ];

    const [message, setMessage] = useState<string>(""); // empty during SSR

    useEffect(() => {
        // Runs only on client AFTER hydration → no mismatch
        const random = Messages[Math.floor(Math.random() * Messages.length)];
        setMessage(random);
    }, [refreshHome]);

    return (
        <div className="home-page-container">
            <p>{message || "What are you working on?"}</p>  {/* stable server markup */}
        </div>
    );
};

export default HomePage;
