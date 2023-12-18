import { type NextPage } from 'next'

import Breadcrumbs from '@/app/ui/monedex/breadcrumbs'
import Form from '@/app/ui/monedex/categories/create-form'

const Page: NextPage = async () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorias', href: '/monedex/categories' },
          {
            label: 'Crear Categoria',
            href: '/monedex/categories/create',
            active: true
          }
        ]}
      />
      <Form />
    </main>
  )
}

export default Page
