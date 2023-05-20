import Drawer from '@/app/(site)/chat/components/drawer'
import React from 'react'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer>
      {children}
    </Drawer>
  )
}

export default ChatLayout
