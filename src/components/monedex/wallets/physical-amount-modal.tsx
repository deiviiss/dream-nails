'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { IoWalletOutline } from 'react-icons/io5'
import { updateWalletPhysical } from '@/actions/monedex/wallets/update-wallet-physical'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import { type UpdateWalletPhysical } from '@/interfaces/wallet-physical.interface'

interface PhysicalAmountModalProps {
  wallets: Array<{
    id: number
    name: string
    balance: number
  }>
}

export function PhysicalAmountModal({ wallets }: PhysicalAmountModalProps) {
  const [open, setOpen] = useState(false)
  const [walletsLocal, setWalletsLocal] = useState<PhysicalAmountModalProps['wallets']>([])
  const [selectedWalletId, setSelectedWalletId] = useState<string>('')
  const [physicalAmount, setPhysicalAmount] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Fetch wallets when modal opens
  useEffect(() => {
    if (open) {
      fetchWallets()
    }
  }, [open])

  const fetchWallets = async () => {
    try {
      setWalletsLocal(wallets)
    } catch (error) {
      toast.error('Error loading wallets')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedWalletId || !physicalAmount) {
      toast.error('Please fill in all fields')
      return
    }

    const amount = parseFloat(physicalAmount)
    if (isNaN(amount) || amount < 0) {
      toast.error('Please enter a valid positive amount')
      return
    }

    setIsLoading(true)

    try {
      const data: UpdateWalletPhysical = {
        walletId: parseInt(selectedWalletId),
        physicalAmount: amount
      }

      const response = await updateWalletPhysical(data)

      if (response.ok) {
        toast.success('Physical amount updated successfully')
        setOpen(false)
        setSelectedWalletId('')
        setPhysicalAmount('')
        // Optionally refresh the page or update parent component
        window.location.reload()
      } else {
        toast.error(response.message || 'Error updating physical amount')
      }
    } catch (error) {
      toast.error('Error updating physical amount')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setSelectedWalletId('')
      setPhysicalAmount('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <IoWalletOutline className="w-4 h-4" />
          Update Physical Amount
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Physical Amount</DialogTitle>
          <DialogDescription>
            Set the physical cash amount for a wallet to compare with digital balance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wallet" className="col-span-4">
                Wallet
              </Label>
              <div className="col-span-4">
                <Select value={selectedWalletId} onValueChange={setSelectedWalletId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {walletsLocal.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id.toString()}>
                        <div className="flex items-center gap-2">
                          <span>{wallet.name}</span>
                          <span className="text-sm text-muted-foreground">
                            (${wallet.balance.toFixed(2)})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="physicalAmount" className="col-span-4">
                Physical Amount
              </Label>
              <div className="col-span-4">
                <Input
                  id="physicalAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={physicalAmount}
                  onChange={(e) => { setPhysicalAmount(e.target.value) }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => { setOpen(false) }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Physical Amount'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
