'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const expenses = [
  {
    id: 1,
    name: 'Groceries',
    amount: 150.00,
    method: 'Credit Card',
    date: '2023-05-01',
    category: 'Food',
    place: 'Supermarket',
    status: 'Reconciled'
  },
  {
    id: 2,
    name: 'Electricity Bill',
    amount: 80.00,
    method: 'Bank Transfer',
    date: '2023-05-05',
    category: 'Utilities',
    place: 'Electric Company',
    status: 'Pending'
  }
  // Add more sample expenses here
]

export function ExpenseManagement() {
  const [filter, setFilter] = useState('All')

  return (
    <Card className="bg-darkBlue-800 border-darkBlue-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-darkBlue-100">Gestión de Gastos</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600">
                {filter} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-darkBlue-700 text-darkBlue-100">
              <DropdownMenuItem onSelect={() => { setFilter('All') }}>Todos</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { setFilter('Reconciled') }}>Conciliados</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { setFilter('Pending') }}>Pendientes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-darkBlue-700">
              <TableHead className="text-darkBlue-200">Nombre</TableHead>
              <TableHead className="text-darkBlue-200">Monto</TableHead>
              <TableHead className="text-darkBlue-200">Método</TableHead>
              <TableHead className="text-darkBlue-200">Fecha</TableHead>
              <TableHead className="text-darkBlue-200">Categoría</TableHead>
              <TableHead className="text-darkBlue-200">Lugar</TableHead>
              <TableHead className="text-darkBlue-200">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses
              .filter((expense) => filter === 'All' || expense.status === filter)
              .map((expense) => (
                <TableRow key={expense.id} className="border-darkBlue-700">
                  <TableCell className="text-darkBlue-100">{expense.name}</TableCell>
                  <TableCell className="text-darkBlue-100">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-darkBlue-100">{expense.method}</TableCell>
                  <TableCell className="text-darkBlue-100">{expense.date}</TableCell>
                  <TableCell className="text-darkBlue-100">{expense.category}</TableCell>
                  <TableCell className="text-darkBlue-100">{expense.place}</TableCell>
                  <TableCell className="text-darkBlue-100">{expense.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
