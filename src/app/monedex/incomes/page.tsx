import { IncomeForm } from '@/components/monedex/dashboard/income-form'
import { PlaceForm } from '@/components/monedex/dashboard/place-form'

export default function FormsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 bg-darkBlue-900">
      <h1 className="text-3xl font-bold text-darkBlue-100 mb-6">Financial Management Forms</h1>
      <div className="space-y-8">
        <PlaceForm />
        <IncomeForm />
      </div>
    </div>
  )
}
