'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import { BsCashStack } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { FaRegCreditCard } from 'react-icons/fa6'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { ButtonBack } from '@/components/monedex/button-back'
import { ButtonSaved } from '@/components/monedex/button-saved'
import { Calculator } from '@/components/ui/calculator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { type Category } from '@/interfaces/Category'
import { type WalletOption } from '@/interfaces/wallet.interface'
import { createExpense } from '@/lib/actions'

/** Returns the appropriate icon based on wallet type */
function WalletTypeIcon({ type }: { type: WalletOption['type'] }) {
  if (type === 'cash') return <BsCashStack className='h-4 w-4 inline ml-1' />
  return <FaRegCreditCard className='h-4 w-4 inline ml-1' />
}

export default function Form({
  categories,
  wallets
}: {
  categories: Category[]
  wallets: WalletOption[]
}): JSX.Element {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createExpense, initialState)

  const currentDate = new Date().toISOString().split('T')[0]

  const [amountValue, setAmountValue] = useState('')
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null)

  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wallet = wallets.find(w => w.id === Number(e.target.value)) ?? null
    setSelectedWallet(wallet)
  }

  return (
    <form action={dispatch}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6 max-w-2xl w-full mx-auto'>

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
              />
              <MdOutlineLocalGroceryStore className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='name-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
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
              <Popover open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
                <PopoverTrigger asChild>
                  <input
                    id="amount"
                    name="amount"
                    type="text"
                    readOnly
                    value={amountValue}
                    placeholder="Ingresa la cantidad"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 cursor-pointer bg-white"
                    aria-describedby="amount-error"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calculator
                    initialValue={amountValue}
                    onResult={(val) => {
                      setAmountValue(val.toString())
                      setIsCalculatorOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FaDollarSign className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 z-10' />
            </div>
          </div>
          <div id='amount-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))}
          </div>
        </div>

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
              defaultValue=''
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
          {selectedWallet && (
            <span className='mt-1 inline-flex items-center text-xs text-gray-500'>
              Tipo: {selectedWallet.type}
              <WalletTypeIcon type={selectedWallet.type} />
            </span>
          )}

          {/* Hidden field — sends the wallet type as method (derived from the selected wallet) */}
          <input type='hidden' name='method' value={selectedWallet?.type ?? ''} />

          <div id='walletId-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.method &&
              state.errors.method.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
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
              defaultValue=''
              aria-describedby='category-error'
            >
              <option value='' disabled>Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <TbCategory className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='category-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.categoryId &&
              state.errors.categoryId.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
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
                defaultValue={currentDate}
                aria-describedby='expenseDate-error'
              />
              <MdCalendarMonth className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div id='expenseDate-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.expenseDate &&
              state.errors.expenseDate.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
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
            />
          </div>
        </div>

        {/* Global error message */}
        <div id='message-error' aria-live='polite' aria-atomic='true'>
          {state.message && (
            <p className='mt-2 text-sm text-red-500'>{state.message}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className='mt-6 flex w-full justify-end text-left gap-4'>
          <ButtonBack variant='destructive' name='Cancelar' className='text-monedex-light' />
          <ButtonSaved
            className='text-monedex-light bg-monedex-tertiary hover:bg-monedex-tertiary/90'
            name='Agregar gasto'
          />
        </div>

      </div>
    </form>
  )
}
