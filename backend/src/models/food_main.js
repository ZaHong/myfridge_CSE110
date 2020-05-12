var db = require('./db.js')
var {Food, findFood} = require('./food.js')

test_functions = []
test_functions[0] = async function test_add_one() {
    var food1 = new Food({name: "Eggs"})
    var food1_id = await food1.save()
    console.log(food1_id)
    console.log("Test 0: Added new food")
}

test_functions[1] = async function test_find_one() {
    var res = await findFood("5eba3ca6fc8fc275ba459b24")
    console.log(res)
}

async function test(tests) {
    await db.connectDB()
    await tests[1]()
    await db.disconnectDB()
    console.log("All test cleared.")
}


test(test_functions)