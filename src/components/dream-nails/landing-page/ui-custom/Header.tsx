'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '#services', label: 'Servicios' },
    { href: '#courses', label: 'Cursos' },
    { href: '#workshops', label: 'Workshops' },
    { href: '#testimonials', label: 'Testimonios' },
    { href: '#contact', label: 'Contacto' }
  ]

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between px-3 sm:px-6 md:px-12 lg:px-16 mx-auto">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Image
            src="/logo-dream-nails-dark.png"
            alt="Dream Nails Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">Dream Nails</span>
        </motion.div>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href} className="text-sm font-medium hover:text-primary">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="hidden md:inline-flex" style={{ backgroundColor: '#d47983' }}>
            Agendar Cita
          </Button>
        </motion.div>
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => { setIsOpen(!isOpen) }}>
          <span className="sr-only">Toggle Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container py-4 px-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm font-medium hover:text-primary"
                  onClick={() => { setIsOpen(false) }}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="mt-4 w-full" style={{ backgroundColor: '#d47983' }}>
                Agendar Cita
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
