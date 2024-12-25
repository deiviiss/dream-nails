import { DeletePlace, UpdatePlace } from './place-buttons'
import { getFilteredPlaces } from '@/actions/monedex/places/get-places'
import { Spinner } from '@/components/ui/spinner'

export default async function PlaceTable({
  query,
  currentPage
}: {
  query: string
  currentPage: number
}): Promise<JSX.Element> {
  const places = await getFilteredPlaces(query, currentPage)

  if (places.length === 0) {
    return (
      <Spinner name='lugares' color='text-monedex-light' />
    )
  }

  return (
    <div className='w-full'>
      <div className='flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                {places?.map((place) => (
                  <div
                    key={place.id}
                    className='mb-2 w-full rounded-md bg-monedex-light p-4'
                  >
                    {/* title card */}
                    <div className='flex items-center justify-between border-b pb-4'>
                      <div>
                        <h1>{place.name}</h1>
                      </div>

                      {/*  buttons delete - update */}
                      <div className='flex justify-end gap-2'>
                        <UpdatePlace id={place.id} />
                        <DeletePlace id={place.id} />
                      </div>
                    </div>

                    {/* body card */}
                    <div className='grid grid-cols-2 col-span-2 gap-2 border-b py-5'>
                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Descripción</p>
                        <p className='font-medium'>
                          {place.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className='hidden min-w-full rounded-md text-gray-900 md:table'>
                <thead className='rounded-md bg-gray-50 text-left text-sm font-normal'>
                  <tr>
                    <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                      Lugar
                    </th>
                    <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                      Descripción
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 text-gray-900'>
                  {places.map((place) => (
                    <tr key={place.id} className='group'>
                      <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6'>
                        <div className='flex items-center gap-3'>
                          <p>{place.name}</p>
                        </div>
                      </td>
                      <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6'>
                        <div className='flex items-center gap-3'>
                          <p>{place.description}</p>
                        </div>
                      </td>
                      <td>
                        <div className='flex justify-end gap-2'>
                          <UpdatePlace id={place.id} />
                          <DeletePlace id={place.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
