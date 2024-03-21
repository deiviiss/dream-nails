'use client'
import clsx from 'clsx'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { IoCheckboxOutline } from 'react-icons/io5'
import { TiPencil } from 'react-icons/ti'
import { deleteExpense, toggleReconciledExpense } from '@/libs/actions'

export function CreateExpense(): JSX.Element {
  return (
    <Link
      href='/monedex/expenses/create'
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
      href={`/monedex/expenses/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <TiPencil className='w-5' />
    </Link>
  )
}

export function ReconciledExpense({ id, reconciled }: { id: number, reconciled: boolean }): JSX.Element {
  return (
    <button
      className={
        clsx(
          'rounded-md border p-2 hover:bg-gray-100',
          reconciled ? 'bg-green-300 hover:bg-green-200' : ''
        )
      }
      onClick={async () => { await toggleReconciledExpense(id, !reconciled) }}
    >
      <span className='sr-only'>Conciliar</span>
      <IoCheckboxOutline className='w-4' />
    </button>

  )
}

export function DeleteExpense({ id }: { id: number }): JSX.Element {
  const handleDelete = (expenseId: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toast((t) => (
      <div>
        <p className='text-white py-3'>¿Seguro que quieres borrar el gasto con id: <strong>{expenseId}</strong>?</p>

        <div className='flex items-center justify-between'>
          <button className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded-md mx-2"
            onClick={() => {
              deleteExpense(expenseId)
              toast.dismiss(t.id)
            }}
          >Borrar</button>

          <button className="bg-[#AB5C72] hover:opacity-70  text-white px-3 py-2 rounded-md mx-2"
            onClick={() => { toast.dismiss(t.id) }}
          >Cancelar</button>
        </div>
      </div>
    ), {
      style: {
        background: '#D18E8F'
      }
    })
  }

  return (
    <button onClick={handleDelete(id)} className='rounded-md border p-2 hover:bg-gray-100'>
      <span className='sr-only'>Borrar</span>
      <FaRegTrashAlt className='w-4' />
    </button>
  )
}
