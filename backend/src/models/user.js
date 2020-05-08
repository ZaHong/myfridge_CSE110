/**
 * Filename: user.js
 * Author: Zhanchong Deng
 * 
 * Description: Basically connect MyFridge database with User class.
 * 
 */
var mongoose = require('mongoose')
var userSchema = require('./userSchema.js')
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

module.exports.addUser = async(user_info) => {
    if(!user_info) {
        throw new Error("No user info entered.")
    }
    var new_user = new User(user_info)
    await new_user.save()
    console.log("Created new User!")
}

module.exports.findUser = async(email) => {
    var query = await User.findOne({email: email})
    if (query == null) {
        console.log("User does not exist")
    } else {
        console.log(query)
    }
}