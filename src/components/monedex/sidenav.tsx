import Link from 'next/link'
import AppLogo from '@/components/monedex/logo-app'
import NavLinks from '@/components/monedex/nav-links'

export default function SideNav() {
  return (
    <>
      <Link
        className="flex h-20 md:h-28 items-center justify-start  bg-monedex-foreground/80 px-4 md:mb-3 hover:bg-monedex-foreground transition-colors"
        href="/monedex"
      >
        <div className="text-monedex-light">
          <AppLogo />
        </div>
      </Link>

      <div className="flex h-full flex-col px-3 py-3 md:px-3">

        <div className="grid grid-cols-5 gap-1 md:grid-cols-1 md:gap-3">
          <NavLinks />
        </div>
      </div>
    </>
  )
}
