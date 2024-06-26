import { type Appointment } from '@prisma/client'
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
      const appointments: Appointment[] = await prisma.appointment.findMany({
        where: {
          is_active: true
        },
        include: {
          Customer: true
        }
      })

      return NextResponse.json(appointments)
    }

    if (user?.role === 'stylist') {
      const appointments = await prisma.appointment.findMany({
        where: {
          is_active: true,
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
      return NextResponse.json(appointments)
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

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const userSession = await getUserSessionServer()

    // ? La sessión no tiene el email del usuario, se tuvo que agregar en el middleware
    const user = await prisma.user.findFirst({
      where: {
        email: userSession?.email
      }
    })

    const { name, phone } = await request.json()

    if (name === '' || phone === '' || name === null || phone === null) {
      return NextResponse.json(
        {
          message: 'Nombre y teléfono son requeridos'
        },
        {
          status: 400
        }
      )
    }

    const customerFound = await prisma.customer.findFirst({
      where: {
        phone
      }
    })
    if (customerFound !== null) {
      return NextResponse.json(
        {
          message: 'Cliente ya existe'
        },
        {
          status: 400
        }
      )
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        phone
      }
    })

    //! Add stylist assignment
    await prisma.stylistAssignment.create({
      data: {
        customer_id: newCustomer.id,
        user_id: user?.id ?? 0
      }
    })

    return NextResponse.json(
      {
        message: 'Cliente creado exitosamente'
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
