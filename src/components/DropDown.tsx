'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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
    <div ref={dropdownRef} className="relative w-auto flex flex-col items-center rounded-md z-50 sm:hidden">
      <button onClick={() => { setIsOpen((prev) => !prev) }} className="flex items-center justify-around border-transparent duration-400" >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 6l16 0"></path><path d="M4 12l16 0"></path><path d="M4 18l16 0"></path></svg>
      </button>
      {isOpen && (
        <ul className="absolute w-[130px] top-[2.4rem] -right-[7px] p-2 rounded-md bg-primary-gradient border border-secondary bg-primary">
          {navigations.map((nav: NavigationItem) => (
            <li className="w-full flex justify-center items-center" key={nav.id}>
              <Link
                href={nav.url}
                className="hover:text-secondary"
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
