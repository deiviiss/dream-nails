'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCashStack } from 'react-icons/bs'
import { FaRegCreditCard } from 'react-icons/fa'
import { TbCategory, TbListDetails } from 'react-icons/tb'
import { z } from 'zod'
import { createUpdateCategory } from '@/actions/monedex/categories/create-update-category'
import { ButtonBack } from '@/components/monedex/button-back'
import { ButtonSaved } from '@/components/monedex/button-saved'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { type Category } from '@/interfaces/Category'

const noticeFailSaved = () => {
  toast.error('No se pudo guardar la categoría, intente nuevamente', {
    position: 'top-right',
    duration: 5000
  })
}

const noticeSuccessSaved = () => {
  toast.success('Categoría guardada correctamente', {
    position: 'top-right',
    duration: 2000
  })
}

const categorySchema = z.object({
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
    }),
  categoryType: z
    .enum(['expense', 'income'], {
      invalid_type_error: 'El tipo de categoría es requerido.',
      message: 'El tipo de categoría es requerido.'
    })
})

interface CategoryFormProps {
  category: Category | null
}

export const CategoryForm = ({ category }: CategoryFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: category?.id ? Number(category.id) : undefined,
    name: category?.name || '',
    description: category?.description || '',
    categoryType: category?.categoryType || '' as 'expense' | 'income'
  }

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: { ...defaultValuesForm }
  })

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    setIsSubmitting(true)

    const formData = new FormData()

    const { ...categoryToSave } = values

    if (categoryToSave.id) {
      formData.append('id', categoryToSave.id.toString())
    }
    formData.append('name', categoryToSave.name)
    formData.append('description', categoryToSave.description)
    formData.append('categoryType', categoryToSave.categoryType)

    const { ok } = await createUpdateCategory(formData)

    if (!ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    noticeSuccessSaved()

    router.push('/monedex/categories')
  }

  return (
    <Form {...form}>
      <Card className='w-full max-w-2xl mx-auto bg-monedex-background text-monedex-foreground text-sm'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className='text-monedex-primary'>{category?.id ? 'Editar categoría' : 'Crear categoría'}</CardTitle>
          </CardHeader>
          <CardContent>

            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre el nombre de la categoría
                  </FormLabel>
                  <FormControl>
                    <div className='relative mt-2 rounded-md'>
                      <Input
                        {...field}
                        value={field.value}
                        placeholder='Despensa'
                        className='pl-10 text-sm'
                        disabled={isSubmitting}
                      />
                      <TbCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

            {/* Category type */}
            <FormField
              control={form.control}
              name='categoryType'
              render={({ field }) => (
                <FormItem className="space-y-3 mt-3">
                  <FormLabel>Selecciona un tipo de categoría</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex rounded-md border border-gray-200 bg-monedex-light p-3 text-gray-600 justify-start space-x-4"
                      disabled={isSubmitting || !!category?.id}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="expense" />
                        </FormControl>
                        <FormLabel className="text-xs">
                          <div className='flex gap-x-1 rounded-md'>
                            Gastos
                            <BsCashStack className='h-4 w-4' />
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="income" />
                        </FormControl>
                        <FormLabel className="text-xs">
                          <div className='flex gap-x-1 rounded-md'>
                            Ingresos
                            <FaRegCreditCard className='h-4 w-4' />
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                    Escribe una descripción para la categoría
                  </FormLabel>
                  <FormControl>
                    <div className='relative mt-2 rounded-md'>
                      <Input
                        {...field}
                        className='pl-10 text-sm'
                        placeholder='Venta de abarrotes'
                        value={field.value}
                        disabled={isSubmitting}
                      />
                      <TbListDetails className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
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
                name={category?.id ? 'Editar categoría' : 'Crear categoría'}
              />

            </div >
          </CardFooter>
        </form >
      </Card >
    </Form>
  )
}
