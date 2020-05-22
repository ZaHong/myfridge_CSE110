var db = require('./db.js')
var {User, addUser, verifyUser, findUser, registerUser, addFriend, getFriends, deleteFriend, addFood, deleteFood, showUser, login, modify_food, displayByTag, getFoodNames, suggestRecipe} = require('./user.js')


test_functions = []
test_functions[0] = async function test_add_one() {
    await addUser({email: "test1@ucsd.edu", password: "derderder"})
    console.log("Test 0: Added new user")
}

test_functions[1] = async function test_show_db() {
    var user1 = await findUser("example@ucsd.edu")
    console.log(user1)
    console.log("Test 1: Find one user.")
}

async function test(tests) {
    await db.connectDB()
    list = ["chicken", "salt", "mongo", "orange", "onion", "pepper"]
    var user1 = await User.findOne({
        email: "chief@ucsd.edu"
    })
    var suggests = await suggestRecipe(user1._id)
    console.log(suggests.length)
    // For the first 
    for(let i of suggests) {
        console.log(i.missing_num)
    }
    await db.disconnectDB()
}

test(test_functions)