'use client'

import { type Category } from '@prisma/client'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { FaDollarSign } from 'react-icons/fa'
import { MdOutlineLocalGroceryStore } from 'react-icons/md'

import { Button } from '@/components/dream-nails/button'
import { updateCategory } from '@/lib/actions'

export default function Form({
  category
}: {
  category: Category
}): JSX.Element {
  const updateCategoryWithId = updateCategory.bind(null, Number(category.id))
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateCategoryWithId, initialState)

  return (
    <form action={dispatch}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        {/* Name */}
        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block text-sm font-medium'>
            Escribe el nombre de la categoria
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='name'
                name='name'
                type='text'
                placeholder='Despensa'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='name-error'
                defaultValue={category.name}
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

        {/* Description */}
        <div className='mb-4'>
          <label htmlFor='description' className='mb-2 block text-sm font-medium'>
            Escribe una descrición para la categoria
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='description'
                name='description'
                type='text'
                placeholder='Gasto relacionado con la despensa del hogar'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='description-error'
                defaultValue={category.description ? category.description : ''}
              />
              <FaDollarSign className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='amount-error' aria-live='polite' aria-atomic='true'>
            {state?.errors?.description?.map((error: string) => (
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
          href='/monedex/categories'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancelar
        </Link>
        <Button type='submit'>Editar categoria</Button>
      </div>
    </form>
  )
}
