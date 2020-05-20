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

module.exports = {Recipe, findIngredient, addRecipe}