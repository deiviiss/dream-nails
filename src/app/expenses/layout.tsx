import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gastos'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  return <div>{children}</div>
}
