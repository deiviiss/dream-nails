'use client'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { TiPencil } from 'react-icons/ti'
import { deleteThoughtById } from '@/actions/diary/thoughts/delete-thought-by-id'
import { Button } from '@/components/ui/button'

export function CreateThought(): JSX.Element | null {
  return (
    <Button
      asChild
      className='rounded-lg bg-monedex-tertiary px-4 text-sm font-medium text-monedex-light transition-colors border border-monedex-tertiary hover:bg-monedex-secondary hover:border-monedex-light'
    >
      <Link
        href='/diary/create'
        className='flex h-10 items-center'
      >
        <span className='hidden md:block'>Crear pensamiento</span>{' '}
        <FaPlus className='h-5 md:ml-4' />
      </Link>
    </Button>
  )
}

export function UpdateThought({ id }: { id: number }): JSX.Element {
  return (
    <Link
      href={`/diary/${id}`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <TiPencil className='w-5' />
    </Link>
  )
}

export function DeleteThought({ id }: { id: number }): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = (incomeId: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toast((t) => (
      <div>
        <p className='py-3'>¿Seguro que quieres borrar el pensamiento con id <strong>{incomeId}</strong>?</p>

        <div className='flex items-center justify-end'>
          <Button className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded-md mx-2"
            onClick={async () => {
              setIsSubmitting(true)
              const { ok } = await deleteThoughtById(incomeId)

              if (!ok) {
                toast.error('No se puede borrar, contacte a soporte.', {
                  position: 'top-right',
                  duration: 2000
                })

                toast.dismiss(t.id)

                setIsSubmitting(false)

                return
              }

              setIsSubmitting(false)

              toast.success('Thought remove success', {
                position: 'top-right',
                duration: 2000
              })

              toast.dismiss(t.id)
            }}
          >Borrar</Button>

          <Button
            className="bg-monedex-primary hover:bg-monedex-primary/90  text-monedex-light px-3 py-2 rounded-md mx-2"
            onClick={() => { toast.dismiss(t.id) }}
          >Cancelar</Button>
        </div>
      </div>
    )
    )
  }

  return (
    <button
      onClick={handleDelete(id)}
      disabled={isSubmitting}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <span className='sr-only'>Borrar</span>
      <FaRegTrashAlt className='w-4' />
    </button>
  )
}
