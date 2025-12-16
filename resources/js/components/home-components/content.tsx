import React, { useContext } from 'react'
import Vlanipcontent from '@/components/vlanip-components/vlanipcontent'
import Context from '../../pages/Context'

const content = () => {
  const [,, currentPage, setCurrentPage] = useContext(Context)
  return (
    <>  
        <div className='h-full w-full p-6 overflow-y-scroll'>
              {currentPage === 'vlansips' && <Vlanipcontent />}
        </div>
    </>
  )
}

export default content