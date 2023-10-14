import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith('/users') && request.nextauth.token?.role !== 'admin') {
      return NextResponse.rewrite(
        new URL('/profile', request.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => (token?.role === 'admin' || token?.role === 'customer')
    }
  }
)

export const config = {
  matcher: ['/users/:path*', '/profile/:path*']
}
