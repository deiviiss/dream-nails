import { redirect } from 'next/navigation'
import { fetchFilteredEmotions } from '@/actions/diary/emotions/fetch-filtered-emotions'
import { fetchThoughtById } from '@/actions/diary/thoughts/fetch-thought-by-id'
import { ThoughtForm } from '@/components/diary/thought-form'
import Breadcrumbs from '@/components/monedex/breadcrumbs'

type Params = Promise<{ id: string }>

export default async function ThoughtPage(props: {
  params: Params
}): Promise<JSX.Element> {
  const params = await props.params
  const id = Number(params.id)

  const [{ thought }, { emotions }] = await Promise.all([
    fetchThoughtById(id),
    fetchFilteredEmotions()
  ])

  if (!thought || !emotions) {
    redirect('/diary/')
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Diario', href: '/diary/' },
          {
            label: 'Pensamientos',
            href: `/diary/thoughts/${id}`,
            active: true
          }
        ]}
      />
      <ThoughtForm thought={thought} emotions={emotions} />
    </main>
  )
}
