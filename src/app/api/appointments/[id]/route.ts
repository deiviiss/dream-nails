// import { type Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

interface Params {
  params: { id: number }
}

export async function GET(request: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await getServerSession()

    // ? La sessión no tiene el email del usuario, se tuvo que agregar en el middleware
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user.email
      }
    })

    if (user?.role === 'admin') {
      const appointment = await prisma.appointment.findFirst({
        where: {
          id: Number(params.id)
        }
      })

      if (appointment === null) {
        return NextResponse.json(
          {
            message: 'Cita no encontrada.'
          },
          {
            status: 404
          }
        )
      }

      return NextResponse.json({ appointment })
    }

    if (user?.role === 'stylist') {
      const appointment = await prisma.appointment.findFirst({
        where: {
          id: Number(params.id)
        }
      })

      if (appointment === null) {
        return NextResponse.json(
          {
            message: 'Cita no encontrada.'
          },
          {
            status: 404
          }
        )
      }

      return NextResponse.json({ appointment })
    }

    return NextResponse.json({
      message: 'No tienes permisos para realizar esta acción'
    })
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
        message: 'Unexpected error occurred.'
      },
      {
        status: 500
      }
    )
  }
}

export async function DELETE(request: Request, { params }: Params): Promise<NextResponse> {
  const appointmentFound = await prisma.appointment.findFirst({
    where: {
      id: Number(params.id)
    }
  })

  if (appointmentFound == null) {
    return NextResponse.json(
      {
        message: 'Cita no encontrada.'
      },
      {
        status: 404
      }
    )
  }

  const appointmentDelete = await prisma.appointment.delete({
    where: {
      id: Number(params.id)
    }
  })

  return NextResponse.json({
    id: appointmentDelete.id
  })
}

export async function PUT(request: Request, { params }: Params): Promise<NextResponse> {
  try {
    const customerFound = await prisma.customer.findFirst({
      where: {
        id: Number(params.id)
      }
    })

    if (customerFound == null) {
      return NextResponse.json(
        {
          message: 'Cliente no encontrado.'
        },
        {
          status: 404
        }
      )
    }

    const { customer } = await request.json()

    //! validar que el teléfono no exista
    const customerPhoneFound = await prisma.customer.findFirst({
      where: {
        phone: customer.phone
      }
    })
    if (customerPhoneFound !== null) {
      return NextResponse.json(
        {
          message: 'Teléfono no disponible.'
        },
        {
          status: 400
        }
      )
    }
    if (customer.name === '' || customer.phone === '' || customer.name === null || customer.phone === null) {
      return NextResponse.json(
        {
          message: 'Nombre y teléfono son requeridos'
        },
        {
          status: 400
        }
      )
    }

    // Filtrar solo los campos presentes en el cuerpo de la solicitud
    const allowedFields = ['name', 'phone']
    const dataToUpdate = Object.keys(customer)
      .filter(key => allowedFields.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: customer[key] }), {})

    await prisma.customer.update({
      where: {
        id: Number(params.id)
      },
      data: dataToUpdate
    })

    return NextResponse.json({
      message: 'Se ha actualizado el cliente.'
    })
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
        message: 'Unexpected error occurred.'
      },
      {
        status: 500
      }
    )
  }
}
