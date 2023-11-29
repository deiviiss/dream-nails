'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { RiMenu3Fill } from 'react-icons/ri'

interface NavigationItem {
  id: number
  label: string
  url: string
}

export default function DropDown({
  navigations
}: {
  navigations: NavigationItem[]
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (event: Event): void => {
      if (
        dropdownRef.current != null &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClick) // add event click
    window.addEventListener('scroll', handleClick) // add event scroll

    return () => {
      document.body.removeEventListener('click', handleClick) // remove event click
      window.removeEventListener('scroll', handleClick) // remove event scroll
    }
  }, [dropdownRef])

  return (
    <div
      ref={dropdownRef}
      className='w-auto flex flex-col items-center px-5 rounded-md z-50 sm:hidden'
    >
      <button
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className='flex items-center justify-around border-transparent duration-400'
      >
        <RiMenu3Fill className='text-white font-light text-3xl'></RiMenu3Fill>
      </button>

      {isOpen && (
        <>
          <div className='absolute flex flex-col justify-between items-center w-screen h-screen top-0 right-0 py-3 bg-primary-gradient'>
            <div className='flex items-center justify-between max-w-[768px] container mx-auto px-2'>
              <Link href={'/'}>
                <div className=' w-32 h-auto'>
                  <Image
                    src='/logo_dream-nails-white.png'
                    alt='logo_dream-nails'
                    width={256}
                    height={144}
                    className='w-full'
                  ></Image>
                </div>
              </Link>

              <button
                onClick={() => {
                  setIsOpen((prev) => !prev)
                }}
                className='flex items-center justify-around border-transparent duration-400 px-2 pr-5'
              >
                <AiOutlineClose className='text-white font-light text-3xl'></AiOutlineClose>
              </button>
            </div>
            <ul className='flex flex-col items-center justify-center gap-y-10 font-bold text-3xl'>
              {navigations.map((nav: NavigationItem) => (
                <li
                  className='w-full flex justify-center items-center'
                  key={nav.id}
                >
                  <Link
                    href={nav.url}
                    className='text-white px-2 pb-[1px] border-b-2 border-white transition-transform duration-300 ease-in-out transform hover:border-secondary'
                    onClick={() => {
                      setIsOpen(false)
                    }}
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h1 className=' opacity-20 tracking-[8px] text-center text-5xl pb-5 mb-5'>
              DREAM NAILS
            </h1>
          </div>
        </>
      )}
    </div>
  )
}
