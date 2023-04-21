const {verifyDataUser} = require('../controllers/userController.js')

const express = require('express')
const userRoutes = express.Router()

userRoutes.post('/makeUser', verifyDataUser)

module.exports = userRoutes