import { NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data = await request.json()

    // se marca el appointment como complete
    await prisma.appointment.update({
      where: {
        id: data.appointment_id
      },
      data: {
        is_active: false
      }
    })

    await prisma.cancelledAppointment.create({
      data: {
        details: data.details,
        cancelled_by: data.cancelled_by,
        customer_id: data.customer_id,
        appointment_id: data.appointment_id
      }
    })

    return NextResponse.json(
      {
        message: 'Cita cancelada'
      },
      {
        status: 201
      }
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 400
        }
      )
    }

    return NextResponse.json(
      {
        message: 'Error inesperado. Intente nuevamente'
      },
      {
        status: 500
      }
    )
  }
}
