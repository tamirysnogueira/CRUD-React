const { validationPrismaClient, hasEmptyValues, userAndPasswordExist } = require('./validationsController.js')
const { User } = require('../models/User.js')

const jwt = require('jsonwebtoken')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function verifyDataUser(req, res) {
    const userData = req.body
    console.log(userData)

    //hasEmptyValues verifica se há alguma propriedade vazia e se o email é válido
    if (hasEmptyValues(userData)) {
        try {
            await User(userData)
            return res.status(201).json("User created with success")

        } catch (err) {
            //verifica o tipo de erro do Prisma
            const descriptionOfError = validationPrismaClient(err)
            return res.status(400).json(descriptionOfError)
        }

    } else {
        const errorMessage = ("The 'name', 'email' and 'password' fields are required and cannot be empty and email can be valid")
        return res.status(400).json(errorMessage)
    }
}

async function login(req, res) {
    const userData = req.body

    if (hasEmptyValues(userData)) {
        const { email, password } = req.body

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            })

            //userAndPasswordExist irá verificar se existe algum usuário com o email
            //da requisição, se houver, argon irá verificar se a senha da requisição
            //é a mesma do bd. Caso não dê nenhum erro, irá ser feito o token do usuário
            await userAndPasswordExist(user, password)
    
            const token = jwt.sign({_id: user.id, email: user.email}, process.env.TOKEN_SECRET)
    
            res.status(201).json(token)
            
        } catch (error) {
            res.status(400).json(error.message)
        }

    } else {
        const errorMessage = ("The 'name', 'email' and 'password' fields are required and cannot be empty and email can be valid")
        return res.status(400).json(errorMessage)
    }
}

async function myProfile (req, res) {
    const email = req.user.email

    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            email: true,
            name: true
        }
    })

    return res.status(200).json(user)
}

module.exports = { verifyDataUser, login, myProfile }

