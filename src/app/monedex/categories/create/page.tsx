import { type NextPage } from 'next'

import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Form from '@/components/monedex/categories/create-form'

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
