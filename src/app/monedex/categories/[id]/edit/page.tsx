import { notFound } from 'next/navigation'
import Breadcrumbs from '@/app/ui/monedex/breadcrumbs'
import Form from '@/app/ui/monedex/categories/edit-form'
import {
  fetchCategoryById
} from '@/libs/data'

export default async function Page({
  params
}: {
  params: { id: number }
}): Promise<JSX.Element> {
  const id = Number(params.id)

  const [category] = await Promise.all([
    fetchCategoryById(id)
  ])

  if (category == null) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorias', href: '/monedex/categories' },
          {
            label: 'Editar Categoria',
            href: `/monedex/categories/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form category={category} />
    </main>
  )
}
