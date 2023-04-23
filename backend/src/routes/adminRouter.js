const {getUsers, deleteUser, updateDataUser} = require('../controllers/adminController')
const { auth } = require('../middleware/auth')

const express = require('express')
const adminRoutes = express.Router()

adminRoutes.get('/', auth, getUsers)
adminRoutes.delete('/deleteUser', auth, deleteUser)
adminRoutes.put('/updateDataUser', auth, updateDataUser)


module.exports = adminRoutes
