'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { place: 'Supermarket', amount: 350 },
  { place: 'Restaurant', amount: 250 },
  { place: 'Gas Station', amount: 200 },
  { place: 'Online Store', amount: 180 },
  { place: 'Cinema', amount: 100 }
]

export function TopExpensesBarChart() {
  return (
    <Card className="bg-darkBlue-800 border-darkBlue-700">
      <CardHeader>
        <CardTitle className="text-darkBlue-100">Top 5 Lugares de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="place" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip contentStyle={{ backgroundColor: '#1E3A8A', border: 'none' }} />
            <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
