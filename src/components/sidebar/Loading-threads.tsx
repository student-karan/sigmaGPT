"use client";
import React from 'react'

const Loadingthreads = () => {
  return (
    <div className='sidebar-msg'>
      {new Array(6).fill("_").map((_,i) => {
        return (
          <div key={i} className='sidebar-skeleton'></div>
        )
      })}
    </div>
  )
}

export default Loadingthreads