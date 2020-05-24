/**
 * Filename: food_vocab.js
 * Author: Zhanchong Deng
 * 
 * Description: food class.
 * 
 */
var mongoose = require('mongoose')


/*
 * A Food schema is a "database-less" class. It only structures data.
 */
var foodvocabSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
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
const FoodVocab = new mongoose.model('FoodVocab', foodvocabSchema)

async function addFoodVocab(food_info) {
    var new_food = new FoodVocab(food_info)
    return await new_food.save()
}

async function getVocabs() {
    var all = await FoodVocab.find()
    var namelist = []
    var infos = {}
    for(var vocab of all) {
        namelist.push(vocab.name)
        infos[vocab.name] = vocab
    }
    return {
        namelist: namelist,
        infos: infos
    }
}

module.exports = {FoodVocab, addFoodVocab, getVocabs}