var db = require('./db.js')
var user = require('./user.js')

test_functions = []
test_functions[0] = async function test_add_one() {
    await user.addUser({email: "test1@ucsd.edu", password: "derderder"})
    console.log("Test 0: Added new user")
}

test_functions[1] = async function test_show_db() {
    await user.findUser("example@ucsd.edu")
    console.log("Test 1: Find one user.")
}

async function test(tests) {
    await db.connectDB()
    // await tests[0]()
    await tests[1]()
    console.log("aslkefjsalkdfjsfsafd")
    await db.disconnectDB()
    console.log("All test cleared.")
}

test(test_functions)