import React, {useState} from 'react'
import Header from '@/components/home-components/header'
import Body from '@/components/home-components/body'
import Context from './Context'

const home = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('vlansips');
  const [ipSegmentActive, setIpSegmentActive] = useState('160.25.236.');
  return (
    <>
        <Context.Provider value={[
          isSidebarOpen,
          setIsSidebarOpen,
          currentPage,
          setCurrentPage,
          ipSegmentActive,
          setIpSegmentActive
        ]}>

          <Header />
          <Body />

        </Context.Provider>
    </>
  )
}

export default home