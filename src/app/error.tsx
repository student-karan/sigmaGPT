"use client";
import React from 'react'
import NextError from '@/lib/errorclass';

const Error = ({ error }: { error: Error}) => {
  const isNextError = error instanceof NextError;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-2xl font-bold text-red-500">
        {isNextError ? `Error ${error.status}` : 'Something went wrong!'}
      </h2>
      <p className='text-xl text-white/70'>{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-white/90 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

export default Error