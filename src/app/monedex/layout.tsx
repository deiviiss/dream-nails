import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { FaArrowUp } from 'react-icons/fa'
import { getUserSessionServer } from '@/actions'
import { FloatingMenuButton } from '@/components/monedex/button-floating-menu'
import { ButtonScrollTop } from '@/components/monedex/button-scroll-top'
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
      <div className="flex flex-col md:flex-row md:overflow-hidden bg-monedex-primary  text-monedex-primary h-full">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="w-full px-3 pb-4 md:overflow-y-auto md:p-12">
          {children}
        </div>

        <div className="fixed bottom-4 right-4 md:hidden z-20 flex flex-col items-end space-y-4">
          <ButtonScrollTop className='h-14 w-14 rounded-full bg-monedex-tertiary text-monedex-light shadow-lg hover:bg-monedex-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 print:hidden'
            icon={<FaArrowUp className="w-4" />}
          />

          <FloatingMenuButton />
        </div>

      </div>
      <Footer />
    </>
  )
}
