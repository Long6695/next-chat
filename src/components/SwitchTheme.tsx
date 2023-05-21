'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import { IoMdSunny, IoMdMoon } from 'react-icons/io'

const SwitchTheme = () => {
  const { theme, setTheme } = useTheme()

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input type="checkbox" />
      {theme === 'coffee' ? (
        <IoMdSunny
          className="fill-primary w-8 h-8"
          onClick={() => setTheme('garden')}
        />
      ) : (
        <IoMdMoon
          className="fill-primary w-8 h-8"
          onClick={() => setTheme('coffee')}
        />
      )}
    </label>
  )
}

export default SwitchTheme
