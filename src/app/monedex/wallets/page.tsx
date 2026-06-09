import { getAllWalletsSummary } from '@/actions/monedex/wallets/get-all-wallet-summary'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { MetricCard } from '@/components/monedex/wallets/MetricCard'
// import { MetricCard } from '@/components/monedex/wallets/MetricCard';
// import { Button } from '@/components/ui/button';
// import { WalletForm } from '@/components/monedex/wallets/WalletForm';
// import { useState } from 'react'

export default async function WalletsPage() {
  const { walletsSummary, ok, message } = await getAllWalletsSummary({ month: new Date().getMonth() + 1, year: new Date().getFullYear() })

  // const [showForm, setShowForm] = useState(false);
  // const [editWallet, setEditWallet] = useState<null | { id: number; name: string; type: string; excludeFromBalance: boolean; physical?: number }>(null);

  if (!ok) {
    return <div>{message}</div>
  }

  // const handleEdit = (wallet: any) => {
  //   setEditWallet({
  //     id: wallet.id,
  //     name: wallet.name,
  //     type: wallet.type,
  //     excludeFromBalance: wallet.excludeFromBalance,
  //     physical: wallet.physical
  //   });
  //   setShowForm(true);
  // };

  return (
    <section className="container mx-auto space-y-6 p-4">
      <Breadcrumbs breadcrumbs={[{ label: 'Carteras', href: '/monedex/wallets', active: true }]} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Carteras</h1>
        {/* <Button onClick={() => { setEditWallet(null); setShowForm(true); }}>Crear Cartera</Button> */}
      </div>
      {/* {showForm && (
        <WalletForm
          wallet={editWallet}
          onClose={() => setShowForm(false)}
        />
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {walletsSummary?.map(wallet => (
          <MetricCard
            key={wallet.id}
            title={wallet.name}
            balance={wallet.balance}
            type={wallet.type}
            physicalAmount={wallet.physical}
            difference={wallet.difference}
            differencePercentage={wallet.differencePercentage}
            change={wallet.change}
            excludeFromBalance={wallet.excludeFromBalance}
          // onEdit={() => (
          //   handleEdit(wallet)
          // )
          // }
          />
        ))}
      </div>
    </section>
  )
}
