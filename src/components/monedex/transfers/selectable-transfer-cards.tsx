'use client'

import type { Transfer } from '@prisma/client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegTrashAlt } from 'react-icons/fa'
import { deleteTransfer } from '@/actions/monedex/transfers/transfers-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/helpers'

// Adjust interface based on what the page.tsx provides
interface TransferWithWallets extends Transfer {
  fromWallet?: { name: string } | null
  toWallet?: { name: string } | null
}

export default function SelectableTransferCards({ transfers }: { transfers: TransferWithWallets[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleDelete = (tItem: TransferWithWallets) => (e: React.MouseEvent) => {
    e.stopPropagation()

    toast(
      (toastObj) => (
        <div className="space-y-3 p-1">
          <p className="text-sm font-medium text-gray-900">
            ¿Seguro que deseas borrar la transferencia de <strong>{formatCurrency(tItem.amount)}</strong>?
          </p>
          <p className="text-xs text-gray-500">
            Se revertirán los saldos de las carteras ({tItem.fromWallet?.name || 'Origen'} y {tItem.toWallet?.name || 'Destino'}).
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.dismiss(toastObj.id)
              }}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                toast.dismiss(toastObj.id)
                setDeletingId(tItem.id)
                const res = await deleteTransfer(tItem.id)
                setDeletingId(null)
                if (res.ok) {
                  toast.success(res.message || 'Transferencia eliminada y saldos revertidos.')
                  setSelectedIds((prev) => {
                    const next = new Set(prev)
                    next.delete(tItem.id)
                    return next
                  })
                } else {
                  toast.error(res.message || 'Error al eliminar la transferencia.')
                }
              }}
            >
              Eliminar
            </Button>
          </div>
        </div>
      ),
      {
        duration: 6000
      }
    )
  }

  const selectedTransfers = transfers.filter((t) => selectedIds.has(t.id))
  const totalSelected = selectedTransfers.length
  const totalAmount = selectedTransfers.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="relative h-full overflow-y-auto pb-20">
      {/* Selection summary */}
      {totalSelected > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-4 mb-4 md:mx-auto md:max-w-2xl rounded-md bg-blue-50 p-4 border border-blue-200 shadow-md">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-blue-900">
                {totalSelected} {totalSelected === 1 ? 'transferencia seleccionada' : 'transferencias seleccionadas'}
              </p>
              <p className="text-lg font-bold text-blue-900">{formatCurrency(totalAmount)}</p>
            </div>
            <Button
              variant="link"
              onClick={() => { setSelectedIds(new Set()) }}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Limpiar selección
            </Button>
          </div>
        </div>
      )}

      {/* Transfer cards */}
      <div className="space-y-4">
        {transfers.map((t) => {
          const isSelected = selectedIds.has(t.id)
          const isDeleting = deletingId === t.id

          return (
            <Card
              key={t.id}
              onClick={() => { toggleSelection(t.id) }}
              className={`overflow-hidden cursor-pointer transition-all ${isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'hover:border-gray-300'} ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className={`font-medium ${isSelected ? 'text-blue-900' : ''}`}>
                      {t.description || 'Sin descripción'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(t.transfer_date).toLocaleDateString()} • De {t.fromWallet?.name} a {t.toWallet?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`text-lg font-semibold ${isSelected ? 'text-blue-700' : ''}`}>
                      {formatCurrency(t.amount)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full h-8 w-8 p-0"
                      onClick={handleDelete(t)}
                      title="Eliminar y revertir transferencia"
                    >
                      <FaRegTrashAlt className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
