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

/*
 * This function will find recipe by compare recipe ingredient w/ user food items.
 *
 */

async function findRecipe(ingredient) {
    var query = await Recipe.find({ingredients: ingredient})
    if (query == null) {
        console.log("No recipe matches")
        return null
    } else {
        return query
    }
}


module.exports = {Recipe, findRecipe}