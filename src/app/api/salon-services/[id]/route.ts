import { NextResponse } from 'next/server'
import { type Params } from '@/interfaces/Props'
import prisma from '@/libs/prisma'

export async function GET(
  request: Request,
  { id }: Params
): Promise<NextResponse> {
  try {
    const salonService = await prisma.salonService.findFirst({
      where: {
        id: Number(id)
      }
    })

    if (salonService === null) {
      return NextResponse.json(
        {
          message: 'User not found.'
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json({
      id: salonService.id,
      name: salonService.name,
      price: salonService.price,
      description: salonService.description
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

export async function DELETE(
  request: Request,
  { id }: Params
): Promise<NextResponse> {
  const userFound = await prisma.salonService.findFirst({
    where: {
      id: Number(id)
    }
  })

  if (userFound == null) {
    return NextResponse.json(
      {
        message: 'User not found'
      },
      {
        status: 404
      }
    )
  }

  const salonServiceDelete = await prisma.salonService.delete({
    where: {
      id: Number(id)
    }
  })

  return NextResponse.json({
    id: salonServiceDelete.id,
    name: salonServiceDelete.name
  })
}

export async function PUT(
  request: Request,
  { id }: Params
): Promise<NextResponse> {
  try {
    const salonServiceFound = await prisma.salonService.findFirst({
      where: {
        id: Number(id)
      }
    })

    if (salonServiceFound == null) {
      return NextResponse.json(
        {
          message: 'User not found'
        },
        {
          status: 404
        }
      )
    }

    const body = await request.json()

    // Filtrar solo los campos presentes en el cuerpo de la solicitud
    const allowedFields = ['name', 'description', 'category', 'price']

    const dataToUpdate = Object.keys(body.user)
      .filter((key) => allowedFields.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: body.user[key] }), {})

    await prisma.salonService.update({
      where: {
        id: Number(id)
      },
      data: dataToUpdate
    })

    return NextResponse.json({
      message: 'edit single user'
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
