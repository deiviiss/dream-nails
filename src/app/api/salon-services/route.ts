import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET(): Promise<NextResponse> {
  try {
    const salonServices = await prisma.salonService.findMany()
    return NextResponse.json(salonServices)
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
