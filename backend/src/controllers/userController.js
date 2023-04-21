const { validationPrismaClient, hasEmptyValues } = require('./controllerValidations.js')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcryptjs')

async function hashPassword(password){
    return bcrypt.hashSync(password)
}
  
async function createUser(userData) {
    const { name, email, password } = userData

    return prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password)
      }
    })
}

async function verifyDataUser (req, res) {
    const userData = req.body

    //hasEmptyValues verifica se há alguma propriedade vazia
    if(hasEmptyValues(userData)){
        try {
            const newUser = await createUser(userData)
            return res.status(201).json(newUser)
            
        } catch (err) {
            //verifica o tipo de erro do Prisma
            const descriptionOfError = validationPrismaClient(err)
            return res.status(400).json(descriptionOfError)
        }

    } else {
        const errorMessage = ("The 'name', 'email' and 'password' fields are required and cannot be empty.")
        return res.status(400).json(errorMessage)
    }
}

module.exports = {verifyDataUser}

