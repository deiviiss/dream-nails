'use client'
import { type User } from '@prisma/client'
import { type NextPage } from 'next'
import { useEffect } from 'react'

import { UserCard } from '@/app/ui/users/UserCard'
import { useUsers } from '@/context/UsersContext'

const UsersPage: NextPage = () => {
  const { users, loadUsers } = useUsers()

  useEffect(() => {
    loadUsers()
  })

  return (
    <main className='flex flex-col gap-2 p-2'>
      <h1 className=' text-2xl font-bold'>Users</h1>
      <div className='flex flex-col gap-2'>
        {users.map((user: User) => {
          return <UserCard user={user} key={user.id} />
        })}
      </div>
    </main>
  )
}

export default UsersPage
