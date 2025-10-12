'use client'

import { evaluate } from 'mathjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { BsCashStack } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { FaRegCreditCard } from 'react-icons/fa6'
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { ButtonBack } from '@/components/monedex/button-back'
import { ButtonSaved } from '@/components/monedex/button-saved'
import { type Category } from '@/interfaces/Category'
import { type ExpenseForm } from '@/interfaces/Expense'
import { updateExpense } from '@/lib/actions'

export default function EditExpenseForm({
  expense,
  categories,
  places
}: {
  expense: ExpenseForm
  categories: Category[]
  places: Array<{ id: number, name: string }>
}): JSX.Element {
  const router = useRouter()
  const updateExpenseWithId = updateExpense.bind(null, Number(expense.id))
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateExpenseWithId, initialState)

  const [amountValue, setAmountValue] = useState(expense.amount.toString())
  const [amountError, setAmountError] = useState<string | null>(null)

  useEffect(() => {
    if (state.message === 'Updated expense') {
      router.back()
    }
  }, [state])

  const evaluateExpression = (expression: string) => {
    if (!expression.trim()) {
      setAmountError(null)
      return
    }

    try {
      const result = evaluate(expression)

      if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
        setAmountError('Expresión inválida')
        return
      }

      const formattedResult = Number(result).toFixed(2)
      setAmountValue(formattedResult)
      setAmountError(null)
    } catch (error) {
      setAmountError('Expresión matemática incorrecta')
    }
  }

  const handleAmountBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    evaluateExpression(e.target.value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(e.target.value)
    setAmountError(null)
  }

  return (
    <form action={dispatch}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        {/* Name */}
        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block text-sm font-medium'>
            Escribe el nombre del gasto
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='name'
                name='name'
                type='text'
                placeholder='Ingresa el gasto'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='name-error'
                defaultValue={expense.name}
              />
              <MdOutlineLocalGroceryStore className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='name-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.name?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`name:${error}`}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className='mb-4'>
          <label htmlFor='amount' className='mb-2 block text-sm font-medium'>
            Elige una cantidad
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='amount'
                name='amount'
                type='text'
                placeholder='Ingresa la cantidad o expresión (ej: 23+2/5)'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='amount-error'
                value={amountValue}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
              />
              <FaDollarSign className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='amount-error' aria-live='polite' aria-atomic='true'>
            {amountError && <p className="mt-2 text-sm text-red-500">{amountError}</p>}
            {state?.errors?.amount?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`amount:${error}`}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Method */}
        <fieldset className='mb-4'>
          <legend className='mb-2 block text-sm font-medium'>
            Selecciona un método de pago
          </legend>
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <div className='flex items-center'>
                <input
                  id='cash'
                  name='method'
                  type='radio'
                  value='cash'
                  aria-describedby='method-error'
                  defaultChecked={expense.method === 'cash'}
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600' />
                <label
                  htmlFor='cash'
                  className='flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300'
                >
                  Efectivo <BsCashStack className='h-4 w-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='debit'
                  name='method'
                  type='radio'
                  value='debit'
                  aria-describedby='method-error'
                  defaultChecked={expense.method === 'debit'}
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600' />
                <label
                  htmlFor='debit'
                  className='flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300'
                >
                  Débito <FaRegCreditCard className='h-4 w-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='credit'
                  name='method'
                  type='radio'
                  value='credit'
                  disabled
                  aria-describedby='method-error'
                  defaultChecked={expense.method === 'credit'}
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600' />
                <label
                  htmlFor='credit'
                  className='flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300'
                >
                  Crédito <FaRegCreditCard className='h-4 w-4' />
                </label>
              </div>
            </div>
          </div>
          <div id='method-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.method?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`method:${error}`}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        {/* Category */}
        <div className='mb-4'>
          <label htmlFor='category' className='mb-2 block text-sm font-medium'>
            Elige una categoría
          </label>
          <div className='relative'>
            <select
              id='category'
              name='categoryId'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='category-error'
              defaultValue={expense.expense_category_id}
            >
              <option value='' disabled>
                Selecciona una categoría
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <TbCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='category-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.categoryId?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`category:${error}`}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* place */}
        <div className='mb-4'>
          <label htmlFor='place' className='mb-2 block text-sm font-medium'>
            Elige un lugar
          </label>
          <div className='relative'>
            <select
              id='place'
              name='placeId'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='place-error'
              defaultValue={expense.place_id}
            >
              <option value='' disabled>
                Selecciona un lugar
              </option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
            <TbCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='place-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.placeId?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`place:${error}`}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Expense day */}
        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block text-sm font-medium'>
            Indica la fecha del gasto
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='expenseDate'
                name='expenseDate'
                type='date'
                placeholder='Ingresa la fecha'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='expenseDate-error'
                defaultValue={expense.expense_date.toISOString().split('T')[0]}
              />
              <MdCalendarMonth className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='expenseDate-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.expenseDate?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`expenseDate:${error}`}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* with relation */}
        <div className='mb-4'>
          <div className='flex items-center gap-2'>
            <label htmlFor='withRelation' className='block text-sm font-medium'>
              Con relación:
            </label>
            <input
              id='withRelation'
              name='withRelation'
              type='checkbox'
              placeholder='Sí o No'
              aria-describedby='withRelation-error'
              defaultChecked={expense.is_reconciled}
            />

          </div>

        </div>

        {/*  Error all fields */}
        <div id='message-error' aria-live='polite' aria-atomic='true'>
          {state.message !== 'Updated expense' && (
            <p className='mt-2 text-sm text-red-500'>{state.message}</p>
          )}
        </div>
      </div>

      {/* buttons */}
      <div className='mt-6 flex w-full justify-end gap-4' >
        <ButtonBack variant='destructive' name='Cancelar' className='text-monedex-light' />
        <ButtonSaved
          className='text-monedex-light bg-monedex-tertiary hover:bg-monedex-tertiary/90'
          name={expense?.id ? 'Editar gasto' : 'Crear gasto'}
        />
      </div >
    </form>
  )
}
