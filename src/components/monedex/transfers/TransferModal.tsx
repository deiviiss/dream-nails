'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { createUpdateTransfer } from '@/actions/monedex/transfers/transfers-actions'
import { getAllWalletsSummary } from '@/actions/monedex/wallets/get-all-wallet-summary'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface TransferModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransferModal({ open, onOpenChange }: TransferModalProps) {
  const [wallets, setWallets] = useState<Array<{ id: number, name: string }>>([])
  const [fromWalletId, setFromWalletId] = useState('')
  const [toWalletId, setToWalletId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  // Load wallets on mount
  useEffect(() => {
    const fetch = async () => {
      const { walletsSummary } = await getAllWalletsSummary({ month: new Date().getMonth() + 1 })

      if (!walletsSummary?.length) {
        return
      }

      setWallets(walletsSummary.map((w: any) => ({ id: w.id, name: w.name })))
    }
    fetch()
  }, [])

  const resetForm = () => {
    setFromWalletId('')
    setToWalletId('')
    setAmount('')
    setDescription('')
    setDate('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fromWalletId || !toWalletId || !amount) {
      toast.error('Complete todos los campos')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('amount', amount)
    formData.append('description', description)
    formData.append('fromWalletId', fromWalletId)
    formData.append('toWalletId', toWalletId)
    formData.append('transferDate', date)

    const result = await createUpdateTransfer(formData)
    if (result.ok) {
      onOpenChange(false)
      toast.success('Transferencia creada')
      resetForm()
    } else {
      toast.error(result.message || 'Error')
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Transferencia</DialogTitle>
          <DialogDescription>Ingrese los detalles de la transferencia.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fromWallet">De cartera</Label>
            <Select value={fromWalletId} onValueChange={setFromWalletId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una cartera" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map(w => (
                  <SelectItem key={w.id} value={w.id.toString()}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="toWallet">A cartera</Label>
            <Select value={toWalletId} onValueChange={setToWalletId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una cartera" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map(w => (
                  <SelectItem key={w.id} value={w.id.toString()}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Monto</Label>
            <Input id="amount" type="number" min="0" step="0.01" value={amount} onChange={e => {
              setAmount(e.target.value)
            }} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" value={description} onChange={e => {
              setDescription(e.target.value)
            }} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Fecha</Label>
            <Input id="date" type="date" value={date} onChange={e => {
              setDate(e.target.value)
            }} />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => {
                onOpenChange(false)
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>Crear</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
