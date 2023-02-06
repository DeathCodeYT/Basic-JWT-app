const jwt = require('jsonwebtoken')
const {CustomAPI_Error} = require('../errors/custom-error')
const {UnAuthenticatedError} = require('../errors')

const authTokenMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnAuthenticatedError("No Token Provided")
    }
    const token = authHeader.split(' ')[1]
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decode
        req.user = {username,id}
        next()
    } catch (error) {
        throw new UnAuthenticatedError("No authorized Token (bad Token!). Try Creating new one.")
    }
}

module.exports = authTokenMiddleware