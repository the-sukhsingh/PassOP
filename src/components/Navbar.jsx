import React from 'react'

const Navbar = () => {
  return (
<nav className='bg-[#23253b] flex justify-around p-5'>
    <div className="logo font-bold text-2xl text-green-300">
        <span className='font-extrabold'>&lt;</span>
        <span className='text-white font-extrabold'>
        Pass
        </span>
        <span className='font-extrabold'>OP/&gt;</span>
        </div>
    <div className='text-2xl text-white flex gap-3 cursor-pointer' >
        <a href="http://" className='flex gap-3'>
        Github
        <img className='invert w-8' src="/icons/github.svg" alt="" />
        </a>
    </div>
</nav>
  )
}

export default Navbar
