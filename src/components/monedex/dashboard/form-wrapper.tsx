import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface FormWrapperProps {
  title: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}

export function FormWrapper({ title, children, onSubmit, onCancel }: FormWrapperProps) {
  return (
    <Card className="w-full max-w-lg mx-auto bg-monedex-background text-monedex-foreground">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-monedex-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="bg-monedex-background text-monedex-primary border-monedex-primary hover:bg-monedex-primary hover:text-monedex-background"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-monedex-primary text-monedex-background hover:bg-monedex-secondary"
          >
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
