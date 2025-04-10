import { fetchFilteredEmotions } from '@/actions/diary/emotions/fetch-filtered-emotions'
import { ThoughtForm } from '@/components/diary/thought-form'
import Breadcrumbs from '@/components/monedex/breadcrumbs'

export default async function CreateThoughtPage() {
  const { emotions } = await fetchFilteredEmotions()

  if (emotions.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">No hay emociones disponibles</h1>
        <p className="text-lg">Por favor, crea una emoción antes de continuar.</p>
      </main>
    )
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Diario', href: '/diary/' },
          {
            label: 'Crear Diario',
            href: '/diary/create',
            active: true
          }
        ]}
      />
      <ThoughtForm emotions={emotions} thought={null} />
    </main>
  )
}
