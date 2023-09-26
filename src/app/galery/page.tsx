import { type NextPage } from 'next'

const GaleryPage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-y-2 py-4'>
      <header className="flex flex-col items-center justify-center p-3">
        <h1 className='text-3xl font-bold text-center'>¡Bienvenidos a nuestra galería!</h1>
        <p>Actualmente en construcción</p>
      </header>

      <section className='px-4 my-3'>
        <p className='max-w-[820px] py-2 text-xl'>Estamos emocionados por compartir con ustedes una increíble colección de imágenes que capturan momentos memorables, belleza y creatividad. Sin embargo, en este momento, estamos trabajando arduamente para crear una experiencia visual excepcional que refleje nuestra pasión por la fotografía.
        </p>
        <p className='max-w-[820px] py-2 text-xl'>
          Mientras tanto, les pedimos paciencia mientras llevamos a cabo este proceso. Estamos seleccionando cuidadosamente las imágenes más impresionantes y diseñando una galería que será un verdadero deleite para sus ojos. Nuestro objetivo es brindarles una experiencia única y memorable.
        </p>
        <p className='max-w-[820px] py-2 text-xl'>
          Manténganse atentos, ya que pronto revelaremos nuestra galería de imágenes completamente renovada. Mientras tanto, no duden en explorar otros aspectos de nuestro sitio web y descubrir lo que tenemos para ofrecer. ¡Estamos seguros de que encontrarán muchas cosas emocionantes aquí!
        </p>
        <p className='max-w-[820px] py-2 text-xl'>
          Gracias por su comprensión y paciencia. Estamos ansiosos por mostrarles nuestra hermosa colección de imágenes en un futuro cercano. ¡Estén atentos!
        </p>
      </section>

    </main>
  )
}

export default GaleryPage
