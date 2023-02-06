
const {CustomAPI_Error} = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')

class UnAuthenticatedError extends CustomAPI_Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthenticatedError
