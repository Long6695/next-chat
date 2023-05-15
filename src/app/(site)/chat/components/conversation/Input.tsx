import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
const Input = () => {
  return (
    <div className="flex h-28 w-full">
      <textarea
        className="flex-1 resize-none p-2 rounded-lg textarea textarea-primary"
        placeholder="Send message"
      />
      <AiOutlineSend className="basis-40 hover:fill-primary" />
    </div>
  )
}

export default Input
