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
    const user = await prisma.user.findFirst({
      where: {
        id: Number(params.id)
      }
    })

    if (user === null) {
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
      id: user.id,
      email: user.email,
      role: user.role
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
  { params }: Params
): Promise<NextResponse> {
  const userFound = await prisma.user.findFirst({
    where: {
      id: Number(params.id)
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

  const userDelete = await prisma.user.delete({
    where: {
      id: Number(params.id)
    }
  })

  return NextResponse.json({
    id: userDelete.id,
    email: userDelete.email,
    role: userDelete.role
  })
}

export async function PUT(
  request: Request,
  { params }: Params
): Promise<NextResponse> {
  try {
    const userFound = await prisma.user.findFirst({
      where: {
        id: Number(params.id)
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

    const body = await request.json()
    // Filtrar solo los campos presentes en el cuerpo de la solicitud
    const allowedFields = ['email', 'password', 'role']

    const dataToUpdate = Object.keys(body.user)
      .filter((key) => allowedFields.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: body.user[key] }), {})

    await prisma.user.update({
      where: {
        id: Number(params.id)
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
