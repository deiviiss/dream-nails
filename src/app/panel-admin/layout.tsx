import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'

export const metadata: Metadata = {
  title: {
    template: '%s | Users',
    default: 'Users'
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
    < >
      {children}
    </>
  )
}
