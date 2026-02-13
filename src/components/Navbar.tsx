"use client";
import React, { useContext } from 'react'
import { Menu } from 'lucide-react';
import { Context } from './contextprovider';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const { toggle } = useContext(Context);

  return (
    <div className='navbar'>
        <div className='flex items-center gap-3'>
          <Menu className='block md:hidden cursor-pointer' onClick={toggle} />
          <h1 className='font-science text-lg md:text-xl'>SigmaGPT</h1>
        </div>
        <div className='flex items-center gap-4'>
          <SignedOut>
            <div className='flex gap-2 md:gap-4 items-center'>
              <SignInButton mode="modal">
                <button className='navbar-auth-btn'>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className='navbar-signup-btn'>Get Started</button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className='flex items-center'>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
    </div>
  )
}

export default Navbar