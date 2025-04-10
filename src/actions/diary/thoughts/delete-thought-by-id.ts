'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export const deleteThoughtById = async (id: number) => {
  try {
    await prisma.thought.delete({
      where: { id }
    })

    revalidatePath('/thoughts')

    return {
      ok: true,
      message: 'Pensamiento eliminado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar el pensamiento'
    }
  }
}
