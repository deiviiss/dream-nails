'use client'

import { Plus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const menuItems = [
  { label: 'Crear gasto', path: '/monedex/expenses/create' },
  { label: 'Crear ingreso', path: '/monedex/incomes/create' },
  { label: 'Crear categoría', path: '/monedex/categories/create' },
  { label: 'Crear lugar', path: '/monedex/places/create' }
]

export function FloatingMenuButton() {
  const router = useRouter()
  const pathname = usePathname()

  const models = ['expenses', 'incomes', 'places', 'categories']

  const pathParts = pathname.split('/')

  const isHidden =
    pathParts[1] === 'monedex' &&
    models.includes(pathParts[2]) &&
    pathParts.length > 3

  if (isHidden) {
    return null
  }

  const handleItemClick = (path: string) => {
    router.push(path)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="h-14 w-14 rounded-full bg-monedex-tertiary text-monedex-light shadow-lg hover:bg-monedex-secondary focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 outline-none"
          aria-label="Abrir menú de creación"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='mr-2'>
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.path}
            onSelect={() => { handleItemClick(item.path) }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
