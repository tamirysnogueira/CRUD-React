const { validationPrismaClient } = require('./validations.js')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getUsers (req, res) {
    const allUsers = await prisma.user.findMany()
    return res.status(200).json(allUsers)
}

async function makeUser (req, res) {
    const data = req.body

    //verifica se alguma propriedade está vazia
    const hasEmptyValues = Object.values(data).every(value => value.trim() !== '')

    if(hasEmptyValues){
        try {
            const {name, email, password} = data
            const createNewUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            })
    
            res.status(201).json(createNewUser)
            
        } catch (err) {
            //verifica o tipo de erro do Prisma
            const descriptionOfError = validationPrismaClient(err)
            return res.status(400).json(descriptionOfError)
        }

    } else {
        return res.status(400).json("The 'name', 'email' and 'password' fields are required and cannot be empty.")
    }
}

async function updateDataUser(req, res) {
    const {name, id, email} = req.body

    try {
        const updateUser = await prisma.user.update({
            where: {
                id: Number(id)
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
        const {id} = req.body
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id)
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
    makeUser,
    updateDataUser,
    deleteUser
}

