import { type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import DropDown from '@/components/DropDown'

const navigations = [
  { id: 1, label: 'Precios', url: '/' },
  { id: 2, label: 'Galeria', url: '/galery' },
  { id: 3, label: 'Iniciar sesión', url: '/login' },
  { id: 4, label: 'Registrarse', url: '/register' }
]

const navigationsProtect = [
  { id: 1, label: 'Precios', url: '/prices' },
  { id: 2, label: 'Galeria', url: '/galery' },
  { id: 3, label: 'Agenda tu cita', url: '/dates' },
  { id: 4, label: 'Mi perfil', url: '/profile', submenu: [{ id: 1, label: 'Mis visitas', url: '/profile/visits' }, { id: 2, label: 'Mis citas', url: '/profile/dates' }] }
]

const Navbar: NextPage = async () => {
  // nextAuth
  const session = await getServerSession()

  return (
    <>
      <nav className='w-full bg-white shadow-[0_3px_5px_0px_rgba(0,0,0,0.3)] text-xl text-secondary font-bold p-4'>
        <div className='flex items-center justify-between container mx-auto'>
          <Link href={'/'}>
            <div className='w-24 h-auto bg-white'>
              <Image src="/logo_dream-nails.png" alt="logo_dream-nails" width={256} height={144} className="bg-white"></Image>
            </div>
          </Link>

          <ul className='gap-x-2 hidden sm:flex'>
            {(session !== null)
              ? <>
                {navigationsProtect.map((nav) => (
                  <li key={nav.id} className='px-3 py-1 border-primary border-b-2 border-r-2 hover:border-accent hover:border-b-2 hover:border-r-2 transition ease-in-out delay-150 duration-300 group relative'>
                    <Link href={nav.url}>{nav.label}</Link>

                    {(nav.submenu != null) && nav.submenu.length > 0 && (
                      <div className='hidden w-[110px] group-hover:block absolute top-[2.4rem] -right-[7px] z-10 transition ease-in-out delay-150 duration-300'>
                        <ul className='bg-white border-secondary border rounded-md shadow-md py-1 px-4'>
                          {nav.submenu.map((submenuItem) => (
                            <li className='hover:underline' key={submenuItem.id}><Link href={submenuItem.url}>{submenuItem.label}</Link></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </>
              : <>
                {navigations.map((item) => (
                  <li key={item.id} className='px-3 py-1 border-primary border-b-2 border-r-2 hover:border-accent hover:border-b-2 hover:border-r-2 transition ease-in-out delay-150 duration-300'>
                    <Link href={item.url}>{item.label}</Link>
                  </li>
                ))}
              </>
            }
          </ul>

          {
            (session !== null)
              ? <DropDown navigations={navigationsProtect}></DropDown>
              : <DropDown navigations={navigations}></DropDown>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar
