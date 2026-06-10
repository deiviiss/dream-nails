import { type NextPage } from 'next'

import { redirect } from 'next/navigation'
import { getWalletsForForm } from '@/actions/monedex/wallets/get-wallets-for-form'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Form from '@/components/monedex/expenses/create-form'
import { fetchCategoriesToForm } from '@/lib/data'

const Page: NextPage = async () => {
  const [categories, walletsResult] = await Promise.all([
    fetchCategoriesToForm(),
    getWalletsForForm()
  ])

  if (categories.length === 0) {
    redirect('/monedex/expenses')
  }

  // Redirect if the user has no wallets — a wallet is required to record an expense
  if (!walletsResult.ok || walletsResult.wallets.length === 0) {
    redirect('/monedex/wallets')
  }

  const wallets = walletsResult.wallets

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gastos', href: '/monedex/expenses' },
          {
            label: 'Crear Gasto',
            href: '/monedex/expenses/create',
            active: true
          }
        ]}
      />
      <Form categories={categories} wallets={wallets} />
    </main>
  )
}

export default Page
