class CustomAPI_Error extends Error{
    constructor(message){
        super(message)
    }
}

module.exports = {CustomAPI_Error}