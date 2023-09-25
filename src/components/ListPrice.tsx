import { type ListPrices } from '@/interfaces/Props'

export const ListServicesPrice = ({ title, services }: ListPrices): JSX.Element => {
  return (
    <section className="mx-auto w-full max-w-[820px]">
      <div className='flex flex-col items-center'>

        <div className='w-full border-t-[5px] border-primary rounded'></div>

        <div className="flex w-full justify-between sm:px-14">
          <h1 className="text-3xl font-semibold text-center pl-5">{title}</h1>
          <h1 className="text-3xl font-semibold text-center px-2">Precio</h1>
        </div>

        <div className='w-full ml-5 border-b-[5px] border-primary rounded'></div>

      </div>

      {
        services?.map(service => {
          return (
            <div key={service.id} className='flex justify-between gap-4 mt-4 px-6 text-xl sm:px-14'>
              <h1 className='w-[50ch] border-white border-b-2 hover:border-accent hover:border-b-2 transition ease-in-out delay-150 duration-300 cursor-pointer'>{service.name}</h1>
              <div className="flex items-center justify-center w-full">
                <div className="w-full border-dashed border-gray border-[1.9px]"></div>
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
