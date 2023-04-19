const {getUsers, makeUser, updateDataUser ,deleteUser} = require('./controllers/controllerRoutes.js')

const express = require('express')
const userRoutes = express.Router()

userRoutes.get('/showUsers', getUsers)

userRoutes.post('/makeUser', makeUser)

userRoutes.put('/updateDataUser', updateDataUser)

userRoutes.delete('/deleteUser', deleteUser)

module.exports = userRoutes