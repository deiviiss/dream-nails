import Link from 'next/link'
import { CiFaceFrown } from 'react-icons/ci'

export default function NotFound(): JSX.Element {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-2'>
      <CiFaceFrown className='w-10 text-gray-400' />
      <h2 className='text-xl font-semibold'>404 Not Found</h2>
      <p>No se pudo encontrar la página solicitada.</p>
      <Link
        href='/'
        className='mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:opacity-75'
      >
        Regresar
      </Link>
    </main>
  )
}
