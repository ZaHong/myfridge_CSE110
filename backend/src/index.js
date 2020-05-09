const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 8000
const user_router = require('./route/user_action')

// const {client, addUser} = require('./mongo.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    // addUser("nope", "hak")
    res.send('Hello From the Backend!')
})

app.use('/user', user_router)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))