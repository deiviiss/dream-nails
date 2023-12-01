import { type User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { HiPencil, HiTrash } from 'react-icons/hi'

import { useUsers } from '@/context/UsersContext'

export const UserCard = ({ user }: { user: User }): JSX.Element => {
  const { deleteUser } = useUsers()
  const router = useRouter()

  const handleDeleteUser = async (id: number): Promise<void> => {
    await deleteUser(id)
  }

  return (
    <div className='flex justify-between bg-primary p-4 rounded-lg max-w-md min-w-[300px] mx-auto'>
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold' key={user.id}>
          Nombre del usuario
        </h2>
        <p>Usuario</p>
        <p>{new Date(user.created_at).toDateString()}</p>
      </div>
      <div className='flex items-start gap-x-2'>
        <button
          onClick={async () => {
            if (confirm('Are you sure you want to delete this user?')) {
              //! change to toast
              await handleDeleteUser(user.id)
            }
          }}
        >
          <HiTrash className='text-2xl text-red-600' />
        </button>
        <button
          onClick={() => {
            router.push(`/users/${String(user.id)}`)
          }}
        >
          <HiPencil className='text-2xl' />
        </button>
      </div>
    </div>
  )
}
