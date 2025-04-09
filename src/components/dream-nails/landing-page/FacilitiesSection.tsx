'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionTitle } from './ui-custom/SectionTitle'

export function FacilitiesSection() {
  const facilities = [
    {
      image: '/facility-1.png',
      alt: 'Salón de Dream Nails',
      description: 'Espacio adaptable para formación y servicios'
    },
    {
      image: '/facility-2.png',
      alt: 'Área de práctica',
      description: 'Área de práctica con todos los materiales necesarios'
    },
    {
      image: '/facility-3.png',
      alt: 'Exhibidor de productos',
      description: 'Exhibidor con productos profesionales de alta calidad'
    }
  ]

  return (
    <section className="container py-12 md:py-24 lg:py-32 px-8 md:px-12 lg:px-16 mx-auto">
      <SectionTitle
        title="Nuestras Instalaciones"
        description="Espacios diseñados para potenciar tanto la formación como los servicios profesionales"
        center
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={facility.image || '/placeholder.svg'}
              alt={facility.alt}
              width={600}
              height={400}
              className="aspect-video object-cover transition-transform hover:scale-105"
            />
            <p className="mt-2 text-center font-medium">{facility.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
