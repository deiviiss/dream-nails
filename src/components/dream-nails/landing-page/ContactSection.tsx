'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'
import Link from 'next/link'
import { SectionTitle } from './ui-custom/SectionTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactSection() {
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-[#d47983]" />,
      text: '+52 981 209 9575'
    },
    {
      icon: <Mail className="h-5 w-5 text-[#d47983]" />,
      text: 'info@dreamnails.com'
    },
    {
      icon: <MapPin className="h-5 w-5 text-[#d47983]" />,
      text: 'Calle José María Iglesias,  Campeche CP 24088'
    }
  ]

  const socialMedia = [
    {
      icon: <Instagram className="h-5 w-5 text-[#d47983]" />,
      href: 'https://www.instagram.com/dream.nails.campeche',
      label: 'Instagram'
    },
    {
      icon: <Facebook className="h-5 w-5 text-[#d47983]" />,
      href: 'https://www.facebook.com/profile.php?id=100095532879449',
      label: 'Facebook'
    }
  ]

  return (
    <section id="contact" className="container py-12 md:py-24 lg:py-32 px-8 md:px-12 lg:px-16 mx-auto">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <SectionTitle
            title="Contáctanos"
            description="Estamos aquí para responder tus preguntas y ayudarte a reservar nuestros servicios, cursos o workshops."
          />
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {socialMedia.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={item.href} target='_blank' className="rounded-full p-2">
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nombre
                </label>
                <Input id="first-name" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Apellido
                </label>
                <Input id="last-name" placeholder="Tu apellido" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input id="email" placeholder="tu@email.com" type="email" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Teléfono
              </label>
              <Input id="phone" placeholder="Tu número de teléfono" type="tel" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mensaje
              </label>
              <Textarea id="message" placeholder="¿Cómo podemos ayudarte?" className="min-h-[120px]" />
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button className="w-full" style={{ backgroundColor: '#d47983' }}>
                ¡Inicia tu transformación hoy!
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
