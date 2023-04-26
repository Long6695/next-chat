"use client";
import React, { useState } from "react";
import Rooms from "../rooms";
import SearchBar from "../search";
import Navbar from "../nav-bar";
import Chat from "../conversation";
import { RoomsType, UserType } from "@/types/chat";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";

async function getRooms() {
  const res = await fetch("http://localhost:8080/rooms");
  const rooms = (await res.json()) as RoomsType[];
  return rooms;
}

const Drawer = ({ auth }: { auth: UserType }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomsType>();
  const {
    data: roomsData,
    isLoading: isRoomLoading,
    isFetching: isRoomFetching,
  } = useQuery({
    queryKey: ["hydrate-rooms"],
    queryFn: () => getRooms(),
  });

  const handleSelectedRoom = (room: RoomsType) => {
    setSelectedRoom(room);
  };

  return (
    <div className="drawer drawer-mobile bg-base-300">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <div className="p-4 h-full">
          {selectedRoom && <Chat room={selectedRoom} auth={auth} />}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          <li>
            <SearchBar />
          </li>
          <li>
            {isRoomLoading || isRoomFetching ? (
              <Loading />
            ) : roomsData ? (
              <Rooms rooms={roomsData} onSelected={handleSelectedRoom} />
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
