import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { FaArrowUp } from 'react-icons/fa'
import { getUserSessionServer } from '@/actions'
import { ButtonScrollTop } from '@/components/monedex/button-scroll-top'
import { CreateExpense } from '@/components/monedex/expenses/buttons'
import { Footer } from '@/components/monedex/footer'
import SideNav from '@/components/monedex/sidenav'

export const metadata: Metadata = {
  title: {
    template: '%s | Monedex',
    default: 'Monedex'
  }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:overflow-hidden bg-monedex-primary  text-monedex-primary">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="px-3 py-4 md:overflow-y-auto md:p-12">
          {children}
        </div>

        <div className='fixed bottom-4 right-2 md:hidden'>
          <CreateExpense />
        </div>

        <ButtonScrollTop className='fixed bottom-16 right-2 z-10 rounded-lg bg-monedex-tertiary px-4 text-sm font-medium text-monedex-light transition-colors border border-monedex-tertiary hover:bg-monedex-secondary hover:border-monedex-light print:hidden'
          icon={<FaArrowUp className="w-4" />}
        />

      </div>
      <Footer />
    </>
  )
}
