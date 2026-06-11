'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { evaluate } from 'mathjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaDollarSign } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { z } from 'zod'
import { createUpdateIncome } from '@/actions/monedex/incomes/create-update-income'
import { ButtonBack } from '@/components/monedex/button-back'
import { ButtonSaved } from '@/components/monedex/button-saved'
import { Button } from '@/components/ui/button'
import { Calculator } from '@/components/ui/calculator'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Income, type IncomeCategory } from '@/interfaces/income.interface'
import { type WalletOption } from '@/interfaces/wallet.interface'
import { cn } from '@/lib/utils'

const incomeSchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    .max(100, { message: 'El nombre debe tener máximo 100 caracteres.' }),
  amount: z
    .coerce.number({
      required_error: 'La cantidad es requerida.',
      invalid_type_error: 'La cantidad es requerida.'
    }).gt(0, { message: 'Por favor ingrese una cantidad mayor que $0.' }),
  // walletId replaces the old hardcoded method (cash/debit) enum
  walletId: z
    .number({
      required_error: 'La cartera es requerida.',
      invalid_type_error: 'Selecciona una cartera válida.'
    })
    .int()
    .min(1, { message: 'Selecciona una cartera.' }),
  incomeDate: z
    .date({
      required_error: 'La fecha del ingreso es requerida',
      invalid_type_error: 'Por favor ingresa una fecha valida.'
    }),
  incomeCategoryId: z
    .number({ required_error: 'La categoría del ingreso es requerida.' })
    .int({ message: 'La categoría del ingreso debe ser un número entero.' })
    .min(1, { message: 'La categoría del ingreso debe ser mayor o igual a 1.' })
})

interface IncomeFormProps {
  income: Income | null
  categories: IncomeCategory[]
  wallets: WalletOption[]
}

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

export const IncomeForm = ({ income, categories, wallets }: IncomeFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalculatorAmountOpen, setIsCalculatorAmountOpen] = useState(false)

  // Resolve the wallet that was previously linked to this income (for edit mode)
  const initialWalletId = income?.wallet_id ? Number(income.wallet_id) : undefined

  const defaultValuesForm = {
    id: income?.id ? Number(income.id) : undefined,
    name: income?.name,
    amount: income?.amount,
    walletId: initialWalletId,
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

    if (values.id) {
      formData.append('id', values.id.toString())
    }

    formData.append('name', values.name)
    formData.append('amount', values.amount.toString())
    formData.append('walletId', values.walletId.toString())
    formData.append('incomeDate', values.incomeDate.toISOString())
    formData.append('incomeCategoryId', values.incomeCategoryId.toString())

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
                  <FormLabel>Nombre del ingreso</FormLabel>
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
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <div className='relative rounded-md'>
                      {/* Mobile input: readOnly, opens calculator */}
                      <Input
                        className='pl-10 text-sm bg-monedex-light cursor-pointer block md:hidden'
                        placeholder='Ingresa la cantidad'
                        value={field.value ?? ''}
                        type='text'
                        readOnly
                        disabled={isSubmitting}
                        onClick={() => { setIsCalculatorAmountOpen(true) }}
                      />
                      {/* Desktop input: editable, supports expressions */}
                      <Input
                        className='pl-10 text-sm bg-monedex-light hidden md:block'
                        placeholder='Ingresa la cantidad (ej: 100+50)'
                        value={field.value ?? ''}
                        type='text'
                        disabled={isSubmitting}
                        onChange={(e) => {
                          const val = e.target.value
                          if (val === '' || /^[\d+\-*/.() ]*$/.test(val)) {
                            form.setValue('amount', val === '' ? 0 : Number(val) || (val as unknown as number))
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            try {
                              const result = evaluate(e.currentTarget.value)
                              if (typeof result === 'number' && isFinite(result)) {
                                form.setValue('amount', Number(result.toFixed(2)))
                                form.trigger('amount')
                              }
                            } catch { /* ignore */ }
                          }
                        }}
                        onBlur={(e) => {
                          try {
                            const result = evaluate(e.currentTarget.value)
                            if (typeof result === 'number' && isFinite(result)) {
                              form.setValue('amount', Number(result.toFixed(2)))
                              form.trigger('amount')
                            }
                          } catch { /* ignore */ }
                        }}
                      />
                      <FaDollarSign className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 z-10' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Calculator bottom sheet - mobile only */}
            {isCalculatorAmountOpen && (
              <>
                <div
                  className='fixed inset-0 bg-black/30 z-40 md:hidden'
                  onClick={() => { setIsCalculatorAmountOpen(false) }}
                />
                <div className='fixed bottom-0 inset-x-0 h-[50vh] z-50 md:hidden'>
                  <Calculator
                    initialValue={form.getValues('amount')?.toString() ?? ''}
                    onClose={() => { setIsCalculatorAmountOpen(false) }}
                    onResult={(val) => {
                      form.setValue('amount', val)
                      form.trigger('amount')
                      setIsCalculatorAmountOpen(false)
                    }}
                  />
                </div>
              </>
            )}

            {/* Wallet selector — replaces hardcoded cash/debit radio buttons */}
            <FormField
              control={form.control}
              name='walletId'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel>Selecciona una cartera</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => { field.onChange(Number(value)) }}
                      defaultValue={field.value ? `${field.value}` : undefined}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className='relative rounded-md border border-gray-200 bg-monedex-light p-3 text-gray-600'>
                        <SelectValue>
                          <div className='flex gap-x-1 rounded-md'>
                            <IoWalletOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                            <span className='pl-8'>
                              {wallets.find(w => w.id === field.value)?.name ?? 'Selecciona una cartera'}
                            </span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='absolute z-10 w-full min-w-max bg-white rounded-md border border-gray-200 shadow-lg'>
                        <SelectGroup>
                          {wallets.map((wallet) => (
                            <SelectItem
                              key={wallet.id}
                              value={`${wallet.id}`}
                            >
                              {wallet.name}
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

            {/* Category */}
            <FormField
              control={form.control}
              name='incomeCategoryId'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel>Selecciona una categoría</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => { field.onChange(Number(value)) }}
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

            {/* Income date */}
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
            {/* Action buttons */}
            <div className='mt-6 flex w-full justify-end gap-4'>
              <ButtonBack isSubmitting={isSubmitting} variant='destructive' name='Cancelar' className='text-monedex-light' />
              <ButtonSaved
                className='text-monedex-light bg-monedex-tertiary hover:bg-monedex-tertiary/90'
                isSubmitting={isSubmitting}
                name={income?.id ? 'Editar ingreso' : 'Crear ingreso'}
              />
            </div>
          </CardFooter>
        </form>
      </Card>
    </Form>
  )
}
