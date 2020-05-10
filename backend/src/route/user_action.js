const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
//var mongoose = require('mongoose')
//const user = require('../models/userSchema')

//const User = new mongoose.model('User', userSchema)
const user = require('../models/user')

user_router.post('/register', async (req, res) => {
    console.log('-------------')
    console.log(req.body)
    console.log('---------------')
    const user_info = {
        email: req.body.email,
        password: req.body.password
    }
    try{
       db.connectDB()
       const id = await user.addUser(user_info)
       db.disconnectDB()
       res.send(id)

    }
    catch(e) {
        console.log(e)
    }
    
})

module.exports = user_router;