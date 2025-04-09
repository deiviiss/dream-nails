import { getWalletById } from '@/actions/monedex/wallets/get-wallet-by-id'

type Params = Promise<{ id: string }>

export default async function WalletPage(props: {
  params: Params
}) {
  const params = await props.params
  const id = Number(params.id)

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
