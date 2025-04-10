import { type Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { CreateThought } from '@/components/diary/thought-buttons'

export const metadata: Metadata = {
  title: {
    template: '%s | Diary Emotions',
    default: 'Diary Emotions'
  }
}

export default async function EmotionsLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }
  console.log('user', user.role)
  if (user?.role !== 'admin') {
    redirect('/')
  }

  return (
    <>
      <main className="flex flex-col bg-monedex-primary  text-monedex-primary h-full w-full mx-auto">

        <div className="text-white w-full flex-none">
          <nav className="flex items-center justify-between max-w-7xl mx-auto px-3 md:px-16 py-4">
            <h1 className="text-2xl font-bold">Diario Personal</h1>
            <Link href="/monedex" className="text-white hover:text-gray-300">
              Monedex
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <CreateThought />
            </div>
          </nav>
        </div>

        <div className=" text-white w-full max-w-7xl mx-auto px-3 pb-4 md:overflow-y-auto md:p-12">
          {children}
        </div>

        <div className="fixed bottom-4 right-4 md:hidden z-20 flex flex-col items-end space-y-4">
          <CreateThought />
        </div>

      </main>
      <footer className="bg-gray-800 text-white text-center py-4 pt-4">
        Nadie te hace sentir enojado, nadie te hace sentir nada.
      </footer>

    </>
  )
}
