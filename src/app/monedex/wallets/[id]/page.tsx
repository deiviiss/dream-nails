import { getWalletById } from '@/actions/monedex/wallets/get-wallet-by-id'

interface ParamsProps {
  params: {
    id: number
  }
}

export default async function WalletPage({ params }: ParamsProps) {
  const id = params.id

  const { wallet } = await getWalletById(id)

  if (!wallet) {
    return <div>Wallet not found</div>
  }

  return (
    <div className='flex flex-col gap-2 text-monedex-light text-base'>
      <h1>{wallet.name}</h1>
      <p>{wallet.balance}</p>
    </div>
  )
}
