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
      return console.log("Unable to connect to database.");
    }

    db = client.db(databaseName);
  }
);

app.get("", (req, res) => {
  res.send("Connected.");
});

app.post("/crearcontacto", (req, res) => {
  const { nif, name, age, tel } = req.body;

  if (nif == null || name == null || age == null || tel == null)
    return res.send({ error: "Some property is null." });

  db.collection("contact").insertOne(
    {
      nif: nif,
      name: name,
      age: age,
      tel: tel,
    },
    (error, result) => {
      if (error) {
        return res.send({ error: "Error to insert." });
      }
      res.send({ id: result.insertedId });
    }
  );
});

app.get("/buscarcontacto", (req, res) => {
  const id = req.query.id;

  if (id == null) {
    return res.send({ error: "The id is null." });
  }

  db.collection("contact").findOne(
    { _id: new ObjectId(id) },
    (error, result) => {
      if (error) {
        return res.send({ error: "Unable to get the contact." });
      }

      if (result == null) {
        return res.send({
          error: "The contact with the introduced id isn't exist.",
        });
      }

      return res.send(result);
    }
  );
});

app.put("/actualizacontacto/:id", (req, res) => {
  const id = req.params.id;

  if (id == null) {
    return res.send({ error: "The id is null." });
  }

  const { nif, name, age, tel } = req.body;

  if (nif == null || name == null || age == null || tel == null)
    return res.send({ error: "Some property is null." });

  db.collection("contact")
    .updateMany(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          nif: nif,
          name: name,
          age: age,
          tel: tel,
        },
      }
    )
    .then((result) => {
      return res.send({ modifiedCount: result.modifiedCount });
    })
    .catch((error) => {
      return res.send({ error: "Unable to update the contact." });
    });
});

app.delete("/borracontacto/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  if (id == null) {
    return res.send({ error: "The id is null." });
  }

  db.collection("contact")
    .deleteOne({
      _id: new ObjectId(id),
    })
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      return res.send({ error: "Unable to delete the contact." });
    });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
