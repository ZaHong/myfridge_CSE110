/**
 * Filename: food.js
 * Author: Zhanchong Deng
 * 
 * Description: food class.
 * 
 */
var mongoose = require('mongoose')


/*
 * A Food schema is a "database-less" class. It only structures data.
 */
var foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date_purchased: {                   // store the milliseconds since 1970
        type: Date,
        required: true,
    },
    expiration_date: {
         type: Date,
         required: true
     },
    duration: {
        type: Number,
        required: true
    },
    quantity: {
         type: String,
         default: ""
    },
    tag: {
         type: String
    }
    // price: {
    //     type: mongoose.Decimal128,
    //     required: true
    // }
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
const Food = new mongoose.model('Food', foodSchema)

async function findFood(food_id) {
    var query = await Food.findById(food_id)
    if (query == null) {
        console.log("Food does not exist")
        return null
    } else {
        return query
    }
}

async function addFood(food_info) {
    var new_food = new Food(food_info)
    return await new_food.save()
}

module.exports = {Food, findFood, addFood}