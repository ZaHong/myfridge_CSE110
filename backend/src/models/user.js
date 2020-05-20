/**
 * Filename: user.js
 * Author: Zhanchong Deng
 * 
 * Description: Basically connect MyFridge database with User class.
 * 
 */
var mongoose = require('mongoose')
const {Food, findFood} = require('./food.js')
const db = require('./db')

/*
 * A User schema is a "database-less" class. It only structures data.
 */
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // nickname: String,
    fridge: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: Food
    },
    friend_list: {
        type: [mongoose.Schema.Types.ObjectId],
    }
    // waste_food: [Schema.Types.ObjectId],
    // waste_food_weekly: [Schema.Types.ObjectId],
    // food_waste_score: [Schema.Types.ObjectId],
    // custom_recipe: [Schema.Types.ObjectId],
    // allow_email_notification: Boolean,
    // grocery_list: [Schema.Types.ObjectId]
})


/*
 * This model is unique to our db (MyFridge). Any operation directly acts onto our database.
 * 
 * Note: 
 *      - Creation: var user_one = new User({ email: "...", password: "..."})
 *      - Fail to fill in one field may result in errors. Consider adding catch after creation.
 *      - A model connects to our database collection by "searching the plural, lowercased collection."
 *      - More info: https://mongoosejs.com/docs/models.html
 */
const User = new mongoose.model('User', userSchema)

async function addUser(user_info) {
    if(!user_info) {
        throw new Error("No user info entered.")
    }
    var new_user = new User(user_info)
    var new_user_info = await new_user.save()
    return new_user_info
}

async function verifyUser(email, password) {
    var query = await User.findOne({email: email})

    if (query == null) {
        console.log("User does not exist")
        return null
    } else {
        if (query.password != password) {
            console.log("Wrong password")
            return null
        } else {
            return query
        }
    }
}

async function findUser(email) {
    var query = await User.findOne({email: email})
    if (query == null) {
        console.log("User does not exist")
        return null
    } else {
        return query
    }
}

async function registerUser(user_info) {
    var result = {}
    await db.connectDB()
    if (await User.findOne({email: user_info.email})) {
        result = {
            status: false,
            message: "email has been used before"
        }
    }
    else{
        var new_user = new User(user_info)
        await new_user.save()
        result = {
            status: true,
            message: "registrate successfully"
        }
    }
    await db.disconnectDB()
    return result
}

async function addFriend(email, id) {
    await db.connectDB()
    var friend = await findUser(email)
    var result = {}
    var user = await User.findOne({_id: id})
    if (friend == null) {
        result = {
            status: false,
            message: "user does not exist"
        }
    }
    else if(friend.id == user.id) {
        result = {
            status: false,
            message: "you cannot add yourself as a friend"
        }
    }
    else if(user.friend_list.includes(friend.id)){
        result = {
            status: false,
            message: "this is already your friend"
        }
    }
    else{
        var friend_list = user.friend_list
        friend_list.push(friend.id)
        await User.updateOne({_id:(id)}, {$set:{"friend_list": friend_list}})
        result = {
            status: true,
            message: "add friend successfully!"
        }
    }
    await db.disconnectDB()
    return result
    
}

async function getFriends(id) {
    await db.connectDB()
    user = await User.findOne({_id: id})
    var friend_list = user.friend_list
    for(let i = 0; i < friend_list.length; i++){
        friend = await User.findOne(friend_list[i])
        friend_list[i] = {
            id: friend.id,
            email: friend.email
        }
    }
    await db.disconnectDB()
    return friend_list
}

async function deleteFriend(friend_id, user_id) {
    await db.connectDB()
    user = await User.findOne({_id: user_id})
    var friend_list = user.friend_list
    var idx = friend_list.indexOf(friend_id)
    friend_list.splice(idx, 1)
    await User.updateOne({_id:(user_id)}, {$set: {"friend_list": friend_list}})
    await db.disconnectDB()
    return {
        status: true,
        mesasge: "remove friend successfully"
    }
}

async function addFood(food_info, user_id) {
    await db.connectDB()
    var new_food = new Food(food_info)
    await new_food.save()
    var user = await User.findById(user_id)
    fridge = user.fridge
    fridge.push(new_food)
    await User.updateOne({_id: user_id}, {$set: {"fridge": user.fridge}})
    await db.disconnectDB()
    return {
        status: true,
        message: "add food successfully"
    }
}

async function deleteFood(food_id, user_id) {
    await db.connectDB()
    const user = await User.findById(user_id)
    var fridge = user.fridge
    var idx = fridge.indexOf(food_id)
    fridge.splice(idx, 1)
    await User.updateOne({_id: user_id}, {$set: {"fridge": fridge}})
    await Food.deleteOne({ "_id" : food_id });
    await db.disconnectDB()
    return {
        status: true,
        message: "delete food successfully"
    }
}

async function showUser(user_id) {
    result = {}
    await db.connectDB()
    var user = await User.findById(user_id)
    var fridge = user.fridge
    const len = fridge.length
    for(let i = 0; i < len; i++) {                      
       var food = await Food.findById(fridge[i])
       fridge[i] = food
    }
    await db.disconnectDB()
    fridge.sort((a, b) => a.expiration_date - b.expiration_date)
    result = {
        user_id: user_id,
        fridge: fridge
    }
    return result
}

async function login(email, password) {
    await db.connectDB()
    var query = await verifyUser(email, password)
    await db.disconnectDB()
    return query
}

async function modify_food(food_info, food_id) {
    await db.connectDB()
    await Food.updateOne({_id: food_id}, {$set: {
        "name": food_info.name,
        "date_purchased": food_info.date_purchased,
        "duration": food_info.duration,
        "expiration_date": food_info.expiration_date,
        "tag": food_info.tag,
        "quantity": food_info.quantity
    }})
    await db.disconnectDB()
    return {
        status: true,
        message: "successfully modify food"
    }
}

async function displayByTag(user_id) {
    await db.connectDB()
    var user = await User.findById(user_id)
    var fridge = user.fridge
    for (let i = 0; i < fridge.length; i++) {
        fridge[i] = await Food.findById(fridge[i])
    }
    map = {}
    for (let i = 0; i < fridge.length; i++) {
        map[fridge[i].tag] = []
    }
    for (let i = 0; i < fridge.length; i++) {
        map[fridge[i].tag].push(fridge[i])
    }
    await db.disconnectDB()
    return map
}

module.exports = {User, addUser, verifyUser, findUser, registerUser, addFriend, getFriends, deleteFriend, 
    addFood, deleteFood, showUser, login, modify_food, displayByTag}