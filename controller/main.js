
const {BadRequestError} = require("../errors")
const jwt = require('jsonwebtoken')

const login = async (req,res) =>{
    const {username,password} = req.body
    if(!username || !password){
        throw new BadRequestError("Please Provide Username and Password")
    }
    // just demo, normally provided by DB
    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'20d'})
    res.status(200).json({msg:"User Created",token})
}
const dashboard = async (req,res) =>{
    
    res.status(200).json({msg:`Hello, ${req.user.username}`,secret:`Your Lucky Number is ${Math.floor(Math.random()*100)}`})
}

module.exports = {login,dashboard}

