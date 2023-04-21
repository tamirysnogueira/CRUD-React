const {getUsers, deleteUser, updateDataUser} = require('../controllers/adminController')

const express = require('express')
const adminRoutes = express.Router()

adminRoutes.get('/', getUsers)
adminRoutes.delete('/deleteUser', deleteUser)
adminRoutes.put('/updateDataUser', updateDataUser)


module.exports = adminRoutes
