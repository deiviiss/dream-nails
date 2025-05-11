'use client'

import { Search } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { DeleteThought, UpdateThought } from './thought-buttons'
import FilterMonth from '@/components/monedex/filter-month'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Thought } from '@/interfaces/thought.interface'

interface ThoughtProps {
  thoughts: Thought[]
}

const emotionColors = {
  Agradecido: 'bg-blue-500 hover:bg-blue-600',
  Asustado: 'bg-gray-600 hover:bg-gray-700',
  Cansado: 'bg-zinc-500 hover:bg-zinc-600',
  Competente: 'bg-cyan-600 hover:bg-cyan-700',
  Conocimiento: 'bg-sky-500 hover:bg-sky-600',
  Creativo: 'bg-pink-500 hover:bg-pink-600',
  Culpable: 'bg-rose-400 hover:bg-rose-500',
  Enojado: 'bg-red-500 hover:bg-red-600',
  Estresado: 'bg-emerald-500 hover:bg-emerald-600',
  Familia: 'bg-amber-500 hover:bg-amber-600',
  Feliz: 'bg-yellow-500 hover:bg-yellow-600',
  Inresponsable: 'bg-red-300 hover:bg-green-600',
  Insastisfecho: 'bg-orange-400 hover:bg-orange-500',
  Macizo: 'bg-lime-500 hover:bg-lime-600',
  Motivado: 'bg-indigo-500 hover:bg-indigo-600',
  Nervioso: 'bg-teal-500 hover:bg-teal-600',
  Orgulloso: 'bg-purple-500 hover:bg-purple-600',
  Otro: 'bg-gray-400 hover:bg-gray-500',
  Pensamiento: 'bg-neutral-500 hover:bg-neutral-600',
  Preocupado: 'bg-orange-500 hover:bg-orange-600',
  'Primera emoción': 'bg-slate-500 hover:bg-slate-600',
  Promesas: 'bg-fuchsia-500 hover:bg-fuchsia-600',
  Recuerdo: 'bg-cyan-400 hover:bg-cyan-500',
  Reflexión: 'bg-purple-500 hover:bg-purple-600',
  Risa: 'bg-green-400 hover:bg-green-500',
  Sueños: 'bg-indigo-400 hover:bg-indigo-500',
  Tranquilo: 'bg-green-600 hover:bg-green-700',
  Triste: 'bg-blue-400 hover:bg-blue-500'
}
const emotionNames = Object.keys(emotionColors)

export function ThoughtsView({ thoughts }: ThoughtProps) {
  if (!thoughts) {
    redirect('/')
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [emotionFilter, setEmotionFilter] = useState('all')

  const filteredThoughts = thoughts.filter((thought) => {
    const matchesSearch = thought.thought.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesEmotion = emotionFilter === 'all' || thought.emotion?.name === emotionFilter

    return matchesSearch && matchesEmotion
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Thoughts</h2>
          <p className="text-muted-foreground">Browse and analyze your recorded thoughts</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thoughts Filter</CardTitle>
          <CardDescription>Filter your thoughts by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className='grid  min-[440px]:grid-cols-[1fr,150px] gap-2'>
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search thoughts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value) }}
                />
              </div>
              <Select value={emotionFilter} onValueChange={setEmotionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by emotion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Emotions</SelectItem>
                  {
                    emotionNames.map((emotion) => (
                      <SelectItem key={emotion} value={emotion}>
                        {emotion}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <FilterMonth
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thoughts List</CardTitle>
          <CardDescription>{filteredThoughts.length} thoughts found</CardDescription>
        </CardHeader>
        <CardContent>

          {
            filteredThoughts.map((thought) => (
              <Card key={thought.id} className="mt-4">
                <CardHeader className="relative max-[380px]:pt-20 pt-16">
                  <h2 className="text-lg font-medium">{thought.thought}</h2>

                  <p className="absolute max-[380px]:top-12 top-4 left-6 text-sm text-gray-500">
                    {new Date(thought.createdAt).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>

                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <UpdateThought id={thought.id || 0} />
                    <DeleteThought id={thought.id || 0} />
                  </div>
                </CardHeader>

                <CardContent className="flex justify-between gap-2">
                  <p className="text-sm text-gray-500">
                    Emotion:
                    <span className='ml-2'>
                      <Badge className={emotionColors[thought.emotion?.name as keyof typeof emotionColors]}>
                        {thought.emotion?.name}
                      </Badge>
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))
          }
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
