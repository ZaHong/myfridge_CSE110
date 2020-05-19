const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
const {User, addUser, verifyUser, findUser} = require('../models/user')
const {Food, findFood, addFood} = require('../models/food')
const ONE_DAY = 86400000

user_router.post('/register', async (req, res) => {         // need user email and user password
    const user_info = {
        email: req.body.email,
        password: req.body.password
    }
    await db.connectDB()
    if (await User.findOne({email: user_info.email})) {
        res.send({
            status: false,
            message: "email has been used before"
        })
    }
    else{
        var new_user = new User(user_info)
        await new_user.save()
        res.send({
            status: true,
            message: "registrate successfully"
        })
    }
    await db.disconnectDB()
})

user_router.post('/:id/addFriend', async(req, res) => {
    const email = req.body.email
    const id = req.params.id
    await db.connectDB()
    var friend = await findUser(email)
    var user = await User.findOne({_id: id})
    if (friend == null) {
        res.send({
            status: false,
            message: "user does not exist"
        })
    }
    else if(friend.id == user.id) {
        res.send({
            status: false,
            message: "you cannot add yourself as a friend"
        })
    }
    else if(user.friend_list.includes(friend.id)){
        res.send({
            status: false,
            message: "this is already your friend"
        })
    }
    else{
        var friend_list = user.friend_list
        friend_list.push(friend.id)
        await User.updateOne({_id:(id)}, {$set:{"friend_list": friend_list}})
        console.log(friend_list)
        res.send({
            status: true,
            message: "add friend successfully!"
        })
    }
    await db.disconnectDB()
})

user_router.get("/:id/friends", async (req, res) => {
    await db.connectDB()
    user = await User.findOne({_id:(req.params.id)})
    var friend_list = user.friend_list
    for(let i = 0; i < friend_list.length; i++){
        friend = await User.findOne(friend_list[i])
        friend_list[i] = {
            id: friend.id,
            email: friend.email
        }
    }
    await db.disconnectDB()
    res.send(friend_list)
})

user_router.post("/:id/deleteFriend", async (req, res) => {
    await db.connectDB()
    id = req.body.friend_id
    user = await User.findOne({_id:(req.params.id)})
    var friend_list = user.friend_list
    var idx = friend_list.indexOf(req.body.id)
    friend_list.splice(idx, 1)
    await User.updateOne({_id:(req.params.id)}, {$set: {"friend_list": friend_list}})
    await db.disconnectDB()
    res.send({
        status: true,
        mesasge: "remove friend successfully"
    })
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
    var idx = fridge.indexOf(food_id)
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
    if(query === null) {
        res.status(404).send()
    }
    else{
        res.redirect(`/user/${query._id}`)
    }
    await db.disconnectDB()
})

module.exports = user_router;