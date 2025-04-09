'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const footerLinks = [
    {
      title: 'Servicios',
      links: [
        { label: 'Manos de ensueño', href: '#' },
        { label: 'Pies impecables', href: '#' },
        { label: 'Retiros profesionales', href: '#' }
      ]
    },
    {
      title: 'Formación',
      links: [
        { label: 'Cursos', href: '#' },
        { label: 'Workshops', href: '#' },
        { label: 'Calendario', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Términos y Condiciones', href: '#' },
        { label: 'Política de Privacidad', href: '#' },
        { label: 'Política de Cookies', href: '#' }
      ]
    }
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between px-8 md:px-12 lg:px-16 mx-auto">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo-dream-nails-dark.png"
              alt="Dream Nails Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-lg font-bold">Dream Nails</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Transformando el Nail Art y la estética con servicios profesionales y formación especializada.
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dream Nails. Todos los derechos reservados.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
            >
              <h3 className="text-sm font-medium">{section.title}</h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + 0.05 * linkIndex }}
                  >
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  )
}
