'use client'

import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { TiPencil } from 'react-icons/ti'
import { deleteCategoryById } from '@/actions/monedex/categories/delete-category-by-id'
import { Button } from '@/components/ui/button'

export function CreateCategory(): JSX.Element {
  return (
    <Button
      asChild
      className='rounded-lg bg-monedex-tertiary px-4 text-sm font-medium text-monedex-light transition-colors border border-monedex-tertiary hover:bg-monedex-secondary hover:border-monedex-light'
    >
      <Link
        href='/monedex/categories/create'
        className='flex h-10 items-center'
      >
        <span className='hidden md:block'>Crear categoría</span>{' '}
        <FaPlus className='h-5 md:ml-4' />
      </Link>
    </Button>
  )
}

export function UpdateCategory({ id }: { id: number }): JSX.Element {
  return (
    <Button
      asChild
      size={'icon'}
      variant={'outline'}
      className='bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2 transition-colors'
    >
      <Link
        href={`/monedex/categories/${id}`}
      >
        <TiPencil className='w-5' />
      </Link>
    </Button>
  )
}

export function DeleteCategory({ id }: { id: number }): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = (categoryId: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toast((t) => (
      <div>
        <p className='py-3'>¿Seguro que quieres borrar la categoría con id <strong>{categoryId}</strong>?</p>

        <div className='flex items-center justify-end'>
          <Button className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded-md mx-2"
            onClick={async () => {
              setIsSubmitting(true)
              const { ok } = await deleteCategoryById(categoryId)

              if (!ok) {
                toast.error('No se puede borrar, categoría con gastos asociados.', {
                  position: 'top-right',
                  duration: 2000
                })

                toast.dismiss(t.id)

                setIsSubmitting(false)

                return
              }

              setIsSubmitting(false)

              toast.success('Categoría borrada correctamente', {
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
