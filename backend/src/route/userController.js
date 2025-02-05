const express = require('express')
const user_router = express.Router()
const db = require('../models/db')
const {registerUser, addFriend, getFriends, deleteFriend, addFood,
       deleteFood, showUser, login, modify_food, displayByTag, suggestRecipe, getProfile,
       change_nickname, add_waste, scoreboard, updateGroceryList, clearGroceryList, getGroceryList,
       removeGrocery, changePassword} = require('../models/userModel')
const {getVocabs} = require('../models/foodVocabModel')
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
    await db.connectDB()
    result = await registerUser(user_info)
    await db.disconnectDB()
    res.send(result)
})

user_router.post('/:id/addFriend', async(req, res) => {
    const email = req.body.email
    const id = req.params.id
    await db.connectDB()
    var result = await addFriend(email, id)
    await db.disconnectDB()
    res.send(result)
})

user_router.get("/:id/friends", async (req, res) => {
    await db.connectDB()
    var friend_list = await getFriends(req.params.id)
    await db.disconnectDB()
    res.send(friend_list)
})

user_router.post("/:id/deleteFriend", async (req, res) => {
    await db.connectDB()
    result = await deleteFriend(req.body.friend_id, req.params.id)
    await db.disconnectDB()
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
    await db.connectDB()
    var result = await addFood(food_info, req.params.id)
    await db.disconnectDB()
    res.send(result)
})

user_router.post('/:id/deleteFood', async (req, res) => {         // need the food_id that will be deleted
    await db.connectDB()
    result = await deleteFood(req.body.food_id, req.params.id) 
    await db.disconnectDB()
    res.send(result)
})

user_router.get(`/:id`, async (req, res) => {
    await db.connectDB()
    result = await showUser(req.params.id)
    await db.disconnectDB()
    res.send(result)
})

user_router.post('/login', async(req, res) => {         // need the user email and user password
    await db.connectDB()
    query = await login(req.body.email, req.body.password)
    await db.disconnectDB()
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
    await db.connectDB()
    var result = await modify_food(food_info, req.body.food_id)
    await db.disconnectDB()
    res.send(result)
})

user_router.get('/:id/byTag', async (req, res) => {
    await db.connectDB()
    var result = await displayByTag(req.params.id)
    await db.disconnectDB()
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

/*
 * Add recipe to grocery list
 */
user_router.post(`/:id/addrecipe`, async (req, res) => {
    await db.connectDB()
    await updateGroceryList(req.params.id, req.body.recipefoods)
    await db.disconnectDB()
    res.send({
        status: "success"
    })
})

/*
 * Clear grocery list
 */
user_router.get(`/:id/cleargrocery`, async (req, res) => {
    await db.connectDB()
    await clearGroceryList(req.params.id)
    await db.disconnectDB()
    res.send({
        status: "success"
    })
})

/*
 * Display grocery list
 */
user_router.get(`/:id/grocery_list`, async (req, res) => {
    await db.connectDB()
    var list = await getGroceryList(req.params.id)
    await db.disconnectDB()
    res.send({
        status: "sucess",
        grocery_list: list
    })
})

/*
 * Remove on grocery from list.
 */
user_router.post(`/:id/remove_grocery`, async (req, res) => {
    await db.connectDB()
    await removeGrocery(req.params.id, req.body.item_names)
    await db.disconnectDB()
    res.send({
        status: "sucess"
    })
})

user_router.get('/:id/profile', async (req, res) => {
    await db.connectDB()
    var result = await getProfile(req.params.id)
    await db.disconnectDB()
    res.send(result)
})

user_router.post('/:id/change_name', async(req, res) => {
    await db.connectDB()
    result = await change_nickname(req.params.id, req.body.new_name)
    await db.disconnectDB()
    res.send(result)
})

user_router.post(`/:id/change_password`, async(req, res) => {
    await db.connectDB()
    await changePassword(req.params.id, req.body.newpassword)
    await db.disconnectDB()
    res.send({
        status: "Success"
    })
})

user_router.post('/:id/add_waste', async(req, res) => {
    await db.connectDB()
    await add_waste(req.params.id, req.body.amount, req.body.name, req.body.date, req.body.food_id)
    await db.disconnectDB()
    res.send({
        status: true
    })
})

user_router.get('/:id/scoreboard', async(req, res) => {
    await db.connectDB()
    result = await scoreboard(req.params.id)
    await db.disconnectDB()
    res.send(result)
})

module.exports = user_router;