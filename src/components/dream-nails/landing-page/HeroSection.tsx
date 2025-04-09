'use client'

import { motion } from 'framer-motion'
// import { ChevronRight } from 'lucide-react'
// import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#d47983] to-[#c68db6] opacity-90"
        style={{
          backgroundImage: "url('/hero-desktop.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      <div className="relative container flex flex-col items-center justify-center space-y-4 py-32 text-center text-white px-8 md:px-12 lg:px-16 mx-auto">
        <motion.h1
          className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Transforma tu belleza y carrera con atención personalizada
        </motion.h1>
        <motion.p
          className="max-w-[700px] text-lg sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Servicios profesionales y formación especializada en nail art
        </motion.p>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" className="mt-6 max-w-[400px] overflow-hidden" style={{ backgroundColor: '#020202', color: 'white' }}>
            Descubre nuestros servicios, cursos y workshops
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div> */}
      </div>
    </section>
  )
}
