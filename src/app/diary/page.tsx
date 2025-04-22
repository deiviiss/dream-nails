import { fetchFilteredThoughts } from '@/actions/diary/thoughts/fetch-filtered-thoughts'
import { DeleteThought, UpdateThought } from '@/components/diary/thought-buttons'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { capitalizeFirstLetter } from '@/lib/helpers'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function HomePage(props: { searchParams: SearchParams }): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  console.log('__________HomePage _________')
  console.log('searchParams', searchParams)
  const thoughts = await fetchFilteredThoughts()
  console.log('thoughts', thoughts.length)

  return (
    <main className='w-full mx-auto flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>My Thoughts</h1>

      <div className='flex flex-col gap-2'>
        {thoughts.map((thought) => (
          <Card
            key={thought.id}
          >
            <CardHeader className='relative max-[340px]:pt-20 pt-16'>
              <h2 className='text-lg font-medium'>{thought.thought}</h2>

              <p className='absolute max-[340px]:top-12 top-4 left-6 text-sm text-gray-500'>
                {capitalizeFirstLetter(new Date(thought.createdAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))}
              </p>

              <div className='absolute top-2 right-2 flex items-center gap-2'>
                <UpdateThought id={thought.id} />
                <DeleteThought id={thought.id} />
              </div>
            </CardHeader>

            <CardContent className='flex justify-between gap-2'>
              <p className='text-sm text-gray-500'>Emoción: {thought.emotion.name}</p>
            </CardContent>

          </Card>
        ))}
      </div>

    </main>
  )
}
