const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
//var mongoose = require('mongoose')
//const user = require('../models/userSchema')

//const User = new mongoose.model('User', userSchema)
const {User, addUser, verifyUser, findUser} = require('../models/user')

user_router.post('/register', async (req, res) => {
    console.log("-----------------")
    console.log(req.body)
    const user_info = {
        email: req.body.email,
        password: req.body.password
    }
    try{
       await db.connectDB()
       await addUser(user_info)
       await db.disconnectDB()
       res.send(id)

    }
    catch(e) {
        console.log(e)
    }
})

user_router.get(`/id/:id`, async (req, res) => {
    await db.connectDB()
    var user = await User.findById(req.params.id)
    await db.disconnectDB()
    res.send(user.fridge)
})

user_router.post('/login', async(req, res) => {
    await db.connectDB()
    var query = await verifyUser(req.body.email, req.body.password)
    if(query === null) {
        res.status(404).send()
    }
    else{
        res.redirect(`/user/id/${query._id}`)
    }
    await db.disconnectDB()
})

module.exports = user_router;