import Chat from '@/components/chat'
import Drawer from '@/components/drawer'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-screen'>
      <Drawer>
        <Chat />
      </Drawer>
    </div>
  )
}

export default Home