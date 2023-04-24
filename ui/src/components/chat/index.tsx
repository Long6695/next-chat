import React from "react";
import Message from "./Message";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="h-full w-full bg-base-100 p-2 rounded-xl flex flex-col justify-end">
      <Message
        direction="chat-start"
        name="Long"
        status="Delivered"
        message="Hello"
        time="10:00"
      />
      <Message
        direction="chat-end"
        name="Long"
        status="Delivered"
        message="123123"
        time="10:00"
      />
      <Message
        direction="chat-start"
        name="Long"
        status="Delivered"
        message="asdaskd"
        time="10:00"
      />
      <Message
        direction="chat-end"
        name="Bot"
        status="Delivered"
        message="Hello"
        time="10:00"
      />
      <Input/>
    </div>
  );
};

export default Chat;
