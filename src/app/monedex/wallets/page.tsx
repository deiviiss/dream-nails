import { redirect } from 'next/navigation'

export default async function WalletsPage() {
  redirect('/monedex/dashboard')
}
