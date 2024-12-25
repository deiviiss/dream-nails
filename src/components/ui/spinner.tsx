interface SpinnerProps {
  name?: string
  color?: string

}

export const Spinner = ({ color, name }: SpinnerProps) => {
  const spinnerColor = color || 'text-white'
  const spinnerName = name || 'datos'

  return (
    <div className="text-center my-10">
      <svg className={`animate-spin h-8 w-8 mx-auto ${spinnerColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className={`mt-4 text-lg ${spinnerColor}`}>{`Cargando ${spinnerName}...`}</p>
    </div>
  )
}
