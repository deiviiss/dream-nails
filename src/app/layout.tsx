import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { arapey, josefin } from './fonts'
import Providers from './providers'
import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Dream Nails',
  description: '¡Bienvenidos a nuestro oasis de belleza! En nuestro encantador salón, fusionamos arte y estilo para brindarte una experiencia de cuidado personalizada que dejará huella. Especializados en manicure y pedicure, te invitamos a sumergirte en un mundo de colores y creatividad mientras mimamos tus manos y pies. Pero eso no es todo: nuestro equipo de expertos estilistas también se dedica a transformar cabellos en lienzos vivientes. Desde cortes vanguardistas hasta tintes y mechas que deslumbran, cada servicio es una obra maestra única que refleja tu personalidad y esencia.'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const session = await getServerSession()

  return (
    <html lang="es-Mx" className={`${josefin.variable} ${arapey.variable}`}>
      <body className='text-base'>
        <Providers>
          <Navbar session={session} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
