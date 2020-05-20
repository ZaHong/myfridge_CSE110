const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
const {User, addUser, verifyUser, findUser, registerUser, addFriend, getFriends, deleteFriend, addFood,
       deleteFood, showUser, login} = require('../models/user')
const {Food, findFood} = require('../models/food')

const {Recipe, findIngredient} = require('../models/recipe')

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
        res.redirect(`/user/${query._id}`)
    }
    else {
        res.send({
            status: false,
            message: "fail to login"
        })
    }
})

/*
 * find recipe
 */
user_router.get(`/:id/recipe`, async (req, res) => {
    await db.connectDB()
    var user = await User.findById(req.params.id)
    var fridge = user.fridge
    const len = fridge.length
    for(let i = 0; i < len; i++) {
        var food = await Food.findById(fridge[i])
        fridge[i] = food
    }

    const lenx = Recipe.length
    var pairs = []
    for (var i = 1; i < lenx; i++) {
        pairs.push(await findIngredient(i, fridge))
    }
    await db.disconnectDB()
    res.send(pairs)
});

module.exports = user_router;