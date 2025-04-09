'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface CourseCardProps {
  title: string
  description: string
  buttonText?: string
  buttonColor?: string
}

export function CourseCard({
  title,
  description,
  buttonText = 'Más Información',
  buttonColor = '#d47983'
}: CourseCardProps) {
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
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-full">
          <p className="text-muted-foreground">{description}</p>
          <motion.div className="mt-4" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="w-full" style={{ backgroundColor: buttonColor }}>
              {buttonText}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
