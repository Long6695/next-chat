import React from 'react'
import Message from './Message'
import Input from './Input'
import { MessageType, RoomsType } from '@/types/chat'
import Loading from '../../../../../components/shares/Loading'
import { UserType } from '@/types/user'

const fetchMessage = async (room_id: string) => {
  if (!room_id) return

  const res = await fetch(`http://localhost:8000/conversations/${room_id}`)
  const rooms = await res.json()
  return rooms
}

// const Conversation = ({ room, auth }: { room: RoomsType; auth: UserType }) => {
const Conversation = () => {
  return (
    <div className="h-full w-full bg-base-100 p-2 rounded-xl flex flex-col justify-end">
      {/* {isMessageLoading || isMessageFetching ? (
        <Loading />
      ) : message ? (
        message?.map((item: MessageType) => (
          <Message
            key={item?.id}
            direction={item?.user_id === auth?.id ? "chat-end" : "chat-start"}
            name={room?.users?.find(val => val?.id === item?.user_id)?.name || ""}
            status="Delivered"
            message={item?.content}
            time={item?.created_at}
          />
        ))
      ) : null} */}
      <Input />
    </div>
  )
}

export default Conversation
