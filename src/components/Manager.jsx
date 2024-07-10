import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import React,{ useState, useEffect, useRef }  from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEye,FaEyeSlash } from "react-icons/fa";

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwords, setpasswords] = useState([])
    const eyeref = useRef()
    const passref = useRef()
    useEffect(() => {
        let pass = localStorage.getItem("passwords")
        let passArr;
        if (pass) {
            passArr = JSON.parse(pass)
            setpasswords(passArr)
        }
    }, [])
    const saveTLS = (a=passwords) => {
        localStorage.setItem("passwords", JSON.stringify(a))
      }

    const savePassword = () => {
        passwords.push({id:uuidv4(),form})
        setform({ site: "", username: "", password: "" })
        let newpaswords = [...passwords]
        saveTLS(newpaswords)
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleEdit = (e,id) =>{
        let p = passwords.filter(i => i.id === id)
        setform(p[0].form)
        let newpass = passwords.filter(i =>{
            return i.id !== id
        })
        setpasswords(newpass)
        saveTLS()
    }
    const handleDelete = (e,id) =>{
        let newpass = passwords.filter(i =>{
            return i.id !== id
        })
        setpasswords(newpass)
        saveTLS(newpass)
    }
    const copyText = (text)=>{
        alert("copied to clipboard" + text)
        navigator.clipboard.writeText(text)
    }
    return (<>
        <div class="absolute inset-0 -z-10 h-full w-full bg-purple-200 [background:radial-gradient(125%_125%_at_50%_10%,#c1cdeb_40%,#63e_100%)]"></div>
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
                <div className="flex w-full gap-3 ">
                    <input name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-2/6 py-1 px-4' type="text" />

                    <input name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500  w-2/6 py-1 px-4' type="password" />

                    <button className='flex justify-center items-center bg-[#4a6cdd] w-1/4 rounded-[22px] hover:bg-[#a290d3] border-2 border-black' onClick={savePassword}>Add Password
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                    </button>
                </div>
            </div>
        </div>
        <div className="passwords border-2 mt-4 border-black flex flex-col items-center w-3/4 mx-auto min-h-[30vh]">
            <h1 className='text-3xl font-bold '>Your Passwords</h1>
            <div className="flex border border-black w-[88%] px-4 py-[6px] my-3 bg-[#23253b] text-white text-[18px] rounded-2xl">
                <div className='w-[9%]'>Sr. No.</div>
                <div className='w-[30%]'>Site</div>
                <div className='w-[20%]'>Username</div>
                <div>Password</div>
            </div>
            {passwords.length ===0 && <div className='m-5'>No Passwords to display</div> }
            {passwords.map((item) => {
                return (<div key={item.id} className='flex border border-black w-[85%] mb-3'>
                    <div className='w-[9%] pl-5'>1</div>
                    <div className='w-[30%]'><a href={item.form.site} target="_blank">{item.form.site}</a></div>
                    <div className='w-[20%] flex justify-between pr-5 items-center'>{item.form.username}
                    <button className='btn mx-1 h-[25px]' >
                            <img onClick={()=>{copyText(item.form.username)}} width={18} src="/icons/copy.svg" alt="" />
                        </button>
                    </div>
                    <div className='w-[20%] flex justify-between px-3 items-center'>
                        {
                            item.form.password
                        }
                        <button className='btn mx-1 h-[25px]' >
                            <img onClick={()=>{copyText(item.form.password)}} width={18} src="/icons/copy.svg" alt="" />
                        </button>
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
