'use client'
import axios from 'axios'
import { type NextPage } from 'next'
import { useParams } from 'next/navigation'
import { FormEditUser } from '@/app/ui/users/FormEditUser'
import { type UpdateUser } from '@/interfaces/User'

const fetchUser = async (id: number): Promise<UpdateUser> => {
  const response = await axios.get<UpdateUser>(`/api/users/${id}`)

  const user: UpdateUser = response.data

  return user
}

const UserEditPage: NextPage = () => {
  const params = useParams()
  //! implement edit page
  // const user: UpdateUser = await fetchUser(Number(params.id))

  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
      {/* <FormEditUser user={user}></FormEditUser> */}
      <h1>The form Edit should go here</h1>
    </div>
  )
}
export default UserEditPage
