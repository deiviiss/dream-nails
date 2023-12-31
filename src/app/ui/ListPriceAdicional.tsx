import { type ListPrices } from '@/interfaces/Props'

export const ListServicesPriceAdicional = ({
  title,
  services
}: ListPrices): JSX.Element => {
  return (
    <section className='mx-auto w-full max-w-[820px] sm:mt-8'>
      <div className='flex flex-col items-center mb-2'>
        <div className='w-full border-t-[2px] border-primary rounded relative'></div>

        <h1 className='text-2xl font-semibold text-center my-3'>{title}</h1>

        <div className='w-full ml-5 border-b-[2px] border-primary rounded relative'></div>
      </div>

      <div className='py-8'>
        {services?.map((service) => {
          return (
            <div
              key={service.id}
              className='flex justify-center items-center gap-4 px-8'
            >
              <h1 className='w-[50ch] text-center'>
                {service.name} + ${service.price}
              </h1>
            </div>
          )
        })}

        <div className='flex items-center justify-center gap-4 px-8 pt-5 bg-cover bg-center'>
          <h1 className='w-[50ch] text-center'>
            Los precios pueden variar dependiendo del diseño.
          </h1>
        </div>
      </div>
    </section>
  )
}
