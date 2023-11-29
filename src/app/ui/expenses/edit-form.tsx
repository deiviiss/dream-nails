'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import { BsCashStack } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { FaRegCreditCard } from 'react-icons/fa6'
import { IoStorefrontOutline } from 'react-icons/io5'
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { Button } from '@/app/ui/button'
import { type CategoryForm } from '@/interfaces/Category'
import { type ExpenseForm } from '@/interfaces/Expenses'
import { type PlaceForm } from '@/interfaces/Place'
import { updateExpense } from '@/libs/actions'

export default function EditExpenseForm({
  expense,
  categories,
  places
}: {
  expense: ExpenseForm
  categories: CategoryForm[]
  places: PlaceForm[]
}): JSX.Element {
  const updateExpenseWithId = updateExpense.bind(null, Number(expense.id))
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateExpenseWithId, initialState)
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
              <p className='mt-2 text-sm text-red-500' key={error}>
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
                type='number'
                step='0.01'
                placeholder='Ingresa la cantidad'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='amount-error'
                defaultValue={expense.amount}
              />
              <FaDollarSign className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='amount-error' aria-live='polite' aria-atomic='true'>
            {state?.errors?.amount?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
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
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id='credit'
                  name='method'
                  type='radio'
                  value='credit'
                  aria-describedby='method-error'
                  defaultChecked={expense.method === 'credit'}
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600'
                />
                <label
                  htmlFor='credit'
                  className='ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300'
                >
                  Crédito <FaRegCreditCard className='h-4 w-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='cash'
                  name='method'
                  type='radio'
                  value='cash'
                  aria-describedby='method-error'
                  defaultChecked={expense.method === 'cash'}
                  className='h-4 w-4 border-gray-300 bg-red-300 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600'
                />
                <label
                  htmlFor='cash'
                  className='ml-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300'
                >
                  Efectivo <BsCashStack className='h-4 w-4' />
                </label>
              </div>
            </div>
          </div>
          <div id='method-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.method?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        {/* Category */}
        <div className='mb-4'>
          <label htmlFor='category' className='mb-2 block text-sm font-medium'>
            Elige una categoria
          </label>
          <div className='relative'>
            <select
              id='category'
              name='categoryId'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='category-error'
              defaultValue={expense.category_id}
            >
              <option value='' disabled>
                Selecciona una categoria
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
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Place */}
        <div className='mb-4'>
          <label htmlFor='place' className='mb-2 block text-sm font-medium'>
            Elige un lugar
          </label>
          <div className='relative'>
            <select
              id='place'
              name='placeId'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              defaultValue={expense.place_id}
              aria-describedby='place-error'
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
            <IoStorefrontOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='place-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.placeId?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
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
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/*  Error all fields */}
        <div id='message-error' aria-live='polite' aria-atomic='true'>
          {state.message && (
            <p className='mt-2 text-sm text-red-500'>{state.message}</p>
          )}
        </div>
      </div>

      {/* buttons */}
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/expenses'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancelar
        </Link>
        <Button type='submit'>Editar gasto</Button>
      </div>
    </form>
  )
}
