'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { Session } from "next-auth"

type Props = {
  user: Session['user']
}

export function UserInfo({ user }: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
        <Avatar>
          <AvatarFallback className="font-extrabold">
            H
          </AvatarFallback>
        </Avatar>
        <span>{user?.email}</span>
        <Button
          className="bg-emerald-500"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
  )
}