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
      <div className="flex grow flex-row justify-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  )
}
