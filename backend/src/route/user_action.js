const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
const {User, addUser, verifyUser, findUser, registerUser, addFriend, getFriends, deleteFriend, addFood,
       deleteFood, showUser, login, modify_food, displayByTag, getFoodNames, suggestRecipe, getProfile,
       change_nickname, add_waste, scoreboard} = require('../models/user')
const {Food, findFood} = require('../models/food')
const {getVocabs} = require('../models/food_vocab')


const ONE_DAY = 86400000


/*
 * Return Foodvocab.
 */
user_router.get(`/foodvocab`, async (req, res) => {
    await db.connectDB()
    var allVocabs = await getVocabs()
    await db.disconnectDB()
    res.send(allVocabs)
})

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
    const food_info = {
        name: req.body.name,
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
    await db.disconnectDB()
    res.send(result)
});

user_router.get('/:id/profile', async (req, res) => {
    await db.connectDB()
    var result = await getProfile(req.params.id)
    await db.disconnectDB()
    res.send(result)
})

user_router.post('/:id/change_name', async(req, res) => {
    result = await change_nickname(req.params.id, req.body.new_name)
    res.send(result)
})

user_router.post('/:id/add_waste', async(req, res) => {
    add_waste(req.params.id, req.body.amount)
    res.send({
        status: true
    })
})

user_router.get('/:id/scoreboard', async(req, res) => {
    result = await scoreboard(req.params.id)
    res.send(result)
})

module.exports = user_router;