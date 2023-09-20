export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/home/:path*', '/users/:path*', '/profile/:path*']
}
