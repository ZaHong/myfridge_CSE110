/**
 * Filename: recipe.js
 * Author: Yicun Wu
 *
 * Description: recipe class.
 *
 */
var mongoose = require('mongoose')

/*
 * A recipe schema is a "database-less" class. It only structures data.
 */
var recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

/*
 * This model is unique to our db (MyFridge). Any operation directly acts onto our database.
 *
 * Note:
 *      - Fail to fill in one field may result in errors. Consider adding catch after creation.
 *      - A model connects to our database collection by "searching the plural, lowercased collection."
 *      - More info: https://mongoosejs.com/docs/models.html
 */
const Recipe = new mongoose.model('Recipe', recipeSchema)


async function findIngredient(idx, [fridge]) {
    var query = await Recipe.findOne({idx: idx})
    let num = 0
    for (var i = 0; i < fridge.length; i++) {
            var cur= fridge[i];
            await query.find({ingredients: { $elemMatch: cur}}, function(err, query) {
                if(err){
                    return console.error(err.stack)
                }
                if(!query)
                    return console.error("no match found!")
                //create a pair map in recipe name and match food
                else
                    num++
            })
    }
    return {
        recipe_id: query.idx,
        miss_item_num: query.ingredients.length - num
    }
}

async function addRecipe(name, ingredients, steps, url) {
    var new_recipe = new Recipe({
        name: name,
        ingredients: ingredients,
        steps: steps,
        url: url
    })
    return new_recipe.save()
}


// Adds missing num and recipe's info to suggests if missing num > 0
function countIngredient(cur_recipe, fridge, suggests) {
    let missing_num = 0
    let total_num = cur_recipe.ingredients.length
    // Iterate cur_recipe    
    for(var food_item in cur_recipe.ingredients) {

    }
}

// Takes in fridge list, return list recipe and missing number
async function suggestRecipe(fridge) {
    var suggests = []
    Recipe.find().then( function(allRecipes) {
        for(let cur_recipe in allRecipes) {
            countIngredient(cur_recipe, fridge, suggests)
        }
        return suggests
    })
}

// Testing
var {connectDB, disconnectDB} = require('./db.js')
async function testSuggest() {
    await connectDB()
    await suggestRecipe()
    await disconnectDB()
}
testSuggest()
module.exports = {Recipe, findIngredient, addRecipe}