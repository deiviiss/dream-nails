import Link from 'next/link'
import { FaPowerOff } from 'react-icons/fa6'
import NavLinks from '@/app/ui/dashboard/nav-links'
import AppLogo from '@/app/ui/logo-app'

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-tertiary p-4 md:h-40"
        href="/expenses/dashboard"
      >
        <div className=" text-white ">
          <AppLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server'
            // cerrar sesión
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <FaPowerOff className="w-6" />
            <div className="hidden md:block">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
  )
}
