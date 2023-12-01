import { NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

interface Params {
  params: { id: number }
}

export async function GET(
  request: Request,
  { params }: Params
): Promise<NextResponse> {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id: Number(params.id)
      },
      include: {
        Preference: true,
        Appointment: true
      }
    })

    if (customer === null) {
      return NextResponse.json(
        {
          message: 'Cliente no encontrado.'
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json({ customer })
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

export async function DELETE(
  request: Request,
  { params }: Params
): Promise<NextResponse> {
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

  const customerDelete = await prisma.customer.delete({
    where: {
      id: Number(params.id)
    },
    include: {
      StylistAssignment: true
    }
  })

  return NextResponse.json({
    id: customerDelete.id
  })
}

export async function PUT(
  request: Request,
  { params }: Params
): Promise<NextResponse> {
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
    if (
      customer.name === '' ||
      customer.phone === '' ||
      customer.name === null ||
      customer.phone === null
    ) {
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
      .filter((key) => allowedFields.includes(key))
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
