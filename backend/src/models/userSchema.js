/**
 * Filename: userSchema.js
 * Author: Zhanchong Deng
 * 
 * Description: defines User data type. A class without connecting to any database, a true blueprint.
 */
var mongoose = require('mongoose')

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
    }
    // nickname: String,
    // fridge: [Schema.Types.ObjectId],
    // friend_list: {
    //     type: [Schema.Types.ObjectId],
    //     ref: User
    // }
    // waste_food: [Schema.Types.ObjectId],
    // waste_food_weekly: [Schema.Types.ObjectId],
    // food_waste_score: [Schema.Types.ObjectId],
    // custom_recipe: [Schema.Types.ObjectId],
    // allow_email_notification: Boolean,
    // grocery_list: [Schema.Types.ObjectId]
})

module.exports = userSchema