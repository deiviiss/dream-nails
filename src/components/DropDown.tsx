'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'

interface NavigationItem {
  id: number
  label: string
  url: string
};

export default function DropDown({ navigations }: { navigations: NavigationItem[] }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (event: Event): void => {
      if ((dropdownRef.current != null) && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
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
    <div ref={dropdownRef} className="relative w-auto flex flex-col items-center px-5 rounded-md z-50 sm:hidden">

      <button onClick={() => { setIsOpen((prev) => !prev) }} className="flex items-center justify-around border-transparent duration-400" >
        <RiMenu3Fill className='text-white font-light text-3xl'></RiMenu3Fill>
      </button>

      {isOpen && (
        <ul className="absolute w-[130px] top-10 -right-[6px] p-2 rounded-md border border-primary bg-primary">
          {navigations.map((nav: NavigationItem) => (
            <li className="w-full flex justify-center items-center" key={nav.id}>
              <Link
                href={nav.url}
                className="text-white hover:text-warning"
                onClick={() => { setIsOpen(false) }}
              >
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
