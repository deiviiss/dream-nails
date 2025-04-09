'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from './ui-custom/SectionTitle'

export function WelcomeSection() {
  const valueItems = [
    {
      title: 'Formación de Excelencia:',
      description:
        'Nuestros cursos y workshops personalizados, en grupos reducidos, permiten dominar y perfeccionar técnicas en un entorno práctico y cercano.'
    },
    {
      title: 'Servicios Profesionales:',
      description:
        'Complementamos la formación con aplicaciones y tratamientos de uñas de alta calidad, respaldados por una atención individualizada y un enfoque en la innovación.'
    },
    {
      title: 'Sinergia Integral:',
      description:
        'La fusión de enseñanza y servicio crea un ecosistema en el que cada alumno y cliente se beneficia de un aprendizaje continuo y resultados excepcionales, destacando en cada detalle.'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="container py-12 md:py-24 lg:py-32 px-8 md:px-12 lg:px-16 mx-auto">
      <div className="mx-auto grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <SectionTitle
            title="Bienvenidos a Dream Nails"
            description="En Dream Nails transformamos el nail art y la estética ofreciendo una experiencia integral que une servicios de alta calidad y formación personalizada. A través de nuestras aplicaciones profesionales, cursos y workshops, brindamos atención cercana y práctica innovadora para que cada estudiante y cliente alcance la excelencia en el diseño y cuidado de uñas."
          />
        </div>
        <div className="space-y-4">
          <motion.h3
            className="text-xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nuestra Propuesta de Valor
          </motion.h3>
          <motion.ul
            className="space-y-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {valueItems.map((item, index) => (
              <motion.li key={index} className="flex items-start gap-2" variants={itemAnimation}>
                <div className="rounded-full p-1" style={{ backgroundColor: '#d47983' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-white"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">{item.title}</span> {item.description}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
