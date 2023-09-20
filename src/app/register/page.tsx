import { type NextPage } from 'next'
import { FormCreateUser } from '@/components/FormCreateUser'

const RegisterPage: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
      <FormCreateUser></FormCreateUser>
    </div>
  )
}
export default RegisterPage
