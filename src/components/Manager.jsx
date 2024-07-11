import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEye, FaEyeSlash, FaRProject } from "react-icons/fa";

const Manager = () => {
    let a = 0
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwords, setpasswords] = useState([])
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
        if (form.site && form.username && form.password) {
            passwords.push({ id: uuidv4(), form })
            setform({ site: "", username: "", password: "" })
            let newpaswords = [...passwords]
            saveTLS(newpaswords)
            toast('🔑 Password Saved!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnhover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('🔑 Cannot Add Empty Values', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnhover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
    }
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
    }
    const handleDelete = (e, id) => {
        let c = confirm("Do You Really want to Delete this Password")
        if (c) {
            toast('🔑 Password Deleted Successfully', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnhover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: bounce,
            });
            let newpass = passwords.filter(i => {
                return i.id !== id
            })
            setpasswords(newpass)
            saveTLS(newpass)
        }
    }
    const copyText = (text) => {
        toast('✔️ Copied To Clipboard!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnhover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: "Bounce",
        });
        navigator.clipboard.writeText(text)
    }
    return (<>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
        />
        {/* Same as */}
        <ToastContainer />
        <div class="absolute inset-0 -z-10 h-[150%] w-full bg-purple-200 [background:radial-gradient(125%_125%_at_50%_10%,#c1cdeb_40%,#63e_100%)]"></div>
        <div className="mx-auto max-w-4xl text-white text-center border border-black pt-2 pb-9 mt-4 backdrop-blur-sm">
            <div className="logo font-bold text-3xl text-green-700 ">
                <span className='font-extrabold'>&lt;</span>
                <span className='text-black font-extrabold'>
                    Pass
                </span>
                <span className='font-extrabold'>OP/&gt;</span>
            </div>
            <p className='text-xl font-bold font-mono text-black'>Your Own Password Manager</p>

            <div className='text-black flex flex-col p-3 gap-5'>
                <input name='site' value={form.site} onChange={handleChange} placeholder='Enter Website' className='rounded-full border border-green-500 w-full py-1 px-4' type="text" />
                <div className="flex flex-col md:flex-row w-full gap-3 ">
                    <input name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 md:w-2/6 py-1 px-4' type="text" />

                    <input name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500  md:w-2/6 py-1 px-4' type="password" />
                    <button className='flex justify-center items-center bg-[#4a6cdd] md:w-1/4 rounded-[22px] hover:bg-[#a290d3] border-2 border-black' onClick={savePassword}>Add Password
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                    </button>
                </div>
            </div>
        </div>
        <div className="passwords border-2 my-4 border-black flex flex-col items-center md:w-3/4 w-[90%] mx-auto min-h-[50vh] mb-8">
            <h1 className='text-3xl font-bold '>Your Passwords</h1>
            <div className="flex border border-black w-[88%] px-4 py-[6px] my-3 bg-[#23253b] text-white text-[16px] rounded-2xl flex-col md:flex-row">
                <div className='flex md:w-[35%] w-1/2 gap-5' >
                    <div className='md:w-[9%]'>Sr. No.</div>
                    <div className='w-35%]'>Site</div>
                </div>
                <div className='flex w-full justify-around md:justify-between  md:w-[34%]'>
                    <div className='w-[20%]'>Username</div>
                    <div>Password</div>
                </div>
            </div>
            {passwords.length === 0 && <div className='m-5'>No Passwords to display</div>}
            {passwords.map((item) => {
                a += 1
                return (<div key={item.id} className='flex flex-col md:flex-row border border-black w-[85%] mb-3'>
                    <div className=' flex w-full md:w-[30%] gap-8'>

                        <div className='w-[9%] pl-5'>{a}</div>
                        <div ><a href={item.form.site} target="_blank">{item.form.site}</a></div>
                    </div>                        
                    <div className='flex w-full justify-evenly'>

                            <div className=' md:w-[25%] flex justify-between pr-5 items-center'>{item.form.username}
                                <button className='btn mx-1 h-[25px]' >
                                    <img onClick={() => { copyText(item.form.username) }} width={20} src="/icons/copy.svg" alt="" />
                                </button>
                            </div>
                            <div className=' md:w-[25%] flex md:justify-between px-3 items-center'>
                                {item.form.password}
                                <button className='btn mx-1 h-[25px]' >
                                    <img onClick={() => { copyText(item.form.password) }} width={20} src="/icons/copy.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    <div className="buttons md:w-[15%] flex h-full items-center md:justify-end justify-center">
                        <button className='btn mx-1 h-[25px]' onClick={(e) => { handleEdit(e, item.id) }}><CiEdit /></button>
                        <button className='btn mx-1 h-[25px]' onClick={(e) => { handleDelete(e, item.id) }}><MdDelete/></button>
                    </div>
                
                </div>)
            })}
        </div>
    </>
    )
}

export default Manager
