import React from 'react'
import Sidebar from '@/components/home-components/sidebar'
import Content from '@/components/home-components/content'

const body = () => {
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