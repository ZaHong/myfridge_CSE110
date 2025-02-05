/**
 * Filename: user.js
 * Author: Zhanchong Deng
 * 
 * Description: Basically connect MyFridge database with User class.
 * 
 */
var mongoose = require('mongoose')
const {Food} = require('./foodModel.js')
const {suggest} = require('./recipeModel.js')

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
    },
    // waste_food: [Schema.Types.ObjectId],
    // waste_food_weekly: [Schema.Types.ObjectId],
    score: Number,
    // custom_recipe: [Schema.Types.ObjectId],
    // allow_email_notification: Boolean,
    grocery_list: {
        type: [String]
    },
    nickname: {
        type: String
    },
    waste_list: {
        type: []
    }
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
    if (await User.findOne({email: user_info.email})) {
        result = {
            status: false,
            message: "email has been used before"
        }
    }
    else{
        var idx = user_info.email.indexOf('@')
        var nickname = user_info.email.substring(0, idx)
        user_info.nickname = nickname
        user_info.score = 0
        user_info.waste_list = []
        var new_user = new User(user_info)
        await new_user.save()
        result = {
            status: true,
            message: "registrate successfully"
        }
    }
    return result
}

async function addFriend(email, id) {
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
    return result
    
}

async function getFriends(id) {
    user = await User.findOne({_id: id})
    var friend_list = user.friend_list
    for(let i = 0; i < friend_list.length; i++){
        friend = await User.findOne(friend_list[i])
        friend_list[i] = {
            id: friend.id,
            email: friend.email,
            nickname: friend.nickname
        }
    }
    return friend_list
}

async function deleteFriend(friend_id, user_id) {
    user = await User.findOne({_id: user_id})
    var friend_list = user.friend_list
    var idx = friend_list.indexOf(friend_id)
    friend_list.splice(idx, 1)
    await User.updateOne({_id:(user_id)}, {$set: {"friend_list": friend_list}})
    return {
        status: true,
        mesasge: "remove friend successfully"
    }
}

async function addFood(food_info, user_id) {
    var new_food = new Food(food_info)
    await new_food.save()
    var user = await User.findById(user_id)
    fridge = user.fridge
    fridge.push(new_food)
    await User.updateOne({_id: user_id}, {$set: {"fridge": user.fridge}})
    return {
        status: true,
        message: "add food successfully"
    }
}

async function deleteFood(food_id, user_id) {   
    const user = await User.findById(user_id)
    console.log(user_id + '  ' + food_id)
    var fridge = user.fridge
    var idx = fridge.indexOf(food_id)
    fridge.splice(idx, 1)
    await User.updateOne({_id: user_id}, {$set: {"fridge": fridge}})
    await Food.deleteOne({ "_id" : food_id });
    return {
        status: true,
        message: "delete food successfully"
    }
}

async function showUser(user_id) {
    result = {}
    var user = await User.findById(user_id)
    var fridge = user.fridge
    const len = fridge.length
    for(let i = 0; i < len; i++) {                      
       var food = await Food.findById(fridge[i])
       fridge[i] = food
    }
    fridge.sort((a, b) => a.expiration_date - b.expiration_date)
    result = {
        user_id: user_id,
        fridge: fridge
    }
    return result
}

async function login(email, password) {
    var query = await verifyUser(email, password)
    return query
}

async function modify_food(food_info, food_id) {
    await Food.updateOne({_id: food_id}, {$set: {
        "name": food_info.name,
        "tag": food_info.tag,
        "quantity": food_info.quantity
    }})
    return {
        status: true,
        message: "successfully modify food"
    }
}

async function displayByTag(user_id) {
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
    return map
}

// This method is for recipe, take id and a list of unique food names in user's fridge
async function getFoodNames(user_id) {
    var user = await User.findById(user_id)
    var fridge_id = user.fridge
    var fridge = []
    for(let food_id of fridge_id) {
        var food_name = await Food.findById(food_id)
        fridge.push(food_name.name)
    }
    // Extract unique food names from fridge
    let unique = [...new Set(fridge)]
    return unique
}

function compareRecipe(r1, r2) {
    // a < b -> -1 means ascending
    if (r1.missing_num < r2.missing_num) {
        return -1
    } else if (r1.missing_num > r2.missing_num) {
        return 1
    } else {
        return 0
    }
}

async function suggestRecipe(user_id) {
    var fridge = await getFoodNames(user_id)
    var recipes = await suggest(fridge)
    return recipes.sort(compareRecipe)
}

async function updateGroceryList(user_id, food_names) {
    var user1 = await User.findById(user_id)
    var fridge = await getFoodNames(user_id)
    for(let name of food_names) {
        if(!user1.grocery_list.includes(name) && !fridge.includes(name)) {
            user1.grocery_list.push(name)
        }
    }
    await user1.save()
}

async function clearGroceryList(user_id) {
    var user1 = await User.findById(user_id)
    user1.grocery_list = []
    await user1.save()
}

async function getGroceryList(user_id) {
    var user1 = await User.findById(user_id)
    console.log(user1.grocery_list)
    return user1.grocery_list
}

async function removeGrocery(user_id, item_names) {
    var user1 = await User.findById(user_id)
    for(let item_name of item_names) {
        var idx = user1.grocery_list.indexOf(item_name)
        if (idx > -1) {
            user1.grocery_list.splice(idx, 1);
        }
    }
    await user1.save()
}

async function getProfile(user_id) {
    var profile = await User.findById(user_id)
    return {
            "email": profile.email,
            "nickname": profile.nickname,
            "grocery_list": profile.grocery_list
        }
}

async function change_nickname(user_id, new_name) {
    await User.updateOne({_id:user_id}, {$set:{"nickname": new_name}})
    return {
        status: true,
        message: "successfully modify nickname"
    }
}

async function add_waste(user_id, amount, name, date, food_id) {
    user = await User.findById(user_id)
    waste_list = user.waste_list
    waste_list.push({
        "name": name,
        "date": date
    })
    await User.updateOne({_id: user_id}, {$set:{"score": user.score + amount, "waste_list": waste_list}})
    await deleteFood(food_id, user_id)
}

async function scoreboard(user_id) {
    user = await User.findById(user_id)
    friends = user.friend_list
    var new_list = []
    for(let i = 0; i < friends.length; i++) {
        friend = await User.findById(friends[i])
        new_list.push({
            "nickname": friend.nickname,
            "email": friend.email,
            "score": friend.score,
            "self": false
        })
    }
    new_list.push({
        "nickname": user.nickname,
        "email": user.email,
        "score": user.score,
        "self": true
    })
    new_list.sort((a, b) => a.score - b.score)
    return {
        "rank": new_list,
        "waste_list": user.waste_list
    }
}

async function changePassword(user_id, newpassword) {
    user1 = await User.findById(user_id)
    user1.password = newpassword
    await user1.save()
}

module.exports = {User, addUser, verifyUser, findUser, registerUser, addFriend, getFriends, deleteFriend, 
    addFood, deleteFood, showUser, login, modify_food, displayByTag, getFoodNames, suggestRecipe, getProfile,
    change_nickname, add_waste, scoreboard, updateGroceryList, clearGroceryList, getGroceryList, removeGrocery,
    changePassword}