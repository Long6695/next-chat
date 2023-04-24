import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
const Input = () => {
  return (
    <div className="flex h-28 w-full">
      <textarea
        className="flex-1 resize-none p-2 rounded-lg textarea textarea-primary"
        placeholder="Send message"
      />
      <PaperAirplaneIcon className="basis-40 hover:fill-primary" />
    </div>
  );
};

export default Input;
