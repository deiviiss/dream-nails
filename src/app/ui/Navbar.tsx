'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DropDown from '@/app/ui/DropDown'

const navigations = [
  { id: 1, label: 'Servicios', url: '/salon-page/salon-services' },
  { id: 2, label: 'Galeria', url: '/salon-page/galery' },
  { id: 3, label: 'Precios', url: '/salon-page/prices' },
  { id: 4, label: 'Sobre nosotros', url: '/salon-page/salon-about' }
]

const Navbar = (): JSX.Element => {
  const [bgColor, setBgColor] = useState('bg-none')
  const fixedScrollThreshold = 0.5 // 1% scroll threshold

  const handleScroll = () => {
    // calculate the vertical scroll percentage
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    setBgColor(scrolled > fixedScrollThreshold ? 'bg-primary' : 'bg-none') // change the background color if the percentage is greater than the fixed value
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) // add the event listener for the scroll

    return () => {
      window.removeEventListener('scroll', handleScroll) // delete the event listener when the component is unmounted
    }
  }, [])

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-20 text-white ${bgColor} transition-colors duration-300 border-b border-secondary py-2`}
      >
        <div className='flex items-center justify-between max-w-[768px] container mx-auto px-2'>
          <Link href={'/'}>
            <div className='w-20'>
              <Image
                src='/logo_dream-nails-white.png'
                alt='logo_dream-nails'
                width={288}
                height={307}
                className='w-full'
              ></Image>
            </div>
          </Link>

          <ul className='hidden sm:flex'>
            {navigations.map((item) => (
              <li
                key={item.id}
                className='px-3 py-1 rounded border-b-2 border-transparent hover:bg-tertiary hover:border-secondary transition ease-in-out delay-150 duration-300 relative'
              >
                <Link href={item.url}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <DropDown navigations={navigations}></DropDown>
        </div>
      </nav>
    </>
  )
}

export default Navbar
