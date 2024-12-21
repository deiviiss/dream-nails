import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const categories = [
  { name: 'Food', amount: 500, highlight: 'most' },
  { name: 'Rent', amount: 1000 },
  { name: 'Utilities', amount: 300 },
  { name: 'Transportation', amount: 200, highlight: 'least' },
  { name: 'Entertainment', amount: 500 }
]

export function CategoryInsights() {
  return (
    <Card className="bg-darkBlue-800 border-darkBlue-700">
      <CardHeader>
        <CardTitle className="text-darkBlue-100">Insights por Categoría</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className={`flex justify-between items-center p-2 rounded ${category.highlight === 'most'
                ? 'bg-darkBlue-700'
                : category.highlight === 'least'
                  ? 'bg-darkBlue-600'
                  : ''
                }`}
            >
              <span className="text-darkBlue-100">{category.name}</span>
              <span className="font-bold text-darkBlue-200">${category.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
