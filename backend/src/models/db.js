/**
 * Filename: db.js
 * Author: Zhanchong Deng
 * Descriptions: This file establishes connections to database. Should be imported for all schemas.
 */

var mongoose = require('mongoose')
// Connecting to Database MyFridge
const uri = "mongodb+srv://zhdeng:0quxTw2a7eHfngRC@myfridge-xcyfm.mongodb.net/MyFridge?retryWrites=true&w=majority"
// mongoose.connect(uri, { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 });
mongoose.connect(uri, {useNewUrlParser: true}, function(err) {
    if (err != null) {
        console.log(err)
    } else {
        console.log("Connection to DB established.")
    }
});

module.exports = mongoose