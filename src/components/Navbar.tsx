import { type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const Navbar: NextPage = async () => {
  // nextAuth
  const session = await getServerSession()

  return (
    <nav className='bg-zinc-900 p-4' >
      <div className='flex justify-between container mx-auto'>
        <Link href={'/'}>
          <h1 className="font-bold text-xl">
            Template system
          </h1>
        </Link>

        <ul className='flex gap-x-2'>
          {(session !== null)
            ? <>
              <li className='px-3 py-1'>
                <Link href={'/home'}>Home</Link>
              </li>
              <li className='px-3 py-1'>
                <Link href={'/profile'}>Profile</Link>
              </li>
              <li className='px-3 py-1'>
                <Link href={'/users'}>Users</Link>
              </li>
            </>
            : <>
              <li className='px-3 py-1'>
                <Link href={'/login'}>Sign In</Link>
              </li>
              <li className='px-3 py-1'>
                <Link href={'/register'}>Sign Up</Link>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
