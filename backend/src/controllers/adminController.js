const {validationPrismaClient, verifyAdmin} = require('./validationsController')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function getUsers (req, res) {
    if(!verifyAdmin(req.user.email)) {return res.status(403).json('Access denied')}

    const allUsers = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    })

    return res.status(200).json(allUsers)
}

async function updateDataUser(req, res) {
    if(!verifyAdmin(req.user.email)) {return res.status(403).json('Access denied')}

    const {name, email, id} = req.body

    try {
        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email
            }
        })

        return res.status(200).json('Successfully edited user')
        
    } catch (err) {
        //verifica o tipo de erro do Prisma
        const descriptionOfError = validationPrismaClient(err)
        return res.status(400).json(descriptionOfError)
    }
}

async function deleteUser(req, res) {
    if(!verifyAdmin(req.user.email)) {return res.status(403).json('Access denied')}

    try {
        const {email} = req.body
        
        await prisma.user.delete({
            where: {
                email
            }
        })
    
        return res.status(200).json('Successfully deleted user')
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