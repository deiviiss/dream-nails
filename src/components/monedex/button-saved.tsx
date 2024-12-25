'use client'

import { CgSpinnerTwo } from 'react-icons/cg'
import { Button } from '@/components/ui/button'

interface Props {
  name?: string
  className: string
  variant?: 'outline' | 'secondary' | 'link' | 'destructive'
  icon?: JSX.Element
  isSubmitting?: boolean
}

export const ButtonSaved = ({ name, className, icon, variant, isSubmitting = false }: Props) => {
  return (
    <Button
      variant={variant || 'default'}
      disabled={isSubmitting}
      className={className}
      type='submit'
    >
      <span className={`flex gap-1 items-center transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
        {icon}
        {name}
      </span>
      <span className={`flex gap-1 items-center transition-opacity duration-300 ${isSubmitting ? 'opacity-100' : 'opacity-0'} absolute`}>
        <CgSpinnerTwo className='animate-spin h-5 w-5' />
        Guardando
      </span>
    </Button>
  )
}
