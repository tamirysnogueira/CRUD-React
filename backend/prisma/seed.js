const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const argon2 = require('argon2')

async function main() {
    const password = await argon2.hash(process.env.PASSWORD_ADMIN)
    
  await prisma.user.upsert({
    where: { email: 'admin@hotmail.com' },
    update: {},
    create: {
      email: 'admin@hotmail.com',
      name: 'Administrador',
      password: password
    },
  })

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