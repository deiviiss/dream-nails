import { redirect } from 'next/navigation'
import { getPlaceById } from '@/actions/monedex/places/get-place-by-id'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { PlaceForm } from '@/components/monedex/places/place-form'

type Params = Promise<{ id: string }>

export default async function PlacePage(props: {
  params: Params
}) {
  const params = await props.params
  const id = params.id

  const { place } = await getPlaceById(Number(id))

  if (!place) {
    redirect('/monedex/places')
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ingresos', href: '/monedex/incomes' },
          {
            label: 'Editar Ingreso',
            href: `/monedex/incomes/${id}`,
            active: true
          }
        ]}
      />
      <PlaceForm place={place} />
    </main>
  )
}
