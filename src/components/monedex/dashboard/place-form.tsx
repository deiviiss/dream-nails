'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormWrapper } from './form-wrapper'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface PlaceFormData {
  name: string
  description: string
}

export function PlaceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<PlaceFormData>()

  const onSubmit = async (data: PlaceFormData) => {
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
      title="Add New Place"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => { console.log('Cancelled') }}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-darkBlue-200">Name</Label>
          <Input
            id="name"
            className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600"
            placeholder="Enter place name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="description" className="text-darkBlue-200">Description</Label>
          <Textarea
            id="description"
            className="bg-darkBlue-700 text-darkBlue-100 border-darkBlue-600"
            placeholder="Enter place description (optional)"
            {...register('description')}
          />
        </div>
      </div>
    </FormWrapper>
  )
}
