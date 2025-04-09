'use client'

import { motion } from 'framer-motion'

import { CourseCard } from './ui-custom/CourseCard'
import { SectionTitle } from './ui-custom/SectionTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function WorkshopsSection() {
  const handWorkshops = [
    {
      title: 'Maniobra Tradicional + Esmaltado en Gel',
      description: 'Aprende la técnica clásica de manicura combinada con el acabado duradero del esmaltado en gel.'
    },
    {
      title: 'Drill Manicura + Gel Semi + Rubber',
      description: 'Domina el uso del torno para manicura y combínalo con aplicaciones de gel semipermanente y rubber.'
    },
    {
      title: 'Mano Alzada + Líneas Perfectas',
      description:
        'Perfecciona tu técnica de dibujo a mano alzada y aprende a crear líneas precisas para diseños impecables.'
    },
    {
      title: 'Manejo de Drill y bits',
      description:
        'Aprende a utilizar correctamente el torno y sus diferentes fresas para trabajos precisos y seguros.'
    },
    {
      title: 'Diseños en Tendencia',
      description:
        'Mantente al día con las últimas tendencias en nail art y aprende a recrear los diseños más solicitados.'
    }
  ]

  const feetWorkshops = [
    {
      title: 'Pedicure Xpress + Esmaltado en Gel',
      description: 'Aprende a realizar pedicuras rápidas y efectivas con acabado de gel para mayor duración.'
    },
    {
      title: 'Acripie + Esmaltado en Gel',
      description: 'Domina la técnica de acrílico para pies combinada con esmaltado en gel para resultados duraderos.'
    },
    {
      title: 'Pedicure Spa con Drill + Esmaltado en Gel',
      description:
        'Aprende a ofrecer una experiencia completa de spa para pies utilizando torno y finalizando con gel.'
    }
  ]

  return (
    <section id="workshops" className="py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#f8f0f2' }}>
      <div className="container space-y-12 px-8 md:px-12 lg:px-16 mx-auto">
        <SectionTitle
          title="Workshops Prácticos"
          description="Sesiones intensivas para perfeccionar técnicas específicas"
          center
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="manos" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manos">Manos</TabsTrigger>
              <TabsTrigger value="pies">Pies</TabsTrigger>
            </TabsList>
            <TabsContent value="manos" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 gap-y-20">
                {handWorkshops.map((workshop, index) => (
                  <CourseCard
                    key={index}
                    title={workshop.title}
                    description={workshop.description}
                    buttonText="Reservar Plaza"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pies" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 gap-y-20">
                {feetWorkshops.map((workshop, index) => (
                  <CourseCard
                    key={index}
                    title={workshop.title}
                    description={workshop.description}
                    buttonText="Reservar Plaza"
                    buttonColor="#c68db6"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
