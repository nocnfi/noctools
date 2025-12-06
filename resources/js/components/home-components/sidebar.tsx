import React, { useContext } from 'react'
import { TbLayoutDashboard } from "react-icons/tb";
import { LuNotepadText } from "react-icons/lu";
import { TbTopologyFull } from "react-icons/tb";
import Context from "../../pages/Context";

const sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useContext(Context)

  return (
    <>
        <aside className={`h-full bg-white overflow-hidden shadow-2xl w-0 p-2 transition-all duration-500 ${isSidebarOpen ? `translate-x-0 w-64` : `-translate-x-full w-0`}`}>
            <div className='flex gap-2 items-center bg-gray-200 p-2 cursor-pointer'>
                <span className=''><TbLayoutDashboard size={24} /></span>
                <p className=''>Dashboard</p>
            </div>
            <div className='flex gap-2 items-center hover:bg-gray-100 p-2 cursor-pointer'>
                <span className=''><TbTopologyFull size={24} /></span>
                <p className=''>Topology</p>
            </div>
            <div className='flex gap-2 items-center hover:bg-gray-100 p-2 cursor-pointer'>
                <span className=''><LuNotepadText size={24} /></span>
                <p className=''>VLANs & IPs</p>
            </div>
        </aside>
    </>
  )
}

export default sidebar