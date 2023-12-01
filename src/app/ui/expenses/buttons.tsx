import Link from 'next/link'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { TiPencil } from 'react-icons/ti'

import { deleteExpense } from '@/libs/actions'
// import { deleteInvoice } from '@/app/lib/actions'

export function CreateExpense(): JSX.Element {
  return (
    <Link
      href='/expenses/create'
      className='flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    >
      <span className='hidden md:block'>Crear gasto</span>{' '}
      <FaPlus className='h-5 md:ml-4' />
    </Link>
  )
}

export function UpdateExpense({ id }: { id: number }): JSX.Element {
  return (
    <Link
      href={`/expenses/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <TiPencil className='w-5' />
    </Link>
  )
}

export function DeleteExpense({ id }: { id: number }): JSX.Element {
  const deleteExpenseWithId = deleteExpense.bind(null, id)
  return (
    <form action={deleteExpenseWithId}>
      <button className='rounded-md border p-2 hover:bg-gray-100'>
        <span className='sr-only'>Borrar</span>
        <FaRegTrashAlt className='w-4' />
      </button>
    </form>
  )
}
