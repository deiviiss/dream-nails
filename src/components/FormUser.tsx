// //! This component use logit to handle create and edit users

// 'use client'
// import { AxiosError } from 'axios'
// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react'
// import { useUsers } from '@/context/UserContext'
// import { type UpdateUser } from '@/interfaces/User'

// interface FormUserProps {
//   user: UpdateUser
// }

// interface FormState extends UpdateUser {
//   password: string
// }

// export const FormUser: React.FC<FormUserProps> = ({ user }) => {
//   const router = useRouter()
//   const [error, setError] = useState()
//   const { createUser, updateUser } = useUsers()

//   const [userData, setUserData] = useState<FormState>({
//     id: user.id,
//     name: '',
//     lastname: '',
//     user: '',
//     email: '',
//     password: ''
//   })

//   useEffect(() => {
//     if (user !== undefined) {
//       setUserData((prevUserData) => ({
//         ...prevUserData,
//         name: user.name,
//         lastname: user.lastname,
//         user: user.user,
//         email: user.email
//       }))
//     }
//   }, [user])

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault()

//     if (user === undefined) {
//       try {
//         await createUser(userData)
//         const res = await signIn('credentials', {
//           email: userData.email,
//           password: userData.password,
//           redirect: false
//         })

//         if ((res?.ok) ?? false) {
//           router.push('/profile')
//           router.refresh()
//         }
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           setError(error.response?.data.message)
//         }
//       }
//     }

//     if (user !== undefined) {
//       try {
//         await updateUser(user.id, userData)
//         router.push('/users')
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           setError(error.response?.data.message)
//         }
//       }
//     }
//   }

//   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [name]: value
//     }))
//   }

//   const isDisabled = (
//     userData.name === '' ||
//     userData.lastname === '' ||
//     userData.email === '' ||
//     userData.user === '' ||
//     (user === undefined && userData.password === '')

//   )

//   return (
//     <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
//       {
//         error !== undefined ? <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div> : null
//       }

//       <form onSubmit={handleSubmit} className=' bg-primary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded'>

//         <h1 className=' text-2xl font-bold mb-4'>
//           {
//             (user !== undefined) ? 'Update User' : 'Sign Up'
//           }
//         </h1>

//         <input
//           type="text"
//           placeholder='Name'
//           name='name'
//           value={userData.name}
//           onChange={handleChange}
//           className='bg-secondary px-4 py-2 block mb-2 w-full rounded-sm'
//         />
//         <input
//           type="text"
//           placeholder='Lastname'
//           name='lastname'
//           value={userData.lastname}
//           onChange={handleChange}
//           className='bg-secondary px-4 py-2 block mb-2 w-full rounded-sm'
//         />
//         <input
//           type="text"
//           placeholder='User'
//           name='user'
//           value={userData.user}
//           onChange={handleChange}
//           className='bg-secondary px-4 py-2 block mb-2 w-full rounded-sm'
//         />
//         <input
//           type="email"
//           placeholder='example@mail.com'
//           name='email'
//           value={userData.email}
//           onChange={handleChange}
//           className='bg-secondary px-4 py-2 block mb-2 w-full rounded-sm'
//         />
//         {user === undefined && <input
//           type="password"
//           name="password"
//           placeholder='******'
//           onChange={handleChange}
//           className='bg-secondary px-4 py-2 block mb-2 w-full rounded-sm'
//         />}
//         <div className="flex gap-x-3">
//           {
//             user === undefined
//               ? <button type='submit' className='bg-highlight px-4 py-2 rounded-md hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed' disabled={isDisabled}
//               >
//                 Sign Up
//               </button>
//               : <> <button type='submit' className='bg-highlight px-4 py-2 rounded-md hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed' disabled={isDisabled}>
//                 Update
//               </button><button type='button' onClick={() => { router.push('/users') }} className='bg-red-800 px-4 py-2 rounded-md hover:bg-red-600'>Cancel</button></>
//           }
//         </div>
//       </form >
//     </div >
//   )
// }
