import { PrismaClient } from '@prisma/client'

declare global {
  interface Global {
    prisma: PrismaClient | undefined
  }
}

// Asignación explícita de prisma en globalThis
declare const global: Global
// Definir la variable prisma
export const prisma = global.prisma !== undefined ? global.prisma : new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
