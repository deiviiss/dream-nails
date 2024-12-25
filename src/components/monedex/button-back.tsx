'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
  name?: string
  className: string
  variant?: 'outline' | 'secondary' | 'link' | 'destructive'
  icon?: JSX.Element
  isSubmitting?: boolean
}

export const ButtonBack = ({ name, className, icon, variant, isSubmitting = false }: Props) => {
  const router = useRouter()

  return (
    <Button
      variant={variant || 'default'}
      disabled={isSubmitting}
      onClick={() => { router.back() }}
      className={className}
      type='button'
    >
      {icon}
      {name}
    </Button>
  )
}
