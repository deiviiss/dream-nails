import { FaSackDollar } from 'react-icons/fa6'
import { arapey } from '@/config/fonts'

export default function AppLogo() {
  return (
    <div
      className={`${arapey.className} flex flex-row items-center leading-none gap-x-3 text-monedex-light md:items-start md:gap-y-3`}
    >
      <FaSackDollar className="h-8 w-8 rotate-[-10deg] md:h-12 md:w-12" />
      <p className="text-[44px]">Monedex</p>
    </div>
  )
}
