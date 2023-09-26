import { type NextPage } from 'next'
import Link from 'next/link'

const TermsPage: NextPage = () => {
  return (
    <>
      <div className='text-lg text-primary tracking-wide mb-20'>
        <div className='max-w-[920px] mx-auto my-5 '>

          <h1 className='text-3xl font-bold px-3'>Términos y Condiciones</h1>

          <div className='bg-primary m-4 mb-8 p-8 text-justify'>
            <p>Bienvenido a nuestro sitio web. Al utilizar nuestros servicios, incluyendo la reserva de citas y el envío de feedback, usted acepta y está de acuerdo con los siguientes términos y condiciones de uso. Si no está de acuerdo con estos términos, le recomendamos no utilizar nuestros servicios.</p>
          </div>

          <div className='px-3'>
            <h2 className='text-slate-700 text-3xl font-bold py-4'>1. Servicios y Reservas</h2>
            <p className='pb-4'>Ofrecemos una variedad de servicios de belleza en nuestro salón de uñas. Puede reservar citas a través de nuestro sitio web, y al hacerlo, acepta cumplir con nuestras <Link className='hover:underline hover:text-warning font-semibold' href={'/'}>Política de Reserva y Cancelación</Link>.</p>

            <h2 className='text-slate-700 text-3xl font-bold py-4'>2. Privacidad de los Datos</h2>
            <p className='pb-4'>Para ofrecerle nuestros servicios de manera efectiva, recopilamos y almacenamos información personal. Su privacidad es importante para nosotros, y seguimos prácticas seguras para proteger sus datos. Puede obtener más información sobre cómo manejamos sus datos en nuestra <Link className='hover:underline hover:text-warning font-semibold' href={'/privacy'}>Política de Privacidad</Link>.</p>

            <h2 className='text-slate-700 text-3xl font-bold py-4'>3. Feedback</h2>
            <p className='pb-4'>Agradecemos sus comentarios y opiniones sobre nuestros servicios. Al proporcionar feedback, nos concede el derecho de utilizar sus comentarios para mejorar nuestros servicios y promocionar nuestro salón.</p>

            <h2 className='text-slate-700 text-3xl font-bold py-4'>4. Propiedad Intelectual</h2>
            <p className='pb-4'>Todos los contenidos de nuestro sitio web, incluyendo textos, imágenes, logotipos y otros elementos, son propiedad de <span className='font-semibold'>Dream Nails</span> o de sus licenciantes y están protegidos por leyes de propiedad intelectual.</p>

            <h2 className='text-slate-700 text-3xl font-bold py-4'>5. Exclusión de Garantías</h2>
            <p className='pb-4'>Nuestros servicios se proporcionan &quot;tal cual&quot; y no garantizamos que el sitio web esté libre de errores o que el acceso sea continuo e ininterrumpido.</p>

            <h2 className='text-slate-700 text-3xl font-bold py-4'>6. Limitación de Responsabilidad</h2>
            <p className='pb-4'>En ningún caso <span className='font-semibold'>Dream Nails</span> será responsable de daños indirectos, especiales, consecuentes o punitivos que resulten del uso de nuestro sitio web o servicios.</p>

            <h2 className='text-slate-700 text-3xl font-bold py-4'>7. Modificaciones de los Términos y Condiciones</h2>
            <p className='pb-4'>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Le recomendamos revisar periódicamente esta página para estar al tanto de los cambios. El uso continuo de nuestros servicios después de los cambios constituirá su aceptación de los términos modificados.</p>

            <h2 className='text-slate-700 text-3xl font-bold py-4'>8. Ley Aplicable</h2>
            <p className='pb-4'>Este contrato se regirá e interpretará de acuerdo con las leyes del estado de Campeche. Cualquier disputa que surja en relación con este contrato será resuelta exclusivamente por los tribunales del estado de Campeche.</p>
          </div>

          <button className='flex mt-8 text-center mx-auto'>
            <Link className='py-5 px-12 text-white text-sm transition-all duration-200 bg-primary rounded border-2 border-primary hover:bg-transparent hover:text-secondary' href='/dates'>Contáctanos</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default TermsPage
