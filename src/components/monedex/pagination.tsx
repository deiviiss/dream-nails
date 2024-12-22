'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { generatePagination } from '@/lib/helpers'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined

          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'

          return (
            <PaginationNumber
              key={page}
              page={page}
              href={createPageURL(page)}
              isActive={currentPage === page}
              position={position}
            />
          )
        })}
      </div>

      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border text-monedex-light border-monedex-light',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-monedex-tertiary': isActive,
      'hover:bg-monedex-secondary': !isActive && position !== 'middle',
      'text-white': position === 'middle'
    }
  )

  return isActive || position === 'middle'
    ? (<div className={className}>{page}</div>)
    : (<Link href={href} className={className}>
      {page}
    </Link>)
}

function PaginationArrow({
  href,
  direction,
  isDisabled
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-monedex-muted': isDisabled,
      'hover:bg-monedex-secondary text-monedex-light': !(isDisabled ?? false),
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right'
    }
  )

  const icon =
    direction === 'left'
      ? (
        <FaArrowLeft className="w-4" />)
      : (
        <FaArrowRight className="w-4" />)

  return (isDisabled ?? false)
    ? (
      <div className={className}>{icon}</div>)
    : (<Link className={className} href={href}>
      {icon}
    </Link>)
}
