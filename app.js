const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "contacts_db";

app.use(express.json());

let db;
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    db = client.db(databaseName);
  }
);

app.get("", (req, res) => {
  res.send("Connected.");
});

app.post("/crearcontacto", (req, res) => {
    const { nif, name, age, tel } = req.body;

    if (nif == null || name == null || age == null || tel == null) return res.send({error: 'Some property is null.'});

    db.collection('contact').insertOne({
        nif: nif,
        name: name,
        age: age,
        tel: tel
    }, (error, result) => {
        if (error) {
            return res.send({error: 'Error to insert.'})
        }
        res.send({id: result.insertedId});
    })
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
