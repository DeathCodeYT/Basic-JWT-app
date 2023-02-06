require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express();
const mainRoute = require('./routes/main')
const {errorHandlerMiddleware} = require('./middleware/error-handler')
const {notFoundMiddleware} = require('./middleware/not-found')


// JSON middleware
app.use(express.json())
app.use(express.static('./public'))
// Home Routes
// app.get('/',(req,res)=>{
//     res.status(200).send('<h1>Store API</h1><a href="/api/v1/products">Products Link</a>')
// })

//Routes
app.use('/api/v1',mainRoute)

// Middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// Port
const PORT = process.env.PORT || 3000

//Start Function
const start = async ()=>{
    try {
        
        app.listen(PORT,()=>{console.log(`Server is Listening on http://localhost:${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}

start()
