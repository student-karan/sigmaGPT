"use client";
import React from 'react';
import { Toaster } from "react-hot-toast";

const Toastprovider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </>
    )
}

export default Toastprovider