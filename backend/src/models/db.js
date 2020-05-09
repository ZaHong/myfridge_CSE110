/**
 * Filename: db.js
 * Author: Zhanchong Deng
 * Descriptions: This file establishes connections to database. Should be imported for all schemas.
 */

var mongoose = require('mongoose')
// Connecting to Database MyFridge
const uri = "mongodb+srv://zhdeng:0quxTw2a7eHfngRC@myfridge-xcyfm.mongodb.net/MyFridge?retryWrites=true&w=majority"
// mongoose.connect(uri, { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 });

module.exports.connectDB = async() => {
    try {
        await mongoose.connect(uri, {useNewUrlParser: true})
    } catch (err) {
        console.log("Failed to connect to DB")
        console.log(err)
    }
    console.log("MyFridge DB connected successfully!!!")
}

module.exports.disconnectDB = async() => {
    try {
        await mongoose.disconnect()
    } catch (err) {
        console.log("Failed to disconnect?")
        console.log(err)
    }
    console.log("Disconnected from MyFridge DB.")
}