import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Providers from '@/app/providers'
import { arapey, josefin } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dream Nails',
  description:
    '¡Bienvenidos a nuestro oasis de belleza! En nuestro encantador salón, fusionamos arte y estilo para brindarte una experiencia de cuidado personalizada que dejará huella. Especializados en manicure y pedicure, te invitamos a sumergirte en un mundo de colores y creatividad mientras mimamos tus manos y pies. Pero eso no es todo: nuestro equipo de expertos estilistas también se dedica a transformar cabellos en lienzos vivientes. Desde cortes vanguardistas hasta tintes y mechas que deslumbran, cada servicio es una obra maestra única que refleja tu personalidad y esencia.'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  return (
    <html lang='es-Mx' className={`${josefin.variable} ${arapey.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
      </body>
    </html>
  )
}
