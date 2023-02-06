const express = require("express")
const {login,dashboard} = require('../controller/main')
const routes = express.Router()
const authTokenMiddleware = require('../middleware/auth')
routes.route('/login').post(login);
routes.route('/dashboard').get(authTokenMiddleware,dashboard)


module.exports = routes