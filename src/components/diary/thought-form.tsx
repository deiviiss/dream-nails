'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaRegSmile } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { MdCalendarMonth, MdOutlineComment } from 'react-icons/md'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { createUpdateThought } from '@/actions/diary/thoughts/create-update-thought'
import { ButtonBack } from '@/components/monedex/button-back'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { type Thought, type Emotion } from '@/interfaces/thought.interface'
import { cn } from '@/lib/utils'

const thoughtSchema = z.object({
  id: z.number().optional().nullable(),
  thought: z
    .string({
      required_error: 'El pensamiento es requerido.'
    })
    .min(3, {
      message: 'El pensamiento debe tener al menos 3 caracteres.'
    })
    .max(500, {
      message: 'El pensamiento debe tener máximo 500 caracteres.'
    }),
  emotionId: z
    .number({
      required_error: 'La emoción es requerida.'
    })
    .int({
      message: 'La emoción debe ser un número entero.'
    })
    .min(1, {
      message: 'La emoción seleccionada no es válida.'
    }),
  createdAt: z
    .date({
      required_error: 'La fecha es requerida.'
    })
})

interface ThoughtFormProps {
  thought: Thought | null
  emotions: Emotion[]
}

// TODO: Move to a separate file
const noticeFailSaved = () => {
  toast.error('No se pudo guardar el pensamiento, intente nuevamente', {
    position: 'top-right',
    duration: 3000
  })
}

// TODO: Move to a separate file
const noticeSuccessSaved = () => {
  toast.success('Pensamiento guardado correctamente', {
    position: 'top-right',
    duration: 2000
  })
}

export const ThoughtForm = ({ thought, emotions }: ThoughtFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: thought?.id ? Number(thought.id) : undefined,
    thought: thought?.thought,
    emotionId: thought?.emotionId,
    createdAt: thought?.createdAt ? new Date(thought.createdAt) : new Date()
  }

  const form = useForm<z.infer<typeof thoughtSchema>>({
    resolver: zodResolver(thoughtSchema),
    defaultValues: { ...defaultValuesForm }
  })

  const onSubmit = async (values: z.infer<typeof thoughtSchema>) => {
    setIsSubmitting(false)

    const formData = new FormData()

    const { ...thoughtToSave } = values

    if (thoughtToSave.id) {
      formData.append('id', thoughtToSave.id.toString())
    }

    formData.append('thought', thoughtToSave.thought)
    formData.append('emotionId', thoughtToSave.emotionId.toString())
    formData.append('createdAt', thoughtToSave.createdAt.toISOString())

    const { ok } = await createUpdateThought(formData)

    if (!ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    noticeSuccessSaved()

    router.push('/diary')
  }

  return (
    <Form {...form}>
      <Card className='max-w-lg'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold'>{thought?.id ? 'Editar Pensamiento' : 'Crear Pensamiento'}</h2>
          </CardHeader>

          <CardContent className='grid gap-6'>
            {/* Thought */}
            <FormField
              control={form.control}
              name='thought'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido del pensamiento</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Textarea
                        className='pl-10 text-sm'
                        placeholder='Escribe aquí tu pensamiento'
                        {...field}
                        value={field.value ?? ''}
                        disabled={isSubmitting}
                      />
                      <MdOutlineComment className='pointer-events-none absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Emotion */}
            <FormField
              control={form.control}
              name='emotionId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecciona una emoción</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => { field.onChange(Number(value)) }}
                      defaultValue={field.value ? `${field.value}` : ''}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className='relative rounded-md'>
                        <FaRegSmile className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                        <SelectValue>
                          <div className='flex gap-x-1'>
                            <span className='pl-8'>
                              {emotions.find((emotion) => emotion.id === field.value)?.name ?? 'Selecciona una emoción'}
                            </span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='absolute z-10 w-full bg-white rounded-md border'>
                        <SelectGroup>
                          {emotions.map((emotion) => (
                            <SelectItem key={emotion.id} value={`${emotion.id}`}>
                              {emotion.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3">
                  <FormLabel>Indica la fecha del ingreso</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className='relative rounded-md'>
                          <MdCalendarMonth className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-10 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            type='button'
                            disabled={isSubmitting}
                          >
                            {field.value
                              ? (format(field.value, 'PPP'))
                              : (<span>Selecciona una fecha</span>)
                            }
                            <IoIosArrowDown className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>
          {/* Buttons */}
          <CardFooter className='mt-6 flex justify-end gap-4'>
            <ButtonBack
              isSubmitting={isSubmitting}
              variant='destructive'
              name='Cancelar'
              className='bg-red-500 hover:bg-red-600'
            />
            <Button
              type='submit'
              disabled={isSubmitting}
            >
              {thought?.id ? 'Editar Pensamiento' : 'Crear Pensamiento'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  )
}
