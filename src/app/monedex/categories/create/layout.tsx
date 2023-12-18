import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear categoria'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return <div>{children}</div>
}
