import './globals.css'
import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'

import Providers from './providers'
import Navbar from '@/components/Navbar'

const inter = Caveat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dreams Nail',
  description: '¡Bienvenidos a nuestro oasis de belleza! En nuestro encantador salón, fusionamos arte y estilo para brindarte una experiencia de cuidado personalizada que dejará huella. Especializados en manicure y pedicure, te invitamos a sumergirte en un mundo de colores y creatividad mientras mimamos tus manos y pies. Pero eso no es todo: nuestro equipo de expertos estilistas también se dedica a transformar cabellos en lienzos vivientes. Desde cortes vanguardistas hasta tintes y mechas que deslumbran, cada servicio es una obra maestra única que refleja tu personalidad y esencia.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
