import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type STATUS = 'online' | 'offline'

function getShortName(name = '') {
  if (name.includes(' ')) {
    const names = name.split(' ')
    return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase()
  }
  return `${name.slice(0, 1)}`.toUpperCase()
}

const Avatar = ({
  name = '',
  image = '',
  className = '',
  status = 'online',
}: {
  name: string
  className?: string
  image?: string
  status?: STATUS
}) => {
  return (
    <>
      {image ? (
        <div className={twMerge('avatar', status)}>
          <div
            className={twMerge(
              'w-24 h-24 rounded-full relative bg-neutral-focus',
              className,
            )}
          >
            <Image src={image} fill alt="avatar" />
          </div>
        </div>
      ) : (
        <div className="avatar placeholder">
          <div
            className={twMerge(
              'bg-neutral-focus text-neutral-content rounded-full w-24',
              className,
            )}
          >
            <span className="text-3xl">{getShortName(name)}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Avatar
