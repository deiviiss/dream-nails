'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { type EmotionSummary } from '@/interfaces/thought.interface'

// const data = [
//   { name: 'Happiness', value: 48, color: '#EAB308' },
//   { name: 'Sadness', value: 36, color: '#3B82F6' },
//   { name: 'Anger', value: 24, color: '#EF4444' },
//   { name: 'Fear', value: 18, color: '#A855F7' },
//   { name: 'Surprise', value: 15, color: '#22C55E' },
//   { name: 'Disgust', value: 9, color: '#10B981' }
// ]

type ValueType = string | number | Array<string | number>

interface EmotionDistributionChartProps {
  emotionSummary: EmotionSummary[]
}

export function EmotionDistributionChart({ emotionSummary }: EmotionDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={emotionSummary}
          cx="50%"
          cy="50%"
          className='text-xs'
          innerRadius={20}
          outerRadius={80}
          paddingAngle={1}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={true}
        >
          {emotionSummary.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: ValueType) => {
            if (typeof value === 'string' || typeof value === 'number') {
              return [`${value} occurrences`, 'Count']
            }
            return ['Invalid value', 'Count']
          }}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
