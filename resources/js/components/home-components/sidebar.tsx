import React, { useContext } from 'react'
import { TbLayoutDashboard } from "react-icons/tb";
import { LuNotepadText } from "react-icons/lu";
import { TbTopologyFull } from "react-icons/tb";
import Context from "../../pages/Context";

const sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen, currentPage, setCurrentPage] = useContext(Context)

  return (
    <>
        <aside className={`h-full overflow-hidden shadow-2xl w-0 p-2 transition-all duration-300 ease-in-out ${isSidebarOpen ? `translate-x-0 w-64` : `-translate-x-full w-0`}`}>
            <div className={`flex gap-2 items-center p-2 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${currentPage === 'dashboard' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]' : 'hover:bg-[var(--muted-foreground)] hover:text-[var(--secondary)]'}`} onClick={() => setCurrentPage('dashboard')}>
                <span className=''><TbLayoutDashboard size={24} /></span>
                <p className=''>Dashboard</p>
            </div>
            <div className={`flex gap-2 items-center p-2 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${currentPage === 'topology' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]' : 'hover:bg-[var(--muted-foreground)] hover:text-[var(--secondary)]'}`} onClick={() => setCurrentPage('topology')}>
                <span className=''><TbTopologyFull size={24} /></span>
                <p className=''>Topology</p>
            </div>
            <div className={`flex gap-2 items-center p-2 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${currentPage === 'vlansips' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]' : 'hover:bg-[var(--muted-foreground)] hover:text-[var(--secondary)]'}`} onClick={() => setCurrentPage('vlansips')}>
                <span className=''><LuNotepadText size={24} /></span>
                <p className=''>VLANs & IPs</p>
            </div>
        </aside>
    </>
  )
}

export default sidebar