import { PiStarThin } from 'react-icons/pi'
import { type ListPrices } from '@/interfaces/Props'

export const ListServicesPriceAdicional = ({ title, services }: ListPrices): JSX.Element => {
  return (
    <section className="mx-auto w-full max-w-[820px] sm:mt-8">

      <div className='flex flex-col items-center mb-2'>

        <div className='w-full border-t-[2px] border-primary rounded relative'>
          <PiStarThin className='absolute -left-2 -bottom-2 text-2xl text-[#AED2D8] font-bold'></PiStarThin>
        </div>

        <h1 className="text-3xl font-semibold text-center">{title}</h1>

        <div className='w-full ml-5 border-b-[2px] border-primary rounded relative'>
          <PiStarThin className='absolute -right-2 -top-2 text-2xl text-[#AED2D8] font-bold'></PiStarThin>
        </div>

      </div>

      <div className="bg-cover bg-[url('/bg-header.png')]">
        {
          services?.map(service => {
            return (
              <div key={service.id} className='flex justify-center items-center gap-4 px-8 text-xl'>
                <h1 className='w-[50ch] text-center'>{service.name} + ${service.price}</h1>
              </div>
            )
          })
        }

        <div className='flex items-center justify-center gap-4 px-8 text-xl bg-cover bg-center'>
          <h1 className='w-[50ch] text-center'>Los precios pueden variar dependiendo del diseño</h1>
        </div>
      </div>
    </section >
  )
}
