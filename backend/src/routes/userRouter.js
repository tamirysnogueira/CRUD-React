const {verifyDataUser, login, myProfile} = require('../controllers/userController.js')
const {auth} = require('../middleware/auth.js')

const userRoutes = require('express').Router()

userRoutes.post('/makeUser', verifyDataUser)
userRoutes.post('/login', login)
userRoutes.get('/myProfile', auth, myProfile)

module.exports = userRoutes