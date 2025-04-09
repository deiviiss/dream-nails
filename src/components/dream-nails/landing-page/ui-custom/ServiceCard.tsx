'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface ServiceCardProps {
  title: string
  description: string
  items: string[]
  color: string
  buttonText?: string
}

export function ServiceCard({ title, description, items, color, buttonText = 'Agendar cita' }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle style={{ color }}>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-full">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }}></div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div className="mt-6" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="w-full" style={{ backgroundColor: color }}>
              {buttonText}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
