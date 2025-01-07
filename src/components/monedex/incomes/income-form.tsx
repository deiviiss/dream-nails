'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCashStack } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { FaRegCreditCard } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { z } from 'zod'
import { createUpdateIncome } from '@/actions/monedex/incomes/create-update-income'
import { ButtonBack } from '@/components/monedex/button-back'
import { ButtonSaved } from '@/components/monedex/button-saved'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Income, type IncomeCategory } from '@/interfaces/income.interface'
import { cn } from '@/lib/utils'

const incomeSchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string({
      required_error: 'El nombre es requerido.'
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres.'
    })
    .max(100, {
      message: 'El nombre debe tener máximo 100 caracteres.'
    }),
  amount: z
    .coerce.number({
      required_error: 'La cantidad es requerida.',
      invalid_type_error: 'La cantidad es requerida.'
    }).gt(0, {
      message: 'Por favor ingrese una cantidad mayor que $0.'
    }),
  method: z
    .enum(['cash', 'debit'], {
      required_error: 'El método de ingreso es requerido.'
    }),
  incomeDate: z
    .date({
      required_error: 'La fecha del ingreso es requerida',
      invalid_type_error: 'Por favor ingresa una fecha valida.'
    }),
  incomeCategoryId: z
    .number({
      required_error: 'La categoría del ingreso es requerida.'
    })
    .int({
      message: 'La categoría del ingreso debe ser un número entero.'
    })
    .min(1, {
      message: 'La categoría del ingreso debe ser mayor o igual a 1.'
    })
})

interface IncomeFormProps {
  income: Income | null
  categories: IncomeCategory[]
}

// TODO move to a toast component
const noticeFailSaved = () => {
  toast.error('No se pudo guardar el ingreso, intente nuevamente', {
    position: 'top-right',
    duration: 3000
  })
}

const noticeSuccessSaved = () => {
  toast.success('Ingreso guardado correctamente', {
    position: 'top-right',
    duration: 2000
  })
}

export const IncomeForm = ({ income, categories }: IncomeFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: income?.id ? Number(income.id) : undefined,
    name: income?.name,
    amount: income?.amount,
    method: income?.method as 'cash' | 'debit',
    incomeDate: income?.incomeDate ? new Date(income.incomeDate) : undefined,
    incomeCategoryId: income?.incomeCategory.id
  }

  const form = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
    defaultValues: { ...defaultValuesForm }
  })

  const onSubmit = async (values: z.infer<typeof incomeSchema>) => {
    setIsSubmitting(true)

    const formData = new FormData()

    const { ...incomeToSave } = values

    if (incomeToSave.id) {
      formData.append('id', incomeToSave.id.toString())
    }

    formData.append('name', incomeToSave.name)
    formData.append('amount', incomeToSave.amount.toString())
    formData.append('method', incomeToSave.method)
    formData.append('incomeDate', incomeToSave.incomeDate.toISOString())
    formData.append('incomeCategoryId', incomeToSave.incomeCategoryId.toString())

    const { ok } = await createUpdateIncome(formData)

    if (!ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    noticeSuccessSaved()

    router.push('/monedex/incomes')
  }

  return (
    <Form {...form}>
      <Card className='w-full max-w-2xl mx-auto bg-monedex-background text-monedex-foreground text-sm'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className='text-monedex-primary'>{income?.id ? 'Editar ingreso' : 'Crear ingreso'}</CardTitle>
          </CardHeader>
          <CardContent>

            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre del ingreso
                  </FormLabel>
                  <FormControl>
                    <div className='relative rounded-md'>
                      <Input
                        className='pl-10 text-sm bg-monedex-light'
                        placeholder='Nómina' {...field}
                        value={field.value}
                        disabled={isSubmitting}
                      />
                      <MdOutlineLocalGroceryStore className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel>
                    Cantidad
                  </FormLabel>
                  <FormControl>
                    <div className='relative rounded-md'>
                      <Input
                        className='pl-10 text-sm bg-monedex-light'
                        placeholder='Ingresa la cantidad'
                        step='0.01'
                        {...field}
                        value={field.value}
                        type='number'
                        disabled={isSubmitting}
                      />
                      <FaDollarSign className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Method */}
            <FormField
              control={form.control}
              name='method'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel >
                    Selecciona un método de ingreso
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                      className="flex rounded-md border border-gray-200 bg-monedex-light p-3 text-gray-600 justify-start space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="text-xs">
                          <div className='flex gap-x-1 rounded-md'>
                            Efectivo
                            <BsCashStack className='h-4 w-4' />
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="debit" />
                        </FormControl>
                        <FormLabel className="text-xs">
                          <div className='flex gap-x-1 rounded-md'>
                            Transferencia
                            <FaRegCreditCard className='h-4 w-4' />
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name='incomeCategoryId'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel>
                    Selecciona una categoría
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value))
                      }}
                      defaultValue={`${field.value}`}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className='relative rounded-md border border-gray-200 bg-monedex-light p-3 text-gray-600'>
                        <SelectValue>
                          <div className='flex gap-x-1 rounded-md'>
                            <TbCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                            <span className='pl-8'>
                              {categories.find((category) => category.id === field.value)?.name ?? 'Selecciona una categoría'}
                            </span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='absolute z-10 w-full min-w-max bg-white rounded-md border border-gray-200 shadow-lg'>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              className='capitalize'
                              value={`${category.id}`}
                            >
                              {category.name}
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
              name="incomeDate"
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
          <CardFooter>
            {/* buttons */}
            <div className='mt-6 flex w-full justify-end gap-4' >
              <ButtonBack isSubmitting={isSubmitting} variant='destructive' name='Cancelar' className='text-monedex-light' />
              <ButtonSaved
                className='text-monedex-light bg-monedex-tertiary hover:bg-monedex-tertiary/90'
                isSubmitting={isSubmitting}
                name={income?.id ? 'Editar ingreso' : 'Crear ingreso'}
              />
            </div >
          </CardFooter>
        </form >
      </Card >
    </Form >
  )
}
