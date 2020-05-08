// Importing mongodb
const {MongoClient} = require('mongodb')
// username: zhdeng, password: 0quxTw2a7eHfngRC
const uri = "mongodb+srv://zhdeng:0quxTw2a7eHfngRC@myfridge-xcyfm.mongodb.net/test?retryWrites=true&w=majority"
 
const client = new MongoClient(uri, { useNewUrlParser: true });

function addUser(user_email, user_password) {
    client.connect(err => {
        if(err != null) {
            console.log("Database not connected")
            return
        }
        const user_collection = client.db("MyFridge").collection("User");
        // Search for this user
        user_collection.findOne({email: user_email}, function(err, doc) {
            // Only creates if not found
            if (doc == null) {
                user_collection.insertOne({email: user_email, password: user_password}, function(err, r) {
                    console.log("inserted")
                    client.close()
                })
            } else {
                console.log("User already exist")
                client.close();
            }
        })

    });
}

// module.exports = {client, addUser}
addUser("sample@gmail.com", "123456789")