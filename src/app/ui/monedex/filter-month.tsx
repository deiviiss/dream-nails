'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoCalendarNumberOutline } from 'react-icons/io5'
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

export default function FilterMonth(): JSX.Element {
  const filterParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('es', { month: 'numeric' }))
  const params = new URLSearchParams(filterParams)
  const paramsMonthName = params.get('month')
  const existMonthName = !!paramsMonthName

  const handleFilterMonth = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(filterParams)

    params.set('page', '1')
    params.set('month', term)
    setCurrentMonth(term)
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='relative flex flex-1 flex-shrink-0 max-w-[150px]'>
      <label htmlFor='filterMounth' className='sr-only'>
        Mes
      </label>
      <select
        id='filterMonth'
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm capitalize outline-2 placeholder:text-gray-500'
        onChange={(e) => {
          handleFilterMonth(e.target.value)
        }}
        defaultValue={existMonthName ? paramsMonthName : currentMonth}
      >
        {months.map((month) => (
          <option key={month.id} value={month.id}>
            {month.name}
          </option>
        ))}
      </select>
      <IoCalendarNumberOutline className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  )
}
