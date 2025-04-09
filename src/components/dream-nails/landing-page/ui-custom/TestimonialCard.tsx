'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  img: string
  rating?: number
}

export function TestimonialCard({ name, role, content, rating = 5, img }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white h-full">
        <CardContent className="pt-6 h-full flex flex-col">
          <div className="flex items-center gap-4">
            <div
              className='relative w-14 h-14 rounded-full overflow-hidden'
            >
              <Image
                src={img || '/placeholder.svg'}
                alt={`${name}'s profile`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 flex-grow">
            <div className="flex">
              {[...Array(rating)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#d47983"
                  stroke="#d47983"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 5.82 21l1.18-6.86-5-4.87 6.91-1.01z" />
                </svg>
              ))}
            </div>
            <p>{content}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
