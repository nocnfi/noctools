import React, { useContext } from 'react'
import Sidebar from '@/components/home-components/sidebar'
import Content from '@/components/home-components/content'
import Context from '../../pages/Context'

const body = () => {

  const [currentPage] = useContext(Context);
  console.log('current page', currentPage);


  return (
    <>  
        <div className='pt-16 h-screen w-screen flex overflow-hidden'>
            <Sidebar />
            <Content />
        </div>
    </>
  )
}

export default body