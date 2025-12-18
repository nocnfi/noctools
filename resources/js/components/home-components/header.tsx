import { useRef, useState, useEffect, useContext, use } from 'react'
import { RiMenuUnfold3Line, RiMenuFold3Line } from "react-icons/ri";
import Context from "../../pages/Context";

const header = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useContext(Context);

  let toggleSidebar = () => {
    isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  }

  return (
    <>
        <header className='px-4 py-4 flex gap-6 fixed bg-transparent w-screen shadow-sm z-50'>
            <button className='cursor-pointer' onClick={toggleSidebar}>{isSidebarOpen ? <RiMenuFold3Line size={28} /> : <RiMenuUnfold3Line size={28} />}</button>
            <h1 className='italic font-bold text-2xl'>NFI.</h1>
            
        </header>
    </>
  )
}

export default header