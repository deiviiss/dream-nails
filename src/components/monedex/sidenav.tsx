import Link from 'next/link'
import AppLogo from '@/components/monedex/logo-app'
import NavLinks from '@/components/monedex/nav-links'

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-monedex-foreground p-4 md:h-40"
        href="/monedex"
      >
        <div className=" text-monedex-light">
          <AppLogo />
        </div>
      </Link>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-y-2">
        <NavLinks />
      </div>
    </div>
  )
}
