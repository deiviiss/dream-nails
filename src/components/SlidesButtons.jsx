import PropTypes from 'prop-types'

const SlideButtons = ({ slides, curr = 0, setCurr = () => { } }) => {
  return (
    <div className="absolute top-2 right-0 left-0">
      <div className="flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
              key={i}
              className={`transition-all w-2 h-2 bg-[#432b9b] rounded-full ${curr === i ? 'p-2' : 'bg-[#432b9b66]'
              }`}
              onClick={() => setCurr(i)}
          />

        ))}
      </div>
    </div>
  )
}

SlideButtons.propTypes = {
  slides: PropTypes.array,
  curr: PropTypes.any,
  setCurr: PropTypes.any
}

export default SlideButtons
