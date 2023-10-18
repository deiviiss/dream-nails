import { type NextPage } from 'next'

import Link from 'next/link'
import { BsFillSearchHeartFill } from 'react-icons/bs'

const AdminPage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-y-6 py-4 px-2 w-full mt-[150.5px]'>

      <header className="w-full">
        <h1 className='text-xl text-left font-medium'>
          Panel de administrador
        </h1>
      </header>

      <section className="flex flex-col items-center w-full">
        <header className="w-full">
          <h1 className='text-xl text-left font-medium'>
            Clientes ------------------ 23
          </h1>
        </header>

        {/*
            //! Convertir en componente Buscador de clientes
            */}
        <div className='flex justify-center w-full gap-x-4 mx-2 my-5 px-3'>
          <input type="search" name="search-customer" placeholder='Escribe el nombre o teléfono de un cliente' className='w-full min-w-[295px] p-1 pl-2 focus:outline focus:outline-secondary rounded-lg' />
          <button type="button" className='text-white bg-primary rounded-lg p-2 hover:opacity-75'><BsFillSearchHeartFill /></button>
        </div>

        <div className='flex w-full justify-center my-5 gap-6'>
          <button type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'>
            <Link href={'/panel-admin/customers'}>Agregar Cliente</Link>
          </button>
          <button type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'>
            <Link href={'/panel-admin/dates'}>Agendar Cita</Link>
          </button>
        </div>

        <article className="w-full my-5">
          <p className='text-xl text-left font-medium'>
            Citas agendadas ------------------ 23
          </p>
          <p className='text-xl text-left font-medium'>
            Citas completadas ------------------ 3
          </p >
        </article >

      </section>

      <div className='w-full rounded border-2 border-primary'></div>

      <section className="flex flex-col items-center w-full">

        <article className=" flex items-end w-full my-5">
          <p className='text-xl text-left font-medium w-72'>
            Próxima cita
          </p>
          <div className="flex items-center justify-center w-full">
            <div className="w-full border-dashed border-zinc-400 border-[1.9px]"></div>
          </div>
          <div className='flex flex-col w-72 items-end'>
            <p>23/Oct/2020</p>
            <p> Fulana Reyes</p>
          </div>
        </article >

        <div className="flex justify-center w-full gap-x-4 my-5">
          <button type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'><Link href={'/panel-admin/customers'}>Clientes</Link></button>
          <button type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'><Link href={'/panel-admin/dates'}>Citas</Link></button>
        </div>

      </section>

    </main>
  )
}

export default AdminPage
