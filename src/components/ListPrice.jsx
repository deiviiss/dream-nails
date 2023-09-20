
export const ListPrice = ({ title, products }) => {

  return (
    <section className="mx-auto">
      <div className='flex flex-col items-center overflow-hidden'>

        <div className='w-full border-t-4 border-[#aed2d8] rounded'></div>

        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-semibold text-center pl-3">Belleza de {title}</h1>
          <h1 className="text-3xl font-semibold text-center pr-2">Precio</h1>
        </div>

        <div className='w-full ml-5 border-b-4 border-[#aed2d8] rounded'></div>

      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 px-6 text-xl">
        {
          products.map(product => {
            return <>
              <div>{product.name}</div>
              <div className="text-right">${product.price}</div>
            </>
          })
        }
      </div>
    </section >
  )
}
