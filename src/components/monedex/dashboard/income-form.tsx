'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FormWrapper } from './form-wrapper'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface IncomeFormData {
  name: string
  amount: number
  method: string
  incomeDate: Date
  category: string
  user: string
}

// Mock data for categories and users
const categories = ['Salary', 'Freelance', 'Investment', 'Other']
const users = ['John Doe', 'Jane Smith', 'Alice Johnson']

export function IncomeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm<IncomeFormData>({
    defaultValues: {
      incomeDate: new Date()
    }
  })

  const onSubmit = async (data: IncomeFormData) => {
    console.log(isSubmitting)
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log(data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <FormWrapper
      title="Add New Income"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => { console.log('Cancelled') }}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-darkBlue-200">Name</Label>
          <Input
            id="name"
            className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600"
            placeholder="Enter income name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="amount" className="text-darkBlue-200">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600"
            placeholder="Enter amount"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be at least 0.01' }
            })}
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
        </div>
        <div>
          <Label htmlFor="method" className="text-darkBlue-200">Method</Label>
          <Controller
            name="method"
            control={control}
            rules={{ required: 'Method is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-darkBlue-700 text-darkBlue-100">
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.method && <p className="text-red-500 text-sm mt-1">{errors.method.message}</p>}
        </div>
        <div>
          <Label htmlFor="incomeDate" className="text-darkBlue-200">Income Date</Label>
          <Controller
            name="incomeDate"
            control={control}
            rules={{ required: 'Income date is required' }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-darkBlue-700" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.incomeDate && <p className="text-red-500 text-sm mt-1">{errors.incomeDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="category" className="text-darkBlue-200">Category</Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-darkBlue-700 text-darkBlue-100">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <Label htmlFor="user" className="text-darkBlue-200">User</Label>
          <Controller
            name="user"
            control={control}
            rules={{ required: 'User is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent className="bg-darkBlue-700 text-darkBlue-100">
                  {users.map((user) => (
                    <SelectItem key={user} value={user.toLowerCase().replace(' ', '-')}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.user && <p className="text-red-500 text-sm mt-1">{errors.user.message}</p>}
        </div>
      </div>
    </FormWrapper>
  )
}
