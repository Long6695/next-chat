import React from "react";
import Message from "./Message";
import Input from "./Input";
import { MessageType, RoomsType } from "@/types/chat";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";

const fetchMessage = async (room_id: string) => {
  if (!room_id) return;

  const res = await fetch(`http://localhost:8080/conversations/${room_id}`);
  const rooms = await res.json();
  return rooms;
};

const Chat = ({ room }: { room: RoomsType }) => {
  const {
    data: message,
    isLoading: isMessageLoading,
    isFetching: isMessageFetching,
  } = useQuery({
    queryKey: ["hydrate-room", room?.room?.id],
    queryFn: () => fetchMessage(room?.room?.id),
  });

  return (
    <div className="h-full w-full bg-base-100 p-2 rounded-xl flex flex-col justify-end">
      {isMessageLoading || isMessageFetching ? (
        <Loading />
      ) : message ? (
        message?.map((item: MessageType) => (
          <Message
            key={item?.id}
            direction={item?.user_id === '1bc833808-05ed-455a-9d26-64fe1d96d62d' ? "chat-end" : "chat-start"}
            name={room?.users?.find(val => val?.id === item?.user_id)?.username || ""}
            status="Delivered"
            message={item?.content}
            time={item?.created_at}
          />
        ))
      ) : null}
      <Input />
    </div>
  );
};

export default Chat;
