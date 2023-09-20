import Image from 'next/image'
import { ListPrice } from '@/components/ListPrice'

export default function Home() {


  const products = [
    {
      id: 1,
      name: 'Acrílicas / Cortas: #1 y 1/2',
      price: 250,
      category: 'manos'
    },
    {
      id: 2,
      name: 'Acrílicas / Medianas: #2 y 3',
      price: 300,
      category: 'manos'
    },
    {
      id: 3,
      name: 'Acrílicas / Largas: #4 y 5',
      price: 350,
      category: 'manos'
    },
    {
      id: 4,
      name: 'Baño de acrílico / Uña natural',
      price: 230,
      category: 'manos'
    },
    {
      id: 5,
      name: 'Baño de acrílico / Manicure / Uña natural',
      price: 290,
      category: 'manos'
    },
    {
      id: 6,
      name: 'Manicure sencillo / Refuerzo / Gel semi',
      price: 230,
      category: 'manos'
    },
    {
      id: 7,
      name: 'Mamáicure / Gel semi',
      price: 200,
      category: 'manos'
    },
    {
      id: 8,
      name: 'Gel semi',
      price: 150,
      category: 'manos'
    },
  ]

  const title = 'manos'

  return (
    <main className='px-2'>
      <header className="flex justify-center p-6">
        <Image src="/logo_dream-nails.png" alt="logo_dream-nails" width={256} height={144} className="bg-red-400"></Image>
        {/* <Image src="/bg-header.png" alt="bg-header" width={256} height={144} className=" "></Image> */}
      </header>

      <ListPrice title={title} products={products}></ListPrice>



      <section className="container mx-auto">
        <h1 className="text-2xl font-semibold text-center">Belleza de pies</h1>
        <ul className="list-disc pl-6 mt-2">
          <li>Acripie - <span className="font-semibold">$230</span></li>
          <li>Pedicure B / Sales relajantes / Pastilla / Exfoliación - <span className="font-semibold">$250</span></li>
          <li>Pedicure Spa / Pulido de pie / Jelly / Exfoliación / Mascarilla - <span className="font-semibold">$300</span></li>
        </ul>
      </section>

      <section className="container mx-auto mt-8">
        <h1 className="text-2xl font-semibold text-center">Extras</h1>
        <ul className="list-disc pl-6 mt-2">
          <li>Retiro de gelish - <span className="font-semibold">$50</span></li>
          <li>Retiro de acrílico - <span className="font-semibold">$100</span></li>
        </ul>
      </section>
    </main>
  )
}
