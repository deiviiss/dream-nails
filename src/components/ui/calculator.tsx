'use client'

import React, { useState, useEffect } from 'react'
import { evaluate } from 'mathjs'
import { Button } from '@/components/ui/button'
import { Delete } from 'lucide-react'

interface CalculatorProps {
  onResult: (value: number) => void
  initialValue?: string
}

export function Calculator({ onResult, initialValue }: CalculatorProps) {
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
      if (typeof result === 'number' && isNaN(result) === false && isFinite(result)) {
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

  const btnClass = 'text-lg font-medium py-6'
  const actionBtnClass = 'text-lg font-medium py-6 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
  const accentBtnClass = 'text-lg font-medium py-6 bg-blue-500 hover:bg-blue-600 text-white'

  return (
    <div className='w-full max-w-sm mx-auto p-4 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800'>
      <div className='mb-4 p-4 text-right bg-slate-50 dark:bg-slate-900 rounded-lg min-h-[80px] flex flex-col justify-center overflow-x-auto border border-slate-100 dark:border-slate-800'>
        <div className={`text-3xl font-semibold tracking-tight ${error ? 'text-red-500' : 'text-slate-900 dark:text-slate-50'}`}>
          {error ? 'Error' : expression}
        </div>
      </div>

      <div className='grid grid-cols-4 gap-2'>
        <Button variant='outline' className={actionBtnClass} onClick={handleClear}>C</Button>
        <Button variant='outline' className={actionBtnClass} onClick={handleBackspace}>
          <Delete className='w-5 h-5' />
        </Button>
        <Button variant='outline' className={actionBtnClass} onClick={() => handlePress('÷')}>÷</Button>
        <Button variant='outline' className={actionBtnClass} onClick={() => handlePress('×')}>×</Button>

        <Button variant='outline' className={btnClass} onClick={() => handlePress('7')}>7</Button>
        <Button variant='outline' className={btnClass} onClick={() => handlePress('8')}>8</Button>
        <Button variant='outline' className={btnClass} onClick={() => handlePress('9')}>9</Button>
        <Button variant='outline' className={actionBtnClass} onClick={() => handlePress('-')}>-</Button>

        <Button variant='outline' className={btnClass} onClick={() => handlePress('4')}>4</Button>
        <Button variant='outline' className={btnClass} onClick={() => handlePress('5')}>5</Button>
        <Button variant='outline' className={btnClass} onClick={() => handlePress('6')}>6</Button>
        <Button variant='outline' className={actionBtnClass} onClick={() => handlePress('+')}>+</Button>

        <Button variant='outline' className={btnClass} onClick={() => handlePress('1')}>1</Button>
        <Button variant='outline' className={btnClass} onClick={() => handlePress('2')}>2</Button>
        <Button variant='outline' className={btnClass} onClick={() => handlePress('3')}>3</Button>
        <Button variant='default' className={`${accentBtnClass} row-span-2 h-full`} onClick={handleEqual}>=</Button>

        <Button variant='outline' className={`${btnClass} col-span-2`} onClick={() => handlePress('0')}>0</Button>
        <Button variant='outline' className={btnClass} onClick={() => handlePress('.')}>.</Button>
      </div>
    </div>
  )
}
