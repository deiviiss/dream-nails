'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  description?: string
  center?: boolean
}

export function SectionTitle({ title, description, center = false }: SectionTitleProps) {
  return (
    <div className={`space-y-4 ${center ? 'text-center' : ''}`}>
      <motion.h2
        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`${center ? 'mx-auto' : ''} max-w-[700px] text-muted-foreground md:text-xl`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
