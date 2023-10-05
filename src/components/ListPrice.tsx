import { type ListPrices } from '@/interfaces/Props'

export const ListServicesPrice = ({ title, services }: ListPrices): JSX.Element => {
  return (
    <section className="mx-auto w-full max-w-[820px]">
      <div className='flex flex-col items-center'>

        <div className='w-full border-t-[5px] border-primary rounded'></div>

        <div className="flex w-full justify-between my-2 sm:px-14 text-black">
          <h1 className="text-xl font-semibold text-center pl-5">{title}</h1>
          <h1 className="text-xl font-semibold text-center px-2">Precio</h1>
        </div>

        <div className='w-full ml-5 border-b-[5px] border-primary rounded'></div>

      </div>

      {
        services?.map(service => {
          return (
            <div key={service.id} className='flex justify-between gap-4 mt-4 px-6 sm:px-14 text-lg'>
              <p className='w-[50ch]'>{service.name}</p>
              <div className="flex items-center justify-center w-full">
                <div className="w-full border-dashed border-zinc-400 border-[1.9px]"></div>
              </div>
              <div className='flex items-center justify-center'>
                <p className="text-right">${service.price}</p>
              </div>
            </div>
          )
        })
      }

    </section >
  )
}
