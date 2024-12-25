import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { CategoryForm } from '@/components/monedex/categories/category-form'
import {
  fetchCategoryById
} from '@/lib/data'

export default async function Page({
  params
}: {
  params: { id: number }
}): Promise<JSX.Element> {
  const id = Number(params.id)

  const category = await fetchCategoryById(id)

  if (category == null) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorías', href: '/monedex/categories' },
          {
            label: 'Editar Categoría',
            href: `/monedex/categories/${id}/edit`,
            active: true
          }
        ]}
      />
      <CategoryForm category={category} />
    </main>
  )
}
