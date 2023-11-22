import { type CancelledAppointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(): Promise<NextResponse> {
  try {
    const session = await getServerSession()

    // ? La sessión no tiene el email del usuario, se tuvo que agregar en el middleware
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user.email
      }
    })

    if (user?.role === 'admin') {
      const appointmentsCancelled: CancelledAppointment[] = await prisma.cancelledAppointment.findMany({})

      return NextResponse.json(appointmentsCancelled)
    }

    if (user?.role === 'stylist') {
      const appointmentsCancelled = await prisma.cancelledAppointment.findMany({
        where: {
          Customer: {
            StylistAssignment: {
              some: {
                user_id: user.id
              }
            }
          }
        },
        include: {
          Customer: true
        }
      })

      return NextResponse.json(appointmentsCancelled)
    }

    return NextResponse.json({
      message: 'No tienes permisos para realizar esta acción'
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log('error api', error)
      return NextResponse.json({
        message: error.message
      })
    }

    return NextResponse.json({
      message: 'Unknown error occurred'
    })
  }
}
