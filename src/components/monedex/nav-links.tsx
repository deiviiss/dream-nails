'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiCategory, BiLocationPlus } from 'react-icons/bi'
import { BsJournalText } from 'react-icons/bs'
import { FaMoneyBillWaveAlt } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { TbCurrencyDollar } from 'react-icons/tb'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Inicio', href: '/monedex/dashboard', icon: IoHomeOutline },
  { name: 'Gastos', href: '/monedex/expenses', icon: TbCurrencyDollar },
  { name: 'Ingresos', href: '/monedex/incomes', icon: FaMoneyBillWaveAlt },
  { name: 'Categorías', href: '/monedex/categories', icon: BiCategory },
  { name: 'Lugares', href: '/monedex/places', icon: BiLocationPlus },
  { name: 'Diario', href: '/diary', icon: BsJournalText }
]

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex w-full h-[48px] grow items-center justify-center gap-2 rounded-md bg-monedex-foreground p-3 text-sm md:text-base font-medium hover:bg-monedex-secondary text-monedex-light md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-monedex-secondary': pathname === link.href
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link >
        )
      })}
    </>
  )
}
