'use client'

import { Session } from "next-auth"
import Image from "next/image"
import profilePicturePlaceholder from '@/assets/profile-pic-placeholder.png'
import { signIn, signOut } from "next-auth/react"

interface UserMenuButtonProps {
  session:Session | null
}

export default function UserMenuButton({session}:UserMenuButtonProps) {
  const user = session?.user
  return (
    <div className="dropdown dropdown-menu">
      <label className="btn btn-ghost btn-circle" tabIndex={0}>
        {user ? 
        <Image className="w-10 rounded-full" src={user?.image  || profilePicturePlaceholder} alt="profile picture" width={40} height={40}/>
      :<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>}
      </label>
      <ul className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow" tabIndex={0}>
        <li>
          {user ? <button onClick={() => signOut({callbackUrl:'/'})}>Sign Out</button>
          : <button onClick={() => signIn()}>Sign In</button>}
        </li>
      </ul>
    </div>
  )
}


/**
  
 */