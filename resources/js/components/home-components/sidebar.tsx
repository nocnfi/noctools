import React from 'react'
import { TbLayoutDashboard } from "react-icons/tb";
import { LuNotepadText } from "react-icons/lu";
import { TbTopologyFull } from "react-icons/tb";

const sidebar = () => {
  return (
    <>
        <aside className='h-full w-64 bg-white shadow-2xl p-2'>
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