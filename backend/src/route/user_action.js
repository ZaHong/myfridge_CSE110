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

user_router.post('/:id/addFood', async(req, res) => {       // need all information of a food
    const food_info = {
        name: req.body.name,
        date_purchased: req.body.date_purchased,
        duration: req.body.duration
    }
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
    res.redirect(`/user/${req.params.id}`)
})

user_router.post('/:id/deleteFood', async (req, res) => {         // need the food_id that will be deleted
    const food_id = req.body.food_id
    await db.connectDB()
    const user = await User.findById(req.params.id)
    var fridge = user.fridge
    //console.log(food_id)
    //console.log("******************")
    var idx = fridge.indexOf(food_id);
    //console.log(fridge)
    fridge.splice(idx, 1)
    //console.log(idx)
    //console.log('-------------')
    //console.log(fridge)
    //console.log('--------------')
    await User.updateOne({_id:(req.params.id)}, {$set: {"fridge": fridge}})
    try{
        await Food.deleteOne({ "_id" : food_id });
    }
    catch(e) {
        console.log(e)
    }
    await db.disconnectDB()
    res.redirect(`/user/${req.params.id}`)
})

user_router.get(`/:id`, async (req, res) => {
    var high = []
    var medium = []
    var low = []
    const curr_date = Date.now()       
    await db.connectDB()
    var user = await User.findById(req.params.id)
    var fridge = user.fridge
    const len = fridge.length
    console.log(fridge)
    for(let i = 0; i < len; i++) {                      
       var food = await Food.findById(fridge[i])
       console.log(food)
       var time_left = food.date_purchased + food.duration * ONE_DAY - curr_date
       if(time_left <= THREE_DAYS) {
            high.push(food)
       }
       else if(time_left > THREE_DAYS && time_left <= WEEK) {
           medium.push(food)
       }
       else{
           low.push(food)
       }
    }
    await db.disconnectDB()
    res.send({
        user_id: req.params.id,
        fridge: [
            high,
            medium,
            low
        ]
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