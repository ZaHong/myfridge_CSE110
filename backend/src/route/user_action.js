const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
const {User, addUser, verifyUser, findUser} = require('../models/user')
const {Food, findFood, addFood} = require('../models/food')
const ONE_DAY = 86400000
const WEEK = 7 * ONE_DAY
const THREE_DAYS = 3 * ONE_DAY

user_router.post('/register', async (req, res) => {         // need user email and user password
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
    input_date = new Date(req.body.date_purchased)
    const food_info = {
        name: req.body.name,
        date_purchased: input_date,
        duration: req.body.duration,
        expiration_date: new Date(input_date.getTime() + req.body.duration * ONE_DAY),
        tag: req.body.tag,
        quantity: req.body.quantity
    }
    console.log(food_info.date_purchased)
    console.log(food_info.expiration_date)
    await db.connectDB()
    food_id = await addFood(food_info)
    var user = await User.findById(req.params.id)
    fridge = user.fridge
    fridge.push(food_id)
    await User.updateOne({_id:(req.params.id)}, {$set: {"fridge": user.fridge}})
    await db.disconnectDB()
    res.send()
})

user_router.post('/:id/deleteFood', async (req, res) => {         // need the food_id that will be deleted
    const food_id = req.body.food_id
    await db.connectDB()
    const user = await User.findById(req.params.id)
    var fridge = user.fridge
    var idx = fridge.indexOf(food_id);
    fridge.splice(idx, 1)
    await User.updateOne({_id:(req.params.id)}, {$set: {"fridge": fridge}})
    try{
        await Food.deleteOne({ "_id" : food_id });
    }
    catch(e) {
        console.log(e)
    }
    await db.disconnectDB()
    res.send()
})

user_router.get(`/:id`, async (req, res) => {
    await db.connectDB()
    var user = await User.findById(req.params.id)
    var fridge = user.fridge
    const len = fridge.length
    for(let i = 0; i < len; i++) {                      
       var food = await Food.findById(fridge[i])
       fridge[i] = food
    }
    await db.disconnectDB()
    fridge.sort((a, b) => a.expiration_date - b.expiration_date)
    res.send({
        user_id: req.params.id,
        fridge: fridge
    })
})

user_router.post('/login', async(req, res) => {         // need the user email and user password
    await db.connectDB()
    var query = await verifyUser(req.body.email, req.body.password)
    //console.log(query)
    if(query === null) {
        res.status(404).send()
    }
    else{
        res.redirect(`/user/${query._id}`)
    }
    await db.disconnectDB()
})

module.exports = user_router;