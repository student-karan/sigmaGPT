"use client"
import React from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

const LandingPage = () => {
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const yVariants : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <div className='landing-page'>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='flex flex-col items-center justify-center gap-6'
      >
        <motion.h1 
          variants={yVariants}
          className='landing-page-comment-1'
        >
          <i>Welcome to SigmaGPT</i>
        </motion.h1>
        
        <motion.h2 
          variants={yVariants}
          className='landing-page-comment-2'
        >
          Your own AI companion
        </motion.h2>

        <motion.div 
          variants={yVariants}
          className='flex gap-4 mt-4'
        >
          <Link href="/sign-in">
            <button className='landing-page-signUp-signIn'>
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className='landing-page-signUp-signIn'>
              Sign Up
            </button>
          </Link>
        </motion.div>

        <motion.p 
          variants={yVariants}
          className='mt-12 text-white/20 text-sm tracking-widest uppercase'
        >
          Start chatting with the future
        </motion.p>
      </motion.div>
    </div>
  )
}

export default LandingPage;
