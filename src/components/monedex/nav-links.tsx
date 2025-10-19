'use client'

import { clsx } from 'clsx'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiCategory, BiLocationPlus } from 'react-icons/bi'
import { BsJournalText } from 'react-icons/bs'
import { FaMoneyBillWaveAlt } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { TbCurrencyDollar, TbWallet } from 'react-icons/tb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const primaryLinks = [
  { name: 'Inicio', href: '/monedex/dashboard', icon: IoHomeOutline },
  { name: 'Gastos', href: '/monedex/expenses', icon: TbCurrencyDollar },
  { name: 'Ingresos', href: '/monedex/incomes', icon: FaMoneyBillWaveAlt },
  { name: 'Presupuesto', href: '/monedex/budget', icon: TbWallet }
]

const secondaryLinks = [
  { name: 'Categorías', href: '/monedex/categories', icon: BiCategory },
  { name: 'Lugares', href: '/monedex/places', icon: BiLocationPlus },
  { name: 'Diario', href: '/diary', icon: BsJournalText }
]

export default function NavLinks() {
  const pathname = usePathname()

  const hasActiveSecondary = secondaryLinks.some((link) => pathname === link.href)

  return (
    <>
      {primaryLinks.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname === link.href
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex w-full h-[52px] grow items-center justify-center gap-3 rounded-lg p-3 text-sm md:text-base font-medium transition-all duration-200 md:flex-none md:justify-start md:px-4',
              'text-monedex-light/80 hover:text-monedex-light ',
              {
                'bg-monedex-foreground/80 text-monedex-light shadow-sm': isActive
              }
            )}
          >
            <LinkIcon className="w-5 h-5 md:w-6 md:h-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={clsx(
              'flex w-full h-[52px] grow items-center justify-center gap-3 rounded-lg p-3 text-sm md:text-base font-medium transition-all duration-200 md:flex-none md:justify-start md:px-4',
              'text-monedex-light/80 hover:text-monedex-light hover:bg-monedex-foreground/50',
              {
                'bg-monedex-secondary text-monedex-light shadow-sm': hasActiveSecondary
              }
            )}
          >
            <MoreHorizontal className="w-5 h-5 md:w-6 md:h-6" />
            <p className="hidden md:block">Más</p>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {secondaryLinks.map((link) => {
            const LinkIcon = link.icon
            const isActive = pathname === link.href
            return (
              <DropdownMenuItem key={link.name} asChild>
                <Link
                  href={link.href}
                  className={clsx('flex items-center gap-3 cursor-pointer', {
                    'bg-monedex-secondary/20 text-monedex-secondary font-medium': isActive
                  })}
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
