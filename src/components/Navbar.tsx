'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BookNowButton from '@/components/BookNowButton'
import DropDown from '@/components/DropDown'

const navigations = [
  { id: 1, label: 'Servicios', url: '/services' },
  { id: 2, label: 'Galeria', url: '/galery' },
  { id: 3, label: 'Precios', url: '/prices' },
  { id: 4, label: 'Sobre nosotros', url: '/about-us' },
  { id: 5, label: 'Iniciar sesión', url: '/login' }
]

const navigationsProtect = [
  { id: 1, label: 'Servicios', url: '/services' },
  { id: 2, label: 'Galeria', url: '/galery' },
  { id: 3, label: 'Precios', url: '/prices' },
  { id: 4, label: 'Sobre nosotros', url: '/about-us' },
  { id: 5, label: 'Mi perfil', url: '/profile' }
]

const Navbar = ({ session }: { session: object | null }): JSX.Element => {
  const [currentScrollPos, setCurrentScrollPos] = useState(0)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [background, setBackground] = useState('bg-transparent')

  useEffect(() => {
    const handleScroll = (): void => {
      const isScrollingUp = currentScrollPos < prevScrollPos
      const isScrollingDown = currentScrollPos > prevScrollPos

      setCurrentScrollPos(window.scrollY)

      if (isScrollingUp && currentScrollPos < 45) {
        setBackground('bg-transparent')
      }

      if (currentScrollPos > 45 && currentScrollPos < 200) {
        setPrevScrollPos(currentScrollPos)
        setBackground('bg-primary-gradient')
      }

      if (currentScrollPos > 201 && isScrollingDown) {
        setPrevScrollPos(currentScrollPos)
        setIsVisible(false)
      }

      if (isScrollingUp) {
        setPrevScrollPos(currentScrollPos)
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, currentScrollPos])

  return (

    <nav className={`fixed z-10 top-0 flex flex-col w-full gap-3 py-3 text-white font-bold ${isVisible ? background : 'hidden'}`}>
      <div className='flex items-center justify-between max-w-[768px] container mx-auto px-2'>
        <Link href={'/'}>
          <div className=" w-32 h-auto">
            <Image src="/logo_dream-nails-white.png" alt="logo_dream-nails" width={256} height={144} className='w-full'></Image>
          </div>
        </Link>

        <ul className='hidden sm:flex'>
          {(session !== null)
            ? <>
              {navigationsProtect.map((nav) => (
                <li key={nav.id} className='px-3 py-1 rounded-lg border-b-2 border-transparent hover:bg-secondary hover:border-secondary transition ease-in-out delay-150 duration-300 relative'>
                  <Link href={nav.url}>{nav.label}</Link>
                </li>
              ))}
            </>
            : <>
              {navigations.map((item) => (
                <li key={item.id} className='px-3 py-1 rounded border-b-2 border-transparent hover:text-primary hover:bg-secondary hover:border-secondary transition ease-in-out delay-150 duration-300 relative'>
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
      <BookNowButton></BookNowButton>
    </nav>

  )
}

export default Navbar
