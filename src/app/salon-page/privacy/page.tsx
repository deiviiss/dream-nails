import { type NextPage } from 'next'
import Link from 'next/link'

const PrivacyPage: NextPage = () => {
  return (
    <>
      <div className='flex items-center justify-center pt-[150.5px] bg-legal-gradient'>
        <div className='max-w-[920px] mx-auto my-5 '>
          <h1 className='text-2xl font-bold px-3'>Políticas de Privacidad</h1>

          <div className='px-3 py-4'>
            <p>
              En <span className='font-semibold'>Dream Nails</span>, valoramos y
              respetamos su privacidad. Esta Política de Privacidad explica cómo
              recopilamos y utilizamos su información personal a través de
              nuestro sitio web y los servicios que ofrecemos.
            </p>
          </div>

          <div className='px-3'>
            <h2 className='text-2xl font-bold text-black py-4'>
              1. Información que Recopilamos
            </h2>
            <p className='pb-4'>
              Recopilamos su nombre, número de teléfono, dirección de correo
              electrónico y otros detalles relevantes a través de nuestro
              formulario de contacto en el sitio web, así como a través de los
              servicios que ofrecemos, como las reservas de citas y el feedback
              proporcionado.
            </p>

            <h2 className='text-2xl font-bold text-black py-4'>
              2. Uso de su Información
            </h2>
            <p className='pb-4'>
              Utilizamos su información personal para los siguientes fines:
            </p>
            <ul className='list-disc pl-6'>
              <li>
                Para ponerse en contacto con usted en relación con los servicios
                que ofrece [Nombre de tu Salón de Uñas].
              </li>
              <li>Para gestionar y programar sus citas y visitas al salón.</li>
              <li>
                Para recopilar y analizar feedback y comentarios proporcionados
                por usted para mejorar nuestros servicios.
              </li>
            </ul>

            <h2 className='text-2xl font-bold text-black py-4'>
              3. Protección de su Información
            </h2>
            <p className='pb-4'>
              Tomamos medidas de seguridad para proteger su información contra
              el acceso no autorizado y garantizar su confidencialidad.
              Utilizamos prácticas estándar de la industria para proteger sus
              datos.
            </p>

            <h2 className='text-2xl font-bold text-black py-4'>
              4. Acceso y Control de su Información
            </h2>
            <p className='pb-4'>
              Usted tiene el derecho de acceder, corregir, actualizar o eliminar
              su información personal en cualquier momento. Puede hacerlo a
              través de su cuenta en nuestro sitio web o poniéndose en contacto
              con nosotros directamente.
            </p>

            <h2 className='text-2xl font-bold text-black py-4'>
              5. Cambios en esta Política de Privacidad
            </h2>
            <p className='pb-4'>
              Nos reservamos el derecho de modificar esta política de privacidad
              en cualquier momento. Si realizamos cambios sustanciales,
              notificaremos dichos cambios en nuestro sitio web para mantenerlo
              informado sobre cómo afectarán a su información personal.
            </p>

            <p>
              Si tiene alguna pregunta sobre esta política de privacidad o cómo
              manejamos su información, no dude en ponerse en contacto con
              nosotros a través de nuestro formulario de contacto.
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

export default PrivacyPage
