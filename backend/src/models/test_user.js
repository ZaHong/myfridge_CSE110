var db = require('./db.js')
var User = require('./user.js')

test_functions = []
test_functions[0] = async function test_add_one() {
    var user1 = new User({email: 'example2@ucsd.edu', password: '123123'})
    await user1.save()
    console.log("Test 0: Added new user")
}

test_functions[1] = async function test_show_db() {
    await User.findOne( function(error, result) {
        if (error != null) {
            console.log(error)
        }
    })
    console.log("Test 1: Displayed one user.")
}

async function test(tests) {
    await tests[0]()
    await tests[1]()
    await db.disconnect()
    console.log("All test cleared.")
}

test(test_functions)