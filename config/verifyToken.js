const jwt = require('jsonwebtoken')
const config = require('./global')


function verifyToken(req,resp,next){
    const token = req.headers['x-access-token']
    //si el token es distinto de vacio
    if(!token){
        return resp.status(401).json({
            auth: false,
            message: 'No token provider'
        })
    }

    //si pasa el if es porque el token no es vacio
    const decoded = jwt.verify(token, config.secret)
    
    req.userId = decoded.id 
    next()
}

module.exports = verifyToken