import React from "react";
import Avatar from "../avatar";

const Card = () => {
  return (
    <div className="flex items-center mt-2">
      <Avatar name="Long" className="w-12 h-12" />
      <div className="flex-1">
        <h2 className="text-md text-base-content text-bold">Ryu</h2>
        <p className="text-sm text-base-content">abcabcabcabcabcabc</p>
      </div>
      <div>
        <p className="text-xs text-base-content">12/3</p>
        <p className="text-xs text-base-content">12mins</p>
      </div>
    </div>
  );
};

export default Card;
