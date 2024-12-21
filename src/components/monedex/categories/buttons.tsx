'use client'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { TiPencil } from 'react-icons/ti'

import { deleteCategory } from '@/lib/actions'

export function CreateCategory(): JSX.Element {
  return (
    <Link
      href='/monedex/categories/create'
      className='flex h-10 items-center rounded-lg bg-monedex-secondary px-4 text-sm font-medium text-white transition-colors hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-monedex-secondary'
    >
      <span className='hidden md:block'>Crear categoria</span>{' '}
      <FaPlus className='h-5 md:ml-4' />
    </Link>
  )
}

export function UpdateCategory({ id }: { id: number }): JSX.Element {
  return (
    <Link
      href={`/monedex/categories/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <TiPencil className='w-5' />
    </Link>
  )
}

export function DeleteCategory({ id }: { id: number }): JSX.Element {
  const deleteCategoryWithId = deleteCategory.bind(null, id)

  const initialState = { message: null, errors: null }
  const [state, dispatch] = useFormState(deleteCategoryWithId, initialState)

  return (
    <>
      <form action={dispatch}>
        <button className='rounded-md border p-2 hover:bg-gray-100'>
          <span className='sr-only'>Borrar</span>
          <FaRegTrashAlt className='w-4' />
        </button>
      </form>
      <div id='delete-error' aria-live='polite' aria-atomic='true'>
        {state.errors &&
          <p className='w-full mt-2 text-sm text-red-500'>
            {state.message}
          </p>
        }
      </div>
    </>
  )
}
