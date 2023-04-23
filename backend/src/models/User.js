const argon2 = require('argon2')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function User(userData) {
    const { name, email, password } = userData

    return prisma.user.create({
      data: {
        name,
        email,
        //argon irá criptografar a senha do usuário
        password: await argon2.hash(password)
      }
    })
}

module.exports = {User}