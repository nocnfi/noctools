import React, {useState} from 'react'
import Header from '@/components/home-components/header'
import Body from '@/components/home-components/body'
import Context from './Context'

const home = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('vlansips');

  return (
    <>
        <Context.Provider value={[
          isSidebarOpen,
          setIsSidebarOpen,
          currentPage,
          setCurrentPage
        ]}>

          <Header />
          <Body />

        </Context.Provider>
    </>
  )
}

export default home