const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
const {User, addUser, verifyUser, findUser, registerUser, addFriend, getFriends, deleteFriend, addFood,
       deleteFood, showUser, login, modify_food, displayByTag, getFoodNames, suggestRecipe} = require('../models/user')
const {Food, findFood} = require('../models/food')


const ONE_DAY = 86400000

user_router.post('/register', async (req, res) => {         // need user email and user password
    const user_info = {
        email: req.body.email,
        password: req.body.password
    }
    result = await registerUser(user_info)
    res.send(result)
})

user_router.post('/:id/addFriend', async(req, res) => {
    const email = req.body.email
    const id = req.params.id
    var result = await addFriend(email, id)
    res.send(result)
})

user_router.get("/:id/friends", async (req, res) => {
    var friend_list = await getFriends(req.params.id)
    res.send(friend_list)
})

user_router.post("/:id/deleteFriend", async (req, res) => {
    result = await deleteFriend(req.body.friend_id, req.params.id)
    res.send(result)
})

user_router.post('/:id/addFood', async (req, res) => {  
    input_date = new Date(req.body.date_purchased)
    const food_info = {
        name: req.body.name,
        date_purchased: input_date,
        duration: req.body.duration,
        expiration_date: new Date(input_date.getTime() + req.body.duration * ONE_DAY),
        tag: req.body.tag,
        quantity: req.body.quantity
    }
    var result = await addFood(food_info, req.params.id)
    res.send(result)
})

user_router.post('/:id/deleteFood', async (req, res) => {         // need the food_id that will be deleted
    result = await deleteFood(req.body.food_id, req.params.id) 
    res.send(result)
})

user_router.get(`/:id`, async (req, res) => {
    result = await showUser(req.params.id)
    res.send(result)
})

user_router.post('/login', async(req, res) => {         // need the user email and user password
    query = await login(req.body.email, req.body.password)
    if (query != null) {
        //res.redirect(`/user/${query._id}`)
        res.send({
            status:true,body: query})
    }
    else {
        res.send({
            status: false,
            message: "fail to login"
        })
    }
})

user_router.post('/:id/modifyFood', async (req, res) => {
    input_date = new Date(req.body.date_purchased)
    const food_info = {
        name: req.body.name,
        date_purchased: input_date,
        duration: req.body.duration,
        expiration_date: new Date(input_date.getTime() + req.body.duration * ONE_DAY),
        tag: req.body.tag,
        quantity: req.body.quantity
    }
    var result = await modify_food(food_info, req.body.food_id)
    res.send(result)
})

user_router.get('/:id/byTag', async (req, res) => {
    var result = await displayByTag(req.params.id)
    res.send(result)
})

/*
 * Suggest Recipe
 */
user_router.get(`/:id/recipe`, async (req, res) => {
    await db.connectDB()
    var result = await suggestRecipe(req.params.id)
    res.send(result)
    await db.disconnectDB()
});

module.exports = user_router;