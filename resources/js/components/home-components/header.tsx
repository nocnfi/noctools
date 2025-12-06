import { useRef, useState, useEffect } from 'react'
import { RiMenuUnfold3Line } from "react-icons/ri";


const header = () => {
  return (
    <>
        <header className='px-4 py-4 flex gap-6 fixed bg-transparent w-screen shadow-sm z-50'>
            <button className='cursor-pointer'><RiMenuUnfold3Line size={28} /></button>
            <h1 className='italic font-bold text-2xl'>NFI.</h1>
            
        </header>
    </>
  )
}

export default header