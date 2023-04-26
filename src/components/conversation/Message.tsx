import React from "react";
import { twMerge } from "tailwind-merge";

type Direction = "chat-start" | "chat-end";

const Message = ({
  name,
  time,
  message,
  status,
  direction = "chat-start",
}: {
  name: string;
  time: string;
  message: string;
  status: string;
  direction: Direction;
}) => {
  return (
    <div className={twMerge("chat", direction)}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="chat-header">
        {name}
        <time className="text-xs opacity-50 ml-1">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">{status}</div>
    </div>
  );
};

export default Message;
