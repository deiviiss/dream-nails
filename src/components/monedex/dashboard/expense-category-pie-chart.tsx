'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'Food', value: 500 },
  { name: 'Rent', value: 1000 },
  { name: 'Utilities', value: 300 },
  { name: 'Transportation', value: 200 },
  { name: 'Entertainment', value: 500 }
]

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE']

export function ExpenseCategoryPieChart() {
  return (
    <Card className="bg-darkBlue-800 border-darkBlue-700">
      <CardHeader>
        <CardTitle className="text-darkBlue-100">Distribución de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#3B82F6"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1E3A8A', border: 'none' }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
