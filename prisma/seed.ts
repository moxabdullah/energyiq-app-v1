import { PrismaClient } from '@prisma/client'
import { env } from 'process'
const prisma = new PrismaClient()
async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: env.ADMIN_PASSWORD || (() => { throw new Error('ADMIN_PASSWORD is not defined in the environment variables') })(),
    },
  })
  console.log({ admin })
}
  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })