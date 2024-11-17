import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
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
    <div className="flex flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="px-3 py-4 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  )
}
