import React from "react";
import Room from "./Room";
import { RoomsType } from "@/types/chat";

const Rooms = ({
  rooms,
  onSelected,
}: {
  rooms: RoomsType[];
  onSelected: (room: RoomsType) => void;
}) => {

  const handleSelectedRoom = (room: RoomsType) => {
    onSelected(room);
  };

  return (
    <>
      {rooms?.map((value, idx) => (
        <Room key={idx} data={value} onSelected={handleSelectedRoom} />
      ))}
    </>
  );
};

export default Rooms;
