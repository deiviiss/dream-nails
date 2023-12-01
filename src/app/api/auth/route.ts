import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { email, password, role } = await request.json()

    //! CAMBIAR POR ZOD
    if (password === null || password.length < 6) {
      return NextResponse.json(
        {
          message: 'Password debe ser mayor a 6 carácteres'
        },
        {
          status: 400
        }
      )
    }

    const userFound = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (userFound !== null) {
      return NextResponse.json(
        {
          message: 'Email already exist'
        },
        {
          status: 400
        }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role
      }
    })

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
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
