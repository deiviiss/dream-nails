import { type Appointment } from '@prisma/client'
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
      const appointmentsComplete: Appointment[] = await prisma.appointment.findMany({
        include: {
          Customer: true
        }
      })

      console.log('appointmentsComplete', appointmentsComplete)

      // return NextResponse.json(appointmentsComplete)
      return NextResponse.json('appointmentsComplete')
    }

    // if (user?.role === 'stylist') {
    //   const appointments = await prisma.appointment.findMany({
    //     where: {
    //       Customer: {
    //         StylistAssignment: {
    //           some: {
    //             user_id: user.id
    //           }
    //         }
    //       }
    //     },
    //     include: {
    //       Customer: true
    //     }
    //   })

    //   return NextResponse.json(appointments)
    // }

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

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession()

    // ? La sessión no tiene el email del usuario, se tuvo que agregar en el middleware
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user.email
      }
    })
    console.log('user in API Appoinments Complete', user)
    // se recibe los datos del la cita completa
    // se marca el appointment como complete
    // se crea registro en tabla de visitHistory

    // const { name, phone } = await request.json()

    // if (name === '' || phone === '' || name === null || phone === null) {
    //   return NextResponse.json(
    //     {
    //       message: 'Nombre y teléfono son requeridos'
    //     },
    //     {
    //       status: 400
    //     }
    //   )
    // }

    // const customerFound = await prisma.customer.findFirst({
    //   where: {
    //     phone
    //   }
    // })
    // if (customerFound !== null) {
    //   return NextResponse.json(
    //     {
    //       message: 'Cliente ya existe'
    //     },
    //     {
    //       status: 400
    //     }
    //   )
    // }

    // const newCustomer = await prisma.customer.create({
    //   data: {
    //     name,
    //     phone
    //   }
    // })

    // //! Add stylist assignment
    // await prisma.stylistAssignment.create({
    //   data: {
    //     customer_id: newCustomer.id,
    //     user_id: user?.id ?? 0
    //   }
    // })

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