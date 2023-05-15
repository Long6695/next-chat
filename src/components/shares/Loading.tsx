import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const UiLoading = () => {
  return (
    <div role="status" className="flex justify-center">
      <AiOutlineLoading3Quarters className="fill-current animate-spin" />
    </div>
  )
}

export default UiLoading
