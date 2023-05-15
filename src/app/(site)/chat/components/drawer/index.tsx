import React, { useState } from 'react'
import Rooms from '../rooms'
import SearchBar from '../search'
import Navbar from '../../../../../components/nav-bar'
import { RoomsType } from '@/types/chat'

const Drawer = ({ children }: { children: React.ReactNode }) => {
  // const [selectedRoom, setSelectedRoom] = useState<RoomsType>()
  // const handleSelectedRoom = (room: RoomsType) => {
  //   setSelectedRoom(room)
  // }

  return (
    <div className="drawer drawer-mobile bg-base-300">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <div className="p-4 h-full">{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          <li>
            <SearchBar />
          </li>
          <li>
            {/* {isRoomLoading || isRoomFetching ? (
              <Loading />
            ) : roomsData ? (
              <Rooms rooms={roomsData} onSelected={handleSelectedRoom} />
            ) : null} */}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
