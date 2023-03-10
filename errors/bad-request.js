
const {CustomAPI_Error} = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')

class BadRequest extends CustomAPI_Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest
