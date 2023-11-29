const Hero = ({
  title,
  urlImg
}: {
  title: string
  urlImg: string
}): JSX.Element => {
  return (
    <section className='relative'>
      {/* Capa de oscurecimiento */}
      <div className='absolute inset-0 bg-[rgba(0,0,0,0.6)]'></div>

      {/* Contenido con la imagen de fondo */}
      <div
        className='flex flex-col items-end justify-end w-auto h-screen bg-no-repeat bg-center bg-cover'
        style={{ backgroundImage: urlImg }}
      >
        <header className='absolute bottom-20 w-full justify-center px-16'>
          <h1 className='text-white text-center font-semibold text-2xl'>
            {title}
          </h1>
        </header>
      </div>
    </section>
  )
}

export default Hero
