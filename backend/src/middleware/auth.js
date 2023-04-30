const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    const token = req.header('Authorization')

    if(!token) {return res.status(403).json('Access Denied, you re not logged, here')}
    
    try {
        //verifica se é o token de nossa aplicação
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified

        next()
    } catch (error) {
        res.status(401).json('Access denied')
    }
}

module.exports = {auth}