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
        <div className='text-white text-2xl font-bold'>
            <a href="https://github.com/the-sukhsingh/PassOP" target='_blank' className='flex gap-4'>
            Github
            <img src="icons/github.svg" width={32} alt="" />
            </a>
        </div>
</nav>
  )
}

export default Navbar
