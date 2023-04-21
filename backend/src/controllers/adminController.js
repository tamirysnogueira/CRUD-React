const {validationPrismaClient} = require('./controllerValidations')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function getUsers (req, res) {
    const allUsers = await prisma.user.findMany({
        select: {
            email: true,
            name: true
        }
    })

    return res.status(200).json(allUsers)
}

async function updateDataUser(req, res) {
    const {name, email} = req.body

    try {
        const updateUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                name,
                email
            }
        })

        return res.status(201).json(updateUser)
        
    } catch (err) {
        //verifica o tipo de erro do Prisma
        const descriptionOfError = validationPrismaClient(err)
        return res.status(400).json(descriptionOfError)
    }
}

async function deleteUser(req, res) {
    try {
        const {email} = req.body
        const deleteUser = await prisma.user.delete({
            where: {
                email
            }
        })
    
        return res.status(201).json(deleteUser)
    } catch (e) {
        //verifica o tipo de erro do Prisma
        const descriptionOfError = validationPrismaClient(e)
        return res.status(400).json(descriptionOfError)
    }
    
}

module.exports = {
    getUsers,
    deleteUser,
    updateDataUser
}