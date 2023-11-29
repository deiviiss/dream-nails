'use client'
import { type User } from '@prisma/client'
import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { type Props, type UsersContextType } from '@/interfaces/Props'
import { type CreateUser, type UpdateUser } from '@/interfaces/User'

const UsersContext = createContext<UsersContextType>({
  users: [],
  loadUsers: async () => { },
  createUser: async () => { },
  updateUser: async (id: number, user: UpdateUser) => {
    return id
  },
  deleteUser: async (id: number) => {
    return id
  }
})

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext)

  if (context === null) {
    throw new Error('useUsers must be used within a UsersProviders')
  }

  return context
}

export const UsersProvider = ({ children }: Props): JSX.Element => {
  const [users, setUsers] = useState<User[]>([])

  const loadUsers = async (): Promise<void> => {
    console.log('load users...')
    const res = await axios.get('/api/users')
    const users = res.data
    setUsers(users)
  }

  const createUser = async (user: CreateUser): Promise<void> => {
    console.log('creating user...')
    await axios.post('api/auth/signup', {
      email: user.email,
      role: user.role,
      password: user.password
    })
  }

  const updateUser = async (id: number, user: UpdateUser): Promise<number> => {
    console.log('update user...')
    const res = await axios.put(`/api/users/${id}`, { user })

    if (res.status === 200) {
      setUsers(users.filter((user) => user.id !== id))
      return user.id
    }
    return user.id
  }

  const deleteUser = async (id: number): Promise<number> => {
    console.log('delete user...')
    const res = await axios.delete(`api/users/${id}`)
    if (res.status === 200) {
      setUsers(users.filter((user) => user.id !== id))
      return id
    }
    //! handle error
    return id
  }

  return (
    <UsersContext.Provider
      value={{ users, loadUsers, createUser, updateUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  )
}
