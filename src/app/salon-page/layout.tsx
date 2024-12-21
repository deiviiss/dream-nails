import { type Metadata } from 'next'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { ButtonContactWhatsApp } from '@/components/dream-nails'
import { Footer } from '@/components/dream-nails/Footer'
import Navbar from '@/components/dream-nails/Navbar'

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
      <ButtonContactWhatsApp name='Citas' className='fixed bottom-5 right-3 md:right-3 z-10 text-white hover:no-underline hover:text-gray-900 text-xl flex gap-1 p-2 border-secondary border bg-primary print:hidden animate-bounce'
        icon={<IoLogoWhatsapp />}
      />
      <Footer />
    </div>
  )
}
