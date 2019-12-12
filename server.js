const express = require ('express')
const bodyParser = require ('body-parser')
const morgan = require('morgan')
const router = require('./routes/index')
const connection = require ('./conf')
const port = 4000
const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use("/user", router.user)


app.listen(port, err => {
    if (err) {
        throw new Error('something bad happened...')
    } 
    console.log(`server is listening on ${port}`)
})