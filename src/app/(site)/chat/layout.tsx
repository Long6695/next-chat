import Drawer from '@/app/(site)/chat/components/drawer'
import React, { Suspense } from 'react'
import ChatLoading from './loading'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer>
      <Suspense fallback={<ChatLoading />}>{children}</Suspense>
    </Drawer>
  )
}

export default ChatLayout
