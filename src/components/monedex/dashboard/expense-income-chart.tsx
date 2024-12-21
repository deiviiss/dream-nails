'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { month: 'Jan', expenses: 1500, income: 4000 },
  { month: 'Feb', expenses: 2000, income: 4200 },
  { month: 'Mar', expenses: 1800, income: 4500 },
  { month: 'Apr', expenses: 2200, income: 4800 },
  { month: 'May', expenses: 2500, income: 5000 },
  { month: 'Jun', expenses: 2300, income: 5200 }
]

export function ExpenseIncomeChart() {
  return (
    <Card className="bg-darkBlue-800 border-darkBlue-700">
      <CardHeader>
        <CardTitle className="text-darkBlue-100">Gastos vs Ingresos Mensuales</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip contentStyle={{ backgroundColor: '#1E3A8A', border: 'none' }} />
            <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
