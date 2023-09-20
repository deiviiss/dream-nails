import { type User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useUsers } from '@/context/UserContext'

export const UserCard = ({ user }: { user: User }): JSX.Element => {
  const { deleteUser } = useUsers()
  const router = useRouter()

  const handleDeleteUser = async (id: number): Promise<void> => {
    await deleteUser(id)
  }
  return (
    <div className='flex justify-between bg-neutral-950 p-4 rounded-lg max-w-md min-w-[300px] mx-auto'>
      <div className="flex flex-col">
        <h2 className='text-2xl font-bold' key={user.id}>{user.name} {user.lastname}</h2>
        <p>{user.user}</p>
        <p>{new Date(user.createdAt).toDateString()}</p>
      </div>
      <div className="flex items-start gap-x-2">
        <button onClick={async () => {
          if (confirm('Are you sure you want to delete this user?')) { //! change to toast
            await handleDeleteUser(user.id)
          }
        }}>
          <HiTrash className='text-2xl text-red-600' />
        </button>
        <button onClick={() => { router.push(`/users/${user.id}`) }} >
          <HiPencil className='text-2xl' />
        </button>
      </div>
    </div >
  )
}
