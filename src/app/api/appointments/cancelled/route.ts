import { type CancelledAppointment } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getUserSessionServer } from '@/actions'
import prisma from '@/libs/prisma'

export async function GET(): Promise<NextResponse> {
  try {
    const userSession = await getUserSessionServer()

    const user = await prisma.user.findFirst({
      where: {
        email: userSession?.email
      }
    })

    if (user?.role === 'admin') {
      const appointmentsCancelled: CancelledAppointment[] =
        await prisma.cancelledAppointment.findMany({})

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
      return NextResponse.json({
        message: error.message
      })
    }

    return NextResponse.json({
      message: 'Unknown error occurred'
    })
  }
}
