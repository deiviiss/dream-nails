'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function IncomeInsights() {
  const [view, setView] = useState('Expense')

  return (
    <Card className="bg-darkBlue-800 border-darkBlue-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-darkBlue-100">
            Insights de {view === 'Expense' ? 'Gastos' : 'Ingresos'}
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => { setView(view === 'Expense' ? 'Income' : 'Expense') }}
            className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600"
          >
            Cambiar a {view === 'Expense' ? 'Ingresos' : 'Gastos'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-darkBlue-200">
          {view === 'Expense'
            ? 'Los insights de gastos se mostrarán aquí.'
            : 'Los insights de ingresos se mostrarán aquí en el futuro.'}
        </p>
      </CardContent>
    </Card>
  )
}
