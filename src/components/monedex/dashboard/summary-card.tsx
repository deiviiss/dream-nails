import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SummaryCard() {
  return (
    <Card className="bg-darkBlue-800 border-darkBlue-700">
      <CardHeader>
        <CardTitle className="text-darkBlue-100">Resumen Financiero</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-darkBlue-200">Gastos Totales</p>
          <p className="text-2xl font-bold text-red-400">-$2,500.00</p>
          <p className="text-sm text-darkBlue-200">Ingresos Totales</p>
          <p className="text-2xl font-bold text-green-400">$5,000.00</p>
          <p className="text-sm text-darkBlue-200">Balance Neto</p>
          <p className="text-3xl font-bold text-darkBlue-100">$2,500.00</p>
        </div>
      </CardContent>
    </Card>
  )
}
