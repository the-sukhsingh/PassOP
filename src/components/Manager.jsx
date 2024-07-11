import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwords, setpasswords] = useState([])
    let a = 0
    useEffect(() => {
        let pass = localStorage.getItem("passwords")
        let passArr;
        if (pass) {
            passArr = JSON.parse(pass)
            setpasswords(passArr)
        }
    }, [])
    const saveTLS = (a = passwords) => {
        localStorage.setItem("passwords", JSON.stringify(a))
    }

    const savePassword = () => {
        if (form.site === "" || form.username === "" || form.password === "") {
            toast.error('Please fill all the fields!', {
                
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return
        }
        else{

            passwords.push({ id: uuidv4(), form })
            setform({ site: "", username: "", password: "" })
            let newpaswords = [...passwords]
            saveTLS(newpaswords)
            toast.success('Password Added Successfully!', {
            
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }}
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleEdit = (e, id) => {
        let p = passwords.filter(i => i.id === id)
        setform(p[0].form)
        let newpass = passwords.filter(i => {
            return i.id !== id
        })
        setpasswords(newpass)
        saveTLS()
    }
    const handleDelete = (e, id) => {
        let c = confirm("Do you want to delete this password")
        if (c) {
            let newpass = passwords.filter(i => {
                return i.id !== id
            })
            setpasswords(newpass)
            saveTLS(newpass)
            toast.error('Password Deleted!', {
                
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    const copyText = (text) => {
        toast.success('Copied!', {
            position:"bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text)
    }
    return (<>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
/>

<div className="mx-auto max-w-4xl text-white text-center border-2 rounded-br-3xl rounded-tl-3xl border-black pt-2 pb-9 mt-4 backdrop-blur-sm">
            <div className="logo font-bold text-3xl text-green-700 ">
                <span className='font-extrabold'>&lt;</span>
                <span className='text-black font-extrabold'>
                    Pass
                </span>
                <span className='font-extrabold'>OP/&gt;</span>
            </div>
            <p className='text-xl font-bold font-mono text-black'>Your Own Password Manager</p>

            <div className='text-black flex flex-col p-3 gap-5'>
                <input name='site' value={form.site} onChange={handleChange} placeholder='Enter Website' className='rounded-full border-2 border-green-500 w-full py-1 px-4' type="text" />
                <div className="flex w-full gap-3 flex-col md:flex-row ">
                    <input name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-green-500 py-1 px-4 w-1/2 mx-auto md:w-2/6 md:mx-0 ' type="text" />

                    <input name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border-2 border-green-500  py-1 px-4 w-1/2 mx-auto md:w-2/6 md:mx-0 ' type="password" />

                    <button className='flex justify-center items-center bg-[#4a6cdd] w-1/2 md:w-1/4  rounded-[22px] hover:bg-[#a290d3] border-2 border-black mx-auto' onClick={savePassword}>Add Password
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                    </button>
                </div>
            </div>
        </div>
        <div className="passwords border-2 mt-4 border-black flex flex-col items-center w-[95%] md:w-3/4 mx-auto min-h-[30vh] mb-44 rounded-br-[28px] rounded-tl-[28px]">
            <h1 className='text-3xl font-bold mt-4'>Your Passwords</h1>
            <div className="flex border border-black w-[95%] px-4 py-[6px] my-3 bg-[#23253b] text-white text-[18px] rounded-2xl">
                <div className='w-[9%]'>Sr. No.</div>
                <div className='w-[30%]'>Site</div>
                <div className='w-[30%] md:w-[20%]'>Username</div>
                <div>Password</div>
            </div>
            {passwords.length === 0 && <div className='m-5'>No Passwords to display</div>}
            {passwords.map((item) => {
                a+=1
                return (<div key={item.id} className='flex border border-black w-[95%] mb-3 flex-col md:flex-row items-center'>
                    <div className='flex w-full md:w-2/5 justify-between'>
                    <div className='w-[10%] pl-5'>{a}.</div>
                    <div className='w-[85%]'><a className='block' href={item.form.site} target="_blank">{item.form.site}</a></div>
                    </div>
                    <div className='flex md:w-2/5 gap-3 mt-2 md:mt-0 md:gap-0'>
                    <div className='w-1/2 md:w-[45%] flex justify-between pr-5 items-center'>{item.form.username}
                        <button className='btn mx-1 h-[25px]' >
                            <img onClick={() => { copyText(item.form.username) }} width={18} src="icons/copy.svg" alt="" />
                        </button>
                    </div>
                    <div className='w-1/2 md:w-[45%] flex justify-between px-3 items-center'>
                        {
                            item.form.password
                        }
                        <button className='btn mx-1 h-[25px]' >
                            <img onClick={() => { copyText(item.form.password) }} width={18} src="icons/copy.svg" alt="" />
                        </button>
                    </div>
                    </div>
                    <div className="buttons w-[15%] flex h-full items-center justify-end">
                        <button className='btn mx-1 h-[25px]' onClick={(e) => { handleEdit(e, item.id) }}><CiEdit /></button>
                        <button className='btn mx-1 h-[25px]' onClick={(e) => { handleDelete(e, item.id) }}><MdDelete /></button>
                    </div>
                </div>)
            })}
        </div>
    </>
    )
}

export default Manager
