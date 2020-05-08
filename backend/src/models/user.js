/**
 * Filename: user.js
 * Author: Zhanchong Deng
 * 
 * Description: This file defines a User data schema, which contains relevant information about a user such as email and passwords.
 * 
 */

var db = require('./db.js')

/*
 * A User model represent a user data entry in database. Similar to class.
 * Note: 
 *      - Creation: var user_one = new User({ email: "...", password: "..."})
 *      - Fail to fill in one field may result in errors. Consider adding catch after creation.
 *      - A model connects to our database collection by "searching the plural, lowercased collection."
 *      - More info: https://mongoosejs.com/docs/models.html
 */
var User = db.model('User', {
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

module.exports = User