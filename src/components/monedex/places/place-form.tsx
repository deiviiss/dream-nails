'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiCategory, BiLocationPlus } from 'react-icons/bi'
import { z } from 'zod'
import { createUpdatePlace } from '@/actions/monedex/places/create-update-place'
import { ButtonBack } from '@/components/monedex/button-back'
import { ButtonSaved } from '@/components/monedex/button-saved'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type Place } from '@/interfaces/Place'

// TODO move to a toast component
const noticeFailSaved = () => {
  toast.error('No se pudo guardar el lugar, intente nuevamente', {
    position: 'top-right',
    duration: 3000
  })
}

const noticeSuccessSaved = () => {
  toast.success('Lugar guardado correctamente', {
    position: 'top-right',
    duration: 2000
  })
}

const placeSchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string({
      required_error: 'El nombre es requerido.',
      message: 'El nombre es requerido.'
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres.'
    })
    .max(100, {
      message: 'El nombre debe tener máximo 100 caracteres.'
    }),
  description: z
    .string({
      required_error: 'La descripción es requerida.',
      message: 'La descripción es requerida.'
    })
    .min(3, {
      message: 'La descripción debe tener al menos 3 caracteres.'
    })
    .max(50, {
      message: 'La descripción debe tener máximo 50 caracteres.'
    })
})

interface PlaceFormProps {
  place: Place | null
}

export const PlaceForm = ({ place }: PlaceFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: place?.id ? Number(place.id) : undefined,
    name: place?.name || '',
    description: place?.description || ''
  }

  const form = useForm<z.infer<typeof placeSchema>>({
    resolver: zodResolver(placeSchema),
    defaultValues: { ...defaultValuesForm }
  })

  const onSubmit = async (values: z.infer<typeof placeSchema>) => {
    setIsSubmitting(true)

    const formData = new FormData()

    const { ...placeToSave } = values

    if (placeToSave.id) {
      formData.append('id', placeToSave.id.toString())
    }
    formData.append('name', placeToSave.name)
    formData.append('description', placeToSave.description)

    const { ok } = await createUpdatePlace(formData)

    if (!ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    noticeSuccessSaved()

    router.push('/monedex/places')
  }

  return (
    <Form {...form}>

      <Card className='w-full max-w-2xl mx-auto bg-monedex-background text-monedex-foreground text-sm'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className='text-monedex-primary'>{place?.id ? 'Editar lugar' : 'Editar lugar'}</CardTitle>
          </CardHeader>
          <CardContent>

            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre del lugar
                  </FormLabel>
                  <FormControl>
                    <div className='relative mt-2 rounded-md'>
                      <Input
                        className='pl-10 text-sm'
                        placeholder='Super willys'
                        {...field}
                        value={field.value}
                        disabled={isSubmitting}
                      />
                      <BiLocationPlus className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel>
                    Descripción
                  </FormLabel>
                  <FormControl>
                    <div className='relative mt-2 rounded-md'>
                      <Input
                        className='pl-10 text-sm'
                        placeholder='Venta de abarrotes'
                        {...field}
                        value={field.value}
                        disabled={isSubmitting}
                      />
                      <BiCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

          </CardContent>
          <CardFooter>
            {/* buttons */}
            <div className='mt-6 flex w-full justify-end text-left gap-4' >
              <ButtonBack isSubmitting={isSubmitting} variant='destructive' name='Cancelar' className='text-monedex-light' />

              <ButtonSaved
                className='text-monedex-light bg-monedex-tertiary hover:bg-monedex-tertiary/90'
                isSubmitting={isSubmitting}
                name={place?.id ? 'Editar lugar' : 'Crear lugar'}
              />
            </div>
          </CardFooter>
        </form >
      </Card >
    </Form>
  )
}
