'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { IoCheckboxOutline } from 'react-icons/io5'
import { TiPencil } from 'react-icons/ti'
import { Button } from '@/components/ui/button'
import { deleteExpense, toggleReconciledExpense } from '@/lib/actions'

export function CreateExpense(): JSX.Element | null {
  return (
    <Button
      asChild
      className='rounded-lg bg-monedex-tertiary px-4 text-sm font-medium text-monedex-light transition-colors border border-monedex-tertiary hover:bg-monedex-secondary hover:border-monedex-light'
    >
      <Link
        href='/monedex/expenses/create'
        className='flex h-10 items-center'
      >
        <span className='hidden md:block'>Crear gasto</span>{' '}
        <FaPlus className='h-5 md:ml-4' />
      </Link>
    </Button>
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = (expenseId: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toast((t) => (
      <div>
        <p className='py-3'>¿Seguro que quieres borrar el gasto con id: <strong>{expenseId}</strong>?</p>

        <div className='flex items-center justify-between'>
          <button className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded-md mx-2"
            onClick={async () => {
              setIsSubmitting(true)
              await deleteExpense(expenseId)
              setIsSubmitting(false)

              toast.success('Ingreso borrado correctamente', {
                position: 'top-right',
                duration: 2000
              })
              toast.dismiss(t.id)
            }}
          >Borrar</button>

          <button className="bg-monedex-primary hover:bg-monedex-primary/90  text-monedex-light px-3 py-2 rounded-md mx-2"
            onClick={() => { toast.dismiss(t.id) }}
          >Cancelar</button>
        </div>
      </div>
    ))
  }

  return (
    <button
      onClick={handleDelete(id)}
      disabled={isSubmitting}
      className='rounded-md border p-2 hover:bg-gray-100'>
      <span className='sr-only'>Borrar</span>
      <FaRegTrashAlt className='w-4' />
    </button>
  )
}
