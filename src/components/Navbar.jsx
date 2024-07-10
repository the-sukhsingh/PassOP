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
    <ul className='flex gap-5 text-white text-[18px]'>
        <li>
            <a href='#'>Home</a>
        </li>
        <li>
            <a href='#'>About</a>
        </li>
        <li>
            <a href='#'>Services</a>
        </li>
        <li>
            <a href='#'>Contact</a>
        </li>
    </ul>
</nav>
  )
}

export default Navbar
