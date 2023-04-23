const {verifyDataUser, login} = require('../controllers/userController.js')

const userRoutes = require('express').Router()

userRoutes.post('/makeUser', verifyDataUser)
userRoutes.post('/login', login)

module.exports = userRoutes