const express = require('express')
const cors = require('cors')

const userRoutes = require('./src/routes/userRouter')
const adminRoutes = require('./src/routes/adminRouter')

const app = express()

app.use(express.json()) 
app.use(cors())

app.use(userRoutes)
app.use('/admin', adminRoutes)



app.listen(3333, () => console.log('start'))