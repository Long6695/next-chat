import React from 'react'
import Avatar from '../../../../../components/UserAvatar'
import { RoomType, RoomsType } from '@/types/chat'
import { UserType } from '@/types/user'

const Room = ({
  data,
  onSelected,
}: {
  data: { users: UserType[]; room: RoomType }
  onSelected: (room: RoomsType) => void
}) => {
  const date = new Date(data?.room?.created_at)
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  const time = `${date.getHours()}:${date.getMinutes()} ${ampm}`
  const specificDate = `${date.getDate()}/${date.getMonth()}`

  return (
    <div className="flex items-center mt-2" onClick={() => onSelected(data)}>
      <Avatar name={data?.room?.name} className="w-12 h-12" />
      <div className="flex-1">
        <h2 className="text-md text-base-content text-bold">
          {data?.room?.name}
        </h2>
        <p className="text-sm text-base-content">{data?.room?.last_message}</p>
      </div>
      <div>
        <p className="text-xs text-base-content">{specificDate}</p>
        <p className="text-xs text-base-content">{time}</p>
      </div>
    </div>
  )
}

export default Room
