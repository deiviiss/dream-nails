'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { FaSearchDollar } from 'react-icons/fa'
import { useDebouncedCallback } from 'use-debounce'

export default function Search({
  placeholder
}: {
  placeholder: string
}): JSX.Element {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', '1')

    term.length > 0 ? params.set('query', term) : params.delete('query')
    // Replaces the path with a path obtained from the input that was converted to query
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label htmlFor='search' className='sr-only'>
        Buscar
      </label>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <FaSearchDollar className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-darkBlue-600 peer-focus:text-gray-900' />
    </div>
  )
}
