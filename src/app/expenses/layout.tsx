import { type Metadata } from 'next'
import SideNav from '@/app/ui/dashboard/sidenav'

export const metadata: Metadata = {
  title: {
    template: '%s | Gastos',
    default: 'Gastos'
  }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}
