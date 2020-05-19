/**
 * Filename: user.js
 * Author: Zhanchong Deng
 * 
 * Description: Basically connect MyFridge database with User class.
 * 
 */
var mongoose = require('mongoose')
const {Food, findFood} = require('./food.js')

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
    // friend_list: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: this
    // }
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
        return
    } else {
        return query
    }
}

module.exports = {User, addUser, verifyUser, findUser}