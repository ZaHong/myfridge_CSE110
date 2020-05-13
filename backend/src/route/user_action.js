const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
const {User, addUser, verifyUser, findUser} = require('../models/user')
const {Food, findFood, addFood} = require('../models/food')

user_router.post('/register', async (req, res) => {
    console.log(req.body)
    const user_info = {
        email: req.body.email,
        password: req.body.password
    }
    try{
       await db.connectDB()
       await addUser(user_info)
       await db.disconnectDB()
       res.send()
    }
    catch(e) {
        console.log(e)
    }
})

user_router.post('/:id/addFood', async(req, res) => {
    const food_info = {
        name: req.body.name
    }
    console.log(req.params.id)
    await db.connectDB()
    food_id = await addFood(food_info)
    var user = await User.findById(req.params.id)
    fridge = user.fridge
    fridge.push(food_id)
    await User.updateOne({_id:(req.params.id)}, {$set: {"fridge": user.fridge}})
    for( var i = 0; i < fridge.length; i++) {
        food = await Food.findById(fridge[i])
        fridge[i] = food
    }
    await db.disconnectDB()
    res.send({
        user_id: req.params.id,
        fridge: user.fridge
    })
})

user_router.get(`/:id`, async (req, res) => {
    await db.connectDB()
    var user = await User.findById(req.params.id)
    var fridge = user.fridge
    const len = fridge.length
    for(let i = 0; i < len; i++) {                      //convert food id to food name
       let food = await Food.findById(fridge[i])
       fridge[i] = food
    }
    await db.disconnectDB()
    res.send({
        user_id: req.params.id,
        fridge: fridge
    })
})

user_router.post('/login', async(req, res) => {
    await db.connectDB()
    var query = await verifyUser(req.body.email, req.body.password)
    console.log(query)
    if(query === null) {
        res.status(404).send()
    }
    else{
        res.redirect(`/user/${query._id}`)
    }
    await db.disconnectDB()
})

module.exports = user_router;