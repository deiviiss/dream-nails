import Breadcrumbs from '@/app//ui/Breadcrumbs'
import TotalCredit from '@/app/ui/expenses/total-credit'
import TotalAllExpenses from '@/app/ui/expenses/total-general'

export default async function DashboardPage({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Dashboard', href: '/expenses/dashboard', active: true }]}
      />
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <TotalAllExpenses query={query} />

        <TotalCredit query={query} />
      </div>

    </main>
  )
}
