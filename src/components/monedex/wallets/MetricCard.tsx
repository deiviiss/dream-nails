import { type WalletType } from '@prisma/client'
import { CiBank } from 'react-icons/ci'
import { IoWalletOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  balance: number
  totalIncome: number
  totalExpenses: number
  change: {
    value: number
    label: string
  }
  type: WalletType | 'total'
}

const icons = {
  cash: IoWalletOutline,
  debit: CiBank,
  total: RiMoneyDollarCircleLine
}

const iconColors = {
  cash: 'bg-green-100 text-green-500',
  debit: 'bg-monedex-tertiary/80 text-monedex-light',
  total: 'bg-red-100 text-red-500'
}

export function MetricCard({ title, balance, totalIncome, totalExpenses, change, type }: MetricCardProps) {
  const Icon = icons[type]
  const isPositive = change.value > 0

  return (
    <Card className="border rounded-xl max-w-xl">
      <CardContent className="p-4 min-h-[152px]">
        <div className="flex items-start gap-4">
          <div className={cn('p-2 rounded-lg', iconColors[type])}>
            <Icon className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <div className='flex items-center justify-between gap-2'>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-semibold">${balance.toFixed(2)}</p>
            </div>

            <p className="text-sm text-muted-foreground">Total Ingresos: ${totalIncome.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total Gastos: ${totalExpenses.toFixed(2)}</p>

            <div className="flex items-center gap-1 text-sm">
              <div
                className={cn(
                  'flex items-center gap-0.5 px-1.5 py-0.5 rounded',
                  isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                )}
              >
                <span className="text-xs">
                  {isPositive ? '↗' : '↘'}
                </span>
                <span>{Math.abs(change.value).toFixed(2)}%</span>
              </div>
              <span className="text-muted-foreground">{change.label}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
