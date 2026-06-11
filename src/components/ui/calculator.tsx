'use client'

import { Delete, X } from 'lucide-react'
import { evaluate } from 'mathjs'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CalculatorProps {
  onResult: (value: number) => void
  initialValue?: string
  onClose?: () => void
  className?: string
}

export function Calculator({ onResult, initialValue, onClose, className }: CalculatorProps) {
  const [expression, setExpression] = useState(initialValue && initialValue !== '' ? initialValue : '0')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (initialValue && initialValue !== '') {
      setExpression(initialValue)
    } else {
      setExpression('0')
    }
  }, [initialValue])

  const handlePress = (val: string) => {
    if (error) {
      setExpression(val)
      setError(false)
      return
    }
    setExpression((prev) => {
      if (prev === '0' && val !== '.') {
        return val
      }
      if (prev.length > 20) return prev
      return prev + val
    })
  }

  const handleClear = () => {
    setExpression('0')
    setError(false)
  }

  const handleBackspace = () => {
    if (error) {
      handleClear()
      return
    }
    setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))
  }

  const handleEqual = () => {
    try {
      const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/')
      const result = evaluate(sanitizedExpression)
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        const resultString = Number(result.toFixed(2)).toString()
        setExpression(resultString)
        onResult(Number(resultString))
        setError(false)
      } else {
        setError(true)
      }
    } catch (e) {
      setError(true)
    }
  }

  const btnClass = 'text-lg font-medium flex-1 min-h-0'
  const actionBtnClass = 'text-lg font-medium flex-1 min-h-0 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
  const accentBtnClass = 'text-lg font-medium flex-1 min-h-0 bg-blue-500 hover:bg-blue-600 text-white'

  return (
    <div className={cn('w-full flex flex-col h-full p-3 bg-white dark:bg-slate-950 rounded-t-xl shadow-sm border border-slate-200 dark:border-slate-800', className)}>
      {/* Header with close button */}
      {onClose && (
        <div className='flex justify-end mb-1'>
          <button
            type='button'
            onClick={onClose}
            className='p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
          >
            <X className='w-5 h-5 text-slate-500' />
          </button>
        </div>
      )}

      {/* Display */}
      <div className='mb-2 p-3 text-right bg-slate-50 dark:bg-slate-900 rounded-lg min-h-[56px] flex flex-col justify-center overflow-x-auto border border-slate-100 dark:border-slate-800'>
        <div className={`text-2xl font-semibold tracking-tight ${error ? 'text-red-500' : 'text-slate-900 dark:text-slate-50'}`}>
          {error ? 'Error' : expression}
        </div>
      </div>

      {/* Button grid - fills remaining space */}
      <div className='grid grid-cols-4 gap-1.5 flex-1'>
        <Button type='button' variant='outline' className={actionBtnClass} onClick={handleClear}>C</Button>
        <Button type='button' variant='outline' className={actionBtnClass} onClick={handleBackspace}>
          <Delete className='w-5 h-5' />
        </Button>
        <Button type='button' variant='outline' className={actionBtnClass} onClick={() => { handlePress('÷') }}>÷</Button>
        <Button type='button' variant='outline' className={actionBtnClass} onClick={() => { handlePress('×') }}>×</Button>

        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('7') }}>7</Button>
        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('8') }}>8</Button>
        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('9') }}>9</Button>
        <Button type='button' variant='outline' className={actionBtnClass} onClick={() => { handlePress('-') }}>-</Button>

        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('4') }}>4</Button>
        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('5') }}>5</Button>
        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('6') }}>6</Button>
        <Button type='button' variant='outline' className={actionBtnClass} onClick={() => { handlePress('+') }}>+</Button>

        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('1') }}>1</Button>
        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('2') }}>2</Button>
        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('3') }}>3</Button>
        <Button type='button' variant='default' className={`${accentBtnClass} row-span-2`} onClick={handleEqual}>=</Button>

        <Button type='button' variant='outline' className={`${btnClass} col-span-2`} onClick={() => { handlePress('0') }}>0</Button>
        <Button type='button' variant='outline' className={btnClass} onClick={() => { handlePress('.') }}>.</Button>
      </div>
    </div>
  )
}
