import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'

import Navbar from '@/app/ui/Navbar'

export const metadata: Metadata = {
  title: 'Salon Page'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const session = await getServerSession()
  return (
    <div>
      <Navbar session={session} />
      {children}
    </div>
  )
}
