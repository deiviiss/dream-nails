import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({
  children,
  className,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:bg-secondary aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  )
}
