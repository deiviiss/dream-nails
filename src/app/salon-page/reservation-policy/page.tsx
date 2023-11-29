import { type NextPage } from 'next'
import Link from 'next/link'

const ReservationPolicyPage: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-center pt-[150.5px] bg-legal-gradient'>
        <div className='max-w-[920px] mx-auto my-5'>
          <h1 className='text-2xl font-bold px-3'>
            Política de Reserva y Cancelación
          </h1>

          <div className='px-3 py-4'>
            <p>
              Lea detenidamente nuestra Política de Reserva y Cancelación antes
              de programar una cita en nuestro salón de uñas. Al reservar una
              cita con nosotros, usted acepta cumplir con estas políticas.
            </p>
          </div>

          <div className='px-3'>
            <h2 className='text-2xl font-bold py-4 text-black'>
              1. Reserva de Citas
            </h2>
            <p className='pb-4'>
              Para programar una cita en nuestro salón, le recomendamos utilizar
              nuestro sistema de reserva en línea. Puede seleccionar el servicio
              deseado, la fecha y la hora disponibles. También puede llamarnos
              para programar una cita.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              2. Llegada a la Cita
            </h2>
            <p className='pb-4'>
              Le recomendamos llegar a nuestro salón a tiempo para su cita. Si
              llega tarde, es posible que tengamos que acortar la duración del
              servicio para no afectar a los clientes programados después de
              usted.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              3. Cancelaciones y Cambios
            </h2>
            <p className='pb-4'>
              Si necesita cancelar o cambiar su cita, le pedimos que nos avise
              con al menos 24 horas de anticipación. Esto nos permite programar
              a otros clientes en ese horario. Puede hacerlo llamándonos o
              utilizando nuestro sistema de reserva en línea.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              4. No Presentación
            </h2>
            <p className='pb-4'>
              Si no se presenta a su cita sin previo aviso, se le podría
              requerir el pago completo del servicio reservado antes de
              programar futuras citas.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              5. Cancelaciones por Parte del Salón
            </h2>
            <p className='pb-4'>
              Nos reservamos el derecho de cancelar o reprogramar citas en caso
              de circunstancias imprevistas, como emergencias o enfermedades del
              personal. En tal caso, haremos nuestro mejor esfuerzo para
              ofrecerle una cita alternativa.
            </p>
          </div>

          <button className='flex mt-8 text-center mx-auto'>
            <Link
              className='py-5 px-12 text-white text-sm transition-all duration-200 bg-primary rounded border-2 border-primary hover:bg-transparent hover:text-primary'
              target='_blank'
              href={'https://wa.me/529812099475'}
            >
              Contáctanos
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default ReservationPolicyPage
