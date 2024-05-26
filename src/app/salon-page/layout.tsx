import { type Metadata } from 'next'
import Navbar from '@/app/ui/Navbar'

export const metadata: Metadata = {
  title: 'Salon Page'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
