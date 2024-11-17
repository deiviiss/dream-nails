interface Slide {
  id: number
  url: string
}

interface SlideButtonsProps {
  curr: number
  slides: Slide[]
  setCurr?: (index: number) => void // Establece setCurr como una función opcional
}

const SlideButtons = ({
  slides,
  curr = 0,
  setCurr = () => {}
}: SlideButtonsProps): JSX.Element => {
  return (
    <div className='absolute bottom-4 right-0 left-0'>
      <div className='flex items-center justify-center gap-2'>
        {slides.map((slide, i) => (
          <button
            key={i}
            className={`transition-all w-2 h-2 bg-primary rounded-full ${
              curr === i ? 'p-2' : 'opacity-75'
            }`}
            onClick={() => {
              setCurr(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default SlideButtons
