"use client";
import { redirect } from 'next/navigation';
import React from 'react'

const NotFound = () => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-30 bg-black text-white flex justify-center items-center'>
            <div className='flex flex-col items-center gap-4'>
                <h1 className='md:text-6xl text-4xl'>404</h1>
                <h2 className='md:text-3xl text-xl'>PAGE NOT FOUND</h2>
                <p className='text-xl text-center'>The page you&apos;re looking for might have been removed had it name changed or is temporarily unavailable.</p>
                <button className='text-xl border border-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition-colors' onClick={() => redirect("/")}>GO TO HOMEPAGE</button>

            </div>
        </div>
    )
}

export default NotFound