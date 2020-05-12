var db = require('./db.js')
var Food = require('./food.js')

test_functions = []
test_functions[0] = async function test_add_one() {
    var food1 = new Food({name: "Eggs"})
    var food1_id = await food1.save()
    console.log(food1_id)
    console.log("Test 0: Added new food")
}

async function test(tests) {
    await db.connectDB()
    await tests[0]()
    await db.disconnectDB()
    console.log("All test cleared.")
}

test(test_functions)