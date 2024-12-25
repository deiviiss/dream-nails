'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

export const deletePlaceById = async (id: number) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Se requiere permisos de administrador'
    }
  }

  try {
    await prisma.place.delete({
      where: { id }
    })

    revalidatePath('/monedex/places')

    return {
      ok: true,
      message: 'Lugar eliminado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al desactivar el pedido, contacta a soporte'
    }
  }
}
