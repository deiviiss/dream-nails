'use client'

import { evaluate } from 'mathjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { FaDollarSign } from 'react-icons/fa'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { ButtonBack } from '@/components/monedex/button-back'
import { ButtonSaved } from '@/components/monedex/button-saved'
import { Calculator } from '@/components/ui/calculator'
import { type Category } from '@/interfaces/Category'
import { type ExpenseForm } from '@/interfaces/Expense'
import { type WalletOption } from '@/interfaces/wallet.interface'
import { updateExpense } from '@/lib/actions'

/** Returns the appropriate icon based on wallet type */
// function WalletTypeIcon({ type }: { type: WalletOption['type'] }) {
//   if (type === 'cash') return <BsCashStack className='h-4 w-4 inline ml-1' />
//   return <FaRegCreditCard className='h-4 w-4 inline ml-1' />
// }

export default function EditExpenseForm({
  expense,
  categories,
  places,
  wallets
}: {
  expense: ExpenseForm
  categories: Category[]
  places: Array<{ id: number, name: string }>
  wallets: WalletOption[]
}): JSX.Element {
  const router = useRouter()
  const updateExpenseWithId = updateExpense.bind(null, Number(expense.id))
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateExpenseWithId, initialState)

  const [amountValue, setAmountValue] = useState(expense.amount.toString())
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  // Pre-select the wallet currently linked to this expense
  const initialWallet = wallets.find(w => w.id === expense.wallet_id) ?? null
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(initialWallet)

  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wallet = wallets.find(w => w.id === Number(e.target.value)) ?? null
    setSelectedWallet(wallet)
  }

  useEffect(() => {
    if (state.message === 'Updated expense') {
      router.back()
    }
  }, [state])

  return (
    <form action={dispatch}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>

        {/* Name */}
        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block text-sm font-medium'>
            Escribe el nombre del gasto
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='name'
                name='name'
                type='text'
                placeholder='Ingresa el gasto'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='name-error'
                defaultValue={expense.name}
              />
              <MdOutlineLocalGroceryStore className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='name-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.name?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`name:${error}`}>{error}</p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className='mb-4'>
          <label htmlFor='amount' className='mb-2 block text-sm font-medium'>
            Elige una cantidad
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              {/* Mobile input: readOnly, opens calculator */}
              <input
                id='amount-mobile'
                name='amount'
                type='text'
                readOnly
                placeholder='Ingresa la cantidad'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 cursor-pointer bg-white md:hidden'
                aria-describedby='amount-error'
                value={amountValue}
                onClick={() => { setIsCalculatorOpen(true) }}
              />
              {/* Desktop input: editable, supports expressions */}
              <input
                id='amount'
                name='amount'
                type='text'
                placeholder='Ingresa la cantidad (ej: 100+50)'
                className='peer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 bg-white hidden md:block'
                aria-describedby='amount-error'
                value={amountValue}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === '' || /^[\d+\-*/.() ]*$/.test(val)) {
                    setAmountValue(val)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    try {
                      const result = evaluate(e.currentTarget.value)
                      if (typeof result === 'number' && isFinite(result)) {
                        setAmountValue(Number(result.toFixed(2)).toString())
                      }
                    } catch { /* ignore */ }
                  }
                }}
                onBlur={(e) => {
                  try {
                    const result = evaluate(e.currentTarget.value)
                    if (typeof result === 'number' && isFinite(result)) {
                      setAmountValue(Number(result.toFixed(2)).toString())
                    }
                  } catch { /* ignore */ }
                }}
              />
              <FaDollarSign className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 z-10' />
            </div>
          </div>
          <div id='amount-error' aria-live='polite' aria-atomic='true'>
            {state?.errors?.amount?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`amount:${error}`}>{error}</p>
            ))}
          </div>
        </div>

        {/* Calculator bottom sheet - mobile only */}
        {isCalculatorOpen && (
          <>
            <div
              className='fixed inset-0 bg-black/30 z-40 md:hidden'
              onClick={() => { setIsCalculatorOpen(false) }}
            />
            <div className='fixed bottom-0 inset-x-0 h-[50vh] z-50 md:hidden'>
              <Calculator
                initialValue={amountValue}
                onClose={() => { setIsCalculatorOpen(false) }}
                onResult={(val) => {
                  setAmountValue(val.toString())
                  setIsCalculatorOpen(false)
                }}
              />
            </div>
          </>
        )}

        {/* Wallet selector — replaces hardcoded cash/debit radio buttons */}
        <div className='mb-4'>
          <label htmlFor='walletId' className='mb-2 block text-sm font-medium'>
            Selecciona una cartera
          </label>
          <div className='relative'>
            <select
              id='walletId'
              name='walletId'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              defaultValue={expense.wallet_id ?? ''}
              aria-describedby='walletId-error'
              onChange={handleWalletChange}
            >
              <option value='' disabled>Selecciona una cartera</option>
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
              ))}
            </select>
            <IoWalletOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>

          {/* Visual indicator of the selected wallet type */}
          {/* {selectedWallet && (
            <span className='mt-1 inline-flex items-center text-xs text-gray-500'>
              Tipo: {selectedWallet.type}
              <WalletTypeIcon type={selectedWallet.type} />
            </span>
          )} */}

          {/* Hidden field — sends the wallet type as method (derived from the selected wallet) */}
          <input type='hidden' name='method' value={selectedWallet?.type ?? ''} />

          <div id='walletId-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.method?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`method:${error}`}>{error}</p>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className='mb-4'>
          <label htmlFor='category' className='mb-2 block text-sm font-medium'>
            Elige una categoría
          </label>
          <div className='relative'>
            <select
              id='category'
              name='categoryId'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='category-error'
              defaultValue={expense.expense_category_id}
            >
              <option value='' disabled>Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <TbCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='category-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.categoryId?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`category:${error}`}>{error}</p>
            ))}
          </div>
        </div>

        {/* Place */}
        <div className='mb-4'>
          <label htmlFor='place' className='mb-2 block text-sm font-medium'>
            Elige un lugar
          </label>
          <div className='relative'>
            <select
              id='place'
              name='placeId'
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='place-error'
              defaultValue={expense.place_id}
            >
              <option value='' disabled>Selecciona un lugar</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>{place.name}</option>
              ))}
            </select>
            <TbCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='place-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.placeId?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`place:${error}`}>{error}</p>
            ))}
          </div>
        </div>

        {/* Expense date */}
        <div className='mb-4'>
          <label htmlFor='expenseDate' className='mb-2 block text-sm font-medium'>
            Indica la fecha del gasto
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='expenseDate'
                name='expenseDate'
                type='date'
                placeholder='Ingresa la fecha'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='expenseDate-error'
                defaultValue={expense.expense_date.toISOString().split('T')[0]}
              />
              <MdCalendarMonth className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='expenseDate-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.expenseDate?.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={`expenseDate:${error}`}>{error}</p>
            ))}
          </div>
        </div>

        {/* With relation */}
        <div className='mb-4'>
          <div className='flex items-center gap-2'>
            <label htmlFor='withRelation' className='block text-sm font-medium'>
              Con relación:
            </label>
            <input
              id='withRelation'
              name='withRelation'
              type='checkbox'
              aria-describedby='withRelation-error'
              defaultChecked={expense.is_reconciled}
            />
          </div>
        </div>

        {/* Global error message */}
        <div id='message-error' aria-live='polite' aria-atomic='true'>
          {state.message !== 'Updated expense' && (
            <p className='mt-2 text-sm text-red-500'>{state.message}</p>
          )}
        </div>

      </div>

      {/* Action buttons */}
      <div className='mt-6 flex w-full justify-end gap-4'>
        <ButtonBack variant='destructive' name='Cancelar' className='text-monedex-light' />
        <ButtonSaved
          className='text-monedex-light bg-monedex-tertiary hover:bg-monedex-tertiary/90'
          name={expense?.id ? 'Editar gasto' : 'Crear gasto'}
        />
      </div>
    </form>
  )
}
