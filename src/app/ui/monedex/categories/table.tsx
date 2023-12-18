import { DeleteCategory, UpdateCategory } from '@/app/ui/monedex/categories/buttons'
import { fetchFilteredCategories } from '@/libs/data'

export default async function CategoriesTable({
  query,
  currentPage
}: {
  query: string
  currentPage: number
}): Promise<JSX.Element> {
  const categories = await fetchFilteredCategories(query, currentPage)

  return (
    <div className='w-full'>
      <div className='mt-3 flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    className='mb-2 w-full rounded-md bg-white p-4'
                  >
                    {/* title card */}
                    <div className='flex items-center justify-between border-b pb-4'>
                      <div>
                        <h1>{category.name}</h1>
                      </div>

                      {/*  buttons delete - update */}
                      <div className='flex justify-end gap-2'>
                        <UpdateCategory id={category.id} />
                        <DeleteCategory id={category.id} />
                      </div>
                    </div>
                    {/* body card */}
                    <div className='flex w-full items-center justify-between border-b py-5'>
                      <div className='flex flex-col w-full'>
                        <p className='text-xs'>Descripción</p>
                        <p className='font-medium'>
                          {category.description}
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
                      Categoria
                    </th>
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Descripción
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 text-gray-900'>
                  {categories.map((category) => (
                    <tr key={category.id} className='group'>
                      <td className='whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6'>
                        <div className='flex items-center gap-3'>
                          <p>{category.name}</p>
                        </div>
                      </td>
                      <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                        {category.description}
                      </td>
                      <td>
                        <div className='flex justify-end gap-2'>
                          {/* <UpdateCustomer id={customer.id} />
                        <DeleteCustomer id={customer.id} /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
