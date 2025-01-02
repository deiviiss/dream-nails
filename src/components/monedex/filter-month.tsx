'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const months = [
  {
    id: 1,
    name: 'enero'
  },
  {
    id: 2,
    name: 'febrero'
  },
  {
    id: 3,
    name: 'marzo'
  },
  {
    id: 4,
    name: 'abril'
  },
  {
    id: 5,
    name: 'mayo'
  },
  {
    id: 6,
    name: 'junio'
  },
  {
    id: 7,
    name: 'julio'
  },
  {
    id: 8,
    name: 'agosto'
  },
  {
    id: 9,
    name: 'septiembre'
  },
  {
    id: 10,
    name: 'octubre'
  },
  {
    id: 11,
    name: 'noviembre'
  },
  {
    id: 12,
    name: 'diciembre'
  }

]

const years = Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i)

export default function FilterMonth(): JSX.Element {
  const filterParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const params = new URLSearchParams(filterParams.toString())

  const handleFilterMonth = useDebouncedCallback((month: string, year: string) => {
    params.set('page', '1')
    params.set('month', month)
    params.set('year', year)
    setCurrentMonth(Number(month))
    setCurrentYear(Number(year))
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='flex gap-2'>
      <div className='relative flex flex-1 max-w-[150px]'>
        <select
          id='filterMonth'
          className='block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm'
          onChange={(e) => handleFilterMonth(e.target.value, currentYear.toString())}
          defaultValue={currentMonth}
        >
          {months.map((month) => (
            <option key={month.id} value={month.id}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <div className='relative flex flex-1 max-w-[150px]'>
        <select
          id='filterYear'
          className='block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm'
          onChange={(e) => handleFilterMonth(currentMonth.toString(), e.target.value)}
          defaultValue={currentYear}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
