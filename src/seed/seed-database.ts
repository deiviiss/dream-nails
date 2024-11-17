import { initialData } from './seed'
import prisma from '../lib/prisma'

const main = async () => {
  // delete all data
  await prisma.image.deleteMany()
  await prisma.user.deleteMany()

  // seed data
  const { users, images } = initialData

  // images
  await prisma.image.createMany({
    data: images
  })

  // users
  await prisma.user.createMany({
    data: users
  })

  // eslint-disable-next-line no-console
  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
}
)()
