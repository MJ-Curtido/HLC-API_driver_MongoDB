const express = require("express");
const app = express();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

let bbddChuli;
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    bbddChuli = client.db(databaseName)
    
    bbddChuli.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    })
})
app.get('',(req,res)=>{
    res.send('ers gay tio');
})
app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});