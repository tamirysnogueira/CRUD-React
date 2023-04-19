const express = require('express')
const cors = require('cors')
const userRoutes = require('./src/routes')

const app = express()

app.use(express.json()) 
app.use(cors())
app.use(userRoutes)


app.listen(3333, () => console.log('start'))