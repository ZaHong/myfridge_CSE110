/**
 * Filename: user.js
 * Author: Zhanchong Deng
 * 
 * Description: Define what a user is and has.
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

module.exports = {userSchema}