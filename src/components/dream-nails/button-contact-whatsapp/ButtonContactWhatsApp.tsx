'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  name?: string
  className: string
  icon?: JSX.Element
}

export const ButtonContactWhatsApp = ({ name, className, icon }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const fixedScrollThreshold = 2 // 2% scroll threshold

  const handleScroll = () => {
    // calculate the vertical scroll percentage
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    setIsVisible(scrolled > fixedScrollThreshold) // show the button if the percentage is greater than the fixed value
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) // add the event listener for the scroll

    return () => {
      window.removeEventListener('scroll', handleScroll) // delete the event listener when the component is unmounted
    }
  }, [])

  const message = 'Hola, me gustaría agendar una cita...'

  const messageCodified = encodeURIComponent(message)

  const whatsAppLink = `https://wa.me/529812099475?text=${messageCodified}`

  return (
    <div className={`${isVisible ? 'fade-in' : 'opacity-0'}`}>
      {isVisible && (
        <Button
          asChild
          variant='outline'
          className={className}
        >
          <Link
            href={whatsAppLink}
            passHref
            target='_blank'
            className='flex items-center gap-1'
          >
            {icon && <span className="icon">{icon}</span>}
            {name && <span>{name}</span>}
          </Link>
        </Button>
      )}
    </div>
  )
}
