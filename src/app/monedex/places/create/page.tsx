import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { PlaceForm } from '@/components/monedex/places/place-form'

export default async function PlacesPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lugares', href: '/monedex/places' },
          {
            label: 'Crear lugar',
            href: '/monedex/places/create',
            active: true
          }
        ]}
      />
      <PlaceForm place={null} />
    </main>
  )
}
