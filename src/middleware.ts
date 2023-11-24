import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if ((request.nextUrl.pathname.startsWith('/panel-admin') || request.nextUrl.pathname.startsWith('/expenses') || request.nextUrl.pathname.startsWith('/users')) && request.nextauth.token?.role !== 'admin' && request.nextauth.token?.role !== 'stylist') {
      return NextResponse.rewrite(
        new URL('/', request.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => (token?.role === 'admin' || token?.role === 'customer' || token?.role === 'stylist')
    }
  }
)

export const config = {
  matcher: ['/profile/:path*', '/panel-admin/:path*', '/users/:path*', '/expenses/:path*']
}
