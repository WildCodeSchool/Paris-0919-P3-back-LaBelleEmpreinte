const express = require ('express')
const bodyParser = require ('body-parser')
const morgan = require('morgan')
const router = require('./routes/index')
const connection = require ('./conf')
const port = 4000
const app = express()
const cors = require ('cors')

app.use(cors()) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use("/user", router.user)
app.use("/admin", router.admin)
app.use("/login", router.register)


app.listen(port, err => {
    if (err) {
        throw new Error('something bad happened...')
    } 
    console.log(`server is listening on ${port}`)
})