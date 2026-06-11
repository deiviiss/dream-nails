'use client'

import { type WalletType } from '@prisma/client'
import { Eye, EyeOff, PiggyBank } from 'lucide-react'
import { useState } from 'react'
import { CiBank } from 'react-icons/ci'
import { IoWalletOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  balance: number
  physicalAmount?: number
  difference: number
  differencePercentage: number
  change: {
    value: number
    label: string
  }
  type: WalletType | 'total'
  excludeFromBalance?: boolean // added prop
}

const icons = {
  cash: IoWalletOutline,
  debit: CiBank,
  total: RiMoneyDollarCircleLine,
  savings: PiggyBank
}

const iconColors = {
  cash: 'bg-green-100 text-green-500',
  debit: 'bg-monedex-tertiary/80 text-monedex-light',
  total: 'bg-red-100 text-red-500',
  savings: 'bg-yellow-100 text-yellow-500'
}

export function MetricCard({ title, balance, type, physicalAmount, difference, differencePercentage, excludeFromBalance }: MetricCardProps) {
  const [isHidden, setIsHidden] = useState(excludeFromBalance)
  const hiddenValue = '••••••'
  const Icon = icons[type]
  const isPositive = differencePercentage > 0

  return (
    <Card className="border rounded-xl max-w-xl w-full">
      <CardContent className="p-4 min-h-[152px]">
        <div className="flex items-start gap-4">
          <div className={cn('p-2 rounded-lg', iconColors[type])}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-2 w-full">
            <div className='flex items-center justify-between w-full gap-2'>
              <div className='flex flex-col gap-2'>
                <p className="text-sm text-muted-foreground">{title}</p>

                <p className="text-2xl font-semibold">
                  {isHidden
                    ? hiddenValue
                    : `$${balance.toFixed(2)}`}
                </p>
              </div>
              {excludeFromBalance && (
                <div className='flex items-center justify-between gap-2'>
                  <Badge variant="secondary" className="text-xs uppercase gap-1">
                    Excluida
                  </Badge>

                  <button
                    type="button"
                    onClick={() => {
                      setIsHidden(!isHidden)
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isHidden
                      ? <EyeOff className="h-4 w-4" />
                      : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Físico: {
                isHidden
                  ? hiddenValue
                  : physicalAmount?.toFixed(2) ?? '0.00'}</p>

            <p className="text-sm text-muted-foreground">
              Diferencia: {
                isHidden
                  ? hiddenValue
                  : difference?.toFixed(2) ?? '0.00'
              }</p>
            <div className="flex items-center gap-1 text-sm">
              {
                !excludeFromBalance && (
                  differencePercentage === 0
                    ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs uppercase">
                        Conciliado
                      </Badge>)
                    : (
                      <div
                        className={cn(
                          'flex items-center gap-0.5 px-1.5 py-0.5 rounded',
                          isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        )}
                      >
                        <span className="text-xs">{isPositive ? '↗' : '↘'}</span>
                        <span>{differencePercentage?.toFixed(2) ?? '0.00'}%</span>
                      </div>)
                )
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
