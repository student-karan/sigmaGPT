"use client";
import { ErrorBoundary } from 'react-error-boundary';
import { PanelLeft, SquarePen } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react';
import Error from '@/app/error';
import { Context} from './../contextprovider';
const Sidebar = ({ Allthreads }: { Allthreads: React.ReactNode }) => {
  const { isOpen, toggle, close, router, setRefreshHome, refreshHome } = useContext(Context);
   
  async function newchatinit() {
    setRefreshHome(refreshHome + 1);
    router.push("/");
  }
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden" 
          onClick={close}
        />
      )}

      <div className={`sidebar z-30 ${isOpen ? "w-[250px] left-0" : "w-16 -left-[250px] md:left-0"}`}>

        {/* logo and sidebar toggler */}
        <div className={`sidebar-upper`}>
          {isOpen && (
            <div className="flex items-center gap-2">
               <Image src="/logo.jpg" alt="Logo" width={28} height={28} className='box-content cursor-pointer' />
            </div>
          )}
          <PanelLeft className='icons-style' onClick={toggle} />
        </div>
      {/* New chat */}
      <div className={`${isOpen ? "new-chat" : "icons-style mx-auto my-5"}`} onClick={newchatinit}>
        <SquarePen className='size-5' />
        {isOpen && <p>New Chat</p>}
      </div>

      {/* CHat history */}
      {isOpen && <p className='text-gray-600 text-lg ml-5'>Your chats</p>}
      <div className='chat-history'>
        <ErrorBoundary FallbackComponent={Error}>
          {isOpen && Allthreads}
        </ErrorBoundary>
      </div>
      {/* developer message */}
      {isOpen && (
        <div className='sidebar-lower'>
          <p>Made with ❤️ by <i>Jasmeet Singh</i></p>
        </div>
      )}
    </div>
    </>
  )
}

export default Sidebar