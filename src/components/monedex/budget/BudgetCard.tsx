import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BudgetCardProps {
  name: string
  budgetAmount: number
  paidAmount: number
  difference: number
  differencePercentage: number
}

export function BudgetCard({
  name,
  budgetAmount,
  paidAmount,
  difference,
  differencePercentage
}: BudgetCardProps) {
  const isOverBudget = difference < 0
  const isPositive = difference >= 0

  return (
    <Card className="border rounded-xl w-full mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-monedex-secondary">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Presupuesto asignado</span>
          <span className="text-sm font-medium">${budgetAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Cantidad pagada</span>
          <span className="text-sm font-medium text-green-600">${paidAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm text-muted-foreground">Diferencia</span>
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-sm font-semibold',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              ${difference.toFixed(2)}
            </span>
            <div className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-full text-xs',
              isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            )}>
              <span>
                {isPositive ? '↗' : '↘'}
              </span>
              <span>{Math.abs(differencePercentage).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {isOverBudget && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600 text-center">
              ⚠️ Sobrepasado en ${(Math.abs(difference)).toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
